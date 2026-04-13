import React from 'react';
import { LogOut } from 'lucide-react';
import Chapter2MobileTopBarPill from '../chapter2/mobile/Chapter2MobileTopBarPill';
import {
    MOBILE_MENU_TAB_UNION_SVG,
    MOBILE_MENU_CLOSE_SVG,
    MOBILE_MENU_HAMBURGER_SVG,
} from '../../config/mobileMenuFigmaAssets';
import { useMobileStickyChromeStyles } from '../../hooks/useMobileStickyChromeStyles';

/** Sticky mobile chrome — Figma 191:9787, ~½ scale; פרופורציות דרך useMobileStickyChromeStyles (כמו תפריט דסקטופ). */
export default function SiteMobileStickyChrome({
    isMenuOpen,
    onMenuClick,
    screenTitle,
    onExitClick,
    logoUrl,
    onLogoClick,
}) {
    const ch = useMobileStickyChromeStyles();
    const iconPurple = { width: ch.logoutIconPx, height: ch.logoutIconPx };

    return (
        <header id="reim-mobile-sticky-chrome" className="ch2-mobile-sticky-chrome lg:hidden">
            <div className="ch2-mobile-sticky-chrome__stack">
                <div id="reim-mobile-sticky-chrome-purple" className="ch2-mobile-sticky-chrome__purple">
                    <div
                        className="ch2-mobile-sticky-chrome__purple-inner pt-[max(4px,env(safe-area-inset-top,0px))] pb-0"
                        style={ch.purpleInnerStyle}
                    >
                        <div className="ch2-mobile-sticky-chrome__chrome-top-row" style={ch.chromeTopRowStyle}>
                            <span className="ch2-mobile-sticky-chrome__title" style={ch.titleStyle}>
                                {screenTitle}
                            </span>
                            <button
                                type="button"
                                className="ch2-mobile-menu-icon-btn"
                                style={ch.logoutBtnStyle}
                                onClick={onExitClick}
                                aria-label="יציאה לפרק הקודם או לדף הבית"
                            >
                                <LogOut style={iconPurple} strokeWidth={2.25} aria-hidden />
                            </button>
                        </div>
                        <div className="ch2-mobile-sticky-chrome__menu-row" style={ch.menuRowStyle}>
                            <div
                                className={`ch2-mobile-menu-frame${isMenuOpen ? ' ch2-mobile-menu-frame--open' : ''}`}
                                style={ch.menuFrameStyle}
                            >
                                <button
                                    type="button"
                                    className="ch2-mobile-menu-frame__btn"
                                    onClick={onMenuClick}
                                    aria-expanded={isMenuOpen}
                                    aria-label={isMenuOpen ? 'סגירת תפריט' : 'תפריט'}
                                >
                                    <span
                                        className="ch2-mobile-menu-frame__union-layer"
                                        style={ch.unionLayerStyle}
                                        aria-hidden
                                    >
                                        <img
                                            src={MOBILE_MENU_TAB_UNION_SVG}
                                            alt=""
                                            className="ch2-mobile-menu-frame__union-img"
                                            width={ch.unionImgW}
                                            height={ch.unionImgH}
                                            decoding="async"
                                        />
                                    </span>
                                    <span className="ch2-mobile-menu-frame__glyph" style={ch.glyphTrayStyle}>
                                        <img
                                            src={isMenuOpen ? MOBILE_MENU_CLOSE_SVG : MOBILE_MENU_HAMBURGER_SVG}
                                            alt=""
                                            className="ch2-mobile-menu-frame__glyph-img"
                                            width={ch.glyphImgPx}
                                            height={ch.glyphImgPx}
                                            decoding="async"
                                        />
                                    </span>
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
                ) : (
                    <div
                        className="ch2-mobile-sticky-chrome__header-band ch2-mobile-sticky-chrome__header-band--menu-spacer"
                        aria-hidden
                    />
                )}
            </div>
        </header>
    );
}
