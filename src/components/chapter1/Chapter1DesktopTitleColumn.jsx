import React from 'react';

export default function Chapter1DesktopTitleColumn({ data, ch1 }) {
    if (!data?.hero) return null;
    const num = data.chapterNumber || '01';

    return (
        <div className="relative w-full shrink-0 text-end" dir="rtl">
            <div className="flex w-full justify-start" style={ch1?.heroPillMb}>
                <div
                    className="inline-flex shrink-0 items-center border-[1.5px] border-[#001D26] bg-[#BCE079] py-3 ps-1.5 pe-3.5 shadow-[2px_2px_0_#001D26]"
                    style={{ borderRadius: '24px 2px 2px 24px', ...ch1?.heroPillH, ...ch1?.heroPillGap }}
                >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#839C54]">
                        <span className="font-[family-name:var(--font-salsa)] text-base leading-none text-white">
                            {num}
                        </span>
                    </div>
                    <span className="font-semibold leading-[1.28] tracking-[0.0075em] text-[#001D26]" style={ch1?.heroPillTagFont}>
                        {data.hero.tag}
                    </span>
                </div>
            </div>

            <h1 className="whitespace-pre-line text-right font-['Rubik'] font-bold leading-none tracking-[-0.00833em]" style={ch1?.heroH1}>
                <span className="block text-[#001D26]">{data.hero.title1}</span>
                <span className="relative mt-2 inline-block pb-5 text-[#6546DE]">
                    {data.hero.title2}
                    <span
                        className="absolute bottom-0 start-0 rounded-sm bg-[#FFB23B]"
                        style={ch1?.heroOrangeBar}
                        aria-hidden
                    />
                </span>
            </h1>
        </div>
    );
}
