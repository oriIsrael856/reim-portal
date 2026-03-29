import React, { useMemo, useRef, useState } from 'react';
import { Layers, Plus, Minus } from 'lucide-react';
import AdminFeatureCard from '../components/chapter4/AdminFeatureCard';
import CommitteeStepCard from '../components/chapter4/CommitteeStepCard';
import NextChapterButton from '../components/common/NextChapterButton';
import PrevChapterButton from '../components/common/PrevChapterButton';
import { Chapter4MobileView } from '../components/chapter4/mobile';
import { CH4_ASSETS } from '../components/chapter4/chapter4Assets';

function DesktopFaqRow({ item, isOpen, onToggle }) {
    return (
        <div
            className={`overflow-hidden rounded-[8px] transition-all duration-300 ${
                isOpen
                    ? 'border border-[rgba(101,70,222,0.22)] bg-white shadow-[0px_4px_20px_rgba(129,106,254,0.12)]'
                    : 'border border-[rgba(101,70,222,0.08)] bg-white hover:border-[rgba(101,70,222,0.35)] hover:shadow-[0px_4px_24px_rgba(101,70,222,0.14)]'
            }`}
        >
            <button
                type="button"
                className={`flex h-[80px] w-full items-center gap-[24px] overflow-clip px-[24px] transition-colors duration-300 ${
                    !isOpen ? 'hover:bg-[rgba(101,70,222,0.05)]' : ''
                }`}
                onClick={onToggle}
                dir="rtl"
            >
                {/* RTL DOM order: text first (→ physical right / reading-start), icon second (→ physical left) */}
                <p
                    className={`min-w-0 flex-1 text-right font-['Rubik'] text-[24px] font-normal leading-[1.334] tracking-[0px] transition-colors duration-300 ${
                        isOpen ? 'text-[#6546de]' : 'text-[#001d26]'
                    }`}
                >
                    {item.title}
                </p>
                <div
                    className={`flex size-[24px] shrink-0 items-center justify-center overflow-clip transition-colors duration-300 ${
                        isOpen ? 'text-[#6546de]' : 'text-[#001d26]'
                    }`}
                >
                    {isOpen ? (
                        <Minus size={20} strokeWidth={2.5} color="currentColor" />
                    ) : (
                        <Plus size={20} strokeWidth={2.5} color="currentColor" />
                    )}
                </div>
            </button>

            {isOpen && (
                <div className="px-[24px] pb-[24px] text-right font-['Rubik'] text-[16px] font-normal leading-[1.32] tracking-[0.15px] text-[#001d26]/70">
                    {item.content}
                </div>
            )}
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

/** רוחב כרטיס + רווח בין כרטיסים — Figma gap-[24px] */
const CH4_FILES_CARD_GAP = 24;
const CH4_FILES_CARD_SCROLL_STEP = 320 + CH4_FILES_CARD_GAP;


function DesktopFileCard({ name, desc, imageSrc }) {
    const src = imageSrc || imgCh4FilesCard;
    return (
        <button
            type="button"
            className="group relative z-0 flex h-[400px] w-[320px] shrink-0 flex-col items-stretch gap-4 overflow-visible rounded-[16px] border-[1.5px] border-[rgba(101,70,222,0.16)] bg-white pt-2 pb-6 px-2 text-[#001d26] shadow-none transition-all duration-200 ease-out hover:z-[2] hover:-translate-y-1 hover:border-[#6546de] hover:shadow-[2px_10px_28px_rgba(101,70,222,0.18)] hover:bg-gradient-to-b hover:from-[rgba(255,178,59,0.14)] hover:to-white focus-visible:z-[2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6546de]"
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

    const scrollStrip = (delta) => {
        const el = scrollRef.current;
        if (!el) return;
        const rtl = getComputedStyle(el).direction === 'rtl';
        el.scrollBy({ left: rtl ? -delta : delta, behavior: 'smooth' });
    };

    return (
        <section
            id="ch4-files-section"
            dir="rtl"
            className="relative overflow-hidden rounded-tl-[24px] rounded-tr-[24px] bg-white pt-[120px] pb-[120px] pr-[200px] pl-0"
            aria-labelledby="ch4-files-heading"
        >
            {/* Decorative glow — Figma 125:4093: 1044×711px
                right=(996/1424)×100%≈69.94% keeps proportion in zoom-scaled artboard
                top=-39px is a fixed bleed above section top (clipped by overflow-hidden) */}
            <div
                className="pointer-events-none absolute top-[-39px] h-[711px] w-[1044px]"
                style={{ right: 'calc(996 / 1424 * 100%)' }}
                aria-hidden
            >
                <div className="absolute inset-[-28.13%_-19.16%]">
                    <img alt="" src={imgCh4FilesGlow} className="block size-full max-w-none" />
                </div>
            </div>

            <div className="relative z-10 flex w-full flex-col gap-[60px]">
                {/* Title row — Figma 125:4094: items-end justify-between
                    pl-[200px] mirrors the section's pr-[200px] → symmetric 200px margins for the title.
                    DOM order: text first (inline-start = physical right in RTL), arrows second (inline-end = physical left). */}
                <div className="flex w-full shrink-0 items-end justify-between pl-[200px]">
                    <div className="flex min-h-px min-w-0 flex-1 flex-col items-end gap-[24px] text-[#001d26]">
                        <h2
                            id="ch4-files-heading"
                            className="w-full text-right text-[34px] font-bold leading-[1.1] tracking-[0.25px]"
                        >
                            {filesTitle}
                        </h2>
                        <div className="w-full text-right text-[20px] font-normal leading-[1.28] tracking-[0.15px]">
                            <p className="mb-0">{FILES_SECTION_INTRO_P1}</p>
                            <p>{FILES_SECTION_INTRO_P2}</p>
                        </div>
                    </div>
                    {/* dir="ltr" keeps left-arrow left and right-arrow right within the button pair */}
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

                {/* Cards carousel — Figma 125:4101: h-432 items-end gap-24
                    32px of headroom above cards (432-400) absorbs the hover lift (-translate-y-1).
                    Cards are fixed w-320 shrink-0 — no flex-basis calculation needed. */}
                <div
                    ref={scrollRef}
                    dir="rtl"
                    className="flex h-[432px] w-full shrink-0 items-end gap-[24px] overflow-x-auto overflow-y-hidden scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                >
                    {items.map((f, i) => (
                        <DesktopFileCard key={i} name={f.name} desc={f.desc} imageSrc={f.image} />
                    ))}
                </div>
            </div>
        </section>
    );
}

const Chapter4 = ({ data, content, onNext, onPrev }) => {
    const committees = data?.committees;
    const qaItems = data?.qa ?? [];
    const steps = useMemo(() => data?.committees?.steps ?? [], [data?.committees]);
    const [openFaqIndex, setOpenFaqIndex] = useState(null);

    if (!data) return <div className="p-20 text-center font-bold text-[#816AFE]">טוען נתוני עבודה מנהלית...</div>;

    return (
        <div className="min-h-screen bg-[#FFFDF5] pt-24 pb-12 font-['Rubik'] md:pt-3">
            {onPrev && (
                <div className="px-4 pt-6 pb-4 md:pt-1 md:pb-2">
                    <PrevChapterButton title="לפרק הקודם" subtitle="פרק 03 - תפקיד הרכזת" onClick={onPrev} />
                </div>
            )}

            <Chapter4MobileView
                data={data}
                onNext={onNext}
                proceduresIntro={data.proceduresIntro ?? PROCEDURES_INTRO}
                footerData={content?.footer}
            />

            {/* Desktop — full width; no zoom/max-w capping (causes half-empty screen in Chrome) */}
            <div className="hidden md:block w-full">
                <div className="relative w-full">
                        {/* Figma 120:5459 — Ellipse 2: 1184×1184, fill rgba(255,178,59,0.08), blur 200px */}
                        <div
                            className="pointer-events-none absolute z-0 rounded-full"
                            aria-hidden
                            style={{
                                width: 'min(1184px, 92vw)',
                                height: 'min(1184px, 92vw)',
                                background: 'var(--home-desktop-hero-blur-amber, rgba(255, 178, 59, 0.08))',
                                filter: 'blur(200px)',
                                top: 'clamp(-16rem, -24vw, -6rem)',
                                left: 'clamp(-14rem, -22vw, -5rem)',
                            }}
                        />
                {/* Figma 120:5527 — desktop hero: chapter pill + badge, H2 + orange bar, twin layers icons */}
                <header className="relative z-[1] mx-auto mb-12 max-w-[960px] px-6 pb-2 pt-0 md:mb-24 md:px-10 md:pt-0" dir="rtl">
                    <div className="flex flex-col items-center gap-6 md:gap-7">
                        <div className="relative flex shrink-0 flex-col items-center">
                            <div className="relative flex h-[42px] min-w-[158px] items-center justify-center rounded-[24px] border-[1.5px] border-[#001d26] bg-[#bce079] px-6 shadow-[2px_2px_0px_0px_#001d26]">
                                <div
                                    className="absolute left-1/2 top-[-23.5px] z-10 flex size-8 -translate-x-1/2 items-center justify-center rounded-full border-[1.5px] border-[#001d26] bg-[#839c54]"
                                    aria-hidden
                                >
                                    <span
                                        dir="ltr"
                                        className="font-['Salsa'] text-[16px] font-normal leading-[1.28] tracking-[0.15px] text-white"
                                    >
                                        {data.chapterNumber ?? '04'}
                                    </span>
                                </div>
                                <span className="whitespace-nowrap text-center text-[20px] font-normal leading-[1.28] tracking-[0.15px] text-[#001d26]">
                                    {data.hero?.tag}
                                </span>
                            </div>
                        </div>

                        {/* Title + layers icons: flex keeps icons vertically centered with the headline (reference layout) */}
                        <div className="flex w-full max-w-[min(920px,100%)] items-center justify-center gap-2 sm:gap-4 md:gap-8 lg:gap-12">
                            <Layers
                                strokeWidth={1.75}
                                className="pointer-events-none size-8 shrink-0 rotate-6 text-[#6546de] max-sm:size-7"
                                aria-hidden
                            />
                            <div className="relative min-w-0 max-w-[min(480px,calc(100%-4rem))] shrink">
                                <div
                                    className="pointer-events-none absolute left-1/2 top-[43px] z-0 h-[17px] w-[min(371px,calc(100%-16px))] max-w-full -translate-x-1/2 bg-[#ffb23b]"
                                    aria-hidden
                                />
                                <h1 className="relative z-[1] text-center text-[60px] font-bold leading-none tracking-[-0.5px] text-[#001d26]">
                                    {data.hero?.title}
                                </h1>
                            </div>
                            <Layers
                                strokeWidth={1.75}
                                className="pointer-events-none size-8 shrink-0 -rotate-6 text-[#6546de] max-sm:size-7"
                                aria-hidden
                            />
                        </div>
                    </div>
                </header>

                {/* Figma Section 1: strip max ~1282px; Cards gap 24px; Chapter No. — 205px above “04”, 120px bbox (Chapter/Large), 55px below; row = 380px */}
                <section className="relative z-[1] mx-auto mb-20 w-full max-w-[1282px] overflow-x-visible px-5 md:mb-28 md:px-6 lg:px-8">
                    {/* Chapter No. — absolute in the section's left padding zone; out of flex flow */}
                    <div
                        className="pointer-events-none absolute left-0 top-0 hidden w-[205px] flex-col items-start overflow-visible pt-[205px] pb-[21px] md:flex"
                        dir="ltr"
                        aria-hidden
                    >
                        <div className="relative inline-block">
                            <p className="m-0 whitespace-nowrap font-['Salsa'] text-[120px] font-normal leading-[1.28] tracking-[0.15px] text-[#6546DE]">
                                {data.chapterNumber ?? '04'}
                            </p>
                            <svg
                                className="pointer-events-none absolute left-[-2%] top-[14%] h-[72%] w-[104%] text-[#EF4444]"
                                viewBox="0 0 100 44"
                                fill="none"
                                preserveAspectRatio="none"
                                aria-hidden
                            >
                                <path d="M0 7 Q16 3 34 7 T68 7 T100 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                                <path d="M0 22 Q20 17 38 22 T72 22 T100 22" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                                <path d="M0 37 Q16 33 34 37 T70 37 T100 37" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                            </svg>
                        </div>
                    </div>

                    {/* Cards row — sole flex child; pe-[160px] = physical-left padding in RTL,
                        shifts cards rightward so "04" (left-0, ~142px wide) has clear clearance */}
                    <div
                        dir="rtl"
                        className="relative z-10 mx-auto flex w-full max-w-full flex-col items-center gap-7 md:min-h-[380px] md:flex-row md:items-center md:justify-center md:pe-[160px]"
                    >
                        <div className="flex w-full max-w-full shrink-0 flex-col items-center gap-6 md:min-h-[380px] md:w-auto md:flex-row md:content-start md:items-start md:justify-center md:gap-6">
                            {data.features?.map((f) => (
                                <AdminFeatureCard
                                    key={f.id}
                                    {...f}
                                    iconName={f.icon}
                                    variant="chapter4Desktop"
                                    onClick={() => {
                                        const sectionId = {
                                            '01': 'ch4-nativ-section',
                                            '02': 'ch4-committees-section',
                                            '03': 'ch4-files-section',
                                        }[f.id];
                                        if (sectionId) {
                                            document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                        }
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                <section id="ch4-nativ-section" className="max-w-7xl mx-auto px-6 mb-24">
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

                {/* ── Figma 125:2391 — "Section 2": וועדות + שאלות ותשובות ─────────────
                     Background fills full viewport width. px-[140px] is the proportional
                     equivalent of Figma's px-[200px] on the Figma 1824px frame
                     (200/1824 ≈ 11% → ~145px on a 1320px viewport). max-w-[1424px] on each
                     child caps the purple card at the Figma artboard width on wide monitors.
                ────────────────────────────────────────────────────────────────────── */}
                <section
                    id="ch4-committees-section"
                    dir="rtl"
                    className="relative flex w-full flex-col items-center gap-[32px] rounded-tl-[24px] rounded-tr-[24px] border-t-[2px] border-[#ffb23b] pb-[64px] pt-[120px]"
                    style={{
                        paddingInline: 'clamp(24px, 11%, 200px)',
                        backgroundImage:
                            'linear-gradient(90deg, rgba(255, 178, 59, 0.08) 0%, rgba(255, 178, 59, 0.08) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)',
                    }}
                >
                    {/* ── Purple "הועדות" card — Figma 125:2392 ───────────────────────────────
                         max-w-[1424px] caps growth on wide monitors (≥ 1700px viewport).
                         flex-col gap-[24px] items-center pt-[64px] pb-[52px] px-[80px]
                    ──────────────────────────────────────────────────────────────────────── */}
                    <div className="flex w-full max-w-[1424px] mx-auto flex-col items-center gap-[24px] rounded-[24px] border-[1.5px] border-[#001d26] bg-[#6546de] px-[80px] pb-[52px] pt-[64px] shadow-[2px_2px_0px_0px_#001d26]">
                        {/* H4 title — Figma 125:2539: whitespace-nowrap, natural width, centred by flex parent
                            text-right + dir="auto" on Hebrew = physical-right within element, but
                            since element is content-sized (whitespace-nowrap) and parent is items-center,
                            the word visually sits centred in the card. */}
                        <p className="whitespace-nowrap text-[34px] font-bold leading-[1.1] tracking-[0.25px] text-white">
                            {committees?.title}
                        </p>

                        {/* Container — Figma 125:2395: flex-col gap-[24px] items-center w-full */}
                        <div className="flex w-full flex-col items-center gap-[24px]">
                            {/* Body text block — Figma 125:2396: flex-col gap-[8px] items-start
                                In RTL, items-start = inline-start = physical right.
                                Children use min-w-full so they stretch to full width of this block,
                                making items-start vs items-center visually equivalent here. */}
                            <div className="flex w-full flex-col items-start gap-[8px] text-center text-[20px] leading-[1.28] tracking-[0.15px] text-white">
                                {/* Figma 125:2397: font-normal, min-w-full w-[min-content] */}
                                <p className="min-w-full w-[min-content] font-normal">
                                    {committees?.intro}
                                </p>
                                {/* Figma 125:2398: font-semibold */}
                                <p className="min-w-full font-semibold">
                                    שלבי התהליך:
                                </p>
                            </div>

                            {/* Step cards row — Figma 125:2399 "Age Group":
                                flex gap-[24px] w-full (default items-stretch → all cards same height)
                                DOM order [s1, s2, s3, s4] in RTL flex → s1 physical-right,
                                s4 physical-left → process reads right→left naturally in Hebrew. */}
                            <div className="flex w-full justify-center gap-[24px]">
                                {steps.map((s) => (
                                    <CommitteeStepCard key={s.id} step={s} />
                                ))}
                            </div>

                            {/* Footer sentence — Figma 125:2546: font-normal, min-w-full w-[min-content] */}
                            <p className="min-w-full w-[min-content] text-center text-[20px] font-normal leading-[1.28] tracking-[0.15px] text-white">
                                {committees?.footer}
                            </p>
                        </div>
                    </div>

                    {/* ── FAQ heading — Figma 125:2583 (direct section child, gap-[32px] from purple card)
                         pt-[24px] = internal top padding before subtitle/title text */}
                    <div className="flex w-full max-w-[1424px] mx-auto flex-col items-start justify-center pt-[24px] text-[#001d26] text-right whitespace-nowrap">
                        <p className="text-[16px] font-normal leading-[1.32] tracking-[0.15px]">
                            כל מה שרצית לשאול
                        </p>
                        <p className="text-[34px] font-bold leading-[1.1] tracking-[0.25px]">
                            שאלות ותשובות
                        </p>
                    </div>

                    {/* ── FAQ items — Figma 125:2673 (direct section child, gap-[32px] from heading) */}
                    <div className="flex w-full max-w-[1424px] mx-auto flex-col gap-[16px]">
                        {qaItems.map((item, index) => (
                            <DesktopFaqRow
                                key={index}
                                item={item}
                                isOpen={openFaqIndex === index}
                                onToggle={() =>
                                    setOpenFaqIndex(openFaqIndex === index ? null : index)
                                }
                            />
                        ))}
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
    );
};

export default Chapter4;

