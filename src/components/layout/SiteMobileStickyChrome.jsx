import React from 'react';
import { LogOut, X } from 'lucide-react';
import Chapter2MobileTopBarPill from '../chapter2/mobile/Chapter2MobileTopBarPill';

const iconPurple = { width: 22, height: 22 };
const iconClose = { width: 22, height: 22 };

const MENU_ICON_FIGMA_SRC = '/assets/chapter2/menu-icon-figma.png';

/** Sticky mobile chrome: purple bar, Figma menu chip, logo pill. Site-wide on mobile. */
export default function SiteMobileStickyChrome({
    isMenuOpen,
    onMenuClick,
    screenTitle,
    onExitClick,
    logoUrl,
    onLogoClick,
}) {
    return (
        <header className="ch2-mobile-sticky-chrome md:hidden">
            <div className="ch2-mobile-sticky-chrome__stack">
                <div className="ch2-mobile-sticky-chrome__purple">
                    <div className="ch2-mobile-sticky-chrome__purple-inner">
                        <div className="ch2-mobile-sticky-chrome__chrome-top-row">
                            <span className="ch2-mobile-sticky-chrome__title">{screenTitle}</span>
                            <button
                                type="button"
                                className="ch2-mobile-menu-icon-btn"
                                onClick={onExitClick}
                                aria-label="יציאה לפרק הקודם או לדף הבית"
                            >
                                <LogOut style={iconPurple} strokeWidth={2.25} aria-hidden />
                            </button>
                        </div>
                        <div className="ch2-mobile-sticky-chrome__menu-row">
                            <div
                                className={`ch2-mobile-menu-frame${isMenuOpen ? ' ch2-mobile-menu-frame--open' : ''}`}
                            >
                                <button
                                    type="button"
                                    className="ch2-mobile-menu-frame__btn"
                                    onClick={onMenuClick}
                                    aria-expanded={isMenuOpen}
                                    aria-label={isMenuOpen ? 'סגירת תפריט' : 'תפריט'}
                                >
                                    {isMenuOpen ? (
                                        <X
                                            style={iconClose}
                                            strokeWidth={2.5}
                                            className="text-[#001d26]"
                                            aria-hidden
                                        />
                                    ) : (
                                        <img
                                            src={MENU_ICON_FIGMA_SRC}
                                            alt=""
                                            className="ch2-mobile-menu-frame__icon"
                                            width={84}
                                            height={48}
                                            decoding="async"
                                        />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {!isMenuOpen ? (
                    <div className="ch2-mobile-sticky-chrome__header-band">
                        <Chapter2MobileTopBarPill
                            logoUrl={logoUrl}
                            onLogoClick={onLogoClick}
                            variant="sticky"
                            figma16482
                        />
                    </div>
                ) : null}
            </div>
        </header>
    );
}
