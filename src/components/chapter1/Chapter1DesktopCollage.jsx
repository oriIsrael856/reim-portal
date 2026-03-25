import React from 'react';

export default function Chapter1DesktopCollage({ hero }) {
    if (!hero?.image1) return null;
    const W = 852;
    const H = 616;

    return (
        <div
            className="relative mx-auto mb-12 w-full max-w-[852px] overflow-visible md:mb-16"
            style={{ aspectRatio: `${W} / ${H}` }}
        >
            <div className="absolute inset-0">
                <div
                    className="absolute overflow-hidden rounded-[24px] border-[1.5px] border-[#001D26] shadow-[2px_2px_0_#001D26]"
                    style={{
                        left: 0,
                        top: 0,
                        width: `${(684 / W) * 100}%`,
                        height: `${(429 / H) * 100}%`,
                    }}
                >
                    <img src={hero.image1} alt="" className="h-full w-full object-cover" decoding="async" />
                </div>
                <div
                    className="absolute overflow-hidden rounded-[24px] border-[1.5px] border-[#001D26] shadow-[2px_2px_0_#001D26]"
                    style={{
                        left: `${(480 / W) * 100}%`,
                        top: `${(164 / H) * 100}%`,
                        width: `${(372.09 / W) * 100}%`,
                        height: `${(452.19 / H) * 100}%`,
                    }}
                >
                    <img src={hero.image2} alt="" className="h-full w-full object-cover" decoding="async" />
                </div>
                <div
                    className="pointer-events-none absolute select-none font-[family-name:var(--font-salsa)] font-normal leading-[1.28] text-[#6546DE]"
                    style={{
                        left: 0,
                        top: `${(440 / H) * 100}%`,
                        fontSize: 'clamp(3.5rem, 8vw, 7.5rem)',
                        letterSpacing: '0.00125em',
                    }}
                    aria-hidden
                >
                    01
                </div>
            </div>
        </div>
    );
}
