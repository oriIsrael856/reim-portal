/**
 * Newsletter admin notification via Resend + Firestore quota (free-tier safe).
 *
 * Deploy (once):
 * 1. Blaze billing on the Firebase project (Functions requirement).
 * 2. `cd functions && npm install`
 * 3. `firebase functions:secrets:set RESEND_API_KEY`  (paste API key from resend.com)
 * 4. Copy `env.reim-portal.example` → `.env.reim-portal`, set NEWSLETTER_TO_EMAIL.
 * 5. `firebase deploy --only functions,firestore:rules`
 *
 * Defaults match Resend free tier (see resend.com/pricing): 100/day, 3000/month (UTC).
 * When over cap or after Resend 429/402, no more emails until next UTC month (local counters)
 * or until you clear `newsletter_internal/quota` sendDisabled in Firestore.
 */
import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { defineSecret, defineString } from 'firebase-functions/params';
import { onDocumentCreated } from 'firebase-functions/v2/firestore';
import * as logger from 'firebase-functions/logger';

initializeApp();
const db = getFirestore();

const QUOTA_DOC_PATH = 'newsletter_internal/quota';

const resendApiKey = defineSecret('RESEND_API_KEY');
const newsletterTo = defineString('NEWSLETTER_TO_EMAIL', { default: '' });
const newsletterFrom = defineString('NEWSLETTER_FROM_EMAIL', {
    default: 'onboarding@resend.dev',
});
/** Resend free tier — daily cap (UTC day) */
const dailyCapParam = defineString('NEWSLETTER_DAILY_CAP', { default: '100' });
/** Resend free tier — monthly cap (UTC calendar month) */
const monthlyCapParam = defineString('NEWSLETTER_MONTHLY_CAP', { default: '3000' });

function parsePositiveInt(param, fallback) {
    const n = parseInt(String(param.value()).trim(), 10);
    if (!Number.isFinite(n) || n < 1) return fallback;
    return Math.min(n, 1_000_000);
}

function utcDayKey(d) {
    return d.toISOString().slice(0, 10);
}

function utcYearMonth(d) {
    return d.toISOString().slice(0, 7);
}

/**
 * @param {{ dailyCap: number; monthlyCap: number }} caps
 * @returns {Promise<{ ok: boolean; reason?: string }>}
 */
async function tryReserveQuotaSlot(caps) {
    const now = new Date();
    const dayKey = utcDayKey(now);
    const yearMonth = utcYearMonth(now);
    return db.runTransaction(async (tx) => {
        const ref = db.doc(QUOTA_DOC_PATH);
        const snap = await tx.get(ref);
        const data = snap.data() ?? {};

        let sentToday = Number(data.sentToday) || 0;
        let sentThisMonth = Number(data.sentThisMonth) || 0;
        let sendDisabled = data.sendDisabled === true;

        const prevDay = data.dayKey ?? '';
        const prevMonth = data.yearMonth ?? '';

        if (prevDay !== dayKey) {
            sentToday = 0;
        }
        if (prevMonth !== yearMonth) {
            sentThisMonth = 0;
            sendDisabled = false;
        }

        if (sendDisabled) {
            return { ok: false, reason: 'send_disabled' };
        }
        if (sentToday >= caps.dailyCap || sentThisMonth >= caps.monthlyCap) {
            return { ok: false, reason: 'quota_exceeded' };
        }

        tx.set(
            ref,
            {
                dayKey,
                yearMonth,
                sentToday: sentToday + 1,
                sentThisMonth: sentThisMonth + 1,
                updatedAt: now.toISOString(),
            },
            { merge: true },
        );
        return { ok: true };
    });
}

async function rollbackQuotaSlot() {
    const now = new Date();
    const dayKey = utcDayKey(now);
    const yearMonth = utcYearMonth(now);
    await db.runTransaction(async (tx) => {
        const ref = db.doc(QUOTA_DOC_PATH);
        const snap = await tx.get(ref);
        const data = snap.data() ?? {};
        if (data.dayKey !== dayKey || data.yearMonth !== yearMonth) return;
        const sentToday = Math.max(0, (Number(data.sentToday) || 0) - 1);
        const sentThisMonth = Math.max(0, (Number(data.sentThisMonth) || 0) - 1);
        tx.set(
            ref,
            {
                sentToday,
                sentThisMonth,
                updatedAt: now.toISOString(),
            },
            { merge: true },
        );
    });
}

async function markSendDisabled(reason) {
    const now = new Date();
    await db.doc(QUOTA_DOC_PATH).set(
        {
            sendDisabled: true,
            sendDisabledReason: reason,
            sendDisabledAt: now.toISOString(),
            updatedAt: now.toISOString(),
        },
        { merge: true },
    );
}

/**
 * @param {{ apiKey: string; from: string; to: string; subscriberEmail: string; submittedAt: string }} p
 */
async function sendResendEmail(p) {
    const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${p.apiKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            from: p.from,
            to: [p.to],
            subject: 'הרשמה חדשה לניוזלטר — פורטל רעים',
            text: `כתובת נרשמת: ${p.subscriberEmail}\nזמן (שרת): ${p.submittedAt}\n`,
        }),
    });
    const bodyText = await res.text();
    if (!res.ok) {
        const err = new Error(`Resend ${res.status}: ${bodyText.slice(0, 400)}`);
        // @ts-expect-error attach status for handler
        err.status = res.status;
        throw err;
    }
}

export const onNewsletterSignupNotify = onDocumentCreated(
    {
        document: 'newsletter_signups/{signupId}',
        region: 'europe-west1',
        secrets: [resendApiKey],
    },
    async (event) => {
        const snap = event.data;
        if (!snap) return;

        const { email, submittedAt } = snap.data();
        if (typeof email !== 'string' || typeof submittedAt !== 'string') {
            logger.warn('newsletter_signups: missing email or submittedAt');
            return;
        }

        const apiKey = resendApiKey.value();
        const to = newsletterTo.value().trim();
        const from =
            newsletterFrom.value().trim() || 'onboarding@resend.dev';
        const dailyCap = parsePositiveInt(dailyCapParam, 100);
        const monthlyCap = parsePositiveInt(monthlyCapParam, 3000);

        if (!apiKey) {
            logger.warn('RESEND_API_KEY empty; skip newsletter email');
            return;
        }
        if (!to) {
            logger.warn('NEWSLETTER_TO_EMAIL empty; skip newsletter email');
            return;
        }

        const reserved = await tryReserveQuotaSlot({ dailyCap, monthlyCap });
        if (!reserved.ok) {
            await snap.ref.set(
                {
                    teamEmailNotify:
                        reserved.reason === 'send_disabled'
                            ? 'skipped_disabled'
                            : 'skipped_quota',
                },
                { merge: true },
            );
            logger.info(`Newsletter email skipped: ${reserved.reason}`);
            return;
        }

        try {
            await sendResendEmail({
                apiKey,
                from,
                to,
                subscriberEmail: email,
                submittedAt,
            });
            await snap.ref.set({ teamEmailNotify: 'sent' }, { merge: true });
        } catch (e) {
            await rollbackQuotaSlot();
            const status =
                e && typeof e === 'object' && 'status' in e ? Number(e.status) || 0 : 0;
            if (status === 429 || status === 402) {
                await markSendDisabled(`resend_http_${status}`);
            }
            await snap.ref.set(
                {
                    teamEmailNotify: 'send_failed',
                    teamEmailNotifyError: String(e.message || e).slice(0, 500),
                },
                { merge: true },
            );
            logger.error('Newsletter Resend failed', e);
        }
    },
);
