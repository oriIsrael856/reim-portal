import React, { useState } from 'react';
import { ArrowDown, Star } from 'lucide-react';

// Decorative assets live in public/assets – use root paths only (no import).

const HomeHero = ({ data }) => {
    const [carouselIndex, setCarouselIndex] = useState(0);
    const images = data.images || [];
    const hasMultiple = images.length > 1;

    return (
        <div
            className="text-center relative overflow-hidden overflow-x-clip md:min-h-0 md:flex md:flex-col md:justify-center md:max-h-[calc(100vh-5.5rem)]"
            style={{
                paddingTop: 'clamp(0.5rem, 4vh, 1.5rem)',
                paddingBottom: 'clamp(0.5rem, 5vh, 2rem)',
                maxWidth: 'min(1100px, 92vw)',
                marginInline: 'auto',
                paddingInline: '4%'
            }}
        >
            {/* --- LEFT PLANE ASSEMBLY --- */}
            <div className="absolute top-[10%] left-[5%] md:left-[12%] z-10 pointer-events-none select-none scale-75 md:scale-100">
                {/* Trail (Above and behind the plane) */}
                <img
                    src="/assets/Vector 3.png"
                    alt="trail"
                    className="absolute -top-12 -right-8 w-24 opacity-60 -z-10"
                />
                {/* Plane (Rotated to face down-right towards the title) */}
                <img
                    src="/assets/Vector 1.png"
                    alt="plane"
                    className="relative z-10 w-16 rotate-[20deg] animate-[bounce_4s_infinite]"
                />
            </div>

            {/* --- RIGHT PLANE ASSEMBLY --- */}
            <div className="absolute top-[40%] right-[5%] md:right-[12%] z-10 pointer-events-none select-none scale-75 md:scale-100">
                {/* Trail (Below and behind the plane, flipped horizontally using -scale-x-100) */}
                <img
                    src="/assets/Vector 3.png"
                    alt="trail"
                    className="absolute -bottom-10 -left-12 w-24 opacity-60 -z-10 -scale-x-100 rotate-12"
                />
                {/* Plane (Rotated to face up-left towards the title) */}
                <img
                    src="/assets/Vector 2 (1).png"
                    alt="plane"
                    className="relative z-10 w-16 -rotate-[15deg] animate-[bounce_5s_infinite]"
                />
            </div>

            {/* כותרות – כמו בתמונה: שלוש שורות, מיושר למרכז, שורה אחרונה סגולה עם קו צהוב־כתום */}
            <div className="relative z-20 text-center" style={{ marginBottom: 'clamp(2rem, 6vh, 3.5rem)' }}>
                <p className="text-[#2D2D44] font-medium tracking-wide opacity-80 md:font-['Rubik']" style={{ fontSize: 'clamp(0.75rem, 1.8vw, 1rem)', marginBottom: '0.25rem' }}>{data.subtitle}</p>
                <h1 className="font-black text-[#2D2D44] leading-tight md:font-['Rubik']" style={{ fontSize: 'clamp(2.5rem, 9vw, 6rem)', marginBottom: '0.25rem' }}>
                    {data.title1}
                </h1>
                {data.titleLine2 && (
                    <h1 className="font-black text-[#2D2D44] leading-tight md:font-['Rubik']" style={{ fontSize: 'clamp(2.5rem, 9vw, 6rem)', marginBottom: '0.25rem' }}>
                        {data.titleLine2}
                    </h1>
                )}
                <div className="relative inline-block">
                    <h1 className="font-black text-[#5E3BEE] leading-tight relative z-10 md:font-['Rubik']" style={{ fontSize: 'clamp(2.5rem, 9vw, 6rem)' }}>
                        {data.title2}
                    </h1>
                    <div className="absolute bottom-0.5 left-0 w-full bg-[#FFD028] -z-0 rounded-sm" style={{ height: 'clamp(4px, 0.5vh, 12px)' }} />
                </div>
            </div>

            {/* Fallback: star + dot when no SVG – keep for small screens / no assets */}
            <div className="absolute right-[10%] text-[#FFD028] z-10 block md:block" style={{ top: 'clamp(2rem, 12vh, 4rem)' }}>
                <Star fill="currentColor" className="animate-pulse" style={{ width: 'clamp(16px, 1.2vw, 24px)', height: 'clamp(16px, 1.2vw, 24px)' }} />
            </div>
            <div className="absolute left-[15%] bg-[#FF5C5C] rounded-full block md:block z-10" style={{ top: 'clamp(4rem, 18vh, 6rem)', width: 'clamp(6px, 0.5vw, 10px)', height: 'clamp(6px, 0.5vw, 10px)' }} />
            <svg className="hidden absolute left-[8%] text-[#7DD3FC] opacity-90 z-10" style={{ top: 'clamp(4rem, 14vh, 5rem)', width: 'clamp(24px, 5vw, 36px)', height: 'clamp(24px, 5vw, 36px)' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 19l-7-7 7-7M19 12H5"/></svg>

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
                    const isLeftImage = i === images.length - 1; // תמונה שמאלית ב־RTL – מלבנית יותר
                    return (
                        <div key={i} className="relative transition-all duration-500 hover:z-50 hover:scale-110 shrink-0"
                            style={{
                                transform: `rotate(${rotate}deg) translateY(${translateY}px)`,
                                width: i === 2 ? 'clamp(80px, 18vw, 220px)' : isLeftImage ? 'clamp(100px, 22vw, 280px)' : 'clamp(70px, 14vw, 180px)',
                                aspectRatio: isLeftImage ? '4/3' : undefined,
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

            {/* מובייל: קולאז' 3 תמונות – גדול באמצע, שתיים משופעות למטה כמו בעיצוב */}
            <div className="md:hidden relative z-10 mx-auto w-[88%] max-w-[360px]" style={{ marginTop: 'clamp(1.25rem, 4vh, 1.75rem)' }}>
                <div
                    className="relative"
                    style={{ height: 'clamp(230px, 52vw, 270px)' }}
                >
                    {/* כרטיס מרכזי – הגדול עם כל החבורה, ישר במרכז */}
                    {images[0] && (
                        <div
                            className="absolute inset-x-[10%] top-0 bottom-[22%] rounded-2xl bg-white shadow-xl border-2 border-[#E2E0F5] overflow-hidden z-10"
                            style={{ transform: 'rotate(0deg)' }}
                        >
                            <img src={images[0]} alt="" className="w-full h-full object-cover" />
                        </div>
                    )}

                    {/* כרטיס שמאלי תחתון – יותר בפינה השמאלית התחתונה מעל התמונה הגדולה */}
                    {images[1] && (
                        <div
                            className="absolute bottom-[-6%] right-[54%] w-[52%] rounded-2xl bg-white shadow-lg border border-[#E2E0F5] overflow-hidden z-20"
                            style={{ transform: 'rotate(-10deg)' }}
                        >
                            <img src={images[1]} alt="" className="w-full h-full object-cover" />
                        </div>
                    )}

                    {/* כרטיס ימני תחתון – קטן יותר, יושב על התמונה הגדולה ויורד למטה */}
                    {images[2] && (
                        <div
                            className="absolute bottom-[-6%] left-[58%] w-[34%] rounded-2xl bg-white shadow-lg border border-[#E2E0F5] overflow-hidden z-20"
                            style={{ transform: 'rotate(9deg)' }}
                        >
                            <img src={images[2]} alt="" className="w-full h-full object-cover" />
                        </div>
                    )}
                </div>
            </div>

            <div className="flex justify-center flex-shrink-0" style={{ marginTop: 'clamp(7.5rem, 16vh, 9rem)' }}>
                <button className="bg-[#D1E68F] rounded-full border border-black/10 shadow-md animate-bounce hover:bg-[#c3d97f] transition" aria-label="גלילה למטה" style={{ padding: 'clamp(0.4rem, 1vw, 0.75rem)' }}>
                    <ArrowDown style={{ width: 'clamp(16px, 2vw, 24px)', height: 'clamp(16px, 2vw, 24px)' }} color="#2D2D44" />
                </button>
            </div>
        </div>
    );
};
export default HomeHero;