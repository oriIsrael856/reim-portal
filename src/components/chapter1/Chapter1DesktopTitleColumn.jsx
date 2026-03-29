import React from 'react';

export default function Chapter1DesktopTitleColumn({ data }) {
    if (!data?.hero) return null;
    const num = data.chapterNumber || '01';

    return (
        <div className="relative w-full max-w-[520px] shrink-0 text-end" dir="rtl">
            {/* justify-start ב-RTL = יישור לימין — תג באותו קו עם תחילת הכותרת */}
            <div className="mb-10 flex w-full justify-start">
                <div
                    className="inline-flex h-[42px] shrink-0 items-center gap-4 border-[1.5px] border-[#001D26] bg-[#BCE079] py-3 ps-1.5 pe-3.5 shadow-[2px_2px_0_#001D26]"
                    style={{ borderRadius: '24px 2px 2px 24px' }}
                >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#839C54]">
                        <span className="font-[family-name:var(--font-salsa)] text-base leading-none text-white">
                            {num}
                        </span>
                    </div>
                    <span className="text-xl font-semibold leading-[1.28] tracking-[0.0075em] text-[#001D26]">
                        {data.hero.tag}
                    </span>
                </div>
            </div>

            <h1 className="whitespace-pre-line text-right font-['Rubik'] text-[clamp(2rem,3.5vw,3.75rem)] font-bold leading-none tracking-[-0.00833em] md:text-[60px]">
                <span className="block text-[#001D26]">{data.hero.title1}</span>
                <span className="relative mt-2 inline-block pb-5 text-[#6546DE]">
                    {data.hero.title2}
                    <span
                        className="absolute bottom-0 start-0 h-[17px] w-[min(291px,92%)] rounded-sm bg-[#FFB23B]"
                        aria-hidden
                    />
                </span>
            </h1>
        </div>
    );
}
