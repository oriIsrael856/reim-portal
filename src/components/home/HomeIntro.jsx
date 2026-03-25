import React from 'react';

/** Split CMS intro.text: first block = lead (Body 1 + Subtitle 1), after \\n\\n = Body 1 (Figma 191:9393). */
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

const HomeIntro = ({ data }) => {
    const { lead1, lead2, body } = splitIntroText(data?.text);

    return (
        <section
            className="relative z-20 w-full"
            style={{
                /* Figma 191:9393 outer padding; tint lives on HomePage wrapper */
                paddingTop: 'clamp(2.5rem, 10vw, 5rem)',
                paddingBottom: 'clamp(2rem, 6vw, 3.75rem)',
            }}
        >
            <div className="relative z-10 mx-auto w-full" style={{ maxWidth: 'min(1100px, 92vw)' }}>
                {/* ממורכז על רוחב המסגרת הסגולה; מעט מעל הכותרת וחופף את השפה העליונה */}
                <div
                    className="pointer-events-none absolute z-30 w-[clamp(5.75rem, 30vw, 9rem)] select-none"
                    style={{
                        top: 0,
                        left: '50%',
                        transform: 'translate(-50%, -48%)',
                    }}
                    aria-hidden
                >
                    <img
                        src="/assets/home/home-intro-plane.svg"
                        alt=""
                        className="h-auto w-full object-contain"
                        width={136}
                        height={78}
                    />
                </div>

                <div
                    className="relative z-10 mx-auto w-full text-center text-white md:max-w-full"
                    style={{
                        borderRadius: '24px',
                        border: '1.5px solid #001D26',
                        boxShadow: '2px 2px 0 0 #001D26',
                        backgroundColor: '#6546DE',
                        /* מקום לזנב/מטוס שחופף מלמעלה */
                        padding: 'clamp(2.75rem, 9vw, 3.25rem) 24px 32px',
                    }}
                >
                    <div className="flex flex-col items-center gap-4 font-['Rubik']">
                        <header className="flex w-full flex-col items-center gap-1">
                            {data?.subtitle ? (
                                <p
                                    className="text-white"
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
                            {data?.title ? (
                                <h2
                                    className="text-white"
                                    style={{
                                        fontSize: '24px',
                                        lineHeight: 1.334,
                                        fontWeight: 700,
                                    }}
                                >
                                    {data.title}
                                </h2>
                            ) : null}
                        </header>

                        {(lead1 || lead2) && (
                            <div className="flex w-full flex-col gap-1">
                                {lead1 ? (
                                    <p
                                        className="text-white"
                                        style={{
                                            fontSize: '16px',
                                            lineHeight: 1.32,
                                            letterSpacing: '0.009375em',
                                            fontWeight: 400,
                                        }}
                                    >
                                        {lead1}
                                    </p>
                                ) : null}
                                {lead2 ? (
                                    <p
                                        className="text-white"
                                        style={{
                                            fontSize: '16px',
                                            lineHeight: 1.22,
                                            letterSpacing: '0.009375em',
                                            fontWeight: 500,
                                        }}
                                    >
                                        {lead2}
                                    </p>
                                ) : null}
                            </div>
                        )}

                        {body ? (
                            <div className="flex w-full flex-col gap-2">
                                <p
                                    className="text-white"
                                    style={{
                                        fontSize: '16px',
                                        lineHeight: 1.32,
                                        letterSpacing: '0.009375em',
                                        fontWeight: 400,
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
};

export default HomeIntro;
