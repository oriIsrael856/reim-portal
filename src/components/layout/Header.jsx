import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const Header = ({ onLogoClick }) => {
    return (
        <header className="fixed top-6 left-0 right-0 z-[500] flex justify-center px-3 sm:px-4 pointer-events-none print:hidden">
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
    );
};

export default Header;