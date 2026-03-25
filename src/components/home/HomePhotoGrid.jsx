import React from 'react';

/**
 * Figma Frame 8 (191:11486) — physical layout: [ square / wide | narrow ].
 * `dir="ltr"` keeps column 1 on the visual left and column 2 on the visual right under `dir=rtl` page.
 * Gap 16px, stroke 1.5px #001D26, radius 16px, shadow 2px 2px 0.
 */
const frameClass =
    'relative overflow-hidden rounded-2xl border-[1.5px] border-[#001D26] shadow-[2px_2px_0_0_#001D26]';

const HomePhotoGrid = ({ leftSrc, rightSrc, className = '' }) => {
    if (!leftSrc && !rightSrc) return null;

    return (
        <div className={`mb-[clamp(1rem,3vw,1.75rem)] mt-[clamp(0.5rem,2vw,1rem)] w-full ${className}`}>
            <div
                dir="ltr"
                className="grid w-full grid-cols-[minmax(0,1fr)_minmax(4.75rem,27%)] items-stretch md:grid-cols-[minmax(0,1fr)_minmax(200px,38%)]"
                style={{ gap: '16px' }}
            >
                {leftSrc ? (
                    <figure
                        className={`${frameClass} aspect-square min-h-0 w-full md:aspect-auto md:h-full md:min-h-[min(36vh,420px)]`}
                    >
                        <img
                            src={leftSrc}
                            alt=""
                            className="block h-full w-full object-cover object-center"
                            loading="lazy"
                        />
                    </figure>
                ) : null}

                {rightSrc ? (
                    <figure
                        className={`${frameClass} h-full min-h-0 w-full min-w-0 md:max-w-[360px]`}
                    >
                        <img
                            src={rightSrc}
                            alt=""
                            className="block h-full min-h-0 w-full object-cover object-center"
                            loading="lazy"
                        />
                    </figure>
                ) : null}
            </div>
        </div>
    );
};

export default HomePhotoGrid;
