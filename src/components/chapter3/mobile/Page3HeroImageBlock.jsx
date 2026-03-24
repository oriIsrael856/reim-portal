import React from 'react';
import { BigChapterDigits } from '../../chapter2/mobile';

/**
 * Figma `253:8650` Image — photo 311×600, gradient overlay, deco ring, chapter digits + red waves (same pattern as Ch.2 `BigChapterDigits`)
 */
export default function Page3HeroImageBlock({ imageSrc, chapterNumber, alt }) {
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
                <BigChapterDigits
                    digits={chapterNumber || '03'}
                    fixedSize
                    weightClass="font-normal"
                    className="ch3-heroImage__digits z-[4]"
                />
            </div>
        </div>
    );
}
