import React from 'react';
import {
    REIM_GPT_ACTIVITY_AGENT_URL,
    REIM_GPT_ACTIVITY_AGENT_LABEL,
    REIM_GPT_MARK_SRC,
    REIM_LIBRARY_SYSTEM_URL,
} from '../../../config/reimGptAssistant';

export default function Chapter2MobileTopBarPill({
    logoUrl,
    onLogoClick,
    variant,
    figma16482,
    /** טקסט כפתור הרכזייה — בתוך גלולית הלוגו (כרום דביק). */
    libraryCtaText,
}) {
    const showShelf =
        Boolean(libraryCtaText?.trim()) && variant === 'sticky' && figma16482;

    const classes = [
        'ch2-mobile-top-bar-pill',
        variant === 'sticky' ? 'ch2-mobile-top-bar-pill--sticky' : '',
        figma16482 ? 'ch2-mobile-top-bar-pill--figma-16482' : '',
        showShelf ? 'ch2-mobile-top-bar-pill--with-shelf-ctas' : '',
    ]
        .filter(Boolean)
        .join(' ');

    if (showShelf) {
        return (
            <div className={classes}>
                <div className="ch2-mobile-top-bar-pill__rack">
                    <button
                        type="button"
                        className="ch2-mobile-top-bar-pill__logo-btn"
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
                    <div className="ch2-mobile-top-bar-pill__rack-ctas">
                        <a
                            href={REIM_LIBRARY_SYSTEM_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ch2-mobile-top-bar-pill__mini-cta"
                            aria-label="מעבר לרכזייה – מערכת רעים"
                        >
                            <span className="ch2-mobile-top-bar-pill__mini-cta-text">{libraryCtaText.trim()}</span>
                        </a>
                        <a
                            href={REIM_GPT_ACTIVITY_AGENT_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ch2-mobile-top-bar-pill__gpt-chip"
                            aria-label={REIM_GPT_ACTIVITY_AGENT_LABEL}
                        >
                            <img
                                src={REIM_GPT_MARK_SRC}
                                alt=""
                                width={18}
                                height={18}
                                className="ch2-mobile-top-bar-pill__gpt-chip-img"
                                aria-hidden
                            />
                        </a>
                    </div>
                </div>
            </div>
        );
    }

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
