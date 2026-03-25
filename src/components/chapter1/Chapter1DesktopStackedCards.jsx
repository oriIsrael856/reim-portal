import React from 'react';
import { ArrowLeft } from 'lucide-react';
import StickyCard from '../common/StickyCard';

function Chapter1ArrowPill({ direction = 'left' }) {
    return (
        <div
            className="flex h-8 w-[60px] shrink-0 items-center justify-center rounded-[32px] border border-[#001D26] bg-[#BCE079] px-1.5"
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

const card2Shell =
    'flex h-[600px] min-h-0 w-full shrink-0 flex-col gap-6 rounded-[24px] border-[1.5px] border-[#001D26] text-start shadow-[2px_2px_0_#001D26] [background:color-mix(in_srgb,#6546DE_4%,white)] pt-10 pb-10 ps-[60px] pe-[80px]';

/**
 * Figma 106:3100 — first program card is viewport-sticky; second card stays in normal flow so it stays visible (stacked sticky was easy to hide behind card 1 / narrow shell).
 */
export default function Chapter1DesktopStackedCards({ data }) {
    const c0 = data?.cards?.[0];
    const c1 = data?.cards?.[1];

    /* Clear fixed header (~132px) so first card can stick to the viewport. */
    const STICKY_TOP_FIRST = '132px';

    return (
        <div className="flex w-full min-w-0 flex-col gap-24 pb-32">
            {c0 ? (
                <StickyCard top={STICKY_TOP_FIRST} programCard>
                    <div className="flex flex-col gap-1 self-stretch" dir="rtl">
                        <h2 className="text-right text-[34px] font-bold leading-[1.1] tracking-[0.00735em] text-[#6546DE]">
                            {c0.title}
                        </h2>
                        <h3 className="text-right text-2xl font-bold leading-[1.334] text-[#46319B]">
                            {c0.subtitle}
                        </h3>
                    </div>
                    <p
                        className="min-h-0 flex-1 overflow-y-auto text-right text-base font-normal leading-[1.32] tracking-[0.009375em] text-[#001D26] whitespace-pre-line"
                        dir="rtl"
                    >
                        {c0.text}
                    </p>
                </StickyCard>
            ) : null}

            {c1 ? (
                <div className="relative z-[11] w-full shrink-0">
                    <div className={card2Shell}>
                        <div className="flex flex-col gap-1 self-stretch" dir="rtl">
                            <h2 className="text-right text-[34px] font-bold leading-[1.1] tracking-[0.00735em] text-[#6546DE]">
                                {c1.title}
                            </h2>
                        </div>
                        <div className="flex min-h-0 flex-1 flex-col gap-3 self-stretch overflow-y-auto" dir="rtl">
                            <div className="flex flex-col items-end gap-3 self-stretch">
                                <div className="flex max-w-full flex-row items-center justify-end gap-3">
                                    <h3 className="text-right text-2xl font-bold leading-[1.334] text-[#46319B]">
                                        {c1.sec1Title}
                                    </h3>
                                    <Chapter1ArrowPill direction="left" />
                                </div>
                                <p className="w-full max-w-[712px] text-right text-base font-normal leading-[1.32] tracking-[0.009375em] text-[#001D26] whitespace-pre-line">
                                    {c1.sec1Text}
                                </p>
                            </div>
                            <div className="flex flex-row items-start justify-end gap-3 self-stretch">
                                <div className="flex min-w-0 flex-1 flex-col gap-2">
                                    <h3 className="text-right text-2xl font-bold leading-[1.334] text-[#46319B]">
                                        {c1.sec2Title}
                                    </h3>
                                    <p className="text-right text-base font-normal leading-[1.32] tracking-[0.009375em] text-[#001D26] whitespace-pre-line">
                                        {c1.sec2Text}
                                    </p>
                                </div>
                                <Chapter1ArrowPill direction="right" />
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
}
