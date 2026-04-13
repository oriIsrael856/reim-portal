import React from 'react';
import Page4FaqAccordion from './Page4FaqAccordion';

/** Figma 254:12236 */
export default function Page4CommitteesFaqSection({ committees, qa }) {
    const steps = [...(committees?.steps ?? [])].reverse();

    if (!committees && !(qa?.length)) return null;

    return (
        <section id="ch4-committees" className="ch4-mobile__section ch4-cf" aria-labelledby="ch4-committees-title">
            {committees ? (
                <>
                    <div className="ch4-cf__purple">
                        <h2 id="ch4-committees-title" className="ch4-cf__purpleTitle">
                            {committees.title}
                        </h2>
                        {committees.intro ? <p className="ch4-cf__purpleIntro">{committees.intro}</p> : null}
                        <p className="ch4-cf__stepsLabel">שלבי התהליך:</p>
                        <div className="ch4-cf__steps">
                            {steps.map((s) => (
                                <div key={s.id} className="ch4-cf__step">
                                    <div className="ch4-cf__chip" aria-hidden>
                                        <span className="ch4-cf__chipNum">{s.id}</span>
                                    </div>
                                    <h3 className="ch4-cf__stepTitle">{s.title}</h3>
                                    <p className="ch4-cf__stepBody">{s.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    {committees.footer ? <p className="ch4-cf__footer">{committees.footer}</p> : null}
                </>
            ) : null}

            {qa?.length ? (
                <>
                    <div className="ch4-cf__faqHead">
                        <p className="ch4-cf__faqKicker">כל מה שרצית לשאול</p>
                        <h2 className="ch4-cf__faqTitle">שאלות ותשובות</h2>
                    </div>
                    <div className="ch4-faq">
                        <Page4FaqAccordion items={qa} />
                    </div>
                </>
            ) : null}
        </section>
    );
}
