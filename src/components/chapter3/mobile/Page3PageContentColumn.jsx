import React from 'react';
import Page3HeroImageBlock from './Page3HeroImageBlock';
import Page3ResponsibilityCard from './Page3ResponsibilityCard';

export default function Page3PageContentColumn({ hero, responsibilities }) {
    const cards = responsibilities ?? [];
    if (!hero?.image && cards.length === 0) return null;

    return (
        <section className="ch3-mobile__section ch3-pageContent">
            {hero?.image ? (
                <Page3HeroImageBlock
                    imageSrc={hero.image}
                    alt={hero.titleBottom ? `תמונה — ${hero.titleBottom}` : 'פרק 3'}
                />
            ) : null}
            <div className="ch3-pageContent__cards">
                <div className="ch3-respStickyRegion">
                    <div className="ch3-respStickyStack">
                        {cards.map((card, i) => (
                            <div
                                key={i}
                                className="ch3-respStickySlot"
                                style={{ '--ch3-resp-sticky-index': String(i) }}
                            >
                                <Page3ResponsibilityCard card={card} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
