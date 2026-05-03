import React, { useState } from 'react';

/**
 * כרטיס ניוזלטר — Figma Home 191:9424 (מבנה + מידות + אייקונים מיוצאים).
 * data: { title, subtitle, text, placeholder } — כולם ניתנים לעריכה ב-CMS.
 * הגשה: FormSubmit AJAX endpoint (https://formsubmit.co) — חינמי, ללא backend.
 */
const ASSETS = {
    star1: '/assets/home/home-newsletter-star1.svg',
    star2: '/assets/home/home-newsletter-star2.svg',
    plane: '/assets/home/home-newsletter-plane.svg',
    submit: '/assets/home/home-newsletter-submit.svg',
};

const FORMSUBMIT_ENDPOINT = 'https://formsubmit.co/ajax/Ofere@matnasim.org.il';

/**
 * @param {{ data: object, className?: string, embeddedInRow?: boolean, embeddedStyles?: object | null }} props
 * `embeddedInRow` — Chapter 5 resources row: fill library card height; `embeddedStyles` overrides global `--home-newsletter-*` (broken on md+ by homepage tokens).
 */
const NewsletterCard = ({ data, className = '', embeddedInRow = false, embeddedStyles = null }) => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle');
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || status === 'sending' || status === 'success') return;
        setStatus('sending');
        setErrorMsg('');
        try {
            const res = await fetch(FORMSUBMIT_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify({
                    email,
                    _subject: 'הרשמה חדשה לניוזלטר רעים',
                    _captcha: 'false',
                    _template: 'table',
                }),
            });
            const result = await res.json();
            if (result.success === 'true' || result.success === true) {
                setStatus('success');
                setEmail('');
            } else {
                throw new Error(result.message || 'שליחה נכשלה, נסי שוב');
            }
        } catch (err) {
            setStatus('error');
            setErrorMsg(err.message || 'שליחה נכשלה, נסי שוב');
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

    const inputRowStyle = useEmbedded ? { minHeight: embeddedStyles.inputMinH.minHeight } : { minHeight: 'var(--home-newsletter-input-min-h)' };

    /* Input/placeholder must scale with viewport so the long Hebrew placeholder
       ("הקלידי את כתובת המייל שלך") fits in the input on small desktops where
       the card column shrinks. Embedded → reuse card body font; standalone →
       dedicated CSS var (see :root in src/index.css). */
    const inputTypography = useEmbedded
        ? { fontSize: embeddedStyles.bodyFont.fontSize }
        : { fontSize: 'var(--home-newsletter-input-font-size)' };

    return (
        <article
            className={`relative box-border flex flex-col rounded-[24px] border-[1.5px] border-[#001D26] bg-[#BCE079] shadow-[2px_2px_0_#001D26] ${useEmbedded ? 'min-h-0 overflow-visible p-0' : 'justify-between overflow-visible p-4'} ${className}`}
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
                        <img src={ASSETS.star1} alt="" width={44} height={44} className="shrink-0" aria-hidden />
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
                        <p className="w-full min-w-0 shrink-0 text-center text-[#001D26]" style={bodyTypography}>
                            {data.text}
                        </p>
                    </div>
                    <div className="relative z-[2] flex shrink-0 justify-center py-1">
                        <img src={ASSETS.star2} alt="" width={40} height={40} className="shrink-0" aria-hidden />
                    </div>
                </>
            ) : (
                <>
                    <div className="relative z-[2] flex w-full flex-col items-center gap-3 text-center">
                        <img src={ASSETS.star1} alt="" width={44} height={44} className="shrink-0" aria-hidden />
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
                    <div className="relative z-[2] flex justify-center">
                        <img src={ASSETS.star2} alt="" width={40} height={40} className="shrink-0" aria-hidden />
                    </div>
                </>
            )}

            <form
                onSubmit={handleSubmit}
                className="relative z-[2] flex w-full min-w-0 shrink-0 items-center justify-between gap-3 rounded-[100px] border border-[#001D26] bg-white py-2 ps-1.5 pe-[14px]"
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
                    className="min-w-0 flex-1 border-0 bg-transparent text-end font-normal leading-[1.32] tracking-[0.009375em] text-[#001D26] outline-none placeholder:text-[rgba(0,29,38,0.4)] disabled:opacity-60"
                    style={inputTypography}
                />
                <button
                    type="submit"
                    disabled={status === 'sending' || status === 'success'}
                    className="flex h-9 shrink-0 items-center justify-center rounded-[32px] p-1.5 disabled:opacity-60"
                    aria-label="שליחה"
                >
                    <img src={ASSETS.submit} alt="" width={36} height={36} aria-hidden />
                </button>
            </form>
            {status === 'success' ? (
                <p className="relative z-[2] mt-2 text-center text-sm text-[#001D26]">
                    תודה! נרשמת בהצלחה.
                </p>
            ) : null}
            {status === 'error' ? (
                <p className="relative z-[2] mt-2 text-center text-sm text-[#c4213b]">
                    {errorMsg}
                </p>
            ) : null}
        </article>
    );
};

export default NewsletterCard;
