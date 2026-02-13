import React from 'react';
import { ArrowLeft, ThumbsUp, Instagram, Facebook, Linkedin } from 'lucide-react';
import StickyCard from '../components/common/StickyCard';
import NextChapterButton from '../components/common/NextChapterButton';

// רכיב עזר: עיגול ירוק עם חץ
const GreenArrowCircle = ({ direction = 'left' }) => (
    <div className={`
        w-12 h-12 rounded-full bg-[#C5E080] border-2 border-black 
        flex items-center justify-center shadow-[3px_3px_0px_black]
        transform transition-transform hover:scale-110 flex-shrink-0
        ${direction === 'right' ? 'rotate-180' : ''}
    `}>
        <ArrowLeft size={22} color="#2D2D44" strokeWidth={2.5} />
    </div>
);

const Chapter1 = ({ data }) => {
    if (!data) return null;

    return (
        <div className="bg-[#F8F7FF] min-h-screen font-['Rubik'] overflow-x-clip">
            
            {/* ============================================================================
               חלק 1 + 2: הראפר הראשי (Split Screen)
               מכיל את הכותרת (ימין) ואת התמונות והכרטיסיות (שמאל)
            ============================================================================ */}
            <div className="max-w-[1800px] mx-auto px-6 md:px-16 pt-20 flex flex-col md:flex-row items-start gap-12 relative mb-20">
                
                {/* --- צד ימין: הכותרת הדביקה --- */}
                {/* היא תהיה דביקה רק כל עוד הראפר הזה קיים (כלומר עד סוף הכרטיסיות) */}
                <div className="w-full md:w-5/12 sticky top-32 z-40 text-right h-fit pb-10">
                    
                    {/* תג + מספר */}
                    <div className="inline-flex items-center gap-2 bg-[#C5E080] border-2 border-black px-4 py-1.5 rounded-full mb-8 shadow-[3px_3px_0px_black]">
                        <span className="font-bold text-[#2D2D44] tracking-wide text-sm">{data.hero.tag}</span>
                        <div className="bg-white/30 px-2 rounded-full text-xs font-bold border border-black/10">01</div>
                    </div>
                    
                    {/* כותרת ראשית */}
                    <h1 className="text-6xl md:text-8xl font-black text-[#2D2D44] leading-[1] mb-6">
                        {data.hero.title1}
                        <br />
                        <span className="text-[#816AFE] relative inline-block">
                            {data.hero.title2}
                            <span className="absolute bottom-3 left-0 w-full h-4 bg-[#FFD028] -z-10 rounded-sm"></span>
                        </span>
                    </h1>

                    <p className="hidden md:block text-xl text-[#2D2D44]/70 max-w-md leading-relaxed">
                        גוללים למטה ומגלים את הסיפור שלנו.
                    </p>

                    {/* קישוטים */}
                    <div className="absolute top-[-20px] left-10 animate-bounce duration-[2000ms]">
                        <ThumbsUp fill="#EBE5FC" stroke="#816AFE" size={28} className="transform -rotate-12" />
                    </div>
                </div>

                {/* --- צד שמאל: תמונות (רגיל) + כרטיסיות (דביק) --- */}
                <div className="w-full md:w-7/12 flex flex-col gap-32 mt-10 md:mt-0">
                    
                    {/* א. התמונות (לא דביקות - נגללות רגיל) */}
                    <div className="relative w-full h-[500px]">
                        {/* תמונה גדולה (באולינג) */}
                        <div className="absolute top-0 right-0 w-[80%] md:w-[75%] transform rotate-[-2deg] transition-transform hover:rotate-0 duration-500 z-10">
                            <div className="rounded-[30px] overflow-hidden border-4 border-white shadow-2xl h-[350px]">
                                <img src={data.hero.image1} alt="Bowling" className="w-full h-full object-cover" />
                            </div>
                        </div>

                        {/* תמונה קטנה (מסיכה) */}
                        <div className="absolute top-[280px] left-0 md:left-10 w-[60%] md:w-[50%] transform rotate-[4deg] transition-transform hover:rotate-0 duration-500 z-20 group">
                            <div className="bg-white p-3 pb-12 rounded-[24px] shadow-2xl border border-gray-100 group-hover:scale-105 transition-transform">
                                <div className="rounded-[20px] overflow-hidden h-[200px] bg-gray-200">
                                    <img src={data.hero.image2} alt="Mask" className="w-full h-full object-cover" />
                                </div>
                                <div className="absolute bottom-4 left-0 w-full text-center font-['Salsa'] text-[#816AFE] text-xl opacity-80 rotate-[-2deg]">
                                    לא רואים עלי!!
                                </div>
                            </div>
                        </div>

                        {/* מספר 01 רקע */}
                        <div className="absolute bottom-10 right-20 text-[180px] font-black text-[#816AFE] font-['Salsa'] leading-none opacity-10 select-none -z-0">
                            01
                        </div>
                    </div>

                    {/* ב. הכרטיסיות (Sticky Stacking) */}
                    <div className="flex flex-col gap-24">
                        {/* כרטיס 1 */}
                        <StickyCard top="40px">
                            <h2 className="text-4xl md:text-5xl font-black text-[#816AFE] mb-6 text-center md:text-right">
                                {data.cards[0].title}
                            </h2>
                            <h3 className="text-xl md:text-2xl font-bold text-[#2D2D44] mb-8 leading-normal">
                                {data.cards[0].subtitle}
                            </h3>
                            <p className="text-lg leading-relaxed text-[#2D2D44] opacity-90 whitespace-pre-line border-r-4 border-[#EBE5FC] pr-6 pl-6">
                                {data.cards[0].text}
                            </p>
                        </StickyCard>

                        {/* כרטיס 2 */}
                        <StickyCard top="80px">
                            <h2 className="text-4xl md:text-5xl font-black text-[#816AFE] mb-12 text-center">
                                {data.cards[1].title}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 flex-grow">
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center gap-3">
                                        <GreenArrowCircle direction="left" />
                                        <h3 className="text-2xl font-black text-[#816AFE]">{data.cards[1].sec1Title}</h3>
                                    </div>
                                    <p className="text-lg leading-relaxed text-[#2D2D44] pr-[40px]">
                                        {data.cards[1].sec1Text}
                                    </p>
                                </div>
                                <div className="flex flex-col gap-4 md:text-left" dir="rtl">
                                    <div className="flex items-center gap-3 md:flex-row-reverse">
                                        <GreenArrowCircle direction="right" />
                                        <h3 className="text-2xl font-black text-[#816AFE]">{data.cards[1].sec2Title}</h3>
                                    </div>
                                    <p className="text-lg leading-relaxed text-[#2D2D44] pr-[40px] md:pr-0 md:pl-[40px] md:text-left">
                                        {data.cards[1].sec2Text}
                                    </p>
                                </div>
                            </div>
                        </StickyCard>
                    </div>

                </div>
            </div>

            {/* ============================================================================
               חלק 3: הכפתור
               ממוקם מחוץ לראפר העליון, כך שהכותרת תפסיק להיות דביקה כשהוא מגיע
            ============================================================================ */}
            <div className="w-full pb-20">
                <NextChapterButton 
                    title="לפרק הבא"
                    subtitle="פרק 02 - מי משתתפות ומשתתפים ברעים"
                    onClick={() => console.log("Navigate")}
                />
            </div>
        </div>
    );
};

export default Chapter1;