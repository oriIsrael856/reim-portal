import React, { useCallback, useLayoutEffect, useState } from 'react';
import { Menu, X, LogOut, Home, Mail } from 'lucide-react';
import { useMenuOverlayStyles } from '../../hooks/useMenuOverlayStyles';

// סרגל צד — Figma 36:1217 / Right Sidebar: רקע סגול כהה, טקסט אנכי, כפתור תפריט
export const Sidebar = ({ toggleMenu }) => {
    return (
        <aside
            className="fixed start-0 top-0 bottom-0 z-50 flex w-[72px] flex-col items-center justify-between rounded-e-[32px] py-6 shadow-xl md:w-20"
            style={{ background: 'var(--Purple-Dark, #46319B)' }}
            aria-label="תפריט צד"
        >
            <span
                className="whitespace-nowrap text-sm font-bold text-white"
                style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)' }}
            >
                דף הבית
            </span>

            <button
                type="button"
                onClick={toggleMenu}
                className="flex min-h-[56px] min-w-[56px] cursor-pointer items-center justify-center rounded-[24px] border-0 bg-white p-4 shadow-md transition-all duration-300 hover:scale-105 hover:bg-gray-50"
                aria-label="תפריט"
            >
                <Menu size={26} color="#1a1a2e" strokeWidth={2} />
            </button>

            <button
                type="button"
                className="flex min-h-[48px] min-w-[48px] cursor-pointer items-center justify-center rounded-[24px] border-0 bg-transparent p-3 transition-all duration-300 hover:bg-white/10"
                aria-label="יציאה"
            >
                <LogOut size={22} color="white" strokeWidth={2} />
            </button>
        </aside>
    );
};

/**
 * תפריט מלא פתוח — דסקטופ Figma 36:1324–36:1342; מובייל Figma 191:15815 (מסך + כרום עליון + חלון לבן עם CTA ניוזלטר).
 */
export const MenuOverlay = ({
    isOpen,
    closeMenu,
    menuItems = [],
    navigateTo,
    ctaText = 'הרשמה לניוזלטר',
    currentPage = 'home',
}) => {
    const homeItem = menuItems.find((i) => i.isHome);
    const chapterItems = menuItems.filter((i) => !i.isHome);

    const {
        panelPaddingStyle,
        navGapHomeStyle,
        chapterListGapStyle,
        menuRowStyle,
        menuLabelStyle,
        menuDigitStyle,
        railLabelStyle,
        homeIconPx,
        railWidthPx,
        digitLeftCssPx,
        drawerWidthCss,
        rowMaxWidthCss,
        overlayRootStyle,
        windowMarginStyle,
        newsletterCtaStyle,
        newsletterIconBoxStyle,
    } = useMenuOverlayStyles();

    /** תחתית הבלוק הסגול בלבד (#reim-mobile-sticky-chrome-purple) — בלי רצועת הלוגו, כדי שהמגירה תישב מתחת לשורת הטאב */
    const [mobileChromeBottomPx, setMobileChromeBottomPx] = useState(0);

    const updateChromeBottom = useCallback(() => {
        const el = document.getElementById('reim-mobile-sticky-chrome-purple');
        if (!el) {
            setMobileChromeBottomPx(0);
            return;
        }
        setMobileChromeBottomPx(Math.round(el.getBoundingClientRect().bottom));
    }, []);

    useLayoutEffect(() => {
        if (!isOpen) return undefined;
        /* סינכרוני לפני ציור — מונע פריים ב־iOS שבו top=0 ושכבת העמעום חוסמת את כפתורי הכרום */
        updateChromeBottom();

        const scheduleMeasure = () => {
            updateChromeBottom();
        };

        const el = document.getElementById('reim-mobile-sticky-chrome-purple');
        let ro;
        if (el && typeof ResizeObserver !== 'undefined') {
            ro = new ResizeObserver(scheduleMeasure);
            ro.observe(el);
        }
        window.addEventListener('resize', scheduleMeasure, { passive: true });
        window.addEventListener('scroll', scheduleMeasure, { passive: true, capture: true });
        const vv = typeof window !== 'undefined' ? window.visualViewport : null;
        if (vv) {
            vv.addEventListener('resize', scheduleMeasure);
            vv.addEventListener('scroll', scheduleMeasure);
        }
        return () => {
            ro?.disconnect();
            window.removeEventListener('resize', scheduleMeasure);
            window.removeEventListener('scroll', scheduleMeasure, { capture: true });
            vv?.removeEventListener('resize', scheduleMeasure);
            vv?.removeEventListener('scroll', scheduleMeasure);
        };
    }, [isOpen, updateChromeBottom]);

    const handleNav = (page) => {
        navigateTo(page);
        closeMenu();
    };

    const handleNewsletterCta = useCallback(() => {
        closeMenu();
        if (currentPage === 'home') {
            requestAnimationFrame(() => {
                document.getElementById('home-mobile-newsletter-191')?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            });
        } else {
            navigateTo('home');
            window.setTimeout(() => {
                document.getElementById('home-mobile-newsletter-191')?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            }, 400);
        }
    }, [closeMenu, currentPage, navigateTo]);

    const renderHomeRow = () =>
        homeItem ? (
            <button
                key="home"
                type="button"
                onClick={() => handleNav(homeItem.page)}
                className="group flex w-full shrink-0 cursor-pointer items-center justify-between border-b border-[rgba(101,70,222,0.24)] transition-colors duration-300 ease-out hover:bg-[var(--color-surface-purple-8)] active:bg-[var(--color-surface-purple-8)] touch-manipulation"
                style={menuRowStyle}
            >
                <span
                    className="relative z-10 min-w-0 text-start font-semibold leading-[1.28] tracking-[0.15px] text-[#001d26] group-hover:text-[#6546DE] group-active:text-[#6546DE]"
                    style={menuLabelStyle}
                >
                    {homeItem.title}
                </span>
                <Home
                    size={homeIconPx}
                    strokeWidth={2}
                    className="pointer-events-none z-[1] shrink-0 text-[rgba(101,70,222,0.08)] transition-colors duration-300 ease-out group-hover:text-[var(--color-text-purple)] group-active:text-[var(--color-text-purple)]"
                    aria-hidden
                />
            </button>
        ) : null;

    const renderChapterButton = (item, index) => (
        <button
            key={item.page || index}
            type="button"
            onClick={() => handleNav(item.page)}
            className="group relative isolate flex w-full shrink-0 cursor-pointer items-center justify-start overflow-hidden border-b border-[rgba(101,70,222,0.24)] transition-colors duration-300 ease-out hover:bg-[var(--color-surface-purple-8)] active:bg-[var(--color-surface-purple-8)] touch-manipulation [clip-path:inset(0)]"
            style={{
                ...menuRowStyle,
                '--menu-digit-left': `${digitLeftCssPx}px`,
            }}
        >
            {/* שכבת clip — div block כדי שגובה החיתוך יתאים לשורה (span לפעמים לא חותך ב-WebKit) */}
            <div className="reim-menu-overlay-digit-clip" aria-hidden>
                <span
                    dir="ltr"
                    className="reim-menu-digit reim-menu-digit--menu-overlay pointer-events-none absolute z-0 whitespace-nowrap text-start font-salsa font-normal leading-[1.28] tracking-[0.15px]"
                    style={{
                        ...menuDigitStyle,
                        lineHeight: 1.28,
                    }}
                    aria-hidden
                >
                    {item.id}
                </span>
            </div>
            <span
                className="relative z-10 min-w-0 text-start font-semibold leading-[1.28] tracking-[0.15px] text-[#001d26] group-hover:text-[#6546DE] group-active:text-[#6546DE]"
                style={menuLabelStyle}
            >
                {item.title}
            </span>
        </button>
    );

    const renderChapterRows = () => (
        <div
            className="flex min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden overscroll-y-contain"
            style={chapterListGapStyle}
        >
            {chapterItems.map((item, index) => renderChapterButton(item, index))}
        </div>
    );

    const mobileChromeTopPx = Math.max(0, mobileChromeBottomPx);

    return (
        <div
            className={`fixed inset-0 z-[1100] transition-opacity duration-300 ${
                isOpen ? 'pointer-events-none opacity-100 lg:pointer-events-auto' : 'pointer-events-none opacity-0'
            }`}
            aria-hidden={!isOpen}
        >
            {/* מובייל: עמעום — pointer-events רק כשפתוח; אחרת שכבה שקופה עם auto חוסמת את כפתור פתיחת התפריט */}
            <div
                className={`absolute inset-x-0 bottom-0 cursor-default bg-[rgba(0,29,38,0.6)] lg:hidden ${
                    isOpen ? 'pointer-events-auto' : 'pointer-events-none'
                }`}
                style={{ top: mobileChromeTopPx ? `${mobileChromeTopPx}px` : 0 }}
                onClick={closeMenu}
                aria-hidden
            />
            {/* דסקטופ: עמעום מסך מלא */}
            <div
                className={`absolute inset-0 hidden cursor-default bg-[rgba(0,29,38,0.6)] lg:block ${
                    isOpen ? 'lg:pointer-events-auto' : 'lg:pointer-events-none'
                }`}
                onClick={closeMenu}
                aria-hidden
            />

            {/* מובייל 191:15815 — מגירה מתחת לכרום; אנימציה translate-y מלמטה (אותו כרום נשאר בדף) */}
            <div
                dir="ltr"
                className="pointer-events-none fixed start-0 end-0 bottom-0 lg:hidden"
                style={{ top: mobileChromeTopPx ? `${mobileChromeTopPx}px` : 0 }}
            >
                <div
                    className={`flex h-full max-h-full flex-col overflow-hidden bg-[#46319B] shadow-2xl transition-transform duration-500 ease-out ${
                        isOpen ? 'pointer-events-auto translate-y-0' : 'pointer-events-none translate-y-full'
                    }`}
                    style={overlayRootStyle}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex min-h-0 flex-1 flex-col" style={windowMarginStyle}>
                        <div
                            dir="rtl"
                            className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-t-3xl bg-white"
                            style={{
                                ...panelPaddingStyle,
                                width: drawerWidthCss,
                                maxWidth: '100%',
                            }}
                        >
                            <nav
                                className="flex min-h-0 w-full flex-1 flex-col justify-between"
                                style={{ maxWidth: rowMaxWidthCss }}
                                aria-label="ניווט ראשי"
                            >
                                <div className="shrink-0">{renderHomeRow()}</div>
                                {renderChapterRows()}
                                <button
                                    type="button"
                                    onClick={handleNewsletterCta}
                                    className="flex w-full shrink-0 cursor-pointer items-center rounded-[100px] border-[1.5px] border-[#001d26] bg-transparent text-start font-semibold leading-snug text-[#001d26] transition hover:bg-[rgba(101,70,222,0.06)]"
                                    style={newsletterCtaStyle}
                                >
                                    <span
                                        className="flex shrink-0 items-center justify-center rounded-[32px] bg-[#6546de] text-white"
                                        style={newsletterIconBoxStyle}
                                    >
                                        <Mail size={20} strokeWidth={2} className="shrink-0" aria-hidden />
                                    </span>
                                    <span className="min-w-0 flex-1 text-start text-base">{ctaText}</span>
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>

            {/* דסקטופ — Figma 36:1324; dir=ltr מרכז את המגירה בצד הפיזי הנכון */}
            <div
                dir="ltr"
                className={`absolute inset-0 hidden items-stretch justify-end transition-transform duration-500 ease-out lg:flex lg:inset-4 lg:bottom-4 lg:end-0 lg:start-4 lg:top-4 ${
                    isOpen ? 'pointer-events-auto translate-x-0' : 'pointer-events-none translate-x-full'
                }`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="hidden h-full w-full max-h-full overflow-hidden rounded-t-3xl shadow-2xl lg:flex lg:w-auto lg:rounded-3xl">
                    <div
                        dir="rtl"
                        className="relative flex h-full min-w-0 flex-1 flex-col overflow-y-auto bg-white lg:flex-none"
                        style={{
                            ...panelPaddingStyle,
                            width: drawerWidthCss,
                            maxWidth: '100%',
                        }}
                    >
                        <button
                            type="button"
                            onClick={closeMenu}
                            className="absolute end-4 top-4 z-20 flex rounded-full bg-[#f3f4f6] p-2 transition hover:bg-gray-200 lg:hidden"
                            aria-label="סגור תפריט"
                        >
                            <X size={22} className="text-[#001d26]" strokeWidth={2} />
                        </button>
                        <button
                            type="button"
                            onClick={closeMenu}
                            className="absolute end-4 top-1/2 z-20 hidden -translate-y-1/2 rounded-full bg-white p-3 shadow-md transition hover:bg-gray-100 lg:flex"
                            aria-label="סגור תפריט"
                        >
                            <X size={22} className="text-[#001d26]" strokeWidth={2} />
                        </button>

                        <nav
                            className="mx-auto mt-0 flex w-full flex-col"
                            style={{
                                ...navGapHomeStyle,
                                maxWidth: rowMaxWidthCss,
                            }}
                            aria-label="ניווט ראשי"
                        >
                            {renderHomeRow()}
                            <div className="flex flex-col" style={chapterListGapStyle}>
                                {chapterItems.map((item, index) => renderChapterButton(item, index))}
                            </div>
                        </nav>
                    </div>

                    <div
                        className="relative hidden h-full shrink-0 flex-col items-center justify-between bg-[#46319B] py-6 lg:flex"
                        style={{ width: railWidthPx }}
                        aria-hidden={!isOpen}
                    >
                        <div className="flex flex-1 items-center justify-center pt-4">
                            <span
                                className="whitespace-nowrap font-normal leading-[1.32] tracking-[0.15px] text-white"
                                style={{
                                    ...railLabelStyle,
                                    writingMode: 'vertical-rl',
                                    textOrientation: 'mixed',
                                    transform: 'rotate(180deg)',
                                }}
                            >
                                תפריט ניווט
                            </span>
                        </div>
                        <button
                            type="button"
                            onClick={closeMenu}
                            className="mb-8 flex items-center justify-center rounded-full bg-white/15 p-3 transition hover:bg-white/25 lg:hidden"
                            aria-label="סגור תפריט"
                        >
                            <X size={22} className="text-white" strokeWidth={2.5} />
                        </button>
                        <div className="h-6 shrink-0" aria-hidden />
                    </div>
                </div>
            </div>
        </div>
    );
};
