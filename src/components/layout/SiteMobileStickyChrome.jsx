import React, { useEffect, useRef } from 'react';
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

    // #region agent log
    const purpleInnerRef = useRef(null);
    const menuRowRef = useRef(null);
    const menuFrameRef = useRef(null);
    const menuBtnRef = useRef(null);
    const unionImgRef = useRef(null);
    const headerBandRef = useRef(null);
    useEffect(() => {
        const send = (message, data) => {
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
        const info = (el, name) => {
            if (!el) return { name, missing: true };
            const r = el.getBoundingClientRect();
            const cs = getComputedStyle(el);
            return {
                name,
                top: Math.round(r.top),
                bottom: Math.round(r.bottom),
                height: Math.round(r.height),
                paddingBlockStart: cs.paddingBlockStart,
                paddingBlockEnd: cs.paddingBlockEnd,
                marginBlockEnd: cs.marginBlockEnd,
            };
        };
        const measure = () => {
            send('hamburger-bottom-gap post-fix', {
                runId: 'post-fix-lower-btn',
                purpleInner: info(purpleInnerRef.current, 'purpleInner'),
                menuRow: info(menuRowRef.current, 'menuRow'),
                menuFrame: info(menuFrameRef.current, 'menuFrame'),
                menuBtn: info(menuBtnRef.current, 'menuBtn'),
                unionImg: info(unionImgRef.current, 'unionImg'),
                headerBand: info(headerBandRef.current, 'headerBand'),
            });
        };
        const raf = requestAnimationFrame(measure);
        window.addEventListener('resize', measure, { passive: true });
        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('resize', measure);
        };
    }, [isMenuOpen]);
    // #endregion

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
                            style={{ ...ch.menuRowStyle, transform: 'translateY(6px)' }}
                            ref={menuRowRef}
                        >
                            <div
                                className={`ch2-mobile-menu-frame${isMenuOpen ? ' ch2-mobile-menu-frame--open' : ''}`}
                                style={ch.menuFrameStyle}
                                ref={menuFrameRef}
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
