import React from 'react';
import { ArrowUpRight, Menu, Share2, X } from 'lucide-react';

const Header = ({ onLogoClick, onMenuClick, isMenuOpen, logoUrl, hideMobileChrome }) => {
    return (
        <>
            {/* מובייל: הדר — מוסר בכל העמודים הציבוריים (כרום Figma ב-`MobilePublicLayout` + `SiteMobileStickyChrome`) */}
            {!hideMobileChrome && (
            <div className="md:hidden fixed top-0 left-0 right-0 z-[1000] w-full">
                <div className="bg-[#5E3BEE] text-white rounded-b-3xl shadow-lg">
                    <div className="flex items-center justify-between pt-[env(safe-area-inset-top,0)] gap-[2vw]" style={{ minHeight: 'clamp(3rem, 10vh, 4rem)', paddingLeft: '4%', paddingRight: '4%' }}>
                        <button type="button" className="p-[2vw] rounded-lg hover:bg-white/10 transition-colors text-white" aria-label="שתף">
                            <Share2 style={{ width: 'clamp(18px, 4vw, 22px)', height: 'clamp(18px, 4vw, 22px)' }} strokeWidth={2.5} />
                        </button>
                        <div className="flex-1 flex justify-center">
                            <button type="button" onClick={onMenuClick} className="bg-white text-[#2D2D44] rounded-full shadow-sm hover:bg-white/95 transition-colors flex items-center justify-center min-w-[44px] min-h-[44px]" style={{ paddingLeft: 'clamp(1rem, 4vw, 1.5rem)', paddingRight: 'clamp(1rem, 4vw, 1.5rem)', paddingTop: '0.5rem', paddingBottom: '0.5rem' }} aria-label={isMenuOpen ? 'סגירת תפריט' : 'תפריט'}>
                                {isMenuOpen ? <X style={{ width: 'clamp(18px, 4vw, 22px)', height: 'clamp(18px, 4vw, 22px)' }} strokeWidth={2.5} /> : <Menu style={{ width: 'clamp(18px, 4vw, 22px)', height: 'clamp(18px, 4vw, 22px)' }} strokeWidth={2.5} />}
                            </button>
                        </div>
                        <span className="text-white font-bold whitespace-nowrap" style={{ fontSize: 'clamp(0.7rem, 2.5vw, 0.9rem)' }}>– דף הבית</span>
                    </div>
                </div>
                <div className="rounded-2xl bg-white/60 backdrop-blur-md border border-white/40 shadow-lg" style={{ marginLeft: '4%', marginRight: '4%', marginTop: 'clamp(0.25rem, 1.5vh, 0.5rem)' }}>
                    <button type="button" onClick={onLogoClick} className="w-full flex items-center justify-center" style={{ padding: 'clamp(0.5rem, 2vw, 0.75rem)' }} aria-label="דף הבית - רעים">
                        <img src={logoUrl || '/Logo (1).png'} alt="רעים" className="w-auto object-contain" style={{ height: 'clamp(1.5rem, 6vw, 2rem)' }} onError={(e) => { e.target.style.display = 'none'; }} />
                    </button>
                </div>
            </div>
            )}

            {/* דסקטופ: פיל צף – גובה ב־vh, ריווח ב־vw */}
            <header className="hidden md:flex fixed z-[500] justify-center pointer-events-none print:hidden" style={{ top: '12px', left: '12px', right: 0, paddingLeft: '1vw', paddingRight: '1vw' }}>
            <div className="
                w-full max-w-[95vw]
                bg-white/10
                backdrop-blur-[2px]
                border border-white/20
                shadow-sm
                rounded-full
                flex items-center justify-between
                pointer-events-auto
                transition-all duration-300
            "
                style={{
                    height: 'clamp(52px, 8vh, 80px)',
                    paddingLeft: 'clamp(0.75rem, 1.5vw, 2.5rem)',
                    paddingRight: 'clamp(2rem, 4vw, 2.5rem)'
                }}
            >
                {/* צד ימין: לוגו */}
                <button
                    type="button"
                    onClick={onLogoClick}
                    className="flex items-center gap-[0.5vw] min-w-0 flex-1 text-right cursor-pointer bg-transparent border-0 p-0"
                    aria-label="חזרה לעמוד הבית"
                >
                    <img 
                        src="/Logo (1).png" 
                        alt="רעים" 
                        className="object-contain shrink-0"
                        style={{ height: 'clamp(1.5rem, 2.2vw, 2.25rem)' }}
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

                {/* צד שמאל: כפתור – גודל ב־vw */}
                <button className="
                    group flex items-center gap-[0.5vw] shrink-0 py-2
                    bg-white/90 hover:bg-white
                    border border-white/50 hover:border-[#816AFE]
                    rounded-full
                    transition-all duration-300
                    cursor-pointer shadow-sm
                " style={{ paddingLeft: '0.25rem', paddingRight: 'clamp(0.75rem, 1.5vw, 1.5rem)' }}>
                    <span className="text-[#2D2D44] font-bold group-hover:text-[#816AFE] transition-colors whitespace-nowrap hidden sm:inline" style={{ fontSize: 'clamp(0.7rem, 1vw, 1rem)' }}>
                        הרשמה לניוזלטר
                    </span>
                    <span className="text-[#2D2D44] font-bold group-hover:text-[#816AFE] sm:hidden" style={{ fontSize: 'clamp(0.7rem, 1vw, 1rem)' }}>
                        ניוזלטר
                    </span>
                    <div className="bg-[#816AFE] rounded-full flex items-center justify-center text-white transform group-hover:rotate-45 transition-transform duration-300 shadow-md" style={{ width: 'clamp(32px, 2.5vw, 40px)', height: 'clamp(32px, 2.5vw, 40px)' }}>
                        <ArrowUpRight style={{ width: 'clamp(14px, 1.2vw, 20px)', height: 'clamp(14px, 1.2vw, 20px)' }} />
                    </div>
                </button>
            </div>
            </header>
        </>
    );
};

export default Header;
