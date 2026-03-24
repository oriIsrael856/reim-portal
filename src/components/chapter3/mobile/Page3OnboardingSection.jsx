import React from 'react';
import Page3OnboardingStepCard from './Page3OnboardingStepCard';
import Page3StepConnector from './Page3StepConnector';

export default function Page3OnboardingSection({ onboarding }) {
    if (!onboarding?.steps?.length) return null;
    const { titleTop, titleBottom, description, steps } = onboarding;

    return (
        <section className="ch3-mobile__section ch3-onboard" aria-labelledby="ch3-onboard-title">
            <div className="ch3-onboard__blob" aria-hidden />
            {/* Figma 253:8818 Container — gap 24 between header frame and intro; gap 80 to Steps (section flex) */}
            <div className="ch3-onboard__introColumn">
                <div className="ch3-onboard__headerFrame">
                    <div className="ch3-onboard__accentLine" aria-hidden />
                    <p className="ch3-onboard__kicker">{titleTop}</p>
                    <h2 id="ch3-onboard-title" className="ch3-onboard__title">
                        {titleBottom}
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
