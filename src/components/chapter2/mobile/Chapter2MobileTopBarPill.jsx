import React from 'react';

export default function Chapter2MobileTopBarPill({ logoUrl, onLogoClick, variant, figma16482 }) {
    const classes = [
        'ch2-mobile-top-bar-pill',
        variant === 'sticky' ? 'ch2-mobile-top-bar-pill--sticky' : '',
        figma16482 ? 'ch2-mobile-top-bar-pill--figma-16482' : '',
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <div className={classes}>
            <button
                type="button"
                className="ch2-mobile-top-bar-pill__btn"
                onClick={onLogoClick}
                aria-label="דף הבית - רעים"
            >
                <img
                    src={logoUrl || '/Logo (1).png'}
                    alt="רעים"
                    className="ch2-mobile-top-bar-pill__logo"
                    onError={(e) => {
                        e.target.style.display = 'none';
                    }}
                />
            </button>
        </div>
    );
}
