import React from 'react';
import { ArrowLeft, ThumbsUp, Send, Hand } from 'lucide-react';
import StickyCard from '../components/common/StickyCard';
import NextChapterButton from '../components/common/NextChapterButton';
import PrevChapterButton from '../components/common/PrevChapterButton';
import Footer from '../components/layout/Footer';

// רכיב עזר: עיגול ירוק עם חץ
const GreenArrowCircle = ({ direction = 'left' }) => (
    <div className={`
        w-12 h-12 rounded-full bg-[#C5E080] border-2 border-black 
        flex items-center justify-center shadow-[3px_3px_0px_black]
        transform transition-transform hover:scale-110 flex-shrink-0
        ${direction === 'left' ? 'rotate-180' : ''}
    `}>
        <ArrowLeft size={22} color="#2D2D44" strokeWidth={2.5} />
    </div>
);

const Chapter1 = ({ data, content, onNext, onPrev }) => {
    if (!data) return null;

    return (
        <div className="min-h-screen bg-[#F3F0FF] font-['Rubik']">
            {onPrev && (
                <div className="pt-24 pb-4">
                    <PrevChapterButton title="חזור לדף הבית" onClick={onPrev} />
                </div>
            )}

            {/* מובייל: כרטיס לבן — תג וכותרת בלבד */}
            <div className="mx-4 mb-12 mt-4 md:hidden">
                <div className="relative overflow-visible rounded-[32px] border-2 border-[#2D2D44]/20 bg-white p-6 pb-8 shadow-xl">
                    {/* תג פרק + אייקונים (כמו בעיצוב) */}
                    <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
                        <div className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-[#C5E080] px-4 py-2 shadow-[3px_3px_0px_black]">
                            <span className="font-[family-name:var(--font-salsa)] text-lg font-black text-[#2D2D44]">01</span>
                            <span className="text-sm font-bold text-[#2D2D44]">{data.hero.tag}</span>
                        </div>
                        <ThumbsUp fill="#EBE5FC" stroke="#816AFE" size={26} className="-rotate-12 shrink-0" />
                        <Hand className="h-7 w-7 shrink-0 text-[#816AFE] opacity-90" strokeWidth={2} />
                    </div>
                    {/* כותרת: שורה 1 שחורה, שורה 2 סגול + פס כתום עבה */}
                    <h1 className="mb-2 text-center font-['Rubik']">
                        <span className="text-3xl font-black leading-tight text-black">{data.hero.title1}</span>
                        <br />
                        <span className="relative mt-3 inline-block pb-2 text-3xl font-black text-[#6546DE]">
                            {data.hero.title2}
                            <span
                                className="absolute bottom-0 left-0 right-0 h-[5px] rounded-sm bg-[#FF7A00]"
                                aria-hidden
                            />
                        </span>
                    </h1>
                    {/* מטוס נייר + נקודה אדומה */}
                    <div className="absolute left-5 top-28 h-2 w-2 rounded-full bg-[#FF5C5C]" />
                    <div className="absolute right-5 top-32 flex items-center gap-0.5 text-[#816AFE]">
                        <svg className="h-9 w-9 opacity-75" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2">
                            <path d="M5 19 L19 5 M19 5 L19 12 M19 5 L12 5" />
                        </svg>
                        <Send className="h-5 w-5 rotate-45" strokeWidth={2.5} />
                    </div>

                    {/* קולאז' — ברוחב כמעט מלא של הכרטיס הלבן; קטנה ~40% מרוחב הגדולה; 01 משמאל למטה */}
                    <div className="relative mt-8 w-full pb-16 pt-1">
                        {/* תמונה גדולה — כמעט מלא רוחב המיכל הלבן, פינות מעוגלות + מסגרת */}
                        <div className="relative z-10 aspect-[4/3] w-full overflow-hidden rounded-[20px] border-2 border-[#2D2D44]/35 bg-gray-100 shadow-sm">
                            <img src={data.hero.image1} alt="" className="h-full w-full object-cover" />
                        </div>

                        {/* מספר עמוד — משמאל למטה בחלל הריק (מעל התמונה הגדולה, משמאל לקטנה) */}
                        <div
                            dir="ltr"
                            className="pointer-events-none absolute bottom-[6%] left-0 z-[15] select-none font-[family-name:var(--font-salsa)] text-[clamp(3.75rem,20vw,6rem)] font-black leading-none"
                            aria-hidden
                        >
                            {/* שלושה גלים אדומים — שכבה אחת על כל המספר 01 */}
                            <span className="relative inline-block text-[#816AFE]">
                                01
                                <svg
                                    className="pointer-events-none absolute left-[-2%] top-[14%] h-[72%] w-[104%] text-[#E53935]"
                                    viewBox="0 0 100 44"
                                    fill="none"
                                    preserveAspectRatio="none"
                                    aria-hidden
                                >
                                    <path
                                        d="M0 7 Q16 3 34 7 T68 7 T100 7"
                                        stroke="currentColor"
                                        strokeWidth="2.2"
                                        strokeLinecap="round"
                                        vectorEffect="non-scaling-stroke"
                                    />
                                    <path
                                        d="M0 22 Q20 17 38 22 T72 22 T100 22"
                                        stroke="currentColor"
                                        strokeWidth="2.2"
                                        strokeLinecap="round"
                                        vectorEffect="non-scaling-stroke"
                                    />
                                    <path
                                        d="M0 37 Q16 33 34 37 T70 37 T100 37"
                                        stroke="currentColor"
                                        strokeWidth="2.2"
                                        strokeLinecap="round"
                                        vectorEffect="non-scaling-stroke"
                                    />
                                </svg>
                            </span>
                        </div>

                        {/* תמונה קטנה — ~40% מרוחב הגדולה, חופפת לפינה ימין-תחתונה, רוטציה קלה */}
                        <div className="absolute -bottom-1 right-0 z-20 w-[40%] min-w-[118px] max-w-[152px] origin-bottom-right rotate-[8deg] rounded-[14px] border-2 border-[#2D2D44]/35 bg-white p-1.5 shadow-md">
                            <div className="aspect-[3/4] overflow-hidden rounded-[10px] bg-gray-100">
                                <img src={data.hero.image2} alt="" className="h-full w-full object-cover" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* מובייל בלבד: חלק שני – התוכנית, טקסט מלא, פוטר */}
            {data.cards?.[0] && (
                <div className="md:hidden mx-4 mb-12">
                    <div className="rounded-[32px] border-2 border-[#2D2D44]/20 bg-[var(--color-surface-lilac)] p-6 text-right shadow-xl">
                        <h2 className="mb-4 text-3xl font-black text-[var(--color-heading-h5)]">{data.cards[0].title}</h2>
                        <h3 className="mb-6 text-lg font-bold leading-normal text-[var(--color-heading-h5)]">
                            {data.cards[0].subtitle}
                        </h3>
                        <p className="mb-0 text-[#2D2D44] leading-relaxed whitespace-pre-line">
                            {data.cards[0].text}
                        </p>
                    </div>
                </div>
            )}

            {/* מובייל בלבד: חלק שלישי — עיצוב כמו כרטיס «התוכנית» */}
            {data.cards?.[1] && (
                <div className="mx-4 mb-12 md:hidden">
                    <div className="rounded-[32px] border-2 border-[#2D2D44]/20 bg-[var(--color-surface-lilac)] p-6 text-right shadow-xl">
                        <h2 className="mb-6 text-right text-3xl font-black text-[var(--color-heading-h5)]">
                            {data.cards[1].title}
                        </h2>
                        <div className="flex flex-col gap-8">
                            <div>
                                {/* RTL: כותרת מימין, אייקון משמאל לכותרת */}
                                <div className="mb-3 flex w-full flex-row items-center justify-start gap-3" dir="rtl">
                                    <h3 className="text-lg font-bold text-[var(--color-heading-h5)]">{data.cards[1].sec1Title}</h3>
                                    <GreenArrowCircle direction="left" />
                                </div>
                                <p className="whitespace-pre-line pr-1 leading-relaxed text-[#2D2D44]">
                                    {data.cards[1].sec1Text}
                                </p>
                            </div>
                            <div>
                                {/* RTL: כותרת, אייקון מימין לכותרת */}
                                <div className="mb-3 flex w-full flex-row items-center justify-start gap-3" dir="rtl">
                                    <GreenArrowCircle direction="right" />
                                    <h3 className="text-lg font-bold text-[var(--color-heading-h5)]">{data.cards[1].sec2Title}</h3>
                                </div>
                                <p className="whitespace-pre-line pr-1 leading-relaxed text-[#2D2D44]">
                                    {data.cards[1].sec2Text}
                                </p>
                            </div>
                        </div>
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
                        <div className="rounded-full border border-black/10 bg-white/30 px-2 font-[family-name:var(--font-salsa)] text-xs font-bold">01</div>
                    </div>
                    
                    {/* כותרת ראשית — Rubik */}
                    <h1 className="mb-4 font-['Rubik'] text-5xl font-black leading-[1] text-[#2D2D44] md:text-6xl">
                        <span className="text-black">{data.hero.title1}</span>
                        <br />
                        <span className="relative inline-block pb-2 text-[#816AFE]">
                            {data.hero.title2}
                            <span
                                className="absolute bottom-0 left-0 right-0 h-1 rounded-full bg-[#F97316]"
                                aria-hidden
                            />
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

                        {/* מספר 01 רקע — משמאל */}
                        <div className="absolute bottom-10 left-10 font-[family-name:var(--font-salsa)] text-[180px] font-black leading-none text-[#816AFE] opacity-10 select-none -z-0 md:left-20">
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
                            <h3 className="mb-8 text-xl font-bold leading-normal text-[var(--color-brand-purple)] md:text-2xl">
                                {data.cards[0].subtitle}
                            </h3>
                            <p className="text-lg leading-relaxed text-[#2D2D44] opacity-90 whitespace-pre-line border-r-4 border-[#EBE5FC] pr-6 pl-6">
                                {data.cards[0].text}
                            </p>
                        </StickyCard>

                        {/* כרטיס 2 – נדבק מתחת לראשון (אפקט stacking) */}
                        <StickyCard top="480px" innerClassName="border-[#2D2D44]/20 bg-[var(--color-surface-lilac)] shadow-xl">
                            <h2 className="mb-10 text-right text-4xl font-black text-[var(--color-heading-h5)] md:text-5xl">
                                {data.cards[1].title}
                            </h2>
                            <div className="grid flex-grow grid-cols-1 gap-12 md:grid-cols-2">
                                <div className="flex flex-col gap-4">
                                    <div className="flex w-full flex-row items-center justify-start gap-3" dir="rtl">
                                        <h3 className="text-2xl font-bold text-[var(--color-heading-h5)]">{data.cards[1].sec1Title}</h3>
                                        <GreenArrowCircle direction="left" />
                                    </div>
                                    <p className="text-lg leading-relaxed text-[#2D2D44] md:pr-2">
                                        {data.cards[1].sec1Text}
                                    </p>
                                </div>
                                <div className="flex flex-col gap-4" dir="rtl">
                                    <div className="flex w-full flex-row items-center justify-start gap-3" dir="rtl">
                                        <GreenArrowCircle direction="right" />
                                        <h3 className="text-2xl font-bold text-[var(--color-heading-h5)]">{data.cards[1].sec2Title}</h3>
                                    </div>
                                    <p className="text-lg leading-relaxed text-[#2D2D44] md:pl-2 md:text-right">
                                        {data.cards[1].sec2Text}
                                    </p>
                                </div>
                            </div>
                        </StickyCard>
                    </div>

                </div>
            </div>

            {/* כפתור לפרק הבא + פוטר: מובייל בתוך המשטח הלבן הראשי */}
            <div className="w-full pb-20 md:hidden">
                <NextChapterButton 
                    title="לפרק הבא"
                    subtitle="פרק 02 - מי משתתפות ומשתתפים ברעים"
                    onClick={onNext}
                />
                {content?.footer ? <Footer data={content.footer} variant="chapter2Mobile" /> : null}
            </div>

            {/* כפתור לפרק הבא — דסקטופ */}
            <div className="hidden w-full pb-20 md:block">
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