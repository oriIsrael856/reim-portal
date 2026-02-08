import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const Header = () => {
    return (
        <header className="fixed top-6 left-0 right-0 z-[500] flex justify-center px-4 pointer-events-none print:hidden">
            <div className="
                w-full max-w-[1700px] 
                
                /* === שקיפות מקסימלית === */
                bg-white/10             /* רק 10% לבן */
                backdrop-blur-[2px]     /* טשטוש מזערי לקריאות */
                border border-white/20  /* מסגרת עדינה */
                shadow-sm
                /* ====================== */
                
                h-[80px] md:h-[90px]
                rounded-full 
                flex items-center justify-between 
                px-6 md:px-10
                pointer-events-auto
                transition-all duration-300
            ">
                {/* צד ימין: לוגו */}
                <div className="flex items-center gap-3">
                    {/* תמונה - אם יש לך קובץ בשם logo.png בתיקיית public */}
                    <img 
                        src="/Logo (1).png" 
                        alt="רעים" 
                        className="h-10 md:h-12 object-contain"
                        // אם התמונה לא נמצאת, נסתיר אותה ונציג את הטקסט
                        onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'block';
                        }} 
                    />
                    
                    {/* טקסט גיבוי - מופיע אם התמונה נכשלת (או אם תוריד את ה-hidden) */}
                    {/* כרגע מוגדר שיופיע רק אם התמונה נכשלת (דרך ה-onError למעלה), או שניתן להוריד את 'hidden' כדי שיופיע תמיד */}
                    <span 
                        className="text-[#5E3BEE] font-black text-3xl hidden"
                        style={{ display: 'none' }} // ה-onError ישנה את זה ל-block אם צריך
                    >
                        רעים
                    </span>
                    
                    {/* אם אתה רוצה שהטקסט יופיע *בנוסף* ללוגו תמיד, השתמש בשורה הזו במקום: */}
                    {/* <span className="text-[#5E3BEE] font-black text-3xl hidden md:block">רעים</span> */}
                </div>

                {/* צד שמאל: כפתור */}
                <button className="
                    group flex items-center gap-3 pl-1 pr-6 py-2
                    bg-white/90 hover:bg-white /* אטום כדי לבלוט */
                    border border-white/50 hover:border-[#816AFE]
                    rounded-full 
                    transition-all duration-300
                    cursor-pointer shadow-sm
                ">
                    <span className="text-[#2D2D44] font-bold text-sm md:text-base group-hover:text-[#816AFE] transition-colors">
                        הרשמה לניוזלטר
                    </span>
                    <div className="w-9 h-9 md:w-10 md:h-10 bg-[#816AFE] rounded-full flex items-center justify-center text-white transform group-hover:rotate-45 transition-transform duration-300 shadow-md">
                        <ArrowUpRight size={20} />
                    </div>
                </button>
            </div>
        </header>
    );
};

export default Header;