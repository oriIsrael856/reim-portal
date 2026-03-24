import React from 'react';
import { ArrowLeft } from 'lucide-react';

/** Section 4 — mobile (Figma 202:3379): תמונה + מידע על הקבוצות — ראו קובץ תוכנית רעים בפיגמה */
export default function Chapter2MobileGroupsIntro({ groupsIntro }) {
    if (!groupsIntro) return null;

    const { subheading, title, intro, populations, description, image } = groupsIntro;

    return (
        <section
            className="ch2-mobile-section4"
            aria-labelledby="ch2-mobile-groups-intro-title"
        >
            <div className="ch2-mobile-section4__image-wrap">
                <img
                    src={image}
                    alt=""
                    className="ch2-mobile-section4__image"
                    loading="lazy"
                />
            </div>

            <div className="ch2-mobile-section4__group">
                <header className="ch2-mobile-section4__heading">
                    {subheading ? (
                        <p className="ch2-mobile-section4__subheading">{subheading}</p>
                    ) : null}
                    <h2 id="ch2-mobile-groups-intro-title" className="ch2-mobile-section4__title">
                        {title}
                    </h2>
                </header>

                <div className="ch2-mobile-section4__body">
                    {intro ? <p className="ch2-mobile-section4__lead">{intro}</p> : null}

                    {populations?.length ? (
                        <ul className="ch2-mobile-section4__pops">
                            {populations.map((pop) => (
                                <li key={pop.id} className="ch2-mobile-section4__item">
                                    {/*
                                      Figma Frame 12 (שורה): טקסט ואז מספר. באתר dir=rtl מספר מימין לטקסט
                                      ⇒ item-id לפני item-label ב-DOM (ראו CLAUDE.md — Figma layer order / RTL)
                                    */}
                                    <div className="ch2-mobile-section4__item-text">
                                        <span className="ch2-mobile-section4__item-id" dir="ltr">
                                            {pop.id}
                                        </span>
                                        <span className="ch2-mobile-section4__item-label">{pop.text}</span>
                                    </div>
                                    <div className="ch2-mobile-section4__icon" aria-hidden>
                                        <ArrowLeft size={16} strokeWidth={2.25} className="text-[var(--ch2-text-purple)]" />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : null}

                    {description ? (
                        <p className="ch2-mobile-section4__description">{description}</p>
                    ) : null}
                </div>
            </div>
        </section>
    );
}
