import React, { useRef } from 'react';
import { ChevronRight, ChevronLeft, ThumbsUp, Users, Star, Layers, Bell } from 'lucide-react';

// מפת אייקונים: מחרוזת -> קומפוננטה
const ICON_MAP = {
    "ThumbsUp": <ThumbsUp size={32} />,
    "Users": <Users size={32} />,
    "Star": <Star size={32} />,
    "Layers": <Layers size={32} />,
    "Bell": <Bell size={32} />
};

const HomeCarousel = ({ items, navigateTo }) => {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = direction === 'right' ? 340 : -340;
            scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div className="mb-24 max-w-[1920px] mx-auto">
            {/* כותרת וכפתורי ניווט */}
            <div className="flex flex-row-reverse justify-between items-end mb-8 px-8 md:px-20">
                <div className="text-right">
                    <p className="text-gray-500 font-medium mb-1 text-sm">כל מה שכדאי לדעת</p>
                    <h2 className="text-3xl md:text-4xl font-black text-[#2D2D44]">המדריכה לרכזות ורכזים</h2>
                </div>
                <div className="flex gap-3 ltr">
                    <button onClick={() => scroll('left')} className="w-12 h-12 flex items-center justify-center bg-[#EBE5FC] rounded-full text-[#5E3BEE] hover:bg-[#5E3BEE] hover:text-white transition-colors">
                        <ChevronLeft size={24} />
                    </button>
                    <button onClick={() => scroll('right')} className="w-12 h-12 flex items-center justify-center bg-[#EBE5FC] rounded-full text-[#5E3BEE] hover:bg-[#5E3BEE] hover:text-white transition-colors">
                        <ChevronRight size={24} />
                    </button>
                </div>
            </div>

            {/* הקרוסלה */}
            <div 
                ref={scrollRef} 
                className="flex gap-6 overflow-x-auto pb-12 px-8 md:px-20 no-scrollbar snap-x"
                style={{ scrollPaddingLeft: '2rem', scrollPaddingRight: '2rem' }}
            >
                {items.map((card) => (
                    <div
                        key={card.id}
                        onClick={() => card.id === "01" && navigateTo('chapter1')}
                        className="min-w-[280px] w-[280px] h-[380px] bg-white p-8 rounded-[32px] shadow-[0px_4px_20px_rgba(0,0,0,0.03)] border border-transparent hover:border-[#2D2D44] transition-all cursor-pointer snap-start flex flex-col justify-between group relative overflow-hidden"
                    >
                        <div className="absolute top-6 left-6">
                            <span className="text-5xl font-black text-[#2D2D44] font-['Salsa'] opacity-100 group-hover:text-[#FFD028] transition-colors">
                                {card.id}
                            </span>
                        </div>

                        <div className="mt-auto">
                            {/* המרת הטקסט לאייקון */}
                            <div className="mb-4 text-[#2D2D44] group-hover:scale-110 transition-transform origin-bottom-right">
                                {ICON_MAP[card.icon] || <Star size={32} />}
                            </div>
                            <h3 className="text-xl font-black text-[#2D2D44] mb-2 leading-tight whitespace-pre-line">
                                {card.title}
                            </h3>
                            <p className="text-gray-400 text-xs leading-relaxed font-medium">
                                {card.desc}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default HomeCarousel;