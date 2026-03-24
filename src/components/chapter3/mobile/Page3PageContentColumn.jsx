import React from 'react';
import Page3HeroImageBlock from './Page3HeroImageBlock';
import Page3ResponsibilityCard from './Page3ResponsibilityCard';

export default function Page3PageContentColumn({ hero, responsibilities, chapterNumber }) {
    const cards = responsibilities ?? [];
    if (!hero?.image && cards.length === 0) return null;

    return (
        <section className="ch3-mobile__section ch3-pageContent">
            {hero?.image ? (
                <Page3HeroImageBlock
                    imageSrc={hero.image}
                    chapterNumber={chapterNumber}
                    alt={hero.titleBottom ? `תמונה — ${hero.titleBottom}` : 'פרק 3'}
                />
            ) : null}
            <div className="ch3-pageContent__cards">
                <div className="ch3-cardStack">
                    {cards.map((card, i) => (
                        <Page3ResponsibilityCard key={i} card={card} />
                    ))}
                </div>
            </div>
        </section>
    );
}
