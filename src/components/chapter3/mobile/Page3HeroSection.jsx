import React from 'react';
import { Star } from 'lucide-react';

/**
 * Figma Section 1 — hero copy from CMS (`data.hero`), tokens from chapter3-mobile.css
 */
export default function Page3HeroSection({ hero, chapterNumber }) {
    if (!hero) return null;

    return (
        <section className="ch3-mobile__section ch3-s1" aria-labelledby="ch3-hero-title">
            <div className="ch3-s1__blobs" aria-hidden>
                <div className="ch3-s1__blob ch3-s1__blob--green" />
                <div className="ch3-s1__blob ch3-s1__blob--orange" />
            </div>
            <div className="ch3-s1__hero">
                <div className="ch3-s1__heroText">
                    <div className="ch3-chapterLabel">
                        <span className="ch3-chapterLabel__text">{hero.tag}</span>
                        <span className="ch3-chapterLabel__num">{chapterNumber}</span>
                    </div>
                    <h1 id="ch3-hero-title" className="ch3-s1__title">
                        {hero.titleTop}
                    </h1>
                    <h2 className="ch3-s1__title ch3-s1__title--secondary">
                        <span className="ch3-s1__titleBottom">{hero.titleBottom}</span>
                        <Star className="ch3-s1__star" size={21} strokeWidth={1.5} aria-hidden />
                    </h2>
                    <p className="ch3-s1__desc">{hero.description}</p>
                </div>
            </div>
        </section>
    );
}
