import React from 'react';
import { Menu, X, LogOut, Home } from 'lucide-react';

// סרגל צד – רקע שחור, דף הבית אנכי בלבן, כפתור תפריט לבן מעוגל, אייקון יציאה בלבן
export const Sidebar = ({ toggleMenu }) => {
    return (
        <aside
            className="fixed right-0 top-0 bottom-0 z-50 w-[72px] md:w-20 flex flex-col items-center justify-between py-6 rounded-tl-[32px] rounded-bl-[32px] shadow-xl"
 style={{ background: 'var(--Purple-Dark, #46319B)' }}
            aria-label="תפריט צד"
        >
            {/* דף הבית – טקסט אנכי בלבן */}
            <span
                className="text-white font-bold text-sm whitespace-nowrap"
                style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)' }}
            >
                דף הבית
            </span>

            {/* כפתור תפריט – צורה לבנה מעוגלת (טאב), אייקון כהה */}
            <button
                onClick={toggleMenu}
                className="flex items-center justify-center bg-white hover:bg-gray-50 rounded-[24px] p-4 shadow-md hover:scale-105 transition-all duration-300 border-0 cursor-pointer min-w-[56px] min-h-[56px]"
                aria-label="תפריט"
            >
                <Menu size={26} color="#1a1a2e" strokeWidth={2} />
            </button>

            {/* אייקון יציאה – לבן על הרקע השחור */}
            <button
                type="button"
                className="flex items-center justify-center bg-transparent hover:bg-white/10 rounded-[24px] p-3 transition-all duration-300 border-0 cursor-pointer min-w-[48px] min-h-[48px]"
                aria-label="יציאה"
            >
                <LogOut size={22} color="white" strokeWidth={2} />
            </button>
        </aside>
    );
};

// התפריט הנפתח
export const MenuOverlay = ({ isOpen, closeMenu, menuItems, navigateTo }) => {
    return (
        <div className={`fixed inset-0 z-[1100] bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={closeMenu}>
            <div 
                className={`absolute top-0 right-0 h-full w-full max-w-[400px] bg-white p-6 sm:p-10 pb-[env(safe-area-inset-bottom)] transition-transform duration-500 ease-out shadow-2xl overflow-y-auto ${isOpen ? 'translate-x-0' : 'translate-x-full'}`} 
                onClick={e => e.stopPropagation()}
            >
                <button onClick={closeMenu} className="absolute top-6 left-6 sm:top-8 sm:left-8 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition z-10">
                    <X size={24} color="#2D2D44" />
                </button>

                <div className="mt-16 sm:mt-20 flex flex-col gap-4">
                    {menuItems.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => {
                                navigateTo(item.page);
                                closeMenu();
                            }}
                            className="relative w-full flex items-center justify-end p-4 border-b border-gray-100 hover:bg-[#F3F0FF] rounded-lg cursor-pointer group transition-all"
                            style={{ overflow: 'visible' }}
                        >
                            {/* ספרות גדולות משמאל (לפרקים) / אייקון בית (לדף הבית) */}
                            {!item.isHome ? (
                                <span
                                    className="absolute left-0 top-1/2 -translate-y-1/2 text-[120px] leading-[128%] tracking-[0.15px] font-normal text-[#DDD4F8] pointer-events-none z-[9] font-['Rubik']"
                                >
                                    {item.id}
                                </span>
                            ) : (
                                <Home
                                    size={24}
                                    className="absolute left-0 top-1/2 -translate-y-1/2 text-[#DDD4F8] pointer-events-none z-[9] scale-110"
                                />
                            )}

                            <span className="relative z-10 w-full text-xl font-bold text-[#2D2D44] text-right group-hover:text-[#5E3BEE]">
                                {item.title}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};