import React from 'react';

/**
 * CommitteeStepCard — Figma 125:2463 / 2502 / 2511 / 2520
 *
 * Desktop-only step card used in the "הועדות" purple block (Section 2, node 125:2392).
 * Receives a `step` prop with shape: { id: string, title: string, desc: string }.
 *
 * Sizing: flex-1 (flex: 1 1 0%) — all cards grow and shrink equally from a shared zero basis,
 * guaranteeing identical widths regardless of title length.
 * Badge: absolutely centred via left-1/2 + -translate-x-1/2 (direction-agnostic).
 * leading-[0] on the badge text wrapper collapses its line-box so the Salsa numeral
 * sits precisely at the vertical centre of the 32px circle (Figma rendering technique).
 */
export default function CommitteeStepCard({ step }) {
    if (!step) return null;
    const id = step.id ?? '';
    const title = step.title ?? '';
    const desc = step.desc ?? '';

    return (
        <div
            className="relative flex flex-1 flex-col items-center justify-center gap-[8px] rounded-[8px] border-[1.5px] border-[#001d26] px-[16px] pb-[24px] pt-[32px] shadow-[2px_2px_0px_0px_#001d26]"
            style={{
                backgroundImage:
                    'linear-gradient(90deg, rgba(188, 224, 121, 0.08) 0%, rgba(188, 224, 121, 0.08) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)',
            }}
        >
            {/* Title — Figma 125:2466: 20px semibold */}
            <p className="relative shrink-0 text-center text-[20px] font-semibold leading-[1.28] tracking-[0.15px] text-[#001d26]">
                {title}
            </p>

            {/* Desc — Figma 125:2469: 16px regular, min-w-full centers text within card */}
            <p className="relative shrink-0 w-full text-center text-[16px] font-normal leading-[1.32] tracking-[0.15px] text-[#001d26]">
                {desc}
            </p>

            {/* Badge chip — Figma 125:2480 / 2505 / 2514 / 2523
                top: -22.5px centres chip vertically on card's top edge (chip h=42) */}
            <div className="absolute left-1/2 top-[-22.5px] -translate-x-1/2 flex h-[42px] items-center rounded-[48px] border-[1.5px] border-[#001d26] bg-[#bce079] px-[6px] shadow-[2px_2px_0px_0px_#001d26]">
                {/* Inner circle — Figma: no background fill, transparent inside chip */}
                <div className="flex shrink-0 size-[32px] flex-col items-center justify-center rounded-[200px]">
                    <div className="flex w-full flex-col justify-center text-center not-italic leading-[0] font-['Salsa'] text-[16px] tracking-[0.15px] text-[#001d26]">
                        <p className="leading-[1.28]">{id}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
