import React from 'react';

/** Figma 202:10011 — Title block: Typography/H5 + lime accent bar (183×8). */
export default function Chapter2MobilePart7({ whyTogether }) {
    if (!whyTogether?.title) return null;

    return (
        <header className="ch2-mobile-why-lead">
            <div className="ch2-mobile-why-lead__lime-bar" aria-hidden />
            <h2 className="ch2-mobile-why-lead__title">{whyTogether.title}</h2>
        </header>
    );
}
