import React from 'react';
import { ArrowLeft, ThumbsUp, Send, Instagram, Facebook, Linkedin } from 'lucide-react';
import StickyCard from '../components/common/StickyCard';
import NextChapterButton from '../components/common/NextChapterButton';
import PrevChapterButton from '../components/common/PrevChapterButton';

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

const Chapter1 = ({ data, onNext, onPrev }) => {
    if (!data) return null;

    return (
        <div className="bg-[#F8F7FF] min-h-screen font-['Rubik']">
            {onPrev && (
                <div className="pt-24 pb-4">
                    <PrevChapterButton title="חזור לדף הבית" onClick={onPrev} />
                </div>
            )}

            {/* מובייל בלבד: חלק ראשון – כרטיס לבן עם תג, כותרת ותמונות */}
            <div className="md:hidden mx-4 mt-4 mb-12">
                <div className="bg-white rounded-[32px] shadow-xl border border-[#2D2D44]/5 p-6 relative overflow-hidden">
                    {/* תג פרק + אייקון */}
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <div className="inline-flex items-center gap-2 bg-[#C5E080] border-2 border-black px-4 py-2 rounded-full shadow-[3px_3px_0px_black]">
                            <span className="font-black text-[#2D2D44] font-['Rubik'] text-lg">01</span>
                            <span className="font-bold text-[#2D2D44] text-sm">{data.hero.tag}</span>
                        </div>
                        <ThumbsUp fill="#EBE5FC" stroke="#816AFE" size={28} className="shrink-0 -rotate-12" />
                    </div>
                    {/* כותרת */}
                    <h1 className="text-center mb-8">
                        <span className="text-3xl font-black text-[#2D2D44]">{data.hero.title1}</span>
                        <br />
                        <span className="text-3xl font-black text-[#FFB84C] relative inline-block mt-1">
                            {data.hero.title2}
                            <span className="absolute bottom-1 left-0 w-full h-3 bg-[#FFB84C] opacity-40 -z-10 rounded-sm" />
                        </span>
                    </h1>
                    {/* קישוטים */}
                    <div className="absolute top-32 left-4 w-2 h-2 bg-[#FF5C5C] rounded-full" />
                    <div className="absolute top-36 right-4 flex items-center gap-1 text-[#816AFE]">
                        <svg className="w-10 h-10 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2"><path d="M5 19 L19 5 M19 5 L19 12 M19 5 L12 5" /></svg>
                        <Send className="w-5 h-5 rotate-45" strokeWidth={2.5} />
                    </div>
                    {/* תמונות */}
                    <div className="relative mt-6 min-h-[280px]">
                        <div className="relative w-[85%] aspect-[4/3] rounded-2xl overflow-hidden border-4 border-white shadow-xl mx-auto rotate-[-2deg] z-10">
                            <img src={data.hero.image1} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute bottom-0 left-2 w-[55%] aspect-[3/4] max-h-[180px] rounded-2xl overflow-hidden border-4 border-white shadow-xl rotate-[5deg] z-20 bg-gray-100">
                            <img src={data.hero.image2} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute bottom-4 right-4 text-7xl font-black text-[#816AFE] font-['Rubik'] leading-none opacity-20 select-none">01</div>
                    </div>
                </div>
            </div>

            {/* מובייל בלבד: חלק שני – התוכנית, טקסט מלא, פוטר */}
            {data.cards?.[0] && (
                <div className="md:hidden mx-4 mb-12">
                    <div className="bg-white rounded-[32px] shadow-xl border border-[#2D2D44]/5 p-6 text-right">
                        <h2 className="text-3xl font-black text-[#816AFE] mb-4">{data.cards[0].title}</h2>
                        <h3 className="text-lg font-bold text-[#2D2D44] mb-6 leading-normal">{data.cards[0].subtitle}</h3>
                        <p className="text-[#2D2D44] leading-relaxed whitespace-pre-line mb-8">
                            {data.cards[0].text}
                        </p>
                        <p className="text-sm text-[#2D2D44]/70 border-t border-[#2D2D44]/10 pt-4">
                            התכנית מופעלת על ידי החברה למתנ&quot;סים
                        </p>
                    </div>
                </div>
            )}

            {/* מובייל בלבד: חלק שלישי – מאיפה באנו ולאן אנחנו הולכות */}
            {data.cards?.[1] && (
                <div className="md:hidden mx-4 mb-12">
                    <div className="bg-white rounded-[32px] shadow-xl border border-[#2D2D44]/5 p-6 text-right">
                        <h2 className="text-2xl font-black text-[#816AFE] mb-8">{data.cards[1].title}</h2>
                        <div className="space-y-8">
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <GreenArrowCircle direction="left" />
                                    <h3 className="text-xl font-black text-[#816AFE]">{data.cards[1].sec1Title}</h3>
                                </div>
                                <p className="text-[#2D2D44] leading-relaxed whitespace-pre-line pr-2">{data.cards[1].sec1Text}</p>
                            </div>
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <GreenArrowCircle direction="right" />
                                    <h3 className="text-xl font-black text-[#816AFE]">{data.cards[1].sec2Title}</h3>
                                </div>
                                <p className="text-[#2D2D44] leading-relaxed whitespace-pre-line pr-2">{data.cards[1].sec2Text}</p>
                            </div>
                        </div>
                        <p className="text-sm text-[#2D2D44]/70 border-t border-[#2D2D44]/10 pt-6 mt-8">
                            התכנית מופעלת על ידי החברה למתנ&quot;סים, במסגרת המחלקה לאנשים ונשים עם מוגבלות, ובשיתוף משרד הרווחה.
                        </p>
                    </div>
                </div>
            )}

            {/* ============================================================================
               חלק 1 + 2: הראפר הראשי (Split Screen) – דסקטופ; במובייל חלקים 1–3 למעלה
            ============================================================================ */}
            <div className="max-w-[1800px] mx-auto px-6 md:px-16 pt-4 md:pt-20 flex flex-col md:flex-row items-start gap-12 relative mb-20">
                
                {/* --- צד ימין: הכותרת הדביקה (דסקטופ בלבד; במובייל יש כרטיס עליון) --- */}
                <div className="hidden md:block w-full md:w-5/12 sticky top-32 z-40 text-right h-fit pb-10">
                    
                    {/* תג + מספר */}
                    <div className="inline-flex items-center gap-2 bg-[#C5E080] border-2 border-black px-4 py-1.5 rounded-full mb-8 shadow-[3px_3px_0px_black]">
                        <span className="font-bold text-[#2D2D44] tracking-wide text-sm">{data.hero.tag}</span>
                        <div className="bg-white/30 px-2 rounded-full text-xs font-bold border border-black/10">01</div>
                    </div>
                    
                    {/* כותרת ראשית */}
                    <h1 className="text-5xl md:text-6xl font-black text-[#2D2D44] leading-[1] mb-4">
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
                    
                    {/* א. התמונות (דסקטופ בלבד; במובייל בתצוגת הכרטיס העליון) */}
                    <div className="hidden md:block relative w-full h-[500px]">
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
                                <div className="absolute bottom-4 left-0 w-full text-center font-['Rubik'] text-[#816AFE] text-xl opacity-80 rotate-[-2deg]">
                                    לא רואים עלי!!
                                </div>
                            </div>
                        </div>

                        {/* מספר 01 רקע */}
                        <div className="absolute bottom-10 right-20 text-[180px] font-black text-[#816AFE] font-['Rubik'] leading-none opacity-10 select-none -z-0">
                            01
                        </div>
                    </div>

                    {/* ב. כרטיסיות דביקות – דסקטופ בלבד (במובייל הכרטיסים מוצגים בחלקים 2 ו-3 למעלה) */}
                    <div className="hidden md:flex flex-col gap-24">
                        {/* כרטיס 1 – נדבק למעלה */}
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

                        {/* כרטיס 2 – נדבק מתחת לראשון (אפקט stacking) */}
                        <StickyCard top="480px">
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

            {/* כפתור לפרק הבא */}
            <div className="w-full pb-20">
                <NextChapterButton 
                    title="לפרק הבא"
                    subtitle="פרק 02 - מי משתתפות ומשתתפים ברעים"
                    onClick={onNext}
                />
            </div>
        </div>
    );
};

export default Chapter1;