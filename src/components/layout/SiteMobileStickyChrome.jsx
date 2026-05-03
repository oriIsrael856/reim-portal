import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Home, ArrowLeft } from 'lucide-react';
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
    onBackClick,
    onHomeClick,
    logoUrl,
    onLogoClick,
}) {
    const ch = useMobileStickyChromeStyles();
    const iconPurple = { width: ch.logoutIconPx, height: ch.logoutIconPx };

    // Dynamic offset: shift menu-row so the hamburger Union SVG bottom
    // lands exactly on the top of the white outer main-surface (the card that wraps
    // site content). Per Figma: "קצה עליון של main = קצה תחתון של אייקון התפריט".
    const headerRef = useRef(null);
    const menuBtnRef = useRef(null);
    const unionImgRef = useRef(null);
    const [menuRowOffset, setMenuRowOffset] = useState(0);

    useLayoutEffect(() => {
        const computeOffset = () => {
            const header = headerRef.current;
            const menuBtn = menuBtnRef.current;
            const unionImg = unionImgRef.current;
            if (!header || !menuBtn || !unionImg) return;
            // Chrome is hidden at lg+ (`lg:hidden`); skip math (rects are 0, math diverges → React #185).
            if (header.offsetParent === null) return;
            // The white outer frame is a sibling of this <header> within .ch2-mobile-page.
            // Its top is where we want the Union SVG bottom to land.
            const mainSurface =
                header.parentElement?.querySelector('.ch2-mobile-main-surface') || null;
            if (!mainSurface) return;
            const mainTop = mainSurface.getBoundingClientRect().top;
            const btnBottom = menuBtn.getBoundingClientRect().bottom;
            const unionBottom = unionImg.getBoundingClientRect().bottom;
            // overhang below button box is invariant under transform.
            const overhang = unionBottom - btnBottom;
            // Natural (no-transform) btnBottom equals current btnBottom minus currentOffset;
            // natural unionBottom = naturalBtnBottom + overhang.
            // We want (natural unionBottom) + newOffset = mainTop  →
            //   newOffset = mainTop - naturalBtnBottom - overhang
            //             = mainTop - (btnBottom - currentOffset) - overhang
            const naturalBtnBottom = btnBottom - menuRowOffset;
            const needed = Math.round(mainTop - naturalBtnBottom - overhang);
            setMenuRowOffset((prev) => (prev === needed ? prev : needed));
        };
        computeOffset();
        window.addEventListener('resize', computeOffset, { passive: true });
        return () => {
            window.removeEventListener('resize', computeOffset);
        };
        // `menuRowOffset` deliberately NOT in deps — it's the effect's own output; including
        // it caused setState→effect→setState loops on viewports where the chrome is hidden.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMenuOpen]);

    // Also recompute after Union SVG load (dimensions may change).
    useEffect(() => {
        const img = unionImgRef.current;
        if (!img) return;
        const onLoad = () => {
            const header = headerRef.current;
            const menuBtn = menuBtnRef.current;
            if (!header || !menuBtn) return;
            if (header.offsetParent === null) return;
            const mainSurface =
                header.parentElement?.querySelector('.ch2-mobile-main-surface') || null;
            if (!mainSurface) return;
            const mainTop = mainSurface.getBoundingClientRect().top;
            const btnBottom = menuBtn.getBoundingClientRect().bottom;
            const unionBottom = img.getBoundingClientRect().bottom;
            const overhang = unionBottom - btnBottom;
            const naturalBtnBottom = btnBottom - menuRowOffset;
            const needed = Math.round(mainTop - naturalBtnBottom - overhang);
            setMenuRowOffset((prev) => (prev === needed ? prev : needed));
        };
        if (img.complete) onLoad();
        else img.addEventListener('load', onLoad, { once: true });
        return () => img.removeEventListener('load', onLoad);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMenuOpen]);

    return (
        <header
            id="reim-mobile-sticky-chrome"
            className="ch2-mobile-sticky-chrome lg:hidden"
            ref={headerRef}
        >
            <div className="ch2-mobile-sticky-chrome__stack">
                <div
                    id="reim-mobile-sticky-chrome-purple"
                    className="ch2-mobile-sticky-chrome__purple"
                >
                    <div
                        className="ch2-mobile-sticky-chrome__purple-inner pt-[max(4px,env(safe-area-inset-top,0px))] pb-0"
                        style={{ ...ch.purpleInnerStyle, paddingInlineStart: 0, paddingInlineEnd: 0 }}
                    >
                        <div
                            className="ch2-mobile-sticky-chrome__chrome-top-row"
                            style={{
                                ...ch.chromeTopRowStyle,
                                paddingInlineStart: 1,
                                paddingInlineEnd: 1,
                                transform: 'translateY(6px)',
                            }}
                        >
                            {/* Title sits in its original right corner (physical right in RTL = first DOM child).
                                `flex: 0 0 auto` overrides the CSS `flex: 1 1 auto` so the span shrinks to content
                                and `justify-content: space-between` pushes it to the real frame edge. */}
                            <span
                                className="ch2-mobile-sticky-chrome__title"
                                style={{ ...ch.titleStyle, flex: '0 0 auto' }}
                            >
                                {screenTitle}
                            </span>
                            {/* Nav button group: back + home, both on physical left (end in RTL). */}
                            <div
                                className="ch2-mobile-sticky-chrome__nav-group"
                                style={{ display: 'inline-flex', alignItems: 'center', gap: 6, flexShrink: 0 }}
                            >
                                {onBackClick ? (
                                    <button
                                        type="button"
                                        className="ch2-mobile-menu-icon-btn"
                                        style={ch.logoutBtnStyle}
                                        onClick={onBackClick}
                                        aria-label="חזרה לעמוד הקודם"
                                    >
                                        <ArrowLeft style={iconPurple} strokeWidth={2.25} aria-hidden />
                                    </button>
                                ) : null}
                                <button
                                    type="button"
                                    className="ch2-mobile-menu-icon-btn"
                                    style={ch.logoutBtnStyle}
                                    onClick={onHomeClick}
                                    aria-label="חזרה לדף הבית"
                                >
                                    <Home style={iconPurple} strokeWidth={2.25} aria-hidden />
                                </button>
                            </div>
                        </div>
                        <div
                            className="ch2-mobile-sticky-chrome__menu-row"
                            style={{
                                ...ch.menuRowStyle,
                                transform: `translateY(${menuRowOffset}px)`,
                            }}
                        >
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
                                    ref={menuBtnRef}
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
                                            ref={unionImgRef}
                                        />
                                    </span>
                                    <span className="ch2-mobile-menu-frame__glyph" style={ch.glyphTrayStyle}>
                                        <img
                                            src={isMenuOpen ? MOBILE_MENU_CLOSE_SVG : MOBILE_MENU_HAMBURGER_SVG}
                                            alt=""
                                            className="ch2-mobile-menu-frame__glyph-img"
                                            width={isMenuOpen ? ch.glyphImgPx : ch.glyphImgW}
                                            height={isMenuOpen ? ch.glyphImgPx : ch.glyphImgH}
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
