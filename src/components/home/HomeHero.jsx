import React, { useState } from 'react';
import { ArrowDown, Star } from 'lucide-react';

const HomeHero = ({ data }) => {
    const [carouselIndex, setCarouselIndex] = useState(0);
    const images = data.images || [];
    const hasMultiple = images.length > 1;

    return (
        <div className="pt-6 md:pt-12 pb-12 md:pb-20 text-center px-4 relative overflow-hidden">
            {/* כותרות */}
            <div className="relative z-10 mb-6 md:mb-12">
                <p className="text-base sm:text-xl text-[#2D2D44] font-medium mb-2 tracking-wide opacity-80">{data.subtitle}</p>
                <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-[#2D2D44] leading-tight mb-2">
                    {data.title1}
                </h1>
                <div className="relative inline-block">
                    <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-[#5E3BEE] leading-tight relative z-10">
                        {data.title2}
                    </h1>
                    <div className="absolute bottom-1.5 md:bottom-2 left-0 w-full h-3 md:h-4 bg-[#FFD028] -z-0 rounded-sm"></div>
                </div>
            </div>

            {/* קישוטים – דסקטופ: כמו מקור (כוכב + נקודה אדומה). מובייל: כוכב + מטוס */}
            <div className="absolute top-16 md:top-20 right-[10%] md:right-[15%] text-[#FFD028]"><Star fill="currentColor" size={22} className="md:w-6 md:h-6"/></div>
            <div className="absolute top-40 left-[15%] w-3 h-3 bg-[#FF5C5C] rounded-full hidden md:block" />
            <svg className="absolute top-32 left-[8%] w-10 h-10 text-[#7DD3FC] opacity-90 md:hidden" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 19l-7-7 7-7M19 12H5"/></svg>

            {/* דסקטופ בלבד: גריד תמונות כמו במקור */}
            <div className="hidden md:flex justify-center items-center gap-4 md:gap-6 mt-8 h-[320px] relative z-10 max-w-[1400px] mx-auto perspective-1000">
                {images.map((img, i) => {
                    const rotate = i === 2 ? 0 : i === 1 ? -3 : i === 0 ? -6 : i === 3 ? 3 : 6;
                    const translateY = i === 2 ? 0 : i === 1 || i === 3 ? 20 : 40;
                    return (
                        <div key={i} className="relative transition-all duration-500 hover:z-50 hover:scale-110 shrink-0"
                            style={{
                                transform: `rotate(${rotate}deg) translateY(${translateY}px)`,
                                width: i === 2 ? 'clamp(140px, 35vw, 240px)' : 'clamp(120px, 28vw, 200px)',
                                zIndex: i === 2 ? 10 : 5
                            }}>
                            <div className="p-2 bg-white rounded-2xl shadow-lg border border-gray-100">
                                <div className="w-full h-64 overflow-hidden rounded-xl bg-gray-200">
                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* מובייל: קרוסלה עם נקודות */}
            <div className="md:hidden mt-6 relative z-10 max-w-sm mx-auto">
                <div className="relative rounded-2xl overflow-hidden bg-gray-100 border-2 border-[#2D2D44]/10 aspect-[4/3]">
                    {images.length > 0 && (
                        <img src={images[carouselIndex]} alt="" className="w-full h-full object-cover" />
                    )}
                </div>
                {hasMultiple && (
                    <div className="flex justify-center gap-2 mt-4">
                        {images.map((_, i) => (
                            <button
                                key={i}
                                type="button"
                                aria-label={`תמונה ${i + 1}`}
                                onClick={() => setCarouselIndex(i)}
                                className={`w-2.5 h-2.5 rounded-full border-2 transition-colors ${i === carouselIndex ? 'bg-[#5E3BEE] border-[#5E3BEE]' : 'bg-transparent border-[#2D2D44]/40'}`}
                            />
                        ))}
                    </div>
                )}
            </div>

            <div className="mt-12 md:mt-20 flex justify-center">
                <button className="bg-[#D1E68F] p-3 rounded-full border border-black/10 shadow-md animate-bounce hover:bg-[#c3d97f] transition" aria-label="גלילה למטה">
                    <ArrowDown size={24} color="#2D2D44" />
                </button>
            </div>
        </div>
    );
};
export default HomeHero;