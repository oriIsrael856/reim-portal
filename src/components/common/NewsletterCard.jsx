import React from 'react';
import { ArrowLeft, Star } from 'lucide-react';

/**
 * כרטיס ניוזלטר – פרופורציות אחידות לעמוד הבית ופרק 5.
 * מקבל: { title, subtitle, text, placeholder }
 */
const NewsletterCard = ({ data, className = '' }) => {
    if (!data) return null;

    return (
        <div
            className={`bg-[#C5E080] rounded-2xl border-2 border-[#2D2D44] shadow-[3px_3px_0px_#2D2D44] flex flex-col items-center justify-center text-center relative overflow-y-auto ${className}`}
            style={{
                padding: 'clamp(0.5rem, 2vw, 1.25rem) clamp(0.5rem, 1.8vw, 1rem)'
            }}
        >
            <div className="relative flex-shrink-0" style={{ marginBottom: 'clamp(0.4rem, 1vw, 0.6rem)' }}>
                <Star className="text-[#FFD028] fill-[#FFD028] animate-spin-slow" style={{ width: 'clamp(16px, 2.2vw, 24px)', height: 'clamp(16px, 2.2vw, 24px)' }} />
                <div className="absolute top-0 w-1.5 h-1.5 bg-white rounded-full" style={{ left: 'clamp(0.9rem, 1.8vw, 1.4rem)' }} />
            </div>
            {/* תת-כותרת – פי ~1.5 */}
            <p className="font-bold text-[#2D2D44] opacity-80 flex-shrink-0" style={{ fontSize: 'clamp(0.9rem, 1.65vw, 1.1rem)', marginBottom: 'clamp(0.4rem, 1vw, 0.7rem)' }}>{data.subtitle}</p>
            {/* כותרת ראשית – פי ~3 */}
            <h3 className="font-black text-[#2D2D44] flex-shrink-0" style={{ fontSize: 'clamp(1.8rem, 3.3vw, 4.5rem)', marginBottom: 'clamp(0.7rem, 1.4vw, 1rem)' }}>{data.title}</h3>
            {/* טקסט גוף – פי ~1.5 */}
            <p className="text-[#2D2D44] font-medium leading-snug flex-shrink-0" style={{ fontSize: 'clamp(0.95rem, 1.65vw, 1.2rem)', marginBottom: 'clamp(1.1rem, 2.7vh, 1.7rem)', maxWidth: '92%' }}>
                {data.text}
            </p>
            <div className="flex justify-center items-center gap-1 flex-shrink-0" style={{ marginBottom: 'clamp(1rem, 2.5vh, 1.5rem)' }}>
                <svg className="opacity-70 text-[#5E3BEE]" style={{ width: 'clamp(32px, 5vw, 48px)', height: 'clamp(32px, 5vw, 48px)' }} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4,3">
                    <path d="M15,85 Q50,15 85,85" />
                    <path d="M80,75 L85,85 L75,87" />
                </svg>
                <Star className="text-[#5E3BEE] opacity-60" style={{ width: 'clamp(12px, 1.8vw, 18px)', height: 'clamp(12px, 1.8vw, 18px)' }} fill="currentColor" />
            </div>
            <div className="relative w-full flex-shrink-0" style={{ maxWidth: 'min(220px, 95%)' }}>
                <input
                    type="email"
                    placeholder={data.placeholder || 'הקלידי את כתובת המייל שלך'}
                    className="w-full bg-white/90 border-2 border-[#2D2D44]/15 focus:border-[#2D2D44] rounded-full text-right outline-none placeholder-gray-500 shadow-inner transition-all"
                    style={{ padding: 'clamp(0.55rem, 1.1vw, 0.7rem) clamp(0.7rem, 2vw, 1rem)', fontSize: 'clamp(0.95rem, 1.65vw, 1.2rem)' }}
                />
                <button type="button" className="absolute left-1.5 top-1/2 -translate-y-1/2 bg-[#A090E0] rounded-full border-2 border-[#2D2D44]/30 hover:scale-105 transition-transform flex items-center justify-center shadow-md" style={{ width: 'clamp(26px, 3.5vw, 32px)', height: 'clamp(26px, 3.5vw, 32px)' }} aria-label="שליחה">
                    <ArrowLeft style={{ width: 'clamp(12px, 1.5vw, 16px)', height: 'clamp(12px, 1.5vw, 16px)' }} color="white" />
                </button>
            </div>
        </div>
    );
};

export default NewsletterCard;
