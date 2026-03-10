import React, { useRef } from 'react';
import { ChevronRight, ChevronLeft, ThumbsUp, Users, Star, Layers, Bell, ArrowUpLeft } from 'lucide-react';

// מפת אייקונים: מחרוזת -> קומפוננטה
const ICON_MAP = {
    "ThumbsUp": <ThumbsUp size={32} />,
    "Users": <Users size={32} />,
    "Star": <Star size={32} />,
    "Layers": <Layers size={32} />,
    "Bell": <Bell size={32} />
};

// מיפוי מזהה כרטיס → עמוד
const CARD_ID_TO_PAGE = {
    "01": "chapter1",
    "02": "chapter2",
    "03": "chapter3",
    "04": "chapter4",
    "05": "chapter5"
};

const HomeCarousel = ({ items, navigateTo, carouselHeader }) => {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (scrollRef.current?.firstChild) {
            const card = scrollRef.current.firstChild;
            const gap = parseFloat(getComputedStyle(scrollRef.current).gap) || 12;
            const scrollAmount = (card.offsetWidth + gap) * (direction === 'right' ? 1 : -1);
            scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    const handleCardClick = (card) => {
        const page = card.page || CARD_ID_TO_PAGE[card.id];
        if (page && navigateTo) navigateTo(page);
    };

    // פיצול כותרת לחלק רגיל + חלק מודגש (אחרי ":" או שורה חדשה)
    const renderTitle = (title) => {
        if (!title) return null;
        const sep = title.includes(':\n') ? ':\n' : title.includes(':') ? ':' : null;
        if (!sep) return <span>{title}</span>;
        const i = title.indexOf(sep);
        const before = title.slice(0, i + (sep === ':' ? 1 : 2));
        const after = title.slice(i + sep.length).trim();
        return (<><span>{before}</span><span className="text-[#2D2D44] group-hover:text-[#FFD028] transition-colors">{after}</span></>);
    };

    return (
        <div className="mb-[clamp(1rem,4vw,2rem)] w-full max-w-[95vw] mx-auto px-[4%]">
            {/* כותרת מימין, חצים משמאל (RTL) */}
            <div className="flex justify-between items-end px-0 md:px-[1%]" style={{ marginBottom: 'clamp(0.75rem, 2vw, 1.5rem)' }}>
                <div className="text-right shrink-0 min-w-0">
                    <p className="text-gray-500 font-medium mb-0.5" style={{ fontSize: 'clamp(0.7rem, 1.5vw, 0.95rem)' }}>{carouselHeader?.label ?? 'כל מה שכדאי לדעת'}</p>
                    <h2 className="font-black text-[#2D2D44]" style={{ fontSize: 'clamp(1.25rem, 2.8vw, 1.9rem)' }}>{carouselHeader?.title ?? 'המדריכה לרכזות ורכזים'}</h2>
                </div>
                <div className="hidden md:flex gap-[0.5vw] ltr shrink-0">
                    <button onClick={() => scroll('right')} className="flex items-center justify-center bg-[#EBE5FC] rounded-full text-[#5E3BEE] hover:bg-[#5E3BEE] hover:text-white transition-colors" style={{ width: 'clamp(32px, 2.5vw, 44px)', height: 'clamp(32px, 2.5vw, 44px)' }}>
                        <ChevronRight style={{ width: 'clamp(16px, 1.2vw, 22px)', height: 'clamp(16px, 1.2vw, 22px)' }} />
                    </button>
                    <button onClick={() => scroll('left')} className="flex items-center justify-center bg-[#EBE5FC] rounded-full text-[#5E3BEE] hover:bg-[#5E3BEE] hover:text-white transition-colors" style={{ width: 'clamp(32px, 2.5vw, 44px)', height: 'clamp(32px, 2.5vw, 44px)' }}>
                        <ChevronLeft style={{ width: 'clamp(16px, 1.2vw, 22px)', height: 'clamp(16px, 1.2vw, 22px)' }} />
                    </button>
                </div>
            </div>

            {/* הקרוסלה – כרטיסים באחוזים: 5 כרטיסים + רווחים נכנסים ב־100% */}
            <div
                ref={scrollRef}
                className="flex overflow-x-auto no-scrollbar snap-x"
                style={{
                    gap: 'clamp(0.5rem, 1.2vw, 1.25rem)',
                    paddingTop: '0.5rem',
                    paddingBottom: 'clamp(1.5rem, 4vw, 2.5rem)',
                    scrollPaddingLeft: '1rem',
                    scrollPaddingRight: '1rem'
                }}
            >
                {items.map((card) => (
                    <div key={card.id} className="flex-shrink-0 snap-start pt-1 pb-2">
                        <div
                            onClick={() => handleCardClick(card)}
                            className="bg-white rounded-xl border border-transparent transition-all duration-300 cursor-pointer flex flex-col justify-between group relative overflow-visible"
                            style={{
                                // כרטיס צר יותר – בערך 60% מרוחב המסך במובייל, עדיין רואים כרטיס אחד ועוד \"רבע\"
                                width: 'clamp(180px, 60vw, 220px)',
                                minWidth: 'clamp(180px, 60vw, 220px)',
                                aspectRatio: '3/4',
                                padding: 'clamp(0.6rem, 1.4vw, 1.25rem)',
                                boxShadow: '0 4px 16px rgba(0,0,0,0.04)'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = '#FFF8EB';
                                e.currentTarget.style.boxShadow = '8px 12px 32px rgba(45,45,68,0.18), 0 4px 12px rgba(0,0,0,0.08)';
                                e.currentTarget.style.transform = 'translateY(-6px) scale(1.08)';
                                e.currentTarget.style.zIndex = '10';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = '';
                                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.04)';
                                e.currentTarget.style.transform = '';
                                e.currentTarget.style.zIndex = '';
                            }}
                        >
                            {/* אייקון פינה ימנית־עליונה – מופיע בהובר */}
                            <div className="absolute top-[clamp(0.5rem,1.2vw,1.25rem)] left-[clamp(0.5rem,1.2vw,1.25rem)] w-8 h-8 rounded-lg bg-[#FFB84C] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <ArrowUpLeft className="text-white" size={18} strokeWidth={2.5} />
                            </div>

                            {/* מספר – ימין למעלה (RTL: start = ימין) */}
                            <div className="flex justify-start pt-1">
                                <span className="font-black text-[#2D2D44] font-['Salsa'] group-hover:text-[#FFD028] transition-colors" style={{ fontSize: 'clamp(2rem, 3.6vw, 3.1rem)' }}>
                                    {card.id}
                                </span>
                            </div>

                            {/* תוכן – אייקון, כותרת, תיאור – מיושר לימין (RTL: items-start = ימין) */}
                            <div className="flex flex-col items-start text-right mt-auto pt-2">
                                <div className="text-[#2D2D44] group-hover:scale-110 transition-transform duration-300 mb-2">
                                    {ICON_MAP[card.icon] || <Star size={26} />}
                                </div>
                                <h3 className="font-black text-[#2D2D44] leading-tight whitespace-pre-line w-full" style={{ fontSize: 'clamp(0.9rem, 1.6vw, 1.1rem)', marginBottom: '0.4rem' }}>
                                    {renderTitle(card.title)}
                                </h3>
                                <p className="text-gray-400 leading-relaxed font-medium w-full" style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.85rem)' }}>
                                    {card.desc}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default HomeCarousel;