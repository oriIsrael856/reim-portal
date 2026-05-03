import React from 'react';
import { ArrowLeft, ThumbsUp, Send, Hand } from 'lucide-react';
import ChapterDigitSvg from '../components/common/ChapterDigitSvg';
import NextChapterButton from '../components/common/NextChapterButton';
import Chapter1DesktopCollage from '../components/chapter1/Chapter1DesktopCollage';
import Chapter1DesktopTitleColumn from '../components/chapter1/Chapter1DesktopTitleColumn';
import Chapter1DesktopStackedCards from '../components/chapter1/Chapter1DesktopStackedCards';
import Footer from '../components/layout/Footer';
import { useChapter1StickyTitle } from '../hooks/useChapter1StickyTitle';
import { useChapter1DesktopStyles } from '../hooks/useChapter1DesktopStyles';

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
    const { ref: stickyReleaseRef, isSticky: heroTitleSticky } = useChapter1StickyTitle(data?.cards?.[1]?.sec1Title);
    const d = useChapter1DesktopStyles();

    if (!data) return null;

    return (
        <div className="min-h-screen bg-[#F3F0FF] font-['Rubik'] md:bg-[#FFF9F0]">
            {/* `.ch2-mobile-main-content__body` משלם את ה-margin-top השלילי של ה-mobile shell;
                בלעדיו הגלולית של הלוגו עולה מעל הכרטיס הראשון של הפרק. */}
            <div className="ch2-mobile-main-content__body">
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

                        {/* מספר פרק — משמאל למטה בחלל הריק */}
                        <ChapterDigitSvg digits="01" className="absolute bottom-[6%] left-0 z-[15] w-[clamp(80px,20vw,130px)]" />

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

            {/* דסקטופ: Figma-ratio gutters + columns (1920×1080 ref) */}
            <div
                className="relative mx-auto hidden w-full md:block"
                style={{ maxWidth: d.shellMaxWidth, ...d.layoutGutter, ...d.layoutPt, ...d.layoutMb }}
            >
                <div
                    className="flex flex-col items-stretch lg:flex-row lg:items-start lg:justify-center"
                    style={d.colGap}
                    dir="ltr"
                >
                    <div className="flex w-full min-w-0 flex-col lg:w-auto lg:shrink-0" style={d.leftColMaxW}>
                        <Chapter1DesktopCollage hero={data.hero} ch1={d} />
                        <div className="min-w-0 w-full" style={d.collageMb}>
                            <Chapter1DesktopStackedCards data={data} stickyReleaseRef={stickyReleaseRef} ch1={d} />
                        </div>
                    </div>
                    <div
                        className={`w-full min-w-0 shrink-0 lg:z-40 lg:flex lg:flex-col lg:items-end lg:pt-1 lg:self-start ${
                            heroTitleSticky ? 'lg:sticky' : 'lg:relative'
                        }`}
                        style={{ ...d.rightColMaxW, ...(heroTitleSticky ? d.stickyTop : {}) }}
                    >
                        <Chapter1DesktopTitleColumn data={data} ch1={d} />
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
        </div>
    );
};

export default Chapter1;