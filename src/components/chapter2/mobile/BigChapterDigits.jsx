import React from 'react';

/** Large decorative chapter number + wave strokes (Figma 194:16733) */
export default function BigChapterDigits({ digits = '02', className = '', fixedSize = false, weightClass = 'font-black' }) {
    return (
        <div
            dir="ltr"
            className={`pointer-events-none relative z-[15] select-none pb-2 pl-1 font-[family-name:var(--font-salsa)] ${weightClass} leading-none ${className}`}
            style={{
                fontSize: fixedSize
                    ? 'var(--ch2-type-display-chapter)'
                    : 'clamp(2.5rem, 20vw, var(--ch2-type-display-chapter))',
            }}
            aria-hidden
        >
            <span className="relative inline-block text-[var(--ch2-text-purple)]">
                {digits}
                <svg
                    className="pointer-events-none absolute left-[-2%] top-[14%] h-[72%] w-[104%] text-[var(--ch2-text-red)]"
                    viewBox="0 0 100 44"
                    fill="none"
                    preserveAspectRatio="none"
                    aria-hidden
                >
                    <path
                        d="M0 7 Q16 3 34 7 T68 7 T100 7"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        vectorEffect="non-scaling-stroke"
                    />
                    <path
                        d="M0 22 Q20 17 38 22 T72 22 T100 22"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        vectorEffect="non-scaling-stroke"
                    />
                    <path
                        d="M0 37 Q16 33 34 37 T70 37 T100 37"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        vectorEffect="non-scaling-stroke"
                    />
                </svg>
            </span>
        </div>
    );
}
