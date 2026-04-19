import React from 'react';

/**
 * Figma node 111:2290 — Section 2 (audience + age bands). Desktop only.
 * Tokens: outer tint rgba(255,178,59,0.08), title card #ffb23b, borders #001d26, shadow 2px 2px 0.
 */

function splitAudienceText(audienceText) {
    if (!audienceText || typeof audienceText !== 'string') {
        return { bodyLines: [], subline: null };
    }
    const lines = audienceText
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean);
    const last = lines[lines.length - 1];
    if (last && last.startsWith('הפעילות')) {
        return { bodyLines: lines.slice(0, -1), subline: last };
    }
    return { bodyLines: lines, subline: null };
}

function AgeBandCard({ label, age }) {
    return (
        <div
            className="flex min-h-px min-w-0 flex-[1_0_0] flex-col items-center justify-center rounded-lg border-[1.5px] border-[#001d26] pt-3.5 pb-3 shadow-[2px_2px_0_0_#001d26] [background:color-mix(in_srgb,#6546DE_4%,white)]"
            dir="rtl"
        >
            <div className="flex flex-col items-center gap-2">
                <p className="whitespace-nowrap text-center text-[24px] font-bold leading-[1.334] text-[#001d26]">{label}</p>
                <div className="relative flex flex-col items-center pb-4">
                    <div className="mb-[-16px] flex w-[100px] shrink-0 items-center justify-center rounded-bl-2xl rounded-tr-2xl bg-[rgba(101,70,222,0.16)] py-0.5">
                        <span className="text-center text-[16px] font-normal leading-[1.32] tracking-[0.15px] text-[#001d26]">
                            גילאי
                        </span>
                    </div>
                    <p
                        className="text-center text-[40px] font-normal leading-[1.28] tracking-[0.15px] text-[#6546DE] font-[family-name:var(--font-salsa)]"
                        dir="ltr"
                    >
                        {age}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function Chapter2DesktopAudienceSection({ data }) {
    if (!data) return null;

    const { bodyLines, subline } = splitAudienceText(data.audienceText);
    const ageGroups = data.ageGroups || [];

    return (
        <section
            id="ch2-audience"
            className="relative w-full overflow-x-clip rounded-t-3xl border-t-2 border-[#ffb23b] px-4 pt-[clamp(80px,6.58vw,120px)] pb-[clamp(60px,5.48vw,100px)] md:px-[clamp(1rem,10.965vw,200px)]"
            style={{
                backgroundImage:
                    'linear-gradient(90deg, rgba(255, 178, 59, 0.08) 0%, rgba(255, 178, 59, 0.08) 100%), linear-gradient(90deg, #fff 0%, #fff 100%)',
            }}
            aria-labelledby="ch2-audience-heading"
        >
            <div
                className="mx-auto flex w-full max-w-[1424px] flex-col items-center gap-8 rounded-3xl border-[1.5px] border-[#001d26] bg-[#ffb23b] px-6 pt-16 pb-[52px] shadow-[2px_2px_0_0_#001d26] md:px-20"
                dir="rtl"
            >
                <div className="flex w-full max-w-[1000px] shrink-0 flex-col items-center justify-center">
                    <h2
                        id="ch2-audience-heading"
                        className="w-full text-center text-[34px] font-bold leading-[1.1] tracking-[0.25px] text-[#001d26]"
                    >
                        {data.audienceTitle}
                    </h2>
                </div>

                <div className="flex w-full max-w-[1000px] shrink-0 flex-col items-center gap-6 text-center text-[20px] leading-[1.28] tracking-[0.15px] text-[#001d26] md:gap-8">
                    {bodyLines.length > 0 ? (
                        <p className="w-full max-w-[1000px] font-normal">
                            {bodyLines.map((line, i) => (
                                <React.Fragment key={i}>
                                    {i > 0 ? (
                                        <>
                                            <br />
                                            <br />
                                        </>
                                    ) : null}
                                    {line}
                                </React.Fragment>
                            ))}
                        </p>
                    ) : null}
                    {subline ? (
                        <p className="w-full max-w-[1000px] font-semibold">{subline}</p>
                    ) : null}
                </div>

                <div className="flex w-full shrink-0 flex-row flex-wrap items-start justify-center gap-6 md:flex-nowrap md:gap-6">
                    {ageGroups.map((group, index) => (
                        <AgeBandCard key={index} label={group.label} age={group.age} />
                    ))}
                </div>
            </div>
        </section>
    );
}
