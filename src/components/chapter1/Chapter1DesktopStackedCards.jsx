import React from 'react';
import { ArrowLeft } from 'lucide-react';

function Chapter1ArrowPill({ direction = 'left', ch1 }) {
    return (
        <div
            className="flex shrink-0 items-center justify-center rounded-[32px] border border-[#001D26] bg-[#BCE079] px-1.5 shadow-[2px_2px_0_#001D26]"
            style={{ ...ch1?.arrowPillH, ...ch1?.arrowPillW }}
            aria-hidden
        >
            <ArrowLeft
                size={16}
                color="#001D26"
                strokeWidth={2.5}
                className={direction === 'left' ? 'rotate-180' : ''}
            />
        </div>
    );
}

/**
 * Figma 106:3100 — first program card is viewport-sticky; second card stays in normal flow.
 */
export default function Chapter1DesktopStackedCards({ data, stickyReleaseRef, ch1 }) {
    const c0 = data?.cards?.[0];
    const c1 = data?.cards?.[1];

    return (
        <div className="flex w-full min-w-0 flex-col" style={{ ...ch1?.cardsStackGap, ...ch1?.cardsStackPb }}>
            {/* Card 0 — Figma 106:3102 (sticky program card) */}
            {c0 ? (
                <div
                    id="ch1-program"
                    className="sticky z-10"
                    style={{ top: ch1?.stickyTop?.top ?? '132px' }}
                >
                    <div
                        className="flex h-auto w-full shrink-0 flex-col rounded-[24px] border-[1.5px] border-[#001D26] text-start shadow-[2px_2px_0_#001D26] transition-transform duration-500 [background:color-mix(in_srgb,#6546DE_4%,white)]"
                        style={{ ...ch1?.card0Padding, ...ch1?.card0MinH, ...ch1?.card0Gap }}
                        dir="rtl"
                    >
                        <div className="flex flex-col gap-1 self-stretch">
                            <h2 className="text-right font-bold leading-[1.1] tracking-[0.00735em] text-[#6546DE]" style={ch1?.cardTitleFont}>
                                {c0.title}
                            </h2>
                            <h3 className="text-right font-bold leading-[1.334] text-[#46319B]" style={ch1?.cardSubtitleFont}>
                                {c0.subtitle}
                            </h3>
                        </div>
                        <p
                            className="text-right font-normal leading-[1.32] tracking-[0.009375em] text-[#001D26] whitespace-pre-line"
                            style={ch1?.cardBodyFont}
                            dir="rtl"
                        >
                            {c0.text}
                        </p>
                    </div>
                </div>
            ) : null}

            {/* Card 1 — Figma 106:3146 */}
            {c1 ? (
                <div id="ch1-history" className="relative z-[11] w-full shrink-0">
                    <div
                        className="flex h-auto w-full shrink-0 flex-col rounded-[24px] border-[1.5px] border-[#001D26] text-right shadow-[2px_2px_0_#001D26] [background:color-mix(in_srgb,#6546DE_4%,white)]"
                        style={{ ...ch1?.cardPadding, ...ch1?.cardMinH, ...ch1?.cardGap }}
                        dir="rtl"
                    >
                        <div className="flex flex-col gap-1 self-stretch">
                            <h2 className="text-right font-bold leading-[1.1] tracking-[0.00735em] text-[#6546DE]" style={ch1?.cardTitleFont}>
                                {c1.title}
                            </h2>
                        </div>
                        <div className="flex flex-col self-stretch" style={ch1?.cardSectionGap}>
                            <div className="flex w-full flex-col items-stretch self-stretch" style={ch1?.cardSectionGap}>
                                <div className="flex w-full flex-row items-center justify-start" style={ch1?.cardSectionGap}>
                                    <h3
                                        ref={stickyReleaseRef}
                                        id="chapter1-sticky-release"
                                        className="text-right font-bold leading-[1.334] text-[#46319B]"
                                        style={ch1?.cardSubtitleFont}
                                    >
                                        {c1.sec1Title}
                                    </h3>
                                    <Chapter1ArrowPill direction="left" ch1={ch1} />
                                </div>
                                <p className="self-start text-right font-normal leading-[1.32] tracking-[0.009375em] text-[#001D26] whitespace-pre-line" style={{ ...ch1?.cardBodyFont, ...ch1?.cardBodyMaxW }}>
                                    {c1.sec1Text}
                                </p>
                            </div>
                            <div id="ch1-future" className="flex w-full flex-row items-start justify-start self-stretch" style={ch1?.cardSectionGap}>
                                <Chapter1ArrowPill direction="right" ch1={ch1} />
                                <div className="flex min-w-0 flex-1 flex-col gap-2">
                                    <h3 className="text-right font-bold leading-[1.334] text-[#46319B]" style={ch1?.cardSubtitleFont}>
                                        {c1.sec2Title}
                                    </h3>
                                    <p className="text-right font-normal leading-[1.32] tracking-[0.009375em] text-[#001D26] whitespace-pre-line" style={ch1?.cardBodyFont}>
                                        {c1.sec2Text}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
}
