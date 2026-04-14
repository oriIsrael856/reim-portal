import React from 'react';

/**
 * CommitteeStepCard — Figma 125:2463 / 2502 / 2511 / 2520
 *
 * Desktop-only step card used in the "הועדות" purple block (Section 2, node 125:2392).
 * Receives a `step` prop with shape: { id: string, title: string, desc: string }.
 *
 * Sizing: flex-1 — all cards grow and shrink equally from a shared zero basis,
 * guaranteeing identical widths regardless of title length.
 * Badge: absolutely centred via left-1/2 + -translate-x-1/2 (direction-agnostic).
 * `spacingStyle`: scaled padding/gap from parent useComponentStyle (Figma ratio vs viewport).
 * `ch4`: full registry-driven styles bundle for font sizes, badge proportions etc.
 */
export default function CommitteeStepCard({ step, spacingStyle, ch4 }) {
    if (!step) return null;
    const id = step.id ?? '';
    const title = step.title ?? '';
    const desc = step.desc ?? '';

    return (
        <div
            className="relative flex flex-1 flex-col items-center rounded-[8px] border-[1.5px] border-[#001d26] shadow-[2px_2px_0px_0px_#001d26]"
            style={{
                ...spacingStyle,
                backgroundImage:
                    'linear-gradient(90deg, rgba(188, 224, 121, 0.08) 0%, rgba(188, 224, 121, 0.08) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)',
            }}
        >
            {/* Title — Figma 125:2466: 20px Rubik SemiBold */}
            <p
                className="relative shrink-0 text-center font-semibold leading-[1.28] tracking-[0.15px] text-[#001d26]"
                style={ch4?.committeesStepTitleFont}
            >
                {title}
            </p>

            {/* Desc — Figma 125:2469: 16px Rubik Regular */}
            <p
                className="relative shrink-0 w-full text-center font-normal leading-[1.32] tracking-[0.15px] text-[#001d26]"
                style={ch4?.committeesStepDescFont}
            >
                {desc}
            </p>

            {/* Badge chip — Figma 125:2480: h-42 px-6 rounded-48 */}
            <div
                className="absolute left-1/2 top-[-22.5px] -translate-x-1/2 flex items-center rounded-[48px] border-[1.5px] border-[#001d26] bg-[#bce079] shadow-[2px_2px_0px_0px_#001d26]"
                style={ch4?.committeesStepBadge}
            >
                <div
                    className="flex shrink-0 flex-col items-center justify-center rounded-[200px]"
                    style={ch4?.committeesStepBadgeCircle}
                >
                    <div
                        className="flex w-full flex-col justify-center text-center not-italic leading-[0] font-['Salsa'] tracking-[0.15px] text-[#001d26]"
                        style={ch4?.committeesStepBadgeFont}
                    >
                        <p className="leading-[1.28]">{id}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
