import React from 'react';

/** תא גיל ברשת 2×2 — Section 2 (מאותה מסגרת Figma). */
export default function FigmaAgeRow({ label, age }) {
    return (
        <div className="ch2-mobile-age-cell">
            <div className="ch2-mobile-age-cell__inner">
                <span className="ch2-mobile-age-cell__label">{label}</span>
                <div className="ch2-mobile-age-cell__meta">
                    <span className="ch2-mobile-age-cell__badge">גילאי</span>
                    <span className="ch2-mobile-age-cell__range">{age}</span>
                </div>
            </div>
        </div>
    );
}
