import React from 'react';

/**
 * Figma 36:1025 — Image frame 38:978 (height 500, ref width 1445 for % math).
 * LTR coordinate box: do not mirror for RTL — matches Figma x/y as authored.
 */
const REF = { w: 1445, h: 500 };

const toPct = (x, y, w, h) => ({
    left: `${(x / REF.w) * 100}%`,
    top: `${(y / REF.h) * 100}%`,
    width: `${(w / REF.w) * 100}%`,
    height: `${(h / REF.h) * 100}%`,
});

const PHOTO_LAYERS = [
    { key: 'farRight', z: 2, rotate: 4, ...toPct(1103.34, 71, 327.17, 419.95) },
    { key: 'leftSquare', z: 3, rotate: -6, ...toPct(-14.86, 115.64, 329.72, 329.72) },
    { key: 'centerSquare', z: 4, rotate: 4, ...toPct(832, 121, 320.2, 320.2) },
    { key: 'centerLeftTall', z: 5, rotate: 6, ...toPct(247.37, 67, 340.17, 429.17) },
    { key: 'centerRightTall', z: 6, rotate: -6, ...toPct(536, 66.64, 340.17, 429.17) },
];

const DECO_DOTS = [
    { left: 903, top: 452, size: 12, fill: '#C4213B', z: 8 },
    { left: 1322, top: 7, size: 9, fill: '#BCE079', z: 8 },
    { left: 180, top: 24, size: 11, fill: '#C4213B', z: 8 },
    { left: 139, top: 61, size: 8, fill: '#BCE079', z: 8 },
];

const frameClass =
    'absolute overflow-hidden rounded-[var(--home-desktop-hero-photo-radius)] border-[1.5px] border-[#001D26] shadow-[2px_2px_0_0_#001D26] bg-white';

const DEFAULT_SOURCES = {
    farRight: '/assets/desktop/home/reim-desktop-hero-photo-stack-far-right-441733.png',
    leftSquare: '/assets/desktop/home/reim-desktop-hero-photo-left-square-7cb686.png',
    centerSquare: '/assets/desktop/home/reim-desktop-hero-photo-center-square-1916d4.png',
    centerLeftTall: '/assets/desktop/home/reim-desktop-hero-photo-center-left-tall-1d62ac.png',
    centerRightTall: '/assets/desktop/home/reim-desktop-hero-photo-center-right-tall-4fa4c2.png',
};

export default function HomeHeroDesktopCollage({ sources = {} }) {
    const merged = { ...DEFAULT_SOURCES, ...sources };

    return (
        <div
            className="relative mx-auto w-full overflow-x-visible"
            style={{ maxWidth: 'var(--home-desktop-collage-max-w)', height: 'var(--home-desktop-hero-collage-h)' }}
            dir="ltr"
        >
            {PHOTO_LAYERS.map(({ key, z, rotate, left, top, width, height }) => {
                const url = merged[key];
                if (!url) return null;
                return (
                    <div key={key} className={frameClass} style={{ left, top, width, height, zIndex: z, transform: `rotate(${rotate}deg)` }}>
                        <img src={url} alt="" className="h-full w-full object-cover" loading="lazy" decoding="async" />
                    </div>
                );
            })}

            {DECO_DOTS.map((d, i) => (
                <div
                    key={i}
                    className="pointer-events-none absolute rounded-full"
                    style={{
                        left: `${(d.left / REF.w) * 100}%`,
                        top: `${(d.top / REF.h) * 100}%`,
                        width: d.size,
                        height: d.size,
                        backgroundColor: d.fill,
                        zIndex: d.z,
                    }}
                />
            ))}

            {/* Figma 38:999 Star — same asset as mobile hero deco */}
            <img
                src="/assets/home/home-hero-star-deco.svg"
                alt=""
                className="pointer-events-none absolute"
                style={{
                    left: `${(203 / REF.w) * 100}%`,
                    top: `${(28 / REF.h) * 100}%`,
                    width: `${(65.22 / REF.w) * 100}%`,
                    height: 'auto',
                    maxWidth: 66,
                    zIndex: 12,
                }}
            />

            {/* Figma 38:1005 Plane 1 — small; reuse plane SVG, Figma stroke 4px */}
            <img
                src="/assets/home/home-hero-plane-2.svg"
                alt=""
                className="pointer-events-none absolute"
                style={{
                    left: `${(966 / REF.w) * 100}%`,
                    top: `${(12 / REF.h) * 100}%`,
                    width: `${(63.27 / REF.w) * 100}%`,
                    maxWidth: 64,
                    height: 'auto',
                    zIndex: 12,
                }}
            />
        </div>
    );
}
