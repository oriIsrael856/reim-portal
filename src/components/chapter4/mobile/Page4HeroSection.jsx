import React from 'react';
import BigChapterDigits from '../../chapter2/mobile/BigChapterDigits';
import { CH4_ASSETS, featureStripIconSrc } from '../chapter4Assets';

const STRIP_ORDER_IDS = ['03', '02', '01'];

function anchorForFeature(f) {
    if (f.id === '01') return '#ch4-nativ';
    if (f.id === '02') return '#ch4-committees';
    return '#ch4-files';
}

/** Figma Section 1 (254:10552) */
export default function Page4HeroSection({ hero, chapterNumber, features }) {
    if (!hero) return null;

    const list = features?.length
        ? STRIP_ORDER_IDS.map((id) => features.find((feat) => feat.id === id)).filter(Boolean)
        : [];

    return (
        <section className="ch4-mobile__section ch4-s1" aria-labelledby="ch4-hero-title">
            <div className="ch4-s1__blobs" aria-hidden>
                <div className="ch4-s1__blob ch4-s1__blob--purple" />
                <div className="ch4-s1__blob ch4-s1__blob--orange" />
            </div>
            <div className="ch4-s1__hero">
                <img src={CH4_ASSETS.heroDecoA} alt="" className="ch4-s1__decoStar ch4-s1__decoStar--a" aria-hidden />
                <img src={CH4_ASSETS.heroDecoB} alt="" className="ch4-s1__decoStar ch4-s1__decoStar--b" aria-hidden />
                <div className="ch4-s1__heroCol">
                    <div className="ch4-s1__chapterLabel">
                        <span className="ch4-s1__chapterLabelText">{hero.tag}</span>
                        <span className="ch4-s1__chapterLabelNum">{chapterNumber}</span>
                    </div>
                    <h1 id="ch4-hero-title" className="ch4-s1__title">
                        {hero.title}
                    </h1>
                    <span className="ch4-s1__yellowRule" aria-hidden />
                </div>
                {list.length > 0 ? (
                    <div className="ch4-s1__cardsTrack">
                        {list.map((f) => (
                            <a key={f.id} href={anchorForFeature(f)} className="ch4-featureCard">
                                <span className="ch4-featureCard__corner" aria-hidden>
                                    <img src={CH4_ASSETS.featureCorner} alt="" width={36} height={36} />
                                </span>
                                <div className="ch4-featureCard__iconTop">
                                    <img
                                        src={featureStripIconSrc(f.id)}
                                        alt=""
                                        width={32}
                                        height={32}
                                        className="ch4-featureCard__iconImg"
                                    />
                                </div>
                                <div className="ch4-featureCard__body">
                                    <h2 className="ch4-featureCard__title">{f.title}</h2>
                                    <p className="ch4-featureCard__desc">{f.desc}</p>
                                </div>
                            </a>
                        ))}
                    </div>
                ) : null}
                <div className="ch4-s1__digits">
                    <div className="ch4-s1__digitsInner">
                        <BigChapterDigits digits={chapterNumber} fixedSize className="font-black" />
                    </div>
                </div>
            </div>
        </section>
    );
}
