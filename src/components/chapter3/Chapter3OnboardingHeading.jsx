import React from 'react';

/**
 * Kicker + main title for Chapter 3 onboarding. Green bar sits under the accent word (e.g. "מתחילה").
 */
export function Chapter3OnboardingHeading({
    id,
    titleTop,
    titleBottom,
    titleBottomAccent,
    frameClassName,
    kickerClassName = 'ch3-onboard__kicker',
    titleClassName = '',
}) {
    const full = titleBottom ?? '';
    const accent = (titleBottomAccent ?? '').trim();
    const split = Boolean(accent && full.endsWith(accent));

    return (
        <div className={frameClassName}>
            <p className={kickerClassName}>{titleTop}</p>
            <h2 id={id} className={`ch3-onboard__title ${titleClassName}`.trim()}>
                {split ? (
                    <>
                        <span className="ch3-onboard__titleBeforeAccent">{full.slice(0, full.length - accent.length)}</span>
                        <span className="ch3-onboard__accentWord">
                            <span className="ch3-onboard__titleAccent">{accent}</span>
                            <span className="ch3-onboard__accentBar" aria-hidden />
                        </span>
                    </>
                ) : (
                    full
                )}
            </h2>
        </div>
    );
}
