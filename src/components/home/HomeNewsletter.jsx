import React from 'react';
import { ArrowLeft, Star } from 'lucide-react';

const HomeNewsletter = ({ data }) => {
    // הגנה אם אין דאטה
    if (!data) return null;

    const rightImg = data.images?.right || '/Image (2).png';
    const leftImg = data.images?.left || '/Image (4).png';
    const galleryImages = data.galleryImages?.length >= 4 ? data.galleryImages : [rightImg, leftImg, rightImg, leftImg];

    return (
        <div className="px-4 md:px-12 mb-20 w-full max-w-[1920px] mx-auto mt-16 md:mt-24">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[500px]">
                {/* דסקטופ: תמונה ימין */}
                <div className="hidden md:block rounded-[40px] overflow-hidden border-2 border-transparent h-[400px] md:h-full relative shadow-sm group">
                    <img src={rightImg} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>

                {/* טופס ניוזלטר (ירוק) */}
                <div className="bg-[#C5E080] rounded-[40px] border-2 border-[#2D2D44] shadow-[4px_4px_0px_#2D2D44] p-8 md:p-10 flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[420px] md:h-full">
                    <div className="mb-4 md:mb-6 relative">
                        <Star className="text-[#FFD028] fill-[#FFD028] animate-spin-slow" size={40} />
                        <div className="absolute top-0 left-8 w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <p className="font-bold text-[#2D2D44] mb-2 text-sm opacity-80">{data.subtitle}</p>
                    <h3 className="text-4xl md:text-5xl font-black text-[#2D2D44] mb-4 md:mb-6">{data.title}</h3>
                    <p className="text-[#2D2D44] text-base md:text-lg max-w-xs mb-8 md:mb-12 leading-snug font-medium">
                        {data.text}
                    </p>
                    <div className="relative w-full max-w-xs">
                        <input
                            type="email"
                            placeholder={data.placeholder}
                            className="w-full bg-white/80 border-2 border-transparent focus:border-[#2D2D44] rounded-full py-3 px-6 text-right outline-none placeholder-gray-400 text-sm shadow-inner transition-all"
                        />
                        <button className="absolute left-1.5 top-1/2 -translate-y-1/2 bg-[#A090E0] p-2 rounded-full border border-black hover:scale-105 transition-transform flex items-center justify-center w-8 h-8 shadow-md" aria-label="שליחה">
                            <ArrowLeft size={16} color="white" />
                        </button>
                    </div>
                    <svg className="absolute bottom-6 left-6 md:bottom-10 md:left-10 w-12 h-12 md:w-16 md:h-16 opacity-30 text-[#2D2D44]" viewBox="0 0 100 100">
                        <path d="M10,90 Q50,10 90,90" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5" />
                        <path d="M85,80 L90,90 L80,92" fill="none" stroke="currentColor" strokeWidth="2" />
                    </svg>
                </div>

                {/* דסקטופ: תמונה שמאל | מובייל: גלריית תמונות מתחת (1 גדולה + 3 קטנות) */}
                <div className="hidden md:block rounded-[40px] overflow-hidden border-2 border-transparent h-[400px] md:h-full relative shadow-sm group">
                    <img src={leftImg} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
            </div>

            {/* מובייל: גלריה – תמונה גדולה (שמאל) + 3 קטנות (ימין). ב-RTL: עמודה 1=ימין, 2–4=שמאל */}
            <div className="md:hidden mt-6 grid grid-cols-4 grid-rows-3 gap-2 max-w-lg mx-auto aspect-[4/3] max-h-[320px]">
                <div className="col-start-2 col-span-3 row-span-3 rounded-2xl overflow-hidden border-2 border-[#2D2D44]/10 bg-gray-100">
                    <img src={galleryImages[0]} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="col-start-1 row-start-1 rounded-xl overflow-hidden bg-gray-100 border border-[#2D2D44]/10">
                    <img src={galleryImages[1]} alt="" className="w-full h-full object-cover aspect-square" />
                </div>
                <div className="col-start-1 row-start-2 rounded-xl overflow-hidden bg-gray-100 border border-[#2D2D44]/10">
                    <img src={galleryImages[2]} alt="" className="w-full h-full object-cover aspect-square" />
                </div>
                <div className="col-start-1 row-start-3 rounded-xl overflow-hidden bg-gray-100 border border-[#2D2D44]/10">
                    <img src={galleryImages[3]} alt="" className="w-full h-full object-cover aspect-square" />
                </div>
            </div>
        </div>
    );
};

export default HomeNewsletter;