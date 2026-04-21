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

    // Dynamic offset: shift menu-row down until the hamburger Union SVG bottom
    // exactly meets the top of the white logo pill. Necessary because the SVG's
    // below-box overhang scales with viewport while header-band padding is fixed.
    const purpleInnerRef = useRef(null);
    const menuBtnRef = useRef(null);
    const unionImgRef = useRef(null);
    const headerBandRef = useRef(null);
    const [menuRowOffset, setMenuRowOffset] = useState(6);

    // #region agent log
    const sendLog = (message, data) => {
        fetch('http://127.0.0.1:7242/ingest/33d723f8-c665-4af5-ad39-38344c92c1fe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                location: 'SiteMobileStickyChrome.jsx',
                message,
                data,
                timestamp: Date.now(),
            }),
        }).catch(() => {});
    };
    // #endregion

    useLayoutEffect(() => {
        const computeOffset = () => {
            const purpleInner = purpleInnerRef.current;
            const menuBtn = menuBtnRef.current;
            const unionImg = unionImgRef.current;
            const headerBand = headerBandRef.current;
            if (!purpleInner || !menuBtn || !unionImg || !headerBand) return;
            const purpleBottom = purpleInner.getBoundingClientRect().bottom;
            const btnBottom = menuBtn.getBoundingClientRect().bottom;
            const unionBottom = unionImg.getBoundingClientRect().bottom;
            const pillTop =
                headerBand.getBoundingClientRect().top +
                parseFloat(getComputedStyle(headerBand).paddingBlockStart || '0');
            // Remove current offset from measurements by using menu-row's menuBtn as a reference.
            // Union overhang below the button box is invariant under the transform.
            const overhang = unionBottom - btnBottom;
            const gapFromPurpleToPill = pillTop - purpleBottom;
            const needed = Math.max(0, Math.round(gapFromPurpleToPill - overhang));
            // #region agent log
            sendLog('dynamic-offset compute', {
                runId: 'dynamic-offset',
                viewportW: window.innerWidth,
                purpleBottom: Math.round(purpleBottom),
                btnBottom: Math.round(btnBottom),
                unionBottom: Math.round(unionBottom),
                pillTop: Math.round(pillTop),
                overhang: Math.round(overhang),
                gapFromPurpleToPill: Math.round(gapFromPurpleToPill),
                neededOffset: needed,
            });
            // #endregion
            setMenuRowOffset((prev) => (prev === needed ? prev : needed));
        };
        computeOffset();
        window.addEventListener('resize', computeOffset, { passive: true });
        return () => {
            window.removeEventListener('resize', computeOffset);
        };
    }, [isMenuOpen]);

    // Also recompute after images load (Union SVG size may change after load)
    useEffect(() => {
        const img = unionImgRef.current;
        if (!img) return;
        const onLoad = () => {
            const purpleInner = purpleInnerRef.current;
            const menuBtn = menuBtnRef.current;
            const headerBand = headerBandRef.current;
            if (!purpleInner || !menuBtn || !headerBand) return;
            const purpleBottom = purpleInner.getBoundingClientRect().bottom;
            const btnBottom = menuBtn.getBoundingClientRect().bottom;
            const unionBottom = img.getBoundingClientRect().bottom;
            const pillTop =
                headerBand.getBoundingClientRect().top +
                parseFloat(getComputedStyle(headerBand).paddingBlockStart || '0');
            const overhang = unionBottom - btnBottom;
            const gapFromPurpleToPill = pillTop - purpleBottom;
            const needed = Math.max(0, Math.round(gapFromPurpleToPill - overhang));
            setMenuRowOffset((prev) => (prev === needed ? prev : needed));
        };
        if (img.complete) onLoad();
        else img.addEventListener('load', onLoad, { once: true });
        return () => img.removeEventListener('load', onLoad);
    }, [isMenuOpen]);

    return (
        <header id="reim-mobile-sticky-chrome" className="ch2-mobile-sticky-chrome lg:hidden">
            <div className="ch2-mobile-sticky-chrome__stack">
                <div
                    id="reim-mobile-sticky-chrome-purple"
                    className="ch2-mobile-sticky-chrome__purple"
                >
                    <div
                        className="ch2-mobile-sticky-chrome__purple-inner pt-[max(4px,env(safe-area-inset-top,0px))] pb-0"
                        style={{ ...ch.purpleInnerStyle, paddingInlineStart: 0, paddingInlineEnd: 0 }}
                        ref={purpleInnerRef}
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
                    <div className="ch2-mobile-sticky-chrome__header-band" ref={headerBandRef}>
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
