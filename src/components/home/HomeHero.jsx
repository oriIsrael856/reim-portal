import React, { useState } from 'react';
import { ArrowDown, Star } from 'lucide-react';

const HomeHero = ({ data }) => {
    const [carouselIndex, setCarouselIndex] = useState(0);
    const images = data.images || [];
    const hasMultiple = images.length > 1;

    return (
        <div
            className="text-center px-[4%] relative overflow-hidden md:min-h-0 md:flex md:flex-col md:justify-center md:max-h-[calc(100vh-5.5rem)]"
            style={{
                paddingTop: 'clamp(0.5rem, 4vh, 1.5rem)',
                paddingBottom: 'clamp(0.5rem, 5vh, 2rem)'
            }}
        >
            {/* כותרות – גודל באחוזים (vw), z גבוה כדי שלא ייכוסו על ידי התמונות */}
            <div className="relative z-20" style={{ marginBottom: 'clamp(2rem, 6vh, 3.5rem)' }}>
                <p className="text-[#2D2D44] font-medium tracking-wide opacity-80 md:font-['Rubik']" style={{ fontSize: 'clamp(0.75rem, 1.8vw, 1rem)', marginBottom: '0.25rem' }}>{data.subtitle}</p>
                <h1 className="font-black text-[#2D2D44] leading-tight md:font-['Rubik']" style={{ fontSize: 'clamp(1.25rem, 4.5vw, 3rem)', marginBottom: '0.25rem' }}>
                    {data.title1}
                </h1>
                <div className="relative inline-block">
                    <h1 className="font-black text-[#5E3BEE] leading-tight relative z-10 md:font-['Rubik']" style={{ fontSize: 'clamp(1.25rem, 4.5vw, 3rem)' }}>
                        {data.title2}
                    </h1>
                    <div className="absolute bottom-0.5 left-0 w-full bg-[#FFD028] -z-0 rounded-sm" style={{ height: 'clamp(4px, 0.5vh, 12px)' }}></div>
                </div>
            </div>

            {/* קישוטים – מיקום באחוזים, גודל ב־vw */}
            <div className="absolute right-[10%] text-[#FFD028]" style={{ top: 'clamp(2rem, 12vh, 4rem)' }}>
                <Star fill="currentColor" style={{ width: 'clamp(16px, 1.2vw, 24px)', height: 'clamp(16px, 1.2vw, 24px)' }} />
            </div>
            <div className="absolute left-[15%] bg-[#FF5C5C] rounded-full hidden md:block" style={{ top: 'clamp(4rem, 18vh, 6rem)', width: 'clamp(6px, 0.5vw, 10px)', height: 'clamp(6px, 0.5vw, 10px)' }} />
            <svg className="absolute left-[8%] text-[#7DD3FC] opacity-90 md:hidden" style={{ top: 'clamp(4rem, 14vh, 5rem)', width: 'clamp(24px, 5vw, 36px)', height: 'clamp(24px, 5vw, 36px)' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 19l-7-7 7-7M19 12H5"/></svg>

            {/* דסקטופ: גלריית תמונות – רווח ברור מהכותרת כדי שהתמונות לא יעלו על הטקסט */}
            <div
                className="hidden md:flex justify-center items-center relative z-0 max-w-[90vw] mx-auto perspective-1000 flex-shrink-0"
                style={{
                    gap: 'clamp(0.5rem, 1vw, 1.25rem)',
                    marginTop: 'clamp(3rem, 8vh, 6rem)',
                    height: 'clamp(120px, 22vh, 240px)'
                }}
            >
                {images.map((img, i) => {
                    const rotate = i === 2 ? 0 : i === 1 ? -3 : i === 0 ? -6 : i === 3 ? 3 : 6;
                    const translateY = i === 2 ? 0 : i === 1 || i === 3 ? 10 : 20;
                    return (
                        <div key={i} className="relative transition-all duration-500 hover:z-50 hover:scale-110 shrink-0"
                            style={{
                                transform: `rotate(${rotate}deg) translateY(${translateY}px)`,
                                width: i === 2 ? 'clamp(80px, 18vw, 220px)' : 'clamp(70px, 14vw, 180px)',
                                zIndex: i === 2 ? 10 : 5
                            }}>
                            <div className="p-[2%] bg-white rounded-xl shadow-lg border border-gray-100 w-full h-full min-h-0 flex flex-col">
                                <div className="w-full flex-1 min-h-0 overflow-hidden rounded-lg bg-gray-200">
                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* מובייל: קרוסלה – רוחב באחוזים */}
            <div className="md:hidden relative z-10 mx-auto w-[92%] max-w-[360px]" style={{ marginTop: 'clamp(1rem, 4vh, 1.5rem)' }}>
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
                                className={`rounded-full border-2 transition-colors ${i === carouselIndex ? 'bg-[#5E3BEE] border-[#5E3BEE]' : 'bg-transparent border-[#2D2D44]/40'}`}
                                style={{ width: 'clamp(8px, 2vw, 12px)', height: 'clamp(8px, 2vw, 12px)' }}
                            />
                        ))}
                    </div>
                )}
            </div>

            <div className="flex justify-center flex-shrink-0" style={{ marginTop: 'clamp(0.5rem, 3vh, 1.5rem)' }}>
                <button className="bg-[#D1E68F] rounded-full border border-black/10 shadow-md animate-bounce hover:bg-[#c3d97f] transition" aria-label="גלילה למטה" style={{ padding: 'clamp(0.4rem, 1vw, 0.75rem)' }}>
                    <ArrowDown style={{ width: 'clamp(16px, 2vw, 24px)', height: 'clamp(16px, 2vw, 24px)' }} color="#2D2D44" />
                </button>
            </div>
        </div>
    );
};
export default HomeHero;