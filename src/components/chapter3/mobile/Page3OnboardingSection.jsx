import React from 'react';
import Page3OnboardingStepCard from './Page3OnboardingStepCard';
import Page3StepConnector from './Page3StepConnector';

export default function Page3OnboardingSection({ onboarding }) {
    if (!onboarding?.steps?.length) return null;
    const { titleTop, titleBottom, titleBottomAccent, description, steps } = onboarding;

    /* Figma 253:8822 — split titleBottom so the accent suffix renders in brand purple. */
    const accent = typeof titleBottomAccent === 'string' ? titleBottomAccent.trim() : '';
    const fullTitle = titleBottom ?? '';
    const accentIdx = accent && fullTitle.endsWith(accent) ? fullTitle.length - accent.length : -1;
    const titleHead = accentIdx > 0 ? fullTitle.slice(0, accentIdx) : fullTitle;
    const titleAccent = accentIdx > 0 ? fullTitle.slice(accentIdx) : '';

    return (
        <section className="ch3-mobile__section ch3-onboard" aria-labelledby="ch3-onboard-title">
            <div className="ch3-onboard__blob" aria-hidden />
            {/* Figma 253:8818 Container — gap 24 between header frame and intro; gap 80 to Steps (section flex) */}
            <div className="ch3-onboard__introColumn">
                <div className="ch3-onboard__headerFrame">
                    <p className="ch3-onboard__kicker">{titleTop}</p>
                    <h2 id="ch3-onboard-title" className="ch3-onboard__title">
                        {titleHead}
                        {titleAccent ? <span className="ch3-onboard__titleAccent">{titleAccent}</span> : null}
                    </h2>
                </div>
                <p className="ch3-onboard__intro">{description}</p>
            </div>
            <div className="ch3-onboard__goals">
                <div className="ch3-onboard__steps">
                    {steps.map((step, index) => (
                        <React.Fragment key={step.id ?? index}>
                            <Page3OnboardingStepCard step={step} isLast={index === steps.length - 1} />
                            {index < steps.length - 1 ? <Page3StepConnector /> : null}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </section>
    );
}
