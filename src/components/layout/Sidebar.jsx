import React from 'react';
import { Menu, X, LogOut, Home } from 'lucide-react';
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
 * תפריט מלא פתוח — Figma 36:1324–36:1342 (Side menu + window 600px + rail 80px).
 * מגירה לבנה: שורות 64px, מספרי רקע Salsa 120px ב-rgba(101,70,222,0.08), מפריד purple/24.
 */
export const MenuOverlay = ({ isOpen, closeMenu, menuItems = [], navigateTo }) => {
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
        digitTopPullPx,
        drawerWidthCss,
        rowMaxWidthCss,
    } = useMenuOverlayStyles();

    const handleNav = (page) => {
        navigateTo(page);
        closeMenu();
    };

    return (
        <div
            className={`fixed inset-0 z-[1100] transition-opacity duration-300 ${isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
            style={{ background: 'rgba(0, 29, 38, 0.6)' }}
            onClick={closeMenu}
            aria-hidden={!isOpen}
        >
            {/* Figma: dir=ltr מרכז את הקצה הפיזי ימין (מגירה + מסילה) כמו בקובץ */}
            <div
                dir="ltr"
                className={`pointer-events-auto absolute inset-3 flex items-stretch justify-end transition-transform duration-500 ease-out md:inset-4 md:bottom-4 md:end-0 md:start-4 md:top-4 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex h-full max-h-full overflow-hidden rounded-3xl shadow-2xl">
                    {/* Main window — Figma 36:1325; פרופורציות דינמיות מול 1920×1080 */}
                    <div
                        dir="rtl"
                        className="flex h-full min-w-0 flex-col overflow-y-auto bg-white"
                        style={{
                            ...panelPaddingStyle,
                            width: drawerWidthCss,
                            maxWidth: '100%',
                        }}
                    >
                        {/* מובייל: פינה; דסקטופ Figma: X לבן במרכז הקצה הפיזי שמאל של הפאנל */}
                        <button
                            type="button"
                            onClick={closeMenu}
                            className="absolute end-4 top-4 z-20 flex rounded-full bg-[#f3f4f6] p-2 transition hover:bg-gray-200 md:hidden"
                            aria-label="סגור תפריט"
                        >
                            <X size={22} className="text-[#001d26]" strokeWidth={2} />
                        </button>
                        <button
                            type="button"
                            onClick={closeMenu}
                            className="absolute end-4 top-1/2 z-20 hidden -translate-y-1/2 rounded-full bg-white p-3 shadow-md transition hover:bg-gray-100 md:flex"
                            aria-label="סגור תפריט"
                        >
                            <X size={22} className="text-[#001d26]" strokeWidth={2} />
                        </button>

                        <nav
                            className="mx-auto mt-10 flex w-full flex-col md:mt-0"
                            style={{
                                ...navGapHomeStyle,
                                maxWidth: rowMaxWidthCss,
                            }}
                            aria-label="ניווט ראשי"
                        >
                            {homeItem ? (
                                <button
                                    key="home"
                                    type="button"
                                    onClick={() => handleNav(homeItem.page)}
                                    className="group flex w-full shrink-0 cursor-pointer items-center justify-between border-b border-[rgba(101,70,222,0.24)] transition-colors duration-300 ease-out hover:bg-[var(--color-surface-purple-8)]"
                                    style={menuRowStyle}
                                >
                                    {/* DOM ראשון ב-flex-row+RTL = פיזית ימין — טקסט */}
                                    <span
                                        className="relative z-10 min-w-0 text-start font-semibold leading-[1.28] tracking-[0.15px] text-[#001d26] group-hover:text-[#6546DE]"
                                        style={menuLabelStyle}
                                    >
                                        {homeItem.title}
                                    </span>
                                    <Home
                                        size={homeIconPx}
                                        strokeWidth={2}
                                        className="pointer-events-none z-[1] shrink-0 text-[rgba(101,70,222,0.08)] transition-colors duration-300 ease-out group-hover:text-[var(--color-text-purple)]"
                                        aria-hidden
                                    />
                                </button>
                            ) : null}

                            <div className="flex flex-col" style={chapterListGapStyle}>
                                {chapterItems.map((item, index) => (
                                    <button
                                        key={item.page || index}
                                        type="button"
                                        onClick={() => handleNav(item.page)}
                                        className="group relative flex w-full shrink-0 cursor-pointer items-center justify-start overflow-hidden border-b border-[rgba(101,70,222,0.24)] transition-colors duration-300 ease-out hover:bg-[var(--color-surface-purple-8)]"
                                        style={{
                                            ...menuRowStyle,
                                            '--menu-digit-left': `${digitLeftCssPx}px`,
                                            '--menu-digit-top-rest': `-${digitTopPullPx}px`,
                                        }}
                                    >
                                        {/* Figma 36:1325 / 50:4490: כותרת ב-DOM ראשון → ב-RTL יושבת ימין; ספרה absolute left/top כמו בקובץ */}
                                        <span
                                            className="relative z-10 min-w-0 text-start font-semibold leading-[1.28] tracking-[0.15px] text-[#001d26] group-hover:text-[#6546DE]"
                                            style={menuLabelStyle}
                                        >
                                            {item.title}
                                        </span>
                                        <span
                                            dir="ltr"
                                            className="reim-menu-digit pointer-events-none absolute z-0 whitespace-nowrap text-start font-salsa font-normal leading-[1.28] tracking-[0.15px]"
                                            style={{
                                                ...menuDigitStyle,
                                                lineHeight: 1.28,
                                            }}
                                            aria-hidden
                                        >
                                            {item.id}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </nav>
                    </div>

                    {/* Right rail — Figma 36:1342 (תפריט ניווט + סגירה), דסקטופ בלבד */}
                    <div
                        className="relative hidden h-full shrink-0 flex-col items-center justify-between bg-[#46319B] py-6 md:flex"
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
                            className="mb-8 flex items-center justify-center rounded-full bg-white/15 p-3 transition hover:bg-white/25 md:hidden"
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
