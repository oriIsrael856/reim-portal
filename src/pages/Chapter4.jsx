import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Layers, Plus, Minus } from 'lucide-react';
import AdminFeatureCard from '../components/chapter4/AdminFeatureCard';
import NextChapterButton from '../components/common/NextChapterButton';
import PrevChapterButton from '../components/common/PrevChapterButton';
import { Chapter4MobileView } from '../components/chapter4/mobile';
import { CH4_ASSETS } from '../components/chapter4/chapter4Assets';

// ===== Chapter 04 — Desktop only (Figma node 125:2391) =====
function CommitteeStepCard({ step }) {
    if (!step) return null;
    const id = step.id ?? '';
    const title = step.title ?? '';
    const desc = step.desc ?? '';

    return (
        <div
            className="relative flex w-full min-w-0 flex-col items-center justify-center gap-[8px] rounded-[8px] border-[1.5px] border-[#001d26] px-3 pb-6 pt-8 shadow-[2px_2px_0px_0px_#001d26] sm:px-[14px] md:px-4"
            style={{
                backgroundImage:
                    'linear-gradient(90deg, rgba(188, 224, 121, 0.08) 0%, rgba(188, 224, 121, 0.08) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)',
            }}
        >
            {/* Chapter label chip */}
            <div className="absolute left-1/2 top-[-22.5px] -translate-x-1/2 bg-[#bce079] border-[1.5px] border-[#001d26] rounded-[48px] shadow-[2px_2px_0px_0px_#001d26] px-[6px] py-[12px] h-[42px] flex items-center">
                <div className="flex flex-col font-['Salsa'] justify-center leading-[0] not-italic text-[16px] text-[#001d26] text-center tracking-[0.15px] w-full">
                    <div className="leading-[1.28]">{id}</div>
                </div>
            </div>

            <p className="text-center text-[17px] font-semibold leading-[1.28] tracking-[0.15px] text-[#001d26] md:text-[18px] lg:text-[20px]">
                {title}
            </p>
            <p className="w-full max-w-full text-center font-normal text-[16px] leading-[1.32] tracking-[0.15px] text-[#001d26]">
                {desc}
            </p>
        </div>
    );
}

function DesktopFaqRow({ item, isOpen, onToggle }) {
    return (
        <div
            className={`mb-[16px] last:mb-0 overflow-hidden rounded-[8px] transition-all duration-300 ${
                isOpen
                    ? 'border border-[rgba(101,70,222,0.22)] bg-white shadow-[0px_4px_20px_rgba(129,106,254,0.12)]'
                    : 'border border-[rgba(101,70,222,0.08)] bg-white hover:border-[rgba(101,70,222,0.35)] hover:shadow-[0px_4px_24px_rgba(101,70,222,0.14)]'
            }`}
        >
            <button
                type="button"
                className={`flex h-[80px] w-full items-center gap-6 overflow-clip px-[24px] text-right transition-colors duration-300 ${
                    !isOpen ? 'hover:bg-[rgba(101,70,222,0.05)]' : ''
                }`}
                onClick={onToggle}
                dir="rtl"
            >
                <p
                    className={`min-w-0 flex-1 text-right font-['Rubik'] text-[24px] font-normal leading-[1.334] tracking-[0px] transition-colors duration-300 ${
                        isOpen ? 'text-[#6546de]' : 'text-[#001d26]'
                    }`}
                >
                    {item.title}
                </p>
                <div
                    className={`flex size-9 shrink-0 items-center justify-center overflow-clip rounded-full transition-colors duration-300 ${
                        isOpen ? 'bg-[#6546de]/10 text-[#6546de]' : 'text-[#001d26]'
                    }`}
                >
                    {isOpen ? (
                        <Minus size={22} strokeWidth={3} color="currentColor" />
                    ) : (
                        <Plus size={22} strokeWidth={3} color="currentColor" />
                    )}
                </div>
            </button>

            {isOpen ? (
                <div className="px-[24px] pb-[24px] text-right font-['Rubik'] font-normal text-[16px] leading-[1.32] tracking-[0.15px] text-[#001d26]/70">
                    {item.content}
                </div>
            ) : null}
        </div>
    );
}

const PROCEDURES_INTRO = 'בקבצים המצורפים תוכלו למצוא את נהלי העבודה בתוכנית רעים: נהלים אלה נועדו לסייע בעבודה השוטפת, להעניק סדר וביטחון לפעילות בתוך ומחוץ למרכז הקהילתי.';

// Figma 120:6878 — "Section Meeting" (מערכת נתיב) assets (desktop only)
const imgNativHero = 'https://www.figma.com/api/mcp/asset/7c123cb3-38b7-47de-a60d-71796c12cc51';
const imgNativDiagonalArrow = 'https://www.figma.com/api/mcp/asset/7dcb52cc-f280-477d-a445-bc1907c161f6';
const imgNativArrowLeftOutline = 'https://www.figma.com/api/mcp/asset/e017a930-c428-4c31-9332-c9fc713920c7';

// Figma 125:4050 — "נהלים וטפסים" (desktop)
const imgCh4FilesCard = 'https://www.figma.com/api/mcp/asset/6e563c65-103e-4d67-bfe0-c243f910799b';
const imgCh4FilesGlow = 'https://www.figma.com/api/mcp/asset/2f4d9e2e-7b96-4510-9487-5f072469c924';
const imgCh4FilesArrowLeft = 'https://www.figma.com/api/mcp/asset/54b2f7b3-9b86-4972-90d5-d8ffdc563c48';
const imgCh4FilesArrowRight = 'https://www.figma.com/api/mcp/asset/72185d97-2626-4878-9223-0f0e0a788484';

const FILES_SECTION_INTRO_P1 = 'בקבצים המצורפים ניתן למצוא את נהלי העבודה בתכנית רעים:';
const FILES_SECTION_INTRO_P2 =
    'הנהלים נועדו לסייע בעבודה השוטפת, להעניק סדר וביטחון להתנהלות בתוך המרכז הקהילתי ומחוצה לו.';

/** רוחב כרטיס + רווח בין כרטיסים (פיגמה ~18px) */
const CH4_FILES_CARD_GAP = 18;
const CH4_FILES_CARD_SCROLL_STEP = 320 + CH4_FILES_CARD_GAP;

/** רוחב עמודת “כרטיס לבן” בפיגמה — מולו נמדד ה־scale */
const CH4_DESKTOP_ARTBOARD_W = 1424;
/** גובה ייחוס לפרופורציית viewport (ערך גבוה = פחות הקטנה אנכית) */
const CH4_DESKTOP_ARTBOARD_H = 1080;
/** רזרבה לסרגל ימני ב־App: main משתמש ב־md:pr-20 */
const CH4_DESKTOP_SIDEBAR_RESERVE = 80;
/** ריפוד אופקי של עטיפת פרק 4: md:px-6 משני הצדדים */
const CH4_DESKTOP_PAGE_PAD_X = 48;
const CH4_DESKTOP_PAD_Y = 200;
/** מעל רוחב זה — מקטינים כדי לקרב לפריים Figma במסכים רחבים */
const CH4_DESKTOP_SOFT_CAP_VW = 1720;

function getChapter4DesktopScale() {
    if (typeof window === 'undefined') return 1;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const usableW = Math.max(320, vw - CH4_DESKTOP_SIDEBAR_RESERVE - CH4_DESKTOP_PAGE_PAD_X);
    const sW = usableW / CH4_DESKTOP_ARTBOARD_W;
    const sH = (vh - CH4_DESKTOP_PAD_Y) / CH4_DESKTOP_ARTBOARD_H;
    const sSoft = Math.min(1, CH4_DESKTOP_SOFT_CAP_VW / vw);
    return Math.max(0.52, Math.min(1, sW, sH, sSoft));
}

function DesktopFileCard({ name, desc, imageSrc }) {
    const src = imageSrc || imgCh4FilesCard;
    return (
        <button
            type="button"
            className="group relative z-0 flex h-[400px] w-full max-w-[320px] shrink-0 flex-col items-stretch gap-4 overflow-visible rounded-[16px] border-[1.5px] border-[rgba(101,70,222,0.16)] bg-white pt-2 pb-6 px-2 text-[#001d26] shadow-none transition-all duration-200 ease-out hover:z-[2] hover:-translate-y-1 hover:border-[#6546de] hover:shadow-[2px_10px_28px_rgba(101,70,222,0.18)] hover:bg-gradient-to-b hover:from-[rgba(255,178,59,0.14)] hover:to-white focus-visible:z-[2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6546de]"
        >
            <div className="relative min-h-0 w-full flex-1 overflow-hidden rounded-[12px] bg-[rgba(0,29,38,0.06)]">
                <img
                    alt=""
                    src={src}
                    className="pointer-events-none absolute inset-0 size-full max-w-none rounded-[12px] object-cover transition-transform duration-200 group-hover:scale-[1.02]"
                />
                <div
                    className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[#001d26]/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
                    aria-hidden
                >
                    <span className="inline-flex items-center justify-center gap-2 rounded-full border-[1.5px] border-[#6546de] bg-[#6546de] px-6 py-2 font-['Rubik'] text-[16px] font-bold leading-[1.625] tracking-wide text-white">
                        <img src={CH4_ASSETS.fileDownloadPill} alt="" width={20} height={20} className="size-5 shrink-0" />
                        הורדת הקובץ
                    </span>
                </div>
            </div>
            <div className="flex w-full flex-col gap-1 px-4 text-right tracking-[0.15px]">
                <p className="text-right text-[20px] font-semibold leading-[1.28]">{name}</p>
                <p className="text-right text-[16px] font-normal leading-[1.32]">{desc}</p>
            </div>
        </button>
    );
}

function Chapter4DesktopFilesSection({ files, filesTitle }) {
    const scrollRef = useRef(null);
    const items = files || [];
    const n = items.length;
    const gapsTotal = n > 1 ? (n - 1) * CH4_FILES_CARD_GAP : 0;
    /** רוחב כרטיס: עד 320px, אך מתכווץ כדי ש־n כרטיסים + רווחים ייכנסו לרוחב העמודה (כמו פיגמה ~70–75%) */
    const cardFlexBasis =
        n > 0 ? `min(320px, calc((100% - ${gapsTotal}px) / ${n}))` : '320px';

    const scrollStrip = (delta) => {
        const el = scrollRef.current;
        if (!el) return;
        const rtl = getComputedStyle(el).direction === 'rtl';
        el.scrollBy({ left: rtl ? -delta : delta, behavior: 'smooth' });
    };

    return (
        <section
            dir="rtl"
            className="relative mb-24 overflow-x-visible overflow-y-visible rounded-tl-[24px] rounded-tr-[24px] bg-white px-6 pb-[52px] pt-[96px] md:px-10 lg:px-14"
            aria-labelledby="ch4-files-heading"
        >
            <div className="pointer-events-none absolute left-[-120px] top-[-39px] h-[711px] w-[1044px] max-w-[110%] overflow-hidden" aria-hidden>
                <div className="absolute inset-[-28%_-19%]">
                    <img alt="" src={imgCh4FilesGlow} className="block size-full max-w-none" />
                </div>
            </div>

            <div className="relative z-10 mx-auto flex w-full max-w-full flex-col gap-[72px] md:gap-[88px] lg:gap-[96px]">
                <div className="flex w-full shrink-0 items-end justify-between gap-6">
                    <div className="flex min-h-px min-w-0 flex-1 flex-col items-start justify-center gap-6 text-[#001d26]">
                        <h2
                            id="ch4-files-heading"
                            className="w-full text-right text-[34px] font-bold leading-[1.1] tracking-[0.25px]"
                        >
                            {filesTitle}
                        </h2>
                        <div className="w-full max-w-[720px] text-right text-[20px] font-normal leading-[1.28] tracking-[0.15px]">
                            <p className="mb-0">{FILES_SECTION_INTRO_P1}</p>
                            <p>{FILES_SECTION_INTRO_P2}</p>
                        </div>
                    </div>
                    <div className="flex shrink-0 gap-[10px] self-end" dir="ltr">
                        <button
                            type="button"
                            className="rounded-[200px] bg-[rgba(101,70,222,0.12)] p-3"
                            aria-label="גלילה אחורה"
                            onClick={() => scrollStrip(-CH4_FILES_CARD_SCROLL_STEP)}
                        >
                            <img alt="" src={imgCh4FilesArrowLeft} className="size-6 object-contain" />
                        </button>
                        <button
                            type="button"
                            className="rounded-[200px] bg-[rgba(101,70,222,0.12)] p-3"
                            aria-label="גלילה קדימה"
                            onClick={() => scrollStrip(CH4_FILES_CARD_SCROLL_STEP)}
                        >
                            <img alt="" src={imgCh4FilesArrowRight} className="size-6 object-contain" />
                        </button>
                    </div>
                </div>

                <div
                    ref={scrollRef}
                    dir="rtl"
                    className="flex min-h-[432px] w-full max-w-full shrink-0 items-end justify-center overflow-x-auto overflow-y-hidden scroll-smooth pb-8 pt-8 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                    style={{ gap: CH4_FILES_CARD_GAP }}
                >
                    {items.map((f, i) => (
                        <div
                            key={i}
                            className="flex min-w-0 shrink-0 grow-0 justify-center"
                            style={{
                                flexBasis: cardFlexBasis,
                                maxWidth: 320,
                            }}
                        >
                            <DesktopFileCard name={f.name} desc={f.desc} imageSrc={f.image} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

const Chapter4 = ({ data, content, onNext, onPrev }) => {
    if (!data) return <div className="p-20 text-center font-bold text-[#816AFE]">טוען נתוני עבודה מנהלית...</div>;

    const committees = data.committees || {};
    const qaItems = data.qa || [];
    const steps = useMemo(() => committees?.steps || [], [committees]);
    const [openFaqIndex, setOpenFaqIndex] = useState(null);

    const [desktopScale, setDesktopScale] = useState(() => getChapter4DesktopScale());

    useEffect(() => {
        const onResize = () => setDesktopScale(getChapter4DesktopScale());
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    return (
        <div className="min-h-screen bg-[#FFFDF5] pt-24 pb-12 font-['Rubik']">
            {onPrev && (
                <div className="pt-6 pb-4 px-4">
                    <PrevChapterButton title="לפרק הקודם" subtitle="פרק 03 - תפקיד הרכזת" onClick={onPrev} />
                </div>
            )}

            <Chapter4MobileView
                data={data}
                onNext={onNext}
                proceduresIntro={data.proceduresIntro ?? PROCEDURES_INTRO}
                footerData={content?.footer}
            />

            {/* דסקטופ: רוחב מלא עד ריפוד (main כבר md:pr-20). לא משלבים max-w+zoom — בכרום זה מצמצם את רוחב הזרימה ומשאיר ~חצי מסך ריק */}
            <div className="hidden md:block w-full">
                <div className="px-3 sm:px-4 md:px-5">
                    <div className="w-full max-w-none" style={{ zoom: desktopScale }}>
                {/* פיגמה: כותרת במרכז העמוד הלבן, ריווח נדיב; "04" דקורטיבי משמאל בלי ליצור גלילה */}
                <header className="relative mx-auto mb-12 max-w-[960px] px-6 pb-2 ps-12 pe-6 pt-2 text-center md:mb-16 md:px-10 md:ps-24 md:pe-10">
                    <div className="inline-flex items-center gap-2 rounded-full border-2 border-[#2D2D44] bg-[#C5E080] px-4 py-1.5 text-sm font-bold shadow-[3px_3px_0px_#2D2D44] mb-6 md:mb-8">
                        <span>{data.hero?.tag}</span>
                        <div className="rounded-full bg-white/40 px-2 text-xs">04</div>
                    </div>
                    <div className="relative mx-auto inline-block max-w-full">
                        <h1 className="relative z-10 text-5xl font-black text-[#2D2D44] md:text-6xl">
                            {data.hero?.title}
                            <span className="absolute bottom-4 right-0 -z-10 h-6 w-full rounded-sm bg-[#FFB84C]" />
                        </h1>
                        <Layers className="absolute -right-16 -top-12 h-14 w-14 rotate-12 text-[#816AFE] opacity-40 animate-pulse max-md:right-0 max-md:top-[-2.5rem]" />
                    </div>
                    <div
                        className="pointer-events-none absolute left-0 top-4 -z-0 select-none font-['Rubik'] text-[clamp(72px,16vw,160px)] font-black leading-none text-[#816AFE] opacity-[0.06] md:left-2 md:top-6"
                        aria-hidden
                    >
                        04
                    </div>
                </header>

                {/* פיגמה: שלושה כרטיסים בקבוצה צרה יחסית, ריווח אחיד, גובה ~שליש־חצי מהמסך הלבן */}
                <section className="mx-auto mb-20 w-full max-w-[1040px] px-5 md:mb-24 md:px-8">
                    <div className="grid grid-cols-1 gap-7 md:grid-cols-3 md:gap-6 md:gap-x-8 lg:gap-x-10">
                        {data.features?.map((f) => (
                            <AdminFeatureCard key={f.id} {...f} iconName={f.icon} variant="chapter4Desktop" />
                        ))}
                    </div>
                </section>

                <section className="max-w-7xl mx-auto px-6 mb-24">
                <div
                    dir="ltr"
                    className="bg-white rounded-[50px] border-2 border-[#2D2D44] p-8 md:p-20 flex flex-col lg:flex-row gap-16 items-center shadow-[15px_15px_0px_rgba(45,45,68,0.05)]"
                >
                    {/* Physical left — yellow image + overlay CTA (Figma 120:6881 + 120:6972); row is LTR so this stays left under page RTL */}
                    <div className="w-full lg:w-5/12 flex justify-center">
                        <div
                            className="relative bg-[#FFB23B] border-[1.5px] border-[#001d26] shadow-[2px_2px_0px_0px_#001d26] rounded-[24px] px-[50px] py-[100px] w-[400px] overflow-hidden flex items-start justify-center"
                            aria-label="מערכת נתיב"
                        >
                            <div className="aspect-[300/91] w-full relative">
                                <img
                                    src={imgNativHero}
                                    alt=""
                                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                                />
                            </div>

                            <a
                                href="https://kb.nativ.app/article.php?id=66"
                                target="_blank"
                                rel="noreferrer"
                                className="absolute bg-[#bce079] border-[1.5px] border-[#001d26] flex items-center justify-center p-[12px] rounded-[8px] w-[80px] h-[80px] cursor-pointer left-[calc(50%+198px)] top-[244.5px]"
                            >
                                <div className="relative w-[40px] h-[40px] overflow-clip">
                                    <div className="absolute inset-1/4">
                                        <img
                                            src={imgNativDiagonalArrow}
                                            alt=""
                                            className="absolute block max-w-none w-full h-full object-contain"
                                        />
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>

                    {/* Right — text + principles list (Figma 120:6885+) */}
                    <div className="w-full lg:w-7/12 text-right flex flex-col gap-[32px] items-end">
                        <div className="flex flex-col items-end justify-center w-full whitespace-nowrap">
                            <p className="font-normal leading-[1.32] text-[16px] tracking-[0.15px] text-[#001d26]">
                                הנחיות לרכזת
                            </p>
                            <p className="font-bold text-[34px] leading-none tracking-[0.25px] text-[#001d26]">
                                {data.nativSystem?.title}
                            </p>
                        </div>

                        <div className="flex flex-col gap-[32px] w-full items-end">
                            <div className="flex flex-col gap-[8px] items-end w-full">
                                <p className="font-normal text-[20px] leading-[1.28] tracking-[0.15px] text-[#001d26]">
                                    {data.nativSystem?.description}
                                </p>
                                <p className="font-normal text-[20px] leading-[1.28] tracking-[0.15px] text-[#001d26]">
                                    עקרונות העבודה בנתיב:
                                </p>
                            </div>

                            <div className="flex flex-col gap-[12px] w-full">
                                {data.nativSystem?.principles?.map((p, i) => (
                                    <div key={i} dir="ltr" className="flex w-full items-center gap-[12px]">
                                        <p className="min-w-0 flex-1 text-right font-normal text-[20px] leading-[1.28] tracking-[0.15px] text-[#001d26]">
                                            {p}
                                        </p>
                                        <div className="flex shrink-0 items-center justify-center rounded-[200px] bg-[rgba(188,224,121,0.6)] h-[24px] w-[32px]">
                                            <div className="relative size-[18px] overflow-clip">
                                                <img
                                                    src={imgNativArrowLeftOutline}
                                                    alt=""
                                                    className="absolute inset-0 size-full object-contain"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-col w-full items-end gap-0">
                                <p className="font-semibold text-[20px] leading-[1.28] text-[#001d26]">
                                    תמיכה והדרכה:
                                </p>
                                <p className="font-normal text-[20px] leading-[1.28] text-[#001d26]">
                                    {data.nativSystem?.support}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

                {/* Figma 125:2391 — וועדות + FAQ: אותו רוחב עמודה, שוליים לבנים משני הצדדים, 4 שלבים בשורה בדסקטופ */}
                <section
                    className="relative mb-24 w-full overflow-x-visible overflow-y-visible rounded-tl-[24px] rounded-tr-[24px] border-t-[2px] border-[#ffb23b] pb-[88px] pt-[96px] md:pb-[100px] md:pt-[110px]"
                    style={{
                        backgroundImage:
                            'linear-gradient(90deg, rgba(255, 178, 59, 0.08) 0%, rgba(255, 178, 59, 0.08) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)',
                    }}
                >
                    <div className="w-full px-1 md:px-3 lg:px-4">
                        <div className="flex w-full flex-col gap-6 rounded-[24px] border-[1.5px] border-[#001d26] bg-[#6546de] px-4 pb-10 pt-12 shadow-[2px_2px_0px_0px_#001d26] md:gap-7 md:px-7 md:pb-12 md:pt-14 lg:px-10">
                            <p className="w-full text-center font-['Rubik'] text-[30px] font-bold leading-[1.1] tracking-[0.25px] text-white md:text-[34px]">
                                {committees?.title}
                            </p>

                            <div className="flex w-full flex-col items-center gap-6 md:gap-7">
                                <div className="flex w-full max-w-[min(1100px,100%)] flex-col gap-2 text-center leading-[1.28]">
                                    <p className="text-[18px] font-normal leading-[1.32] tracking-[0.15px] text-white md:text-[20px]">
                                        {committees?.intro}
                                    </p>
                                    <p className="text-[18px] font-semibold leading-[1.28] tracking-[0.15px] text-white md:text-[20px]">
                                        שלבי התהליך:
                                    </p>
                                </div>

                                <div
                                    dir="rtl"
                                    className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4 xl:gap-5"
                                >
                                    {steps.map((s) => (
                                        <CommitteeStepCard key={s.id} step={s} />
                                    ))}
                                </div>

                                <p className="max-w-[min(1100px,100%)] text-center text-[18px] font-normal leading-[1.28] tracking-[0.15px] text-white md:text-[20px]">
                                    {committees?.footer}
                                </p>
                            </div>
                        </div>

                        <div className="mt-10 w-full pt-2 md:mt-12">
                            <div className="flex w-full flex-col items-stretch gap-1 text-[#001d26]">
                                <p className="text-right font-['Rubik'] text-[16px] font-normal leading-[1.32] tracking-[0.15px] text-[#001d26]/70">
                                    כל מה שרצית לשאול
                                </p>
                                <p className="text-right font-['Rubik'] text-[30px] font-bold leading-[1.1] tracking-[0.25px] md:text-[34px]">
                                    שאלות ותשובות
                                </p>
                            </div>

                            <div className="mt-4 w-full md:mt-5">
                                {qaItems.map((item, index) => (
                                    <DesktopFaqRow
                                        key={index}
                                        item={item}
                                        isOpen={openFaqIndex === index}
                                        onToggle={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <Chapter4DesktopFilesSection files={data.files} filesTitle={data.filesTitle ?? 'נהלים וטפסים'} />

                <footer className="mx-auto w-full max-w-[min(896px,100%)] px-4 pb-8 md:px-6">
                    <NextChapterButton
                        title="לפרק הבא"
                        subtitle="פרק 05 - כלים מעשיים"
                        onClick={onNext}
                    />
                </footer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chapter4;
