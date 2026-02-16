import React from 'react';
import { ArrowUpRight, Menu, Share2, X } from 'lucide-react';

const Header = ({ onLogoClick, onMenuClick, isMenuOpen, logoUrl }) => {
    return (
        <>
            {/* מובייל: הדר סגול + קונטיינר לוגו שקוף (קבועים לאורך הגלילה) */}
            <div className="md:hidden fixed top-0 left-0 right-0 z-[1000] w-full">
                <div className="bg-[#5E3BEE] text-white rounded-b-3xl shadow-lg">
                    <div className="h-14 flex items-center justify-between px-4 pt-[env(safe-area-inset-top,0)] min-h-[3.5rem] gap-3">
                        <button type="button" className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white" aria-label="שתף">
                            <Share2 className="w-5 h-5" strokeWidth={2.5} />
                        </button>
                        <div className="flex-1 flex justify-center">
                            <button type="button" onClick={onMenuClick} className="bg-white text-[#2D2D44] px-6 py-2.5 rounded-full shadow-sm hover:bg-white/95 transition-colors flex items-center justify-center min-w-[44px] min-h-[44px]" aria-label={isMenuOpen ? 'סגירת תפריט' : 'תפריט'}>
                                {isMenuOpen ? <X className="w-5 h-5" strokeWidth={2.5} /> : <Menu className="w-5 h-5" strokeWidth={2.5} />}
                            </button>
                        </div>
                        <span className="text-white font-bold text-sm whitespace-nowrap">– דף הבית</span>
                    </div>
                </div>
                {/* קונטיינר לוגו – תמונה מ-public + המילה רעים, שקוף לאורך הגלילה */}
                <div className="mx-4 mt-2 rounded-2xl bg-white/60 backdrop-blur-md border border-white/40 shadow-lg">
                    <button type="button" onClick={onLogoClick} className="w-full px-6 py-3 flex items-center justify-center" aria-label="דף הבית - רעים">
                        <img src={logoUrl || '/Logo (1).png'} alt="רעים" className="h-8 w-auto object-contain" onError={(e) => { e.target.style.display = 'none'; }} />
                    </button>
                </div>
            </div>

            {/* דסקטופ: פיל צף */}
            <header className="hidden md:flex fixed top-6 left-0 right-0 z-[500] justify-center px-3 sm:px-4 pointer-events-none print:hidden">
            <div className="
                w-full max-w-[1700px]
                bg-white/10
                backdrop-blur-[2px]
                border border-white/20
                shadow-sm
                h-[72px] sm:h-[80px] md:h-[90px]
                rounded-full
                flex items-center justify-between
                pl-4 pr-14 sm:px-6 md:px-10
                pointer-events-auto
                transition-all duration-300
            ">
                {/* צד ימין: לוגו – לחיצה מחזירה לעמוד הבית */}
                <button
                    type="button"
                    onClick={onLogoClick}
                    className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1 text-right cursor-pointer bg-transparent border-0 p-0"
                    aria-label="חזרה לעמוד הבית"
                >
                    <img 
                        src="/Logo (1).png" 
                        alt="רעים" 
                        className="h-9 sm:h-10 md:h-12 object-contain shrink-0"
                        onError={(e) => {
                            e.target.style.display = 'none';
                            if (e.target.nextSibling) e.target.nextSibling.style.display = 'block';
                        }} 
                    />
                    <span 
                        className="text-[#5E3BEE] font-black text-3xl hidden"
                        style={{ display: 'none' }}
                    >
                        רעים
                    </span>
                </button>

                {/* צד שמאל: כפתור */}
                <button className="
                    group flex items-center gap-2 sm:gap-3 pl-1 pr-4 sm:pr-6 py-2 shrink-0
                    bg-white/90 hover:bg-white
                    border border-white/50 hover:border-[#816AFE]
                    rounded-full
                    transition-all duration-300
                    cursor-pointer shadow-sm
                ">
                    <span className="text-[#2D2D44] font-bold text-xs sm:text-sm md:text-base group-hover:text-[#816AFE] transition-colors whitespace-nowrap hidden sm:inline">
                        הרשמה לניוזלטר
                    </span>
                    <span className="text-[#2D2D44] font-bold text-xs group-hover:text-[#816AFE] sm:hidden">
                        ניוזלטר
                    </span>
                    <div className="w-9 h-9 md:w-10 md:h-10 bg-[#816AFE] rounded-full flex items-center justify-center text-white transform group-hover:rotate-45 transition-transform duration-300 shadow-md">
                        <ArrowUpRight size={18} className="sm:w-5 sm:h-5" />
                    </div>
                </button>
            </div>
            </header>
        </>
    );
};

export default Header;