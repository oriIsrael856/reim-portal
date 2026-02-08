import React from 'react';
import { ArrowLeft, Star } from 'lucide-react';

const HomeNewsletter = ({ data }) => {
    // הגנה אם אין דאטה
    if (!data) return null;

    return (
        <div className="px-4 md:px-12 mb-20 w-full max-w-[1920px] mx-auto mt-24">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[500px]">
                
                {/* 1. תמונה ימנית - קבוצה בחוץ (החלף בנתיב לתמונה האמיתית שלך) */}
                <div className="rounded-[40px] overflow-hidden border-2 border-transparent h-[400px] md:h-full relative shadow-sm group">
                    <img 
                        src="/Image (2).png" // שים כאן את התמונה של החבר'ה בחוץ
                        alt="Group" 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                </div>

                {/* 2. אמצע - טופס ירוק */}
                <div className="bg-[#C5E080] rounded-[40px] border-2 border-[#2D2D44] shadow-[4px_4px_0px_#2D2D44] p-10 flex flex-col items-center justify-center text-center relative overflow-hidden h-[500px] md:h-full">
                    {/* קישוטים */}
                    <div className="mb-6 relative">
                        <Star className="text-[#FFD028] fill-[#FFD028] animate-spin-slow" size={48} />
                        <div className="absolute top-0 left-8 w-2 h-2 bg-white rounded-full"></div>
                    </div>

                    <p className="font-bold text-[#2D2D44] mb-2 text-sm opacity-80">{data.subtitle}</p>
                    <h3 className="text-5xl font-black text-[#2D2D44] mb-6">{data.title}</h3>
                    <p className="text-[#2D2D44] text-lg max-w-xs mb-12 leading-snug font-medium">
                        {data.text}
                    </p>
                    
                    {/* שדה אימייל */}
                    <div className="relative w-full max-w-xs">
                        <input 
                            type="email" 
                            placeholder={data.placeholder}
                            className="w-full bg-white/80 border-2 border-transparent focus:border-[#2D2D44] rounded-full py-3 px-6 text-right outline-none placeholder-gray-400 text-sm shadow-inner transition-all"
                        />
                        <button className="absolute left-1.5 top-1/2 -translate-y-1/2 bg-[#A090E0] p-2 rounded-full border border-black hover:scale-105 transition-transform flex items-center justify-center w-8 h-8 shadow-md">
                            <ArrowLeft size={16} color="white" />
                        </button>
                    </div>
                    
                    {/* קישוט קווקו */}
                    <svg className="absolute bottom-10 left-10 w-16 h-16 opacity-30 text-[#2D2D44]" viewBox="0 0 100 100">
                        <path d="M10,90 Q50,10 90,90" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5" />
                        <path d="M85,80 L90,90 L80,92" fill="none" stroke="currentColor" strokeWidth="2" />
                    </svg>
                </div>

                {/* 3. תמונה שמאלית - אנשים בקופסאות (החלף בנתיב לתמונה האמיתית שלך) */}
                <div className="rounded-[40px] overflow-hidden border-2 border-transparent h-[400px] md:h-full relative shadow-sm group">
                    <img 
                        src="/Image (4).png" // שים כאן את התמונה של האנשים בקופסאות
                        alt="Boxes" 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                </div>
            </div>
        </div>
    );
};

export default HomeNewsletter;