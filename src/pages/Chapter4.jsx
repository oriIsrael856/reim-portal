import React, { useMemo, useRef, useState } from 'react';
import { useViewportFit } from '../hooks/useViewportFit';
import { useChapter4DesktopStyles } from '../hooks/useChapter4DesktopStyles';
import {
    getCh4BoxMaxWidthCss,
    getCh4MinMaxWidthCss,
    getCh4ViewportFitArgs,
} from '../config/chapter4ViewportRegistry';
import { Plus, Minus } from 'lucide-react';
import AdminFeatureCard from '../components/chapter4/AdminFeatureCard';
import CommitteeStepCard from '../components/chapter4/CommitteeStepCard';
import NextChapterButton from '../components/common/NextChapterButton';
import PrevChapterButton from '../components/common/PrevChapterButton';
import { Chapter4MobileView } from '../components/chapter4/mobile';
import { CH4_ASSETS } from '../components/chapter4/chapter4Assets';

function DesktopFaqRow({
    item,
    isOpen,
    onToggle,
    rowHeight,
    buttonLayoutStyle,
    expandedPaddingStyle,
    titleFontStyle,
    expandedFontStyle,
}) {
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
                style={{ height: rowHeight, ...buttonLayoutStyle }}
                className={`flex w-full items-center overflow-clip transition-colors duration-300 ${
                    !isOpen ? 'hover:bg-[rgba(101,70,222,0.05)]' : ''
                }`}
                onClick={onToggle}
                dir="rtl"
            >
                {/* RTL DOM order: text first (→ physical right / reading-start), icon second (→ physical left) */}
                <p
                    className={`min-w-0 flex-1 text-right font-['Rubik'] font-normal leading-[1.334] transition-colors duration-300 ${
                        isOpen ? 'text-[#6546de]' : 'text-[#001d26]'
                    }`}
                    style={titleFontStyle}
                >
                    {item.title}
                </p>
                <div
                    className={`flex size-[16px] shrink-0 items-center justify-center overflow-clip transition-colors duration-300 ${
                        isOpen ? 'text-[#6546de]' : 'text-[#001d26]'
                    }`}
                >
                    {isOpen ? (
                        <Minus size={14} strokeWidth={2.5} color="currentColor" />
                    ) : (
                        <Plus size={14} strokeWidth={2.5} color="currentColor" />
                    )}
                </div>
            </button>

            {isOpen && (
                <div
                    className="text-right font-['Rubik'] font-normal leading-[1.43] tracking-[0.15px] text-[#001d26]/70"
                    style={{ ...expandedPaddingStyle, ...expandedFontStyle }}
                >
                    {item.content}
                </div>
            )}
        </div>
    );
}

const PROCEDURES_INTRO = 'בקבצים המצורפים תוכלו למצוא את נהלי העבודה בתוכנית רעים: נהלים אלה נועדו לסייע בעבודה השוטפת, להעניק סדר וביטחון לפעילות בתוך ומחוץ למרכז הקהילתי.';

// Figma 120:5457 — Section 1 hero decorations (fetched from node 120:5455)
const imgOutlineLayers = 'https://www.figma.com/api/mcp/asset/6135bd39-729b-4f47-8e89-70eda8cce1de';

// Figma 120:6878 — "Section Meeting" (מערכת נתיב) assets (fetched from node 120:5455)
const imgNativHero = 'https://www.figma.com/api/mcp/asset/6a107b03-a3cd-4c93-9904-62bc169198ab';
const imgNativDiagonalArrow = 'https://www.figma.com/api/mcp/asset/eb0673e3-bbdf-49cd-afe8-f07d4711f1d3';
const imgNativArrowLeftOutline = 'https://www.figma.com/api/mcp/asset/c44811c9-b846-40fc-85f2-abb3e958267e';

// Figma 125:4050 — "נהלים וטפסים" (fetched from node 120:5455)
const imgCh4FilesCard = 'https://www.figma.com/api/mcp/asset/777f2431-c6cb-444e-b48f-ce2f216608db';
const imgCh4FilesGlow = 'https://www.figma.com/api/mcp/asset/a5ad7a16-0f7f-4331-9da3-c808a4c8b51f';
const imgCh4FilesArrowLeft = 'https://www.figma.com/api/mcp/asset/592b33d6-6205-4fbc-9a51-904f82464a39';
const imgCh4FilesArrowRight = 'https://www.figma.com/api/mcp/asset/20905ef2-081b-4c5c-ad03-d7906647b63a';

const FILES_SECTION_INTRO_P1 = 'בקבצים המצורפים ניתן למצוא את נהלי העבודה בתכנית רעים:';
const FILES_SECTION_INTRO_P2 =
    'הנהלים נועדו לסייע בעבודה השוטפת, להעניק סדר וביטחון להתנהלות בתוך המרכז הקהילתי ומחוצה לו.';

function DesktopFileCard({ name, desc, imageSrc, ch4 }) {
    const src = imageSrc || imgCh4FilesCard;
    return (
        <button
            type="button"
            className="group relative z-0 flex shrink-0 flex-col items-stretch overflow-visible rounded-[16px] border-[1.5px] border-[rgba(101,70,222,0.16)] bg-white text-[#001d26] shadow-none transition-all duration-200 ease-out hover:z-[2] hover:-translate-y-1 hover:border-[#6546de] hover:shadow-[2px_10px_28px_rgba(101,70,222,0.18)] hover:bg-gradient-to-b hover:from-[rgba(255,178,59,0.14)] hover:to-white focus-visible:z-[2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6546de]"
            style={ch4?.fileCard}
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
                    <span
                        className="inline-flex items-center justify-center rounded-full border-[1.5px] border-[#6546de] bg-[#6546de] font-['Rubik'] font-bold leading-[1.625] tracking-wide text-white"
                        style={ch4?.fileCardDownloadRow}
                    >
                        <img src={CH4_ASSETS.fileDownloadPill} alt="" width={20} height={20} className="size-5 shrink-0" />
                        הורדת הקובץ
                    </span>
                </div>
            </div>
            <div className="flex w-full flex-col text-right tracking-[0.15px]" style={ch4?.fileCardTextCol}>
                <div className="flex flex-col" style={ch4?.fileCardTextStackGap}>
                    <p className="text-right font-semibold leading-[1.28]" style={ch4?.fileCardTitleFont}>
                        {name}
                    </p>
                    <p className="text-right font-normal leading-[1.32]" style={ch4?.fileCardDescFont}>
                        {desc}
                    </p>
                </div>
            </div>
        </button>
    );
}

function Chapter4DesktopFilesSection({ files, filesTitle, ch4 }) {
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
            className="relative overflow-hidden rounded-tl-[24px] rounded-tr-[24px] bg-white"
            style={ch4?.filesSection}
            aria-labelledby="ch4-files-heading"
        >
            {/* Decorative glow — Figma 125:4093: 1044×711px
                right=(996/1424)×100%≈69.94% keeps proportion in zoom-scaled artboard
                top=-39px is a fixed bleed above section top (clipped by overflow-hidden) */}
            <div
                className="pointer-events-none absolute"
                style={ch4?.filesGlowStyle}
                aria-hidden
            >
                <div className="absolute inset-[-28.13%_-19.16%]">
                    <img alt="" src={imgCh4FilesGlow} className="block size-full max-w-none" />
                </div>
            </div>

            <div className="relative z-10 flex w-full flex-col" style={ch4?.filesZ10StackGap}>
                {/* Title row — Figma 125:4094: items-end justify-between
                    pe mirrors section's ps gutter for symmetric margins on the title row. */}
                <div className="flex w-full shrink-0 items-end justify-between" style={ch4?.filesTitleRow}>
                    <div className="flex min-h-px min-w-0 flex-1 flex-col items-end text-[#001d26]" style={ch4?.filesTitleDescGap}>
                        <h2
                            id="ch4-files-heading"
                            className="w-full text-right font-bold leading-[1.1] tracking-[0.25px]"
                            style={ch4?.filesHeadingFont}
                        >
                            {filesTitle}
                        </h2>
                        <div className="w-full text-right font-normal leading-[1.28] tracking-[0.15px]" style={ch4?.filesBodyFont}>
                            <p className="mb-0">{FILES_SECTION_INTRO_P1}</p>
                            <p>{FILES_SECTION_INTRO_P2}</p>
                        </div>
                    </div>
                    {/* dir="ltr" keeps left-arrow left and right-arrow right within the button pair */}
                    <div className="flex shrink-0" dir="ltr" style={ch4?.filesScrollButtonsRowGap}>
                        <button
                            type="button"
                            className="rounded-[200px] bg-[rgba(101,70,222,0.12)]"
                            style={ch4?.filesScrollButtonPadding}
                            aria-label="גלילה אחורה"
                            onClick={() => scrollStrip(-(ch4?.filesScrollStep ?? 344))}
                        >
                            <img alt="" src={imgCh4FilesArrowLeft} className="size-6 object-contain" />
                        </button>
                        <button
                            type="button"
                            className="rounded-[200px] bg-[rgba(101,70,222,0.12)]"
                            style={ch4?.filesScrollButtonPadding}
                            aria-label="גלילה קדימה"
                            onClick={() => scrollStrip(ch4?.filesScrollStep ?? 344)}
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
                    className="flex w-full shrink-0 items-end overflow-x-auto overflow-y-hidden scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                    style={ch4?.filesCarouselStrip}
                >
                    {items.map((f, i) => (
                        <DesktopFileCard key={i} name={f.name} desc={f.desc} imageSrc={f.image} ch4={ch4} />
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

    const d = useChapter4DesktopStyles();

    // Purple committees card — slot model (registry preset)
    const cardStyle = useViewportFit(getCh4ViewportFitArgs('committeesPurpleCard'));

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
                                width: getCh4MinMaxWidthCss(1184),
                                height: getCh4MinMaxWidthCss(1184),
                                background: 'var(--home-desktop-hero-blur-amber, rgba(255, 178, 59, 0.08))',
                                filter: 'blur(200px)',
                                top: 'clamp(-16rem, -24vw, -6rem)',
                                left: 'clamp(-14rem, -22vw, -5rem)',
                            }}
                        />
                {/* Figma 120:5527 — desktop hero: chapter pill + badge, H2 + orange bar, twin layers icons */}
                <header
                    className="relative z-[1] mx-auto w-full pb-2 pt-0 mb-5 lg:mb-8 xl:mb-12 md:pt-0"
                    dir="rtl"
                    style={{ ...d.heroHeader, maxWidth: getCh4MinMaxWidthCss(960) }}
                >
                    <div className="flex flex-col items-center" style={d.heroStackGap}>
                        <div className="relative flex shrink-0 flex-col items-center">
                            <div
                                className="relative flex min-w-[158px] items-center justify-center rounded-[24px] border-[1.5px] border-[#001d26] bg-[#bce079] shadow-[2px_2px_0px_0px_#001d26]"
                                style={d.heroChapterPill}
                            >
                                <div
                                    className="absolute left-1/2 top-[-23.5px] z-10 flex -translate-x-1/2 items-center justify-center rounded-full border-[1.5px] border-[#001d26] bg-[#839c54]"
                                    style={d.heroChapterBadge}
                                    aria-hidden
                                >
                                    <span
                                        dir="ltr"
                                        className="font-['Salsa'] font-normal leading-[1.28] tracking-[0.15px] text-white"
                                        style={d.heroChapterNumeralFont}
                                    >
                                        {data.chapterNumber ?? '04'}
                                    </span>
                                </div>
                                <span
                                    className="whitespace-nowrap text-center font-normal leading-[1.28] tracking-[0.15px] text-[#001d26]"
                                    style={d.heroChapterTagFont}
                                >
                                    {data.hero?.tag}
                                </span>
                            </div>
                        </div>

                        {/* Title + layers icons — Figma 120:6170 / 120:6175 */}
                        <div
                            className="flex w-full items-center justify-center"
                            style={{ ...d.heroTitleRowFlex, maxWidth: `min(100%, ${getCh4MinMaxWidthCss(920)})` }}
                        >
                            {/* Layers icon left — Figma 120:6170: -rotate-6 (in our RTL ctx = physical left) */}
                            <div
                                className="relative flex shrink-0 -rotate-6 items-center justify-center pointer-events-none"
                                style={d.heroLayerIcon}
                                aria-hidden
                            >
                                <div className="flex-[1_0_0] h-full overflow-clip relative w-full">
                                    <div className="absolute inset-[12.5%]">
                                        <img alt="" className="absolute block max-w-none size-full" src={imgOutlineLayers} />
                                    </div>
                                </div>
                            </div>
                            <div
                                className="relative min-w-0 shrink"
                                style={{ maxWidth: `min(calc(100% - 4rem), ${getCh4MinMaxWidthCss(480)})` }}
                            >
                                <div
                                    className="pointer-events-none absolute left-1/2 z-0 max-w-full -translate-x-1/2 bg-[#ffb23b]"
                                    style={d.heroOrangeBar}
                                    aria-hidden
                                />
                                <h1
                                    className="relative z-[1] text-center font-bold leading-none tracking-[-0.5px] text-[#001d26]"
                                    style={d.heroH1}
                                >
                                    {data.hero?.title}
                                </h1>
                            </div>
                            {/* Layers icon right — Figma 120:6175: rotate-6 */}
                            <div
                                className="relative flex shrink-0 rotate-6 items-center justify-center pointer-events-none"
                                style={d.heroLayerIcon}
                                aria-hidden
                            >
                                <div className="flex-[1_0_0] h-full overflow-clip relative w-full">
                                    <div className="absolute inset-[12.5%]">
                                        <img alt="" className="absolute block max-w-none size-full" src={imgOutlineLayers} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Figma Section 1: strip max ~1282px; Cards gap 24px; Chapter No. — 205px above “04”, 120px bbox (Chapter/Large), 55px below; row = 380px */}
                <section
                    className="relative z-[1] mx-auto w-full overflow-x-visible mb-5 lg:mb-8 xl:mb-12"
                    style={{ ...d.featureStripSection, maxWidth: getCh4MinMaxWidthCss(1282) }}
                >
                    {/* Chapter No. — absolute in the section's left padding zone; out of flex flow */}
                    <div
                        className="pointer-events-none absolute left-0 top-0 hidden w-[205px] flex-col items-start overflow-visible pb-[21px] pt-[100px] lg:pt-[145px] xl:pt-[185px] md:flex"
                        dir="ltr"
                        aria-hidden
                    >
                        <div className="relative inline-block">
                            <p
                                className="m-0 whitespace-nowrap font-['Salsa'] font-normal leading-[1.28] tracking-[0.15px] text-[#6546DE]"
                                style={d.featureChapterNumeral}
                            >
                                {data.chapterNumber ?? '04'}
                            </p>
                            {/* Wave — inline SVG matching Chapter 2 / Chapter 5 pattern */}
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
                        className="relative z-10 mx-auto flex w-full max-w-full flex-col items-center md:flex-row md:items-end md:justify-center"
                        style={{ ...d.featureStripPe, ...d.featureCardsRowGapStack }}
                    >
                        <div
                            className="flex w-full max-w-full shrink-0 flex-col items-center md:w-auto md:flex-row md:content-start md:items-end md:justify-center"
                            style={d.featureCardsRowGap}
                        >
                            {data.features?.map((f) => (
                                <AdminFeatureCard
                                    key={f.id}
                                    {...f}
                                    iconName={f.icon}
                                    variant="chapter4Desktop"
                                    ch4DesktopStyles={d}
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

                {/* Figma 120:6878 — Section Meeting (מערכת נתיב):
                    Full-width section, no outer card. LTR row: image left, text right.
                    pt-120 pb-200 px-200 gap-200 (proportional via clamp) */}
                <section
                    id="ch4-nativ-section"
                    className="relative w-full rounded-tl-[24px] rounded-tr-[24px] bg-white"
                    style={d.nativSection}
                >
                    <div
                        dir="ltr"
                        className="mx-auto flex w-full max-w-full items-center justify-center"
                        style={{ ...d.nativInnerGap, maxWidth: getCh4MinMaxWidthCss(1424) }}
                    >
                        {/* Physical left (first LTR child) — yellow image card, Figma 120:6881 */}
                        <div
                            className="relative flex shrink-0 items-start justify-center rounded-[24px] border-[1.5px] border-[#001d26] bg-[#FFB23B] shadow-[2px_2px_0px_0px_#001d26]"
                            style={d.nativCard}
                            aria-label="מערכת נתיב"
                        >
                            <div className="aspect-[300/91] w-full relative">
                                <img
                                    src={imgNativHero}
                                    alt=""
                                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                                />
                            </div>
                            {/* CTA badge — overlaps bottom-right corner of orange card */}
                            <a
                                href="https://kb.nativ.app/article.php?id=66"
                                target="_blank"
                                rel="noreferrer"
                                className="absolute bottom-0 right-0 z-10 flex translate-x-1/2 translate-y-1/2 cursor-pointer items-center justify-center rounded-[8px] border-[1.5px] border-[#001d26] bg-[#bce079]"
                                style={d.nativCtaBadge}
                            >
                                <div className="relative overflow-clip" style={d.nativCtaIcon}>
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

                        {/* Physical right (second LTR child) — text frame, Figma 120:6885; w-full + wrap so copy uses column width (no nowrap clip) */}
                        <div className="flex min-w-0 w-full flex-1 flex-col items-stretch" style={d.nativTextGap}>
                            {/* Heading — Figma 120:6887 */}
                            <div className="flex w-full max-w-full flex-col items-end text-right text-[#001d26]">
                                <p className="max-w-full font-normal leading-[1.32] tracking-[0.15px]" style={d.nativSubtitleFont}>הנחיות לרכזת</p>
                                <p className="max-w-full break-words font-bold leading-[1.1] tracking-[0.25px]" style={d.nativHeadingFont}>{data.nativSystem?.title}</p>
                            </div>

                            {/* Content — Figma 120:6890 */}
                            <div className="flex w-full max-w-full min-w-0 flex-col" style={d.nativTextGap}>
                                {/* Description + principles label — Figma 120:7027 */}
                                <div className="flex w-full max-w-full min-w-0 flex-col" style={d.nativSubGap}>
                                    <p className="w-full max-w-full min-w-0 break-words text-right font-normal leading-[1.28] tracking-[0.15px] text-[#001d26]" style={d.nativBodyFont}>{data.nativSystem?.description}</p>
                                    <p className="w-full max-w-full min-w-0 break-words text-right font-semibold leading-[1.28] tracking-[0.15px] text-[#001d26]" style={d.nativBodyFont}>עקרונות העבודה בנתיב:</p>
                                </div>
                                {/* Principles list — Figma 120:6978 */}
                                <div className="flex w-full max-w-full min-w-0 flex-col" style={d.nativSubGap}>
                                    {data.nativSystem?.principles?.map((p, i) => (
                                        <div key={i} dir="ltr" className="flex w-full max-w-full min-w-0 items-center" style={d.nativPrincipleRowGap}>
                                            <p className="min-w-0 max-w-full flex-1 break-words text-right font-normal leading-[1.28] tracking-[0.15px] text-[#001d26]" style={d.nativBodyFont}>{p}</p>
                                            <div
                                                className="flex shrink-0 items-center justify-center rounded-[200px] bg-[rgba(188,224,121,0.6)]"
                                                style={d.nativPillTrack}
                                            >
                                                <div className="relative size-[18px] overflow-clip">
                                                    <img src={imgNativArrowLeftOutline} alt="" className="absolute inset-0 size-full object-contain" />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {/* Support — Figma 120:7025 */}
                                <div className="flex w-full max-w-full min-w-0 flex-col text-right">
                                    <p className="max-w-full break-words font-semibold leading-[1.28] text-[#001d26]" style={d.nativBodyFont}>תמיכה והדרכה:</p>
                                    <p className="max-w-full min-w-0 break-words font-normal leading-[1.28] text-[#001d26]" style={d.nativBodyFont}>{data.nativSystem?.support}</p>
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
                    className="relative flex w-full flex-col items-center rounded-tl-[24px] rounded-tr-[24px] border-t-[2px] border-[#ffb23b]"
                    style={{
                        ...d.committeesSection,
                        backgroundImage:
                            'linear-gradient(90deg, rgba(255, 178, 59, 0.08) 0%, rgba(255, 178, 59, 0.08) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)',
                    }}
                >
                    {/* ── Purple "הועדות" card — Figma 125:2392 ───────────────────────────────
                         max-w-[1424px] caps growth on wide monitors (≥ 1700px viewport).
                         flex-col gap-[24px] items-center pt-[64px] pb-[52px] px-[80px]
                    ──────────────────────────────────────────────────────────────────────── */}
                    {/* Figma 125:2392 — purple card: pt-64 pb-52 px-80 gap-24 */}
                    <div
                        className="flex w-full mx-auto flex-col items-center rounded-[24px] border-[1.5px] border-[#001d26] bg-[#6546de] shadow-[2px_2px_0px_0px_#001d26]"
                        style={{
                            ...cardStyle,
                            ...d.committeesPurpleCardPaddingX,
                            maxWidth: getCh4BoxMaxWidthCss('committeesPurpleCard'),
                        }}
                    >
                        {/* H4 title — fluid: scales from 18px at 900px to 34px at 1889px */}
                        <p className="w-full text-center font-bold leading-[1.1] tracking-[0.25px] text-white" style={d.committeesPurpleTitleFont}>
                            {committees?.title}
                        </p>

                        {/* Container — Figma 125:2395: flex-col gap-[24px] items-center w-full */}
                        <div className="flex w-full flex-col items-center" style={{ gap: cardStyle.gap }}>
                            {/* Body text block — Figma 125:2396: flex-col gap-1, text-sm scaled to text-base at lg */}
                            <div className="flex w-full flex-col items-start gap-1 text-center text-white leading-[1.28] tracking-[0.15px]" style={d.committeesPurpleBodyFont}>
                                <p className="min-w-full w-[min-content] font-normal">
                                    {committees?.intro}
                                </p>
                                {/* Figma 125:2398: font-semibold H6 */}
                                <p className="min-w-full font-semibold">
                                    שלבי התהליך:
                                </p>
                            </div>

                            {/* Step cards — Figma 125:2399: row gap scales vs 1920 ref */}
                            <div className="flex w-full" style={d.committeesStepRowGap}>
                                {steps.map((s) => (
                                    <CommitteeStepCard
                                        key={s.id}
                                        step={s}
                                        spacingStyle={d.committeesStepCard}
                                    />
                                ))}
                            </div>

                            {/* Footer — Figma 125:2546: 20px Regular */}
                            <p className="w-full text-center font-normal leading-[1.28] tracking-[0.15px] text-white" style={d.committeesPurpleBodyFont}>
                                {committees?.footer}
                            </p>
                        </div>
                    </div>

                    {/* ── FAQ heading — Figma 125:2583; column width = min(Figma px, width% of 1920 ref) */}
                    <div
                        className="mx-auto flex w-full flex-col items-start justify-center text-[#001d26] text-right whitespace-nowrap"
                        style={{
                            maxWidth: getCh4BoxMaxWidthCss('committeesFaq'),
                            ...d.faqHeadingBlock,
                        }}
                    >
                        <p className="font-normal leading-[1.32] tracking-[0.15px]" style={d.faqSectionLeadFont}>
                            כל מה שרצית לשאול
                        </p>
                        <p className="font-bold leading-[1.1] tracking-[0.25px]" style={d.faqSectionTitleFont}>
                            שאלות ותשובות
                        </p>
                    </div>

                    {/* ── FAQ items — per-row height + gaps scale vs 1080p ref (not slot-aggregated) */}
                    <div
                        className="mx-auto flex w-full flex-col"
                        style={{ maxWidth: getCh4BoxMaxWidthCss('committeesFaq'), ...d.faqListGap }}
                    >
                        {qaItems.map((item, index) => (
                            <DesktopFaqRow
                                key={index}
                                item={item}
                                rowHeight={d.faqRowHeight?.height ?? 'clamp(36px,2.9vw,56px)'}
                                buttonLayoutStyle={d.faqRowButton}
                                expandedPaddingStyle={d.faqExpandedBody}
                                titleFontStyle={d.faqRowTitleFont}
                                expandedFontStyle={d.faqExpandedContentFont}
                                isOpen={openFaqIndex === index}
                                onToggle={() =>
                                    setOpenFaqIndex(openFaqIndex === index ? null : index)
                                }
                            />
                        ))}
                    </div>
                </section>

                <Chapter4DesktopFilesSection
                    files={data.files}
                    filesTitle={data.filesTitle ?? 'נהלים וטפסים'}
                    ch4={d}
                />

                <footer
                    className="mx-auto w-full px-4 pb-8 md:px-6"
                    style={{ maxWidth: `min(100%, ${getCh4MinMaxWidthCss(896)})` }}
                >
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

