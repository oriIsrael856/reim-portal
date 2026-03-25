import React, { useMemo, useRef, useState } from 'react';
import { Layers, Plus, Minus } from 'lucide-react';
import AdminFeatureCard from '../components/chapter4/AdminFeatureCard';
import NextChapterButton from '../components/common/NextChapterButton';
import PrevChapterButton from '../components/common/PrevChapterButton';
import { Chapter4MobileView } from '../components/chapter4/mobile';

// ===== Chapter 04 — Desktop only (Figma node 125:2391) =====
function CommitteeStepCard({ step }) {
    if (!step) return null;
    const id = step.id ?? '';
    const title = step.title ?? '';
    const desc = step.desc ?? '';

    return (
        <div
            className="relative flex flex-col items-center justify-center rounded-[8px] border-[1.5px] border-[#001d26] shadow-[2px_2px_0px_0px_#001d26] pt-[32px] pb-[24px] px-[16px] gap-[8px] flex-[1_0_0] min-w-px min-h-px"
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

            <p className="font-semibold text-[20px] leading-[1.28] tracking-[0.15px] text-[#001d26] text-center whitespace-nowrap">
                {title}
            </p>
            <p className="font-normal text-[16px] leading-[1.32] tracking-[0.15px] text-[#001d26] text-center w-[min-content]">
                {desc}
            </p>
        </div>
    );
}

function DesktopFaqRow({ item, isOpen, onToggle }) {
    // Design: white row, border rgba(101,70,222,0.08), height 80px
    return (
        <div className="rounded-[8px] overflow-hidden bg-white border border-[rgba(101,70,222,0.08)] mb-[16px] last:mb-0">
            <button
                type="button"
                className="flex h-[80px] items-center overflow-clip px-[24px] w-full text-right"
                onClick={onToggle}
                dir="rtl"
            >
                <div className="overflow-clip relative shrink-0 size-[24px] flex items-center justify-center">
                    {isOpen ? (
                        <Minus size={24} strokeWidth={3} color="#001d26" />
                    ) : (
                        <Plus size={24} strokeWidth={3} color="#001d26" />
                    )}
                </div>
                <p className="flex-1 font-['Rubik'] font-normal text-[24px] leading-[1.334] text-[#001d26] tracking-[0px]">
                    {item.title}
                </p>
            </button>

            {isOpen ? (
                <div className="px-[24px] pb-[24px] text-[#001d26]/70 font-['Rubik'] font-normal text-[16px] leading-[1.32] tracking-[0.15px]">
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

const CH4_FILES_CARD_SCROLL_STEP = 344; // 320px card + 24px gap

function DesktopFileCard({ name, desc, imageSrc }) {
    const src = imageSrc || imgCh4FilesCard;
    return (
        <button
            type="button"
            className="flex h-[400px] w-[320px] shrink-0 flex-col items-stretch gap-4 overflow-hidden rounded-[16px] border-[1.5px] border-[rgba(101,70,222,0.16)] bg-white pt-2 pb-6 px-2 text-right text-[#001d26]"
        >
            <div className="relative min-h-0 w-full flex-1 overflow-hidden rounded-[12px]">
                <img
                    alt=""
                    src={src}
                    className="pointer-events-none absolute inset-0 size-full max-w-none rounded-[12px] object-cover"
                />
            </div>
            <div className="flex flex-col gap-1 px-4 tracking-[0.15px]">
                <p className="text-[20px] font-semibold leading-[1.28]">{name}</p>
                <p className="text-[16px] font-normal leading-[1.32]">{desc}</p>
            </div>
        </button>
    );
}

function Chapter4DesktopFilesSection({ files, filesTitle }) {
    const scrollRef = useRef(null);
    const items = files || [];

    const scrollStrip = (delta) => {
        const el = scrollRef.current;
        if (!el) return;
        el.scrollBy({ left: delta, behavior: 'smooth' });
    };

    return (
        <section
            className="relative mb-24 flex w-full flex-col items-center gap-[60px] overflow-hidden rounded-tl-[24px] rounded-tr-[24px] bg-white py-[120px] pl-0 pr-[200px]"
            aria-labelledby="ch4-files-heading"
        >
            <div className="pointer-events-none absolute left-[-120px] top-[-39px] h-[711px] w-[1044px] max-w-[110%]" aria-hidden>
                <div className="absolute inset-[-28%_-19%]">
                    <img alt="" src={imgCh4FilesGlow} className="block size-full max-w-none" />
                </div>
            </div>

            <div className="relative z-10 flex w-full shrink-0 items-end justify-between ps-[200px] pe-0" dir="rtl">
                <div className="flex min-h-px min-w-0 flex-1 flex-col items-end justify-center gap-6 text-right text-[#001d26]">
                    <h2 id="ch4-files-heading" className="text-[34px] font-bold leading-[1.1] tracking-[0.25px] whitespace-nowrap">
                        {filesTitle}
                    </h2>
                    <div className="w-full text-[20px] font-normal leading-[1.28] tracking-[0.15px]">
                        <p className="mb-0">{FILES_SECTION_INTRO_P1}</p>
                        <p>{FILES_SECTION_INTRO_P2}</p>
                    </div>
                </div>
                <div className="flex shrink-0 gap-[10px]" dir="ltr">
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
                dir="ltr"
                className="relative z-10 flex h-[432px] w-full shrink-0 items-end justify-end gap-6 overflow-x-auto overflow-y-hidden scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
                <div className="w-[180px] shrink-0" aria-hidden />
                {items.map((f, i) => (
                    <DesktopFileCard key={i} name={f.name} desc={f.desc} imageSrc={f.image} />
                ))}
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

            {/* ========== דסקטופ בלבד ========== */}
            <div className="hidden md:block">
                <header className="max-w-7xl mx-auto px-6 text-center mb-20 relative">
                <div className="inline-flex items-center gap-2 bg-[#C5E080] border-2 border-[#2D2D44] px-4 py-1.5 rounded-full mb-8 font-bold text-sm shadow-[3px_3px_0px_#2D2D44]">
                    <span>{data.hero?.tag}</span>
                    <div className="bg-white/40 px-2 rounded-full text-xs">04</div>
                </div>
                <div className="relative inline-block">
                        <h1 className="text-5xl md:text-6xl font-black text-[#2D2D44] relative z-10">
                        {data.hero?.title}
                        <span className="absolute bottom-4 right-0 w-full h-6 bg-[#FFB84C] -z-10 rounded-sm"></span>
                    </h1>
                    <Layers className="absolute -top-12 -right-16 text-[#816AFE] w-14 h-14 rotate-12 opacity-40 animate-pulse" />
                </div>
                    <div className="text-[180px] font-black text-[#816AFE] absolute top-10 left-0 opacity-[0.03] font-['Rubik'] pointer-events-none">
                    04
                </div>
            </header>

                <section className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                {data.features?.map(f => (
                    <AdminFeatureCard key={f.id} {...f} iconName={f.icon} />
                ))}
            </section>

                <section className="max-w-7xl mx-auto px-6 mb-24">
                <div className="bg-white rounded-[50px] border-2 border-[#2D2D44] p-8 md:p-20 flex flex-col lg:flex-row gap-16 items-center shadow-[15px_15px_0px_rgba(45,45,68,0.05)]">
                    {/* Left — yellow image + overlay CTA (Figma 120:6881 + 120:6972) */}
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

                            <div className="flex flex-col gap-[12px] items-end w-full">
                                {data.nativSystem?.principles?.map((p, i) => (
                                    <div key={i} className="flex items-center justify-end gap-[12px] w-full">
                                        <p className="flex-1 font-normal text-[20px] leading-[1.28] tracking-[0.15px] text-[#001d26]">
                                            {p}
                                        </p>
                                        <div className="bg-[rgba(188,224,121,0.6)] flex items-center justify-center h-[24px] w-[32px] rounded-[200px] shrink-0">
                                            <div className="overflow-clip relative w-[18px] h-[18px]">
                                                <img
                                                    src={imgNativArrowLeftOutline}
                                                    alt=""
                                                    className="absolute inset-0 w-full h-full object-contain"
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

                {/* Figma 125:2391 — "הוועדות" + FAQ (desktop only) */}
                <section
                    className="relative w-full overflow-clip rounded-tl-[24px] rounded-tr-[24px] border-t-[2px] border-[#ffb23b] pb-[100px] pt-[120px] mb-24"
                    style={{
                        backgroundImage:
                            'linear-gradient(90deg, rgba(255, 178, 59, 0.08) 0%, rgba(255, 178, 59, 0.08) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)',
                    }}
                >
                    <div className="mx-auto w-full max-w-[1424px] bg-[#6546de] border-[1.5px] border-[#001d26] flex flex-col gap-[24px] rounded-[24px] px-[80px] pt-[64px] pb-[52px] shadow-[2px_2px_0px_0px_#001d26]">
                        <p className="font-['Rubik'] font-bold leading-[1.1] text-[34px] text-white text-right tracking-[0.25px] whitespace-nowrap">
                            {committees?.title}
                        </p>

                        <div className="flex flex-col gap-[24px] items-center w-full">
                            <div className="flex flex-col gap-[8px] items-center text-center leading-[1.28] relative shrink-0 w-full">
                                <p className="font-normal text-[20px] leading-[1.32] tracking-[0.15px] text-white">
                                    {committees?.intro}
                                </p>
                                <p className="font-semibold text-[20px] leading-[1.28] tracking-[0.15px] text-white">
                                    שלבי התהליך:
                                </p>
                            </div>

                            <div className="flex gap-[24px] items-start justify-center w-full">
                                {steps.map((s) => (
                                    <CommitteeStepCard key={s.id} step={s} />
                                ))}
                            </div>

                            <p className="font-normal text-[20px] leading-[1.28] tracking-[0.15px] text-white w-[min-content] text-center">
                                {committees?.footer}
                            </p>
                        </div>
                    </div>

                    {/* FAQ headings + rows */}
                    <div className="mx-auto mt-[24px] max-w-[1424px] w-full text-right px-[200px]">
                        <div className="flex flex-col items-end justify-center pt-[24px] text-[#001d26] whitespace-nowrap">
                            <p className="font-['Rubik'] font-normal leading-[1.32] text-[16px] tracking-[0.15px]">
                                כל מה שרצית לשאול
                            </p>
                            <p className="font-['Rubik'] font-bold leading-[1.1] text-[34px] tracking-[0.25px]">
                                שאלות ותשובות
                            </p>
                        </div>

                        <div className="mt-[16px] w-full">
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
                </section>

                <Chapter4DesktopFilesSection files={data.files} filesTitle={data.filesTitle ?? 'נהלים וטפסים'} />

            <footer className="px-6 max-w-5xl mx-auto">
                <NextChapterButton 
                    title="לפרק הבא"
                    subtitle="פרק 05 - כלים מעשיים"
                    onClick={onNext}
                />
            </footer>
            </div>
        </div>
    );
};

export default Chapter4;
