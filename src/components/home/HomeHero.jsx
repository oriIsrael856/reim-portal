import React from 'react';
import { ArrowDown, Star } from 'lucide-react';

const HomeHero = ({ data }) => {
    return (
        <div className="pt-12 pb-20 text-center px-4 relative overflow-hidden">
            {/* כותרות */}
            <div className="relative z-10 mb-12">
                <p className="text-xl text-[#2D2D44] font-medium mb-2 tracking-wide opacity-80">{data.subtitle}</p>
                <h1 className="text-6xl md:text-7xl font-black text-[#2D2D44] leading-tight mb-2">
                    {data.title1}
                </h1>
                <div className="relative inline-block">
                    <h1 className="text-6xl md:text-7xl font-black text-[#5E3BEE] leading-tight relative z-10">
                        {data.title2}
                    </h1>
                    {/* הקו הצהוב מתחת לטקסט */}
                    <div className="absolute bottom-2 left-0 w-full h-4 bg-[#FFD028] -z-0 rounded-sm"></div>
                </div>
            </div>

            {/* קישוטים צפים (כוכבים ומטוסים - אפשר להוסיף SVG) */}
            <div className="absolute top-20 right-[15%] text-[#FFD028]"><Star fill="currentColor" size={24}/></div>
            <div className="absolute top-40 left-[15%] w-3 h-3 bg-[#FF5C5C] rounded-full"></div>

            {/* גריד התמונות המסובבות */}
            <div className="flex justify-center items-center gap-4 md:gap-6 mt-8 h-[320px] relative z-10 max-w-[1400px] mx-auto perspective-1000">
                {data.images.map((img, i) => {
                    // זוויות סיבוב ומיקום אנכי לפי התמונה
                    const rotate = i === 2 ? 0 : i === 1 ? -3 : i === 0 ? -6 : i === 3 ? 3 : 6;
                    const translateY = i === 2 ? 0 : i === 1 || i === 3 ? 20 : 40;
                    
                    return (
                        <div key={i} className="relative transition-all duration-500 hover:z-50 hover:scale-110"
                            style={{
                                transform: `rotate(${rotate}deg) translateY(${translateY}px)`,
                                width: i === 2 ? '240px' : '200px', // התמונה האמצעית רחבה יותר
                                zIndex: i === 2 ? 10 : 5
                            }}>
                            <div className="p-2 bg-white rounded-2xl shadow-lg border border-gray-100">
                                <div className="w-full h-48 md:h-64 overflow-hidden rounded-xl bg-gray-200">
                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            
            {/* כפתור גלילה למטה */}
            <div className="mt-20 flex justify-center">
                <button className="bg-[#D1E68F] p-3 rounded-full border border-black/10 shadow-md animate-bounce hover:bg-[#c3d97f] transition">
                    <ArrowDown size={24} color="#2D2D44" />
                </button>
            </div>
        </div>
    );
};
export default HomeHero;