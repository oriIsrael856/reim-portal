import React from 'react';
import ChapterDigitSvg from '../../common/ChapterDigitSvg';

/** Figma `253:8650` — photo with gradient overlay, deco ring, and chapter digit glyph. */
export default function Page3HeroImageBlock({ imageSrc, alt }) {
    if (!imageSrc) return null;

    return (
        <div className="ch3-heroImage">
            <div className="ch3-heroImage__photoWrap">
                <div className="ch3-heroImage__frame">
                    <img src={imageSrc} alt={alt} loading="lazy" decoding="async" />
                    <div className="ch3-heroImage__gradient" aria-hidden />
                </div>
            </div>
            <div className="ch3-heroImage__deco" aria-hidden />
            <div className="ch3-heroImage__badge">
                <ChapterDigitSvg digits="03" className="ch3-heroImage__digits z-[4] w-[clamp(80px,18vw,130px)]" />
            </div>
        </div>
    );
}
