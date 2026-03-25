import React, { useState } from 'react';

/**
 * כרטיס ניוזלטר — Figma Home 191:9424 (מבנה + מידות + אייקונים מיוצאים).
 * data: { title, subtitle, text, placeholder } — כולם ניתנים לעריכה ב-CMS.
 * TODO: חיבור לרשימת תפוצה (שליחת email ל-endpoint / שירות).
 */
const ASSETS = {
    star1: '/assets/home/home-newsletter-star1.svg',
    star2: '/assets/home/home-newsletter-star2.svg',
    plane: '/assets/home/home-newsletter-plane.svg',
    submit: '/assets/home/home-newsletter-submit.svg',
};

const NewsletterCard = ({ data, className = '' }) => {
    const [email, setEmail] = useState('');

    if (!data) return null;

    const placeholder = data.placeholder || 'הקלידי את כתובת המייל שלך';

    return (
        <article
            className={`relative box-border flex h-[400px] flex-col justify-between overflow-visible rounded-[24px] border-[1.5px] border-[#001D26] bg-[#BCE079] p-4 shadow-[2px_2px_0_#001D26] ${className}`}
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

            <div className="relative z-[2] flex w-full flex-col items-center gap-3">
                <img src={ASSETS.star1} alt="" width={44} height={44} className="shrink-0" aria-hidden />
                <div className="flex w-full flex-col items-center gap-0 text-center">
                    {data.subtitle ? (
                        <p
                            className="text-[#001D26]"
                            style={{
                                fontSize: '16px',
                                lineHeight: 1.32,
                                letterSpacing: '0.009375em',
                                fontWeight: 400,
                            }}
                        >
                            {data.subtitle}
                        </p>
                    ) : null}
                    <h3
                        className="text-[#001D26]"
                        style={{
                            fontSize: '34px',
                            lineHeight: 1.1,
                            letterSpacing: '0.00735294em',
                            fontWeight: 700,
                        }}
                    >
                        {data.title}
                    </h3>
                </div>
                <p
                    className="w-full text-center text-[#001D26]"
                    style={{
                        fontSize: '16px',
                        lineHeight: 1.32,
                        letterSpacing: '0.009375em',
                        fontWeight: 400,
                    }}
                >
                    {data.text}
                </p>
            </div>

            <div className="relative z-[2] flex justify-center">
                <img src={ASSETS.star2} alt="" width={40} height={40} className="shrink-0" aria-hidden />
            </div>

            <div className="relative z-[2] flex w-full min-h-[52px] items-center justify-between gap-3 rounded-[100px] border border-[#001D26] bg-white py-2 ps-1.5 pe-[14px]">
                <input
                    type="email"
                    name="newsletter-email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={placeholder}
                    className="min-w-0 flex-1 border-0 bg-transparent text-end text-base font-normal leading-[1.32] tracking-[0.009375em] text-[#001D26] outline-none placeholder:text-[rgba(0,29,38,0.4)]"
                />
                <button
                    type="button"
                    className="flex h-9 shrink-0 items-center justify-center rounded-[32px] p-1.5"
                    aria-label="שליחה"
                >
                    <img src={ASSETS.submit} alt="" width={36} height={36} aria-hidden />
                </button>
            </div>
        </article>
    );
};

export default NewsletterCard;
