import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase';
import {
    REIM_GPT_ACTIVITY_AGENT_URL,
    REIM_GPT_ACTIVITY_AGENT_LABEL,
    REIM_GPT_MARK_SRC,
} from '../../config/reimGptAssistant';

/**
 * כרטיס ניוזלטר — Figma Home 191:9424 (מבנה + מידות + אייקונים מיוצאים).
 * data: { title, subtitle, text, placeholder } — כולם ניתנים לעריכה ב-CMS.
 * הגשה: שמירה ב-Firestore `newsletter_signups` (מקור האמת). התראת מייל לצוות — Cloud Function
 * `onNewsletterSignupNotify` (Resend + מכסה יומית/חודשית); ראו `functions/index.js`.
 */
const ASSETS = {
    star1: '/assets/home/home-newsletter-star1.svg',
    star2: '/assets/home/home-newsletter-star2.svg',
    plane: '/assets/home/home-newsletter-plane.svg',
    submit: '/assets/home/home-newsletter-submit.svg',
};

/**
 * @param {{ data: object, className?: string, embeddedInRow?: boolean, embeddedStyles?: object | null }} props
 * `embeddedInRow` — Chapter 5 resources row: fill library card height; `embeddedStyles` overrides global `--home-newsletter-*` (broken on md+ by homepage tokens).
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const NewsletterCard = ({ data, className = '', embeddedInRow = false, embeddedStyles = null }) => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle');
    const [errorMsg, setErrorMsg] = useState('');

    const isValidEmail = EMAIL_REGEX.test(email.trim());

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isValidEmail || status === 'sending' || status === 'success') return;
        setStatus('sending');
        setErrorMsg('');
        try {
            await addDoc(collection(db, 'newsletter_signups'), {
                email: email.trim(),
                submittedAt: new Date().toISOString(),
            });
            setStatus('success');
            setEmail('');
        } catch (err) {
            setStatus('error');
            const code = err?.code;
            const hint =
                code === 'permission-denied'
                    ? 'אין הרשאה לשרת — יש לפרוס את חוקי Firestore המעודכנים (newsletter_signups).'
                    : '';
            setErrorMsg(
                [err.message || 'שליחה נכשלה, נסי שוב', hint].filter(Boolean).join(' ')
            );
        }
    };

    if (!data) return null;

    const placeholder = data.placeholder || 'הקלידי את כתובת המייל שלך';

    const useEmbedded = Boolean(embeddedInRow && embeddedStyles?.padding && embeddedStyles?.titleFont);

    const articleStyle = useEmbedded
        ? {
              height: '100%',
              minHeight: '100%',
              maxHeight: '100%',
              boxSizing: 'border-box',
              ...embeddedStyles.padding,
          }
        : { height: 'var(--home-newsletter-card-h)' };

    const titleTypography = useEmbedded
        ? {
              fontSize: embeddedStyles.titleFont.fontSize,
              lineHeight: 1.1,
              letterSpacing: '0.00735294em',
              fontWeight: 700,
          }
        : {
              fontSize: 'var(--home-newsletter-title-size)',
              lineHeight: 1.1,
              letterSpacing: '0.00735294em',
              fontWeight: 700,
          };

    const bodyTypography = useEmbedded
        ? {
              fontSize: embeddedStyles.bodyFont.fontSize,
              lineHeight: 1.32,
              letterSpacing: '0.009375em',
              fontWeight: 400,
          }
        : {
              fontSize: 'var(--home-newsletter-body-size)',
              lineHeight: 1.32,
              letterSpacing: '0.009375em',
              fontWeight: 400,
          };

    const inputRowStyle = useEmbedded
        ? { ...embeddedStyles.inputMinH, minHeight: '40px' }
        : { minHeight: '42px' };

    /* Input/placeholder must scale with viewport so the long Hebrew placeholder
       ("הקלידי את כתובת המייל שלך") fits in the input on small desktops where
       the card column shrinks. Embedded → reuse card body font; standalone →
       dedicated CSS var (see :root in src/index.css). */
    const inputTypography = useEmbedded
        ? { fontSize: embeddedStyles.bodyFont.fontSize, lineHeight: 1.25 }
        : { fontSize: 'var(--home-newsletter-input-font-size)', lineHeight: 1.25 };

    /** כפתור GPT — אייקון בלבד כדי לשמור על גובה כרטיס הניוזלטר. */
    const gptChipClass =
        'relative z-[2] flex size-9 shrink-0 items-center justify-center rounded-full border border-[#001D26] bg-white shadow-[1px_1px_0_#001D26] no-underline transition-colors hover:bg-[hsla(0,0%,100%,0.95)]';

    return (
        <article
            className={`relative box-border flex min-h-0 flex-col overflow-hidden rounded-[24px] border-[1.5px] border-[#001D26] bg-[#BCE079] shadow-[2px_2px_0_#001D26] ${useEmbedded ? 'p-0' : 'justify-between p-4'} ${className}`}
            style={articleStyle}
        >
            {/* מטוס + זנב — מיקום מדויק יחסית לפריים 400px (Figma y:225, x:90) */}
            <img
                src={ASSETS.plane}
                alt=""
                className="pointer-events-none absolute z-[1] h-auto w-[48px] max-w-[30%] select-none"
                style={{
                    top: '56.25%',
                    left: '25.2%',
                }}
                width={92}
                height={87}
                aria-hidden
            />

            {useEmbedded ? (
                <>
                    <div
                        className="relative z-[2] flex min-h-0 min-w-0 w-full flex-1 flex-col items-center overflow-y-auto overscroll-contain text-center"
                        style={embeddedStyles.stackGap}
                    >
                        <img src={ASSETS.star1} alt="" width={40} height={40} className="h-10 w-10 shrink-0" aria-hidden />
                        <div className="flex w-full min-w-0 shrink-0 flex-col items-center gap-0 text-center">
                            {data.subtitle ? (
                                <p className="text-[#001D26]" style={bodyTypography}>
                                    {data.subtitle}
                                </p>
                            ) : null}
                            <h3 className="text-[#001D26]" style={titleTypography}>
                                {data.title}
                            </h3>
                        </div>
                        <p className="w-full min-w-0 text-center text-[#001D26]" style={bodyTypography}>
                            {data.text}
                        </p>
                    </div>
                    <div className="relative z-[2] flex shrink-0 justify-center py-0">
                        <img src={ASSETS.star2} alt="" width={32} height={32} className="h-8 w-8 shrink-0" aria-hidden />
                    </div>
                </>
            ) : (
                <>
                    <div className="relative z-[2] flex w-full min-h-0 flex-1 flex-col items-center gap-2 overflow-y-auto overscroll-contain text-center">
                        <img src={ASSETS.star1} alt="" width={40} height={40} className="h-10 w-10 shrink-0" aria-hidden />
                        <div className="flex w-full flex-col items-center gap-0 text-center">
                            {data.subtitle ? (
                                <p className="text-[#001D26]" style={bodyTypography}>
                                    {data.subtitle}
                                </p>
                            ) : null}
                            <h3 className="text-[#001D26]" style={titleTypography}>
                                {data.title}
                            </h3>
                        </div>
                        <p className="w-full text-center text-[#001D26]" style={bodyTypography}>
                            {data.text}
                        </p>
                    </div>
                    <div className="relative z-[2] flex shrink-0 justify-center py-0.5">
                        <img src={ASSETS.star2} alt="" width={32} height={32} className="h-8 w-8 shrink-0" aria-hidden />
                    </div>
                </>
            )}

            <div className="relative z-[2] flex w-full shrink-0 flex-row items-center justify-center gap-2">
                <a
                    href={REIM_GPT_ACTIVITY_AGENT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={gptChipClass}
                    aria-label={REIM_GPT_ACTIVITY_AGENT_LABEL}
                >
                    <img
                        src={REIM_GPT_MARK_SRC}
                        alt=""
                        width={18}
                        height={18}
                        className="pointer-events-none size-[18px] shrink-0 object-contain"
                        aria-hidden
                    />
                </a>
            </div>

            <form
                onSubmit={handleSubmit}
                className="relative z-[2] flex w-full min-w-0 shrink-0 items-center justify-between gap-2 rounded-[100px] border border-[#001D26] bg-white py-1 ps-1 pe-2"
                style={inputRowStyle}
            >
                <input
                    type="email"
                    name="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={placeholder}
                    disabled={status === 'sending' || status === 'success'}
                    className="min-w-0 flex-1 border-0 bg-transparent py-0.5 text-end font-normal leading-[1.25] tracking-[0.009375em] text-[#001D26] outline-none placeholder:text-[rgba(0,29,38,0.4)] disabled:opacity-60"
                    style={inputTypography}
                />
                <button
                    type="submit"
                    disabled={status === 'sending' || status === 'success' || !isValidEmail}
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-[32px] p-1 transition-all duration-200 ${
                        isValidEmail && status !== 'success'
                            ? 'scale-105 bg-[#6546de] shadow-[2px_2px_0_#001D26] hover:scale-110 hover:shadow-[3px_3px_0_#001D26] active:scale-100 active:shadow-[1px_1px_0_#001D26]'
                            : 'opacity-50'
                    } ${status === 'sending' ? 'animate-pulse' : ''}`}
                    aria-label="שליחה"
                >
                    <img src={ASSETS.submit} alt="" width={28} height={28} className="size-7" aria-hidden />
                </button>
            </form>
            {status === 'success' ? (
                <p className="relative z-[2] mt-1 text-center text-xs text-[#001D26]">
                    תודה! נרשמת בהצלחה.
                </p>
            ) : null}
            {status === 'error' ? (
                <p className="relative z-[2] mt-1 text-center text-xs text-[#c4213b]">
                    {errorMsg}
                </p>
            ) : null}
        </article>
    );
};

export default NewsletterCard;
