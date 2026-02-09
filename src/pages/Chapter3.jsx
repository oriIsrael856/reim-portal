import React from 'react';
import { ArrowLeft, Check } from 'lucide-react';
import NextChapterButton from '../components/common/NextChapterButton';
import StickyCard from '../components/common/StickyCard';
import SplitStickyLayout from '../components/layout/SplitStickyLayout';
import ProcessCard from '../components/common/ProcessCard';
import Accordion from '../components/common/Accordion';

const Chapter3 = ({ data, onNext }) => {
    // הגנה מפני קריסה במקרה של חוסר בנתונים
    if (!data) return <div className="text-center p-20 text-[#816AFE] font-bold">טוען נתוני פרק 3...</div>;

    // --- 1. הגדרת התוכן הדביק לצד ימין ---
    const StickyHeader = (
        <div className="flex flex-col items-start pl-4 md:pl-10">
            {/* תגית פרק */}
            <div className="inline-flex items-center gap-2 bg-[#C5E080] border-2 border-black px-4 py-1.5 rounded-full mb-8 shadow-[3px_3px_0px_black] transform -rotate-1">
                <span className="font-bold text-[#2D2D44] tracking-wide text-sm">{data.hero?.tag}</span>
                <div className="bg-white/40 px-2 rounded-full text-xs font-bold border border-black/10">03</div>
            </div>

            {/* כותרת ראשית */}
            <h1 className="text-5xl md:text-7xl font-black text-[#2D2D44] leading-[1.1] mb-8 text-right">
                {data.hero?.titleTop}
                <br />
                <span className="text-[#5E3BEE] relative inline-block mt-2">
                    {data.hero?.titleBottom}
                    <span className="absolute bottom-2 left-0 w-full h-4 bg-[#FFB84C] -z-10 rounded-sm transform -rotate-1"></span>
                </span>
            </h1>

            {/* תיאור */}
            <p className="text-xl md:text-2xl text-[#2D2D44] font-medium leading-relaxed max-w-lg text-right">
                {data.hero?.description}
            </p>
            
            {/* אלמנטים דקורטיביים */}
            <div className="absolute top-40 -right-10 text-6xl text-[#EF4444] animate-pulse hidden md:block">✶</div>
            <div className="absolute bottom-0 left-10 text-4xl text-[#C5E080] hidden md:block">✦</div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#FFFDF5] pt-32 pb-0 font-['Rubik'] overflow-x-clip">
            
            {/* --- חלק א': תפקיד ואחריות (Split Sticky) --- */}
            <SplitStickyLayout stickyContent={StickyHeader}>
                
                {/* כרטיס תמונה ראשי */}
                <StickyCard top="100px">
                    <div className="relative w-full h-full min-h-[500px] rounded-[20px] overflow-hidden bg-gray-100 border-4 border-white shadow-inner group">
                        <img 
                            src={data.hero?.image} 
                            alt="רכזת רעים" 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute bottom-6 left-6 flex flex-col items-center">
                            <span className="text-[80px] font-black text-[#5E3BEE] font-['Salsa'] leading-none drop-shadow-sm bg-white/80 px-4 rounded-xl backdrop-blur-sm">
                                03
                            </span>
                        </div>
                    </div>
                </StickyCard>

                {/* כרטיסי אחריות נערמים */}
                {data.responsibilities && data.responsibilities.map((card, index) => (
                    <StickyCard key={index} top={`${140 + (index * 40)}px`}>
                        <div className="flex flex-col h-full justify-center p-4">
                            <h3 className={`text-3xl md:text-4xl font-black mb-8 text-center ${card.titleColor || 'text-[#2D2D44]'}`}>
                                {card.title}
                            </h3>
                            <ul className="flex flex-col gap-4 pr-4">
                                {card.items.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-lg text-[#2D2D44] leading-snug">
                                        <div className="mt-1 flex-shrink-0 bg-[#EBE5FC] p-1 rounded-full text-[#5E3BEE]">
                                            <ArrowLeft size={16} strokeWidth={3} />
                                        </div>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                            {card.action && (
                                <div className="mt-8 text-center">
                                    <button className="bg-[#5E3BEE] text-white px-6 py-3 rounded-full font-bold hover:bg-[#4a2ec6] transition-colors shadow-md flex items-center gap-2 mx-auto transition-transform hover:scale-105">
                                        {card.action.text}
                                        <ArrowLeft size={18} />
                                    </button>
                                </div>
                            )}
                        </div>
                    </StickyCard>
                ))}
            </SplitStickyLayout>

            {/* --- חלק ב': מדריך לרכזת מתחילה (קונטיינר סגול) --- */}
            {data.onboarding && (
                <div className="w-full bg-[#F3F0FF] border-t border-[#2D2D44]/5 py-24 relative mt-32">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#EBE5FC] rounded-bl-full opacity-50 pointer-events-none"></div>

                    <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">
                        <div className="text-center mb-16">
                            <h2 className="text-2xl font-bold text-[#2D2D44]/60 mb-2">{data.onboarding.titleTop}</h2>
                            <h3 className="text-5xl md:text-6xl font-black text-[#5E3BEE]">
                                {data.onboarding.titleBottom}
                                <span className="block w-24 h-2 bg-[#FFB84C] mx-auto mt-4 rounded-full"></span>
                            </h3>
                            <p className="mt-6 text-xl text-[#2D2D44] max-w-2xl mx-auto whitespace-pre-line leading-relaxed">
                                {data.onboarding.description}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
                            {data.onboarding.steps.map((step, index) => (
                                <div key={index} className="h-full">
                                    <ProcessCard 
                                        number={step.id} 
                                        step={step.step} 
                                        title={step.title} 
                                        items={step.items} 
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* --- חלק ג': מבנה המפגש (אקורדיון ותמונות) --- */}
            {data.sessionStructure && (
                <div className="w-full bg-white py-32 px-6 overflow-hidden border-t border-gray-100">
                    <div className="max-w-[1400px] mx-auto">
                        <div className="text-center mb-20">
                            <span className="text-[#5E3BEE] font-bold text-sm tracking-widest uppercase mb-2 block">
                                {data.sessionStructure.recommendation}
                            </span>
                            <h2 className="text-4xl md:text-5xl font-black text-[#2D2D44]">
                                {data.sessionStructure.title}
                            </h2>
                        </div>

                        <div className="flex flex-col lg:flex-row items-start gap-16 md:gap-24">
                            {/* תמונות מרחפות */}
                            <div className="w-full lg:w-5/12 relative min-h-[500px] hidden md:block">
                                <div className="absolute top-0 right-0 w-[85%] aspect-video rounded-[30px] overflow-hidden border-[3px] border-[#2D2D44] shadow-[12px_12px_0px_rgba(45,45,68,0.1)] rotate-[-3deg] hover:rotate-0 transition-transform duration-500 z-20">
                                    <img src={data.sessionStructure.images[0]} alt="פיצה" className="w-full h-full object-cover" />
                                </div>
                                <div className="absolute -bottom-10 left-0 w-[70%] aspect-video rounded-[30px] overflow-hidden border-[3px] border-[#2D2D44] shadow-[12px_12px_0px_rgba(45,45,68,0.1)] rotate-[4deg] hover:rotate-0 transition-transform duration-500 z-30">
                                    <img src={data.sessionStructure.images[1]} alt="מעגל" className="w-full h-full object-cover" />
                                </div>
                            </div>

                            {/* אקורדיון */}
                            <div className="w-full lg:w-7/12">
                                <div className="bg-[#FDFBFF] p-2 md:p-8 rounded-[40px] border-2 border-[#816AFE]/5 shadow-sm">
                                    <Accordion items={data.sessionStructure.items} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* כפתור מעבר לפרק הבא / סיום */}
            <div className="my-32 px-4 max-w-4xl mx-auto">
                 <NextChapterButton 
                    title="סיימנו את פרק 3"
                    subtitle="חזרה לעמוד הבית"
                    onClick={onNext} 
                />
            </div>
        </div>
    );
};

export default Chapter3;