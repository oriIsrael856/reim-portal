import React from 'react';
import { Mail, ArrowLeft, Star, Plus } from 'lucide-react';
import SplitStickyLayout from '../components/layout/SplitStickyLayout';
import Accordion from '../components/common/Accordion';
import CheckCard from '../components/chapter5/CheckCard';
import NextChapterButton from '../components/common/NextChapterButton';
import PrevChapterButton from '../components/common/PrevChapterButton';

const Chapter5 = ({ data, onNext, onPrev }) => {
    // הגנה מפני קריסה במקרה של חוסר בנתונים
    if (!data) return <div className="p-20 text-center font-bold text-[#816AFE]">טוען נתוני כלים מעשיים...</div>;

    // --- 1. הגדרת הכותרת הדביקה לשיווק וגיוס ---
    const MarketingHeader = (
        <div className="text-right pr-4 md:pr-10">
            <h2 className="text-[#5E3BEE] font-black text-4xl mb-4">
                שיווק וגיוס
                <br />
                <span className="text-[#2D2D44]">משתתפים ומשתתפות</span>
            </h2>
            <div className="w-20 h-1.5 bg-[#C5E080] rounded-full mb-8"></div>
            <p className="text-lg leading-relaxed text-[#2D2D44]/80 whitespace-pre-line font-medium">
                {data.marketing?.text}
            </p>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#FFFDF5] pt-32 pb-20 font-['Rubik']">
            {onPrev && (
                <div className="pt-6 pb-4 px-4">
                    <PrevChapterButton title="לפרק הקודם" subtitle="פרק 04 - עבודה מנהלית" onClick={onPrev} />
                </div>
            )}
            {/* --- 2. Hero Section --- */}
            <header className="max-w-7xl mx-auto px-6 text-center mb-40 relative">
                <div className="inline-flex items-center gap-2 bg-[#C5E080] border-2 border-[#2D2D44] px-4 py-1.5 rounded-full mb-8 font-bold text-sm shadow-[3px_3px_0px_#2D2D44]">
                    <span>{data.hero?.tag}</span>
                    <div className="bg-white/40 px-2 rounded-full text-xs">05</div>
                </div>
                <h1 className="text-6xl md:text-8xl font-black text-[#2D2D44] relative z-10 mb-20">
                    {data.hero?.title}
                    <span className="absolute bottom-4 right-0 w-full h-6 bg-[#FFB84C] -z-10 rounded-sm"></span>
                </h1>

                {/* קומפוזיציית תמונות מרחפות */}
                <div className="relative max-w-5xl mx-auto h-[500px] hidden md:block">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/5 h-full rounded-[40px] overflow-hidden border-4 border-white shadow-2xl z-20">
                        <img src={data.hero?.images?.[0]} className="w-full h-full object-cover" alt="כלים מעשיים" />
                    </div>
                    <div className="absolute top-20 left-10 w-1/4 aspect-square rounded-3xl overflow-hidden border-4 border-white shadow-xl rotate-[-6deg] z-10">
                        <img src={data.hero?.images?.[1]} className="w-full h-full object-cover" alt="פעילות קבוצתית" />
                    </div>
                    <div className="absolute bottom-10 right-10 w-1/4 aspect-square rounded-3xl overflow-hidden border-4 border-white shadow-xl rotate-[6deg] z-30">
                        <img src={data.hero?.images?.[2]} className="w-full h-full object-cover" alt="חברי רעים" />
                    </div>
                </div>
                <div className="text-[180px] font-black text-[#816AFE] absolute top-10 left-0 opacity-[0.05] font-['Salsa'] pointer-events-none">05</div>
            </header>

            {/* --- 3. Marketing Section (שימוש ב-Split Layout) --- */}
            <section className="mb-48">
                <SplitStickyLayout stickyContent={MarketingHeader}>
                    <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-sm border border-[#2D2D44]/5">
                        <h4 className="font-black text-2xl mb-8 text-center text-[#2D2D44] underline decoration-[#C5E080] decoration-4 underline-offset-8">
                            {data.marketing?.stepsTitle}
                        </h4>
                        <Accordion items={data.marketing?.steps || []} />
                    </div>
                </SplitStickyLayout>
            </section>

            {/* --- 4. Networking Section (כרטיסי ה-Check המעוצבים) --- */}
            <section className="max-w-7xl mx-auto px-6 mb-48 text-center">
                <h2 className="text-5xl font-black text-[#2D2D44] mb-20">{data.networking?.title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
                    {data.networking?.cards?.map((c, i) => (
                        <CheckCard key={i} title={c.title} text={c.text} />
                    ))}
                </div>
            </section>

            {/* --- 5. Resources Section: הרכזיה (שמאל) | ניוזלטר (אמצע) | גריד תמונות (ימין) --- */}
            <section className="max-w-[1600px] mx-auto px-6 mb-32 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                {/* א. הרכזיה – כרטיס לבן: טקסט בצד, תמונה בצד (ב-RTL: טקסט ימין, תמונה שמאל) */}
                <div className="bg-white border-2 border-[#2D2D44] rounded-[40px] overflow-hidden shadow-[8px_8px_0px_rgba(45,45,68,0.05)] flex flex-col lg:flex-row min-h-[480px]">
                    <div className="lg:w-2/3 h-64 lg:h-auto min-h-[280px] overflow-hidden shrink-0">
                        <img src={data.resources?.library?.image} className="w-full h-full object-cover" alt="הרכזיה" />
                    </div>
                    <div className="lg:w-1/3 p-8 flex flex-col justify-between text-right">
                        <div>
                            <h3 className="text-3xl font-black mb-4 text-[#2D2D44]">{data.resources?.library?.title}</h3>
                            <p className="text-[#2D2D44]/80 text-sm leading-relaxed font-medium">
                                {data.resources?.library?.desc}
                            </p>
                        </div>
                        <button className="mt-8 bg-[#5E3BEE] text-white px-8 py-3 rounded-full font-bold inline-flex items-center gap-2 hover:bg-[#4a2ec6] transition-all shadow-md hover:-translate-y-1 self-end">
                            <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"><Plus size={18} strokeWidth={3} /></span>
                            {data.resources?.library?.btnText}
                        </button>
                    </div>
                </div>

                {/* ב. ניוזלטר – כרטיס ירוק */}
                <div className="bg-[#C5E080] border-2 border-[#2D2D44] rounded-[40px] p-10 relative overflow-hidden flex flex-col justify-center text-center shadow-[8px_8px_0px_rgba(45,45,68,0.05)] min-h-[480px]">
                    <div className="relative z-10">
                        <div className="flex justify-center mb-4">
                            <Star className="text-[#FFD028] fill-[#FFD028]" size={40} />
                        </div>
                        <h3 className="text-3xl font-black mb-2 text-[#2D2D44]">{data.resources?.newsletter?.title}</h3>
                        <p className="font-bold text-[#2D2D44]/60 mb-2 text-sm">{data.resources?.newsletter?.subtitle}</p>
                        <p className="text-base font-medium mb-8 max-w-xs mx-auto text-[#2D2D44] leading-relaxed">
                            {data.resources?.newsletter?.text}
                        </p>
                        <div className="relative max-w-xs mx-auto">
                            <input
                                type="email"
                                placeholder={data.resources?.newsletter?.placeholder || 'הקלידי את כתובת המייל שלך'}
                                className="w-full py-3.5 px-6 rounded-full border-2 border-[#2D2D44] pr-12 outline-none focus:ring-2 ring-[#5E3BEE]/20 transition-all bg-white/80"
                            />
                            <div className="absolute left-2 top-1/2 -translate-y-1/2 bg-[#5E3BEE] text-white p-2 rounded-full shadow-md">
                                <Mail size={18} />
                            </div>
                        </div>
                    </div>
                    <svg className="absolute bottom-6 left-6 w-14 h-14 opacity-30 text-[#2D2D44] pointer-events-none" viewBox="0 0 100 100">
                        <path d="M10,90 Q50,10 90,90" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5" />
                        <path d="M85,80 L90,90 L80,92" fill="none" stroke="currentColor" strokeWidth="2" />
                    </svg>
                </div>

                {/* ג. תמונה אחת מצד שמאל לניוזלטר */}
                <div className="bg-white border-2 border-[#2D2D44] rounded-[40px] overflow-hidden shadow-[8px_8px_0px_rgba(45,45,68,0.05)] min-h-[480px]">
                    {data.resources?.sideImage && (
                        <img src={data.resources.sideImage} alt="" className="w-full h-full min-h-[480px] object-cover" />
                    )}
                </div>
            </section>

            {/* כפתור סיום האוגדן */}
            <footer className="my-20 px-4 max-w-4xl mx-auto">
                 <NextChapterButton 
                    title="סיימנו את האוגדן!"
                    subtitle="חזרה לעמוד הבית"
                    onClick={() => onNext()} 
                />
            </footer>
        </div>
    );
};

export default Chapter5; // שים לב: וודא ששם הייצוא תואם לייבוא ב-App.js (Chapter5)