import React from 'react';

function splitIntroText(text) {
    if (!text || typeof text !== 'string') {
        return { lead1: '', lead2: '', body: '' };
    }

    const parts = text.split(/\n\n+/);
    const head = (parts[0] || '').trim();
    const body = parts.slice(1).join('\n\n').trim();
    const headLines = head.split('\n').map((s) => s.trim()).filter(Boolean);
    const lead1 = headLines[0] || '';
    const lead2 = headLines.slice(1).join('\n') || '';
    return { lead1, lead2, body };
}

/**
 * Figma desktop Section 1 (`36:1035` + `36:1036`):
 * - Subtitle (Typography/Body 1) 16px, RIGHT, #FFFFFF
 * - Title (Typography/H4) 34px, RIGHT, #FFFFFF
 * - Two H6 body lines (20px, CENTER, fontWeight 600)
 * - Purple card: background #6546DE, radius 24px, border 1.5px #001D26, shadow 2px 2px 0px #001D26
 * - Plane decoration: `/assets/home/home-intro-plane.svg`
 *
 * This component is desktop-only; mobile uses `HomeIntro.jsx` as-is.
 */
export default function HomeIntroDesktop({ data }) {
    const { lead1, lead2, body } = splitIntroText(data?.text);

    return (
        <section className="relative z-20 w-full">
            <div
                className="relative mx-auto w-full"
                style={{
                    width: '1424px',
                    maxWidth: '100%',
                }}
            >
                {/* Plane illustration */}
                <div
                    className="pointer-events-none absolute z-30 w-[83px]"
                    style={{
                        /*
                         * Figma 36:1035 -> 40:1097 (Plane illustration)
                         * locationRelativeToParent: x=883.78, y=87, size=83.32x83.07
                         *
                         * We position relative to the card width (1424).
                         * Derived: card left ≈ 200px, so plane-left ≈ 883.78-200 = 683.78.
                         * ratio = 683.78 / 1424 = 48.04%
                         *
                         * Derived: card-top ≈ paddingTop(120), so plane-top ≈ 87-120 = -33px.
                         */
                        top: '-33px',
                        left: '48.04%',
                    }}
                    aria-hidden
                >
                    <img
                        src="/assets/home/home-intro-plane.svg"
                        alt=""
                        className="h-auto w-full object-contain"
                        width={83.32}
                        height={83.07}
                        decoding="async"
                    />
                </div>

                <div
                    className="relative z-10 mx-auto w-full text-white"
                    style={{
                        borderRadius: 24,
                        border: '1.5px solid #001D26',
                        boxShadow: '2px 2px 0 0 rgba(0, 29, 38, 1)',
                        backgroundColor: '#6546DE',
                        padding: '64px 80px 52px',
                    }}
                >
                    <div
                        className="flex w-full flex-col items-center justify-center"
                        style={{
                            gap: '24px',
                            fontFamily: 'Rubik',
                        }}
                    >
                        {/* 36:1036 -> 40:1080 Container */}
                        <div
                            className="w-full"
                            style={{
                                maxWidth: 1000,
                                textAlign: 'right',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '9px',
                            }}
                            dir="rtl"
                        >
                                {data?.subtitle ? (
                                <p
                                    style={{
                                        fontSize: 16,
                                        lineHeight: '1.32em',
                                        letterSpacing: '0.9375000373%',
                                        fontWeight: 400,
                                        textAlign: 'right',
                                        color: '#FFFFFF',
                                    }}
                                >
                                    {data.subtitle}
                                </p>
                            ) : null}
                                {data?.title ? (
                                <h2
                                    style={{
                                        fontSize: 34,
                                        lineHeight: '1.1000000449em',
                                        letterSpacing: '0.735294%',
                                        fontWeight: 700,
                                        textAlign: 'right',
                                        color: '#FFFFFF',
                                    }}
                                >
                                    {data.title}
                                </h2>
                            ) : null}
                        </div>

                        {/* 36:1036 -> 42:2287 body (two H6 lines) */}
                        {(lead1 || lead2) ? (
                            <div
                                className="w-full"
                                style={{
                                    maxWidth: 1000,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '8px',
                                }}
                            >
                                {lead1 ? (
                                    <p
                                        style={{
                                            fontSize: 20,
                                            lineHeight: '1.2799999237em',
                                            letterSpacing: '0.7500000298%',
                                            fontWeight: 600,
                                            textAlign: 'center',
                                            color: '#FFFFFF',
                                            whiteSpace: 'pre-line',
                                        }}
                                    >
                                        {lead1}
                                    </p>
                                ) : null}
                                {lead2 ? (
                                    <p
                                        style={{
                                            fontSize: 20,
                                            lineHeight: '1.2799999237em',
                                            letterSpacing: '0.7500000298%',
                                            fontWeight: 600,
                                            textAlign: 'center',
                                            color: '#FFFFFF',
                                            whiteSpace: 'pre-line',
                                        }}
                                    >
                                        {lead2}
                                    </p>
                                ) : null}
                            </div>
                        ) : null}

                        {/* 36:1036 -> 98:2027 body (H6) */}
                        {body ? (
                            <div
                                className="w-full"
                                style={{
                                    maxWidth: 1000,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '8px',
                                }}
                            >
                                <p
                                    style={{
                                        fontSize: 20,
                                        lineHeight: '1.2799999237em',
                                        letterSpacing: '0.7500000298%',
                                        fontWeight: 600,
                                        textAlign: 'center',
                                        color: '#FFFFFF',
                                        whiteSpace: 'pre-line',
                                    }}
                                >
                                    {body}
                                </p>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </section>
    );
}

