import React from 'react';
import { Star } from 'lucide-react';
import NextChapterButton from '../components/common/NextChapterButton';
import PrevChapterButton from '../components/common/PrevChapterButton';
import SplitStickyLayout from '../components/layout/SplitStickyLayout';
import Chapter3OnboardingStepCard from '../components/chapter3/Chapter3OnboardingStepCard';
import { Chapter3OnboardingHeading } from '../components/chapter3/Chapter3OnboardingHeading';
import Accordion from '../components/common/Accordion';
import { Chapter3MobileView } from '../components/chapter3/mobile';
import { INITIAL_DATA } from '../data';
import '../styles/chapter3-mobile.css';
import '../styles/chapter3-desktop.css';

/** Firestore may omit `onboarding`; merge defaults so desktop + mobile show steps (schema-safe). */
function mergeChapter3Onboarding(fromCms) {
    const base = INITIAL_DATA.chapter3.onboarding;
    if (fromCms == null || typeof fromCms !== 'object') return base;
    return {
        ...base,
        ...fromCms,
        steps: Array.isArray(fromCms.steps) && fromCms.steps.length > 0 ? fromCms.steps : base.steps,
    };
}

/**
 * Per-card color scheme for the three responsibility cards.
 * Matches Figma 120:3737 (purple), 120:4098 (yellow), 120:4140 (red).
 * icon: per-color SVG pill arrow from /assets/chapter3/.
 */
const RESPONSIBILITY_SCHEMES = [
    {
        titleClass: 'text-text-purple',
        cardBg: 'rgba(101,70,222,0.04)',
        icon: '/assets/chapter3/resp-list-icon-arrow.svg',
    },
    {
        titleClass: 'text-brand-yellow',
        cardBg: 'rgba(255,178,59,0.04)',
        icon: '/assets/chapter3/resp-list-icon-arrow-learning.svg',
    },
    {
        titleClass: 'text-brand-red',
        cardBg: 'rgba(196,33,59,0.04)',
        icon: '/assets/chapter3/resp-list-icon-arrow-admin.svg',
    },
];

const Chapter3 = ({ data, content, onNext, onPrev }) => {
    if (!data) return <div className="text-center p-20 text-text-purple font-bold">טוען נתוני פרק 3...</div>;

    const mergedData = { ...data, onboarding: mergeChapter3Onboarding(data.onboarding) };

    /* ── Sticky right sidebar — Figma 120:3759 ── */
    const StickyHeader = (
        <div className="flex flex-col items-start gap-[2.19vw]">

            {/* Chapter label chip — Figma 120:3761 */}
            <div className="flex items-center gap-[16px] bg-[#bce079] border-[1.5px] border-[#001d26] rounded-tl-[24px] rounded-bl-[24px] rounded-tr-[2px] shadow-[2px_2px_0_0_#001d26] h-[42px] ps-[6px] pe-[14px] py-[12px]">
                <div className="bg-[#839c54] w-[32px] h-[32px] rounded-full flex items-center justify-center shrink-0">
                    <span className="font-salsa text-[16px] leading-[1.28] tracking-[0.15px] text-white">03</span>
                </div>
                <span className="font-rubik text-[20px] leading-[1.28] tracking-[0.15px] text-[#001d26] whitespace-nowrap">
                    {data.hero?.tag ?? 'פרק שלישי'}
                </span>
            </div>

            {/* Title + yellow underline bar — Figma 120:4019 */}
            <div className="relative">
                {/* Yellow bar — Figma 120:3760: top-103px, physical-left=85px in 367px frame.
                    Decorative overlay uses physical left (acceptable per CLAUDE.md for deco).
                    left=23.16% ≈ 85/367 relative to sidebar container. */}
                <div
                    className="absolute bg-[#ffb23b] h-[17px] w-[291px]"
                    style={{ top: '103px', left: '23.16%' }}
                    aria-hidden
                />
                <h1
                    className="font-rubik font-bold text-[clamp(36px,3.29vw,60px)] leading-none tracking-[-0.5px] text-[#001d26] text-start relative"
                    dir="auto"
                >
                    <span>{data.hero?.titleTop ?? 'הגדרת תפקיד:'}</span>
                    <br aria-hidden="true" />
                    <span className="text-[#6546de]">{data.hero?.titleBottom ?? 'רכזת רעים'}</span>
                </h1>
            </div>

            {/* Description — Figma 120:4017: 24px Rubik Regular, leading 1.334 */}
            <p className="font-rubik font-normal text-[24px] leading-[1.334] text-[#001d26] text-start">
                {data.hero?.description}
            </p>
        </div>
    );

    return (
        <div className="min-h-screen bg-white pt-24 pb-0 font-rubik">
            {onPrev && (
                <div className="pt-6 pb-4 px-4">
                    <PrevChapterButton title="לפרק הקודם" subtitle="פרק 02 - המשתתפים" onClick={onPrev} />
                </div>
            )}

            {/* Mobile */}
            <Chapter3MobileView data={mergedData} onNext={onNext} footerData={content?.footer} />

            {/* Desktop */}
            <div className="hidden md:block">

                {/* ── Section 1 — Figma 120:3721 ──
                    Frame: 1824×3705px. justify-between, px-200px gutters, item-spacing=0.
                    Content: 852px (46.71vw). Sidebar: 367px (20.12vw).
                    Gap between cols = 1824-200×2-852-367=205px (justify-between, no explicit gap). */}
                <SplitStickyLayout
                    stickyContent={StickyHeader}
                    className="max-w-none px-[clamp(80px,10.965vw,200px)] justify-between"
                    sidebarClassName="shrink-0 w-[clamp(180px,20.12vw,367px)]"
                    contentClassName="shrink-0 w-[clamp(320px,46.71vw,852px)] flex flex-col gap-0 pb-0 pt-[5.75vw]"
                >
                    {/* ── Sticky hero image — Figma 120:3725: 900/1824=49.34vw sticky */}
                    <div className="sticky top-0 h-[49.34vw] w-full flex items-center justify-center z-10">
                        {/* Figma 120:3729 — 852×600px → aspect-ratio for fluid height */}
                        <div className="relative w-full max-w-[852px] aspect-[852/600]">
                            <div className="absolute inset-0 rounded-[24px] border-[1.5px] border-border-default shadow-[2px_2px_0_0_#001d26] overflow-hidden">
                                <img
                                    src={data.hero?.image}
                                    alt="רכזת רעים"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* "03" — Figma 120:3733: right 161/852=18.9%.
                                dir="ltr" island → end-[18.9%] = physical right in LTR.
                                translate-x/y-full hangs the element off the bottom-right corner. */}
                            <div
                                className="pointer-events-none absolute z-20 end-[18.9%] translate-x-full translate-y-full"
                                style={{ bottom: '33.67%' }}
                                dir="ltr"
                                aria-hidden
                            >
                                <span className="block font-salsa text-[120px] leading-[1.28] tracking-[0.15px] text-[#6546de] whitespace-nowrap">
                                    03
                                </span>
                            </div>

                            {/* Wave — Figma 120:3735: start-[9.97%] in RTL = 85px from right, w-76 h-44 */}
                            <div
                                className="pointer-events-none absolute z-20 start-[9.97%] w-[76px] h-[44px]"
                                style={{ bottom: '15.1%' }}
                                aria-hidden
                            >
                                <svg className="w-full h-full text-brand-red" viewBox="0 0 76 44" fill="none">
                                    <path d="M0 7 Q10 3 20 7 T40 7 T60 7 T76 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M0 22 Q11 17 22 22 T44 22 T66 22 T76 22" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M0 37 Q10 33 20 37 T40 37 T60 37 T76 37" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* ── Responsibility cards — Figma 120:3736, 120:4097, 120:4139
                        Outer: 900/1824=49.34vw sticky, px 40/1824=2.19vw.
                        Inner: 520/1824=28.51vw, pe 80/1824=4.39vw, ps 60/1824=3.29vw, py 40/1824=2.19vw, gap 24/1824=1.32vw */}
                    {(data.responsibilities ?? []).map((card, index) => {
                        const scheme = RESPONSIBILITY_SCHEMES[index] ?? RESPONSIBILITY_SCHEMES[0];
                        return (
                            <div
                                key={index}
                                className="sticky top-0 h-[49.34vw] w-full flex items-center px-[2.19vw]"
                                style={{ zIndex: 10 + index + 1 }}
                            >
                                {/* Inner card — proportional: h-28.51vw pe-4.39vw ps-3.29vw py-2.19vw gap-1.32vw
                                    Card 0 (6 items): no justify-center, smaller font to fit content.
                                    Cards 1-2 (2-3 items): justify-center so short content sits mid-card. */}
                                <div
                                    className={`w-full h-[28.51vw] rounded-[24px] border-[1.5px] border-[#001d26] shadow-[2px_2px_0_0_#001d26] flex flex-col gap-[1.32vw] pe-[4.39vw] ps-[3.29vw] py-[2.19vw] overflow-hidden${index > 0 ? ' justify-center' : ''}`}
                                    style={{ backgroundImage: `linear-gradient(90deg, ${scheme.cardBg}, ${scheme.cardBg}), linear-gradient(90deg, #fff, #fff)` }}
                                >
                                    {/* Card title — Figma H4: 34px Bold, leading 1.1, tracking 0.25px */}
                                    <p
                                        className={`font-rubik font-bold text-[34px] leading-[1.1] tracking-[0.25px] text-start shrink-0 ${scheme.titleClass}`}
                                        dir="auto"
                                    >
                                        {card.title}
                                    </p>

                                    {/* Items list — card 0 uses 16px (many items), cards 1-2 use 20px */}
                                    <div className="flex flex-col gap-[1.32vw] w-full">
                                        {(card.items ?? []).map((item, idx) => (
                                            <div key={idx} className="flex items-center gap-[12px]">
                                                {/* Icon first = physical right in RTL (Figma 32×24 pill arrow) */}
                                                <img
                                                    src={scheme.icon}
                                                    alt=""
                                                    aria-hidden
                                                    className="shrink-0 w-[32px] h-[24px]"
                                                />
                                                <p
                                                    className={`flex-1 min-w-0 font-rubik font-normal leading-[1.28] tracking-[0.15px] text-[#001d26] text-start${index === 0 ? ' text-[16px]' : ' text-[20px]'}`}
                                                    dir="auto"
                                                >
                                                    {item}
                                                </p>
                                            </div>
                                        ))}
                                    </div>

                                    {/* CTA button (card 3 only) — Figma 120:4179: aligned to end (physical right in RTL) */}
                                    {card.action && (
                                        <div className="flex justify-start mt-auto shrink-0">
                                            <button
                                                type="button"
                                                className="flex items-center gap-[12px] bg-brand-purple border border-brand-purple rounded-full px-[12px] py-[8px]"
                                            >
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
                                                    <circle cx="12" cy="12" r="10" fill="white" fillOpacity="0.3" />
                                                    <path d="M15 12H9M12 9l-3 3 3 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                <span className="font-rubik font-bold text-[16px] leading-[26px] tracking-[0.46px] uppercase text-text-on-dark whitespace-nowrap">
                                                    {card.action.text}
                                                </span>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </SplitStickyLayout>

                {/* ── Section 3: Onboarding steps — Figma 120:4317 ── */}
                {mergedData.onboarding?.steps?.length > 0 && (
                    <div className="ch3-desktop-onboard relative mt-32 w-full overflow-x-clip overflow-y-visible border-t border-[#001d26]/10">
                        <div className="ch3-desktop-onboard__blob pointer-events-none absolute" aria-hidden />
                        <div className="ch3-desktop-onboard__inner relative z-[1] mx-auto max-w-[1600px] px-[clamp(80px,10.42vw,200px)] py-16 md:py-24">
                            <div className="ch3-desktop-onboard__intro mx-auto mb-12 max-w-[1000px] md:mb-16">
                                <Chapter3OnboardingHeading
                                    id="ch3-desktop-onboard-title"
                                    titleTop={mergedData.onboarding.titleTop}
                                    titleBottom={mergedData.onboarding.titleBottom}
                                    titleBottomAccent={mergedData.onboarding.titleBottomAccent}
                                    frameClassName="ch3-desktop-onboard__headerFrame"
                                    titleClassName="ch3-desktop-onboard__title"
                                />
                                <p className="ch3-onboard__intro ch3-desktop-onboard__description">
                                    {mergedData.onboarding.description}
                                </p>
                            </div>

                            <div className="ch3-desktop-onboard__goals">
                                {(() => {
                                    const steps = mergedData.onboarding.steps ?? [];
                                    const rows = [];
                                    for (let i = 0; i < steps.length; i += 3) {
                                        rows.push(steps.slice(i, i + 3));
                                    }
                                    return rows.map((row, rowIndex) => (
                                        <div
                                            key={`ch3-onboard-row-${rowIndex}`}
                                            className={
                                                row.length === 1
                                                    ? 'ch3-desktop-onboard__stepsRow ch3-desktop-onboard__stepsRow--single'
                                                    : 'ch3-desktop-onboard__stepsRow'
                                            }
                                        >
                                            {row.map((step, index) => {
                                                const globalIndex = rowIndex * 3 + index;
                                                return (
                                                    <div key={step.id ?? globalIndex} className="ch3-desktop-onboard__stepCell h-full min-h-0">
                                                        <Chapter3OnboardingStepCard
                                                            step={step}
                                                            isLast={globalIndex === steps.length - 1}
                                                        />
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    ));
                                })()}
                            </div>
                        </div>
                    </div>
                )}

                {/* ── Session structure section — Figma 120:5039
                    Frame: 1824×1068px. px-200px gutters (10.965vw), py-120px (6.58vw), gap-120px (6.58vw).
                    DOM-first = accordion (physical right in RTL), image collage (physical left).
                    Image col: 400px (21.93vw), self-stretch + min-h so images aren't clipped.
                    Accordion col: 904px (49.56vw), gap-40px between heading and items. ── */}
                {data.sessionStructure && (
                    <div className="w-full bg-white py-[clamp(60px,6.58vw,120px)] px-[clamp(80px,10.965vw,200px)] border-t border-[#001d26]/10 overflow-x-hidden">

                        {/* Figma items-center: accordion centered vertically relative to image column height */}
                        <div className="flex flex-row flex-nowrap items-center gap-[clamp(40px,6.58vw,120px)]">

                            {/* Accordion column — 904/1824 = 49.56vw — Figma 120:4940 */}
                            <div className="flex flex-col gap-[40px] w-[clamp(400px,49.56vw,904px)] shrink-0">
                                {/* Heading — Figma 120:4942: 16px Regular + 34px Bold, both black, right-aligned.
                                    items-start = physical right in RTL flex-col */}
                                <div className="flex flex-col items-start text-start">
                                    <p className="font-rubik font-normal text-[16px] leading-[1.32] tracking-[0.15px] text-text-default">
                                        {data.sessionStructure.recommendation}
                                    </p>
                                    <h2 className="font-rubik font-bold text-[34px] leading-[1.1] tracking-[0.25px] text-text-default">
                                        {data.sessionStructure.title}
                                    </h2>
                                </div>
                                <Accordion items={data.sessionStructure.items} />
                            </div>

                            {/* Image collage — 400/1824 = 21.93vw — Figma 120:4935
                                self-stretch fills row height; min-h ensures room for both images.
                                All child positions use calc(50% ± Nvw) relative to this container.
                                Pixel offsets from Figma converted: px/1824×100=vw */}
                            <div
                                className="relative shrink-0 self-stretch w-[clamp(240px,21.93vw,400px)]"
                                style={{ minHeight: 'clamp(500px,45.39vw,828px)' }}
                            >
                                {/* Image 1: 400×500px, -4deg — Figma 120:4936
                                    Center: x=50%, y=calc(50% - 4.37vw) [79.66/1824] */}
                                <div
                                    className="absolute -translate-x-1/2 -translate-y-1/2"
                                    style={{ left: '50%', top: 'calc(50% - 4.37vw)' }}
                                >
                                    <div className="-rotate-[4deg]">
                                        <div className="w-[clamp(200px,21.93vw,400px)] aspect-[400/500] rounded-[24px] border-[1.5px] border-border-default shadow-[2px_2px_0_0_#001d26] overflow-hidden">
                                            <img src={data.sessionStructure.images[0]} alt="" className="w-full h-full object-cover" />
                                        </div>
                                    </div>
                                </div>

                                {/* Image 2: 300×260px, +6deg — Figma 120:4937
                                    Center: x=calc(50% + 1.07vw) [19.59/1824], y=calc(50% + 16.90vw) [308.15/1824] */}
                                <div
                                    className="absolute -translate-x-1/2 -translate-y-1/2"
                                    style={{ left: 'calc(50% + 1.07vw)', top: 'calc(50% + 16.90vw)' }}
                                >
                                    <div className="rotate-[6deg]">
                                        <div className="w-[clamp(150px,16.45vw,300px)] aspect-[300/260] rounded-[24px] border-[1.5px] border-border-default shadow-[2px_2px_0_0_#001d26] overflow-hidden">
                                            <img src={data.sessionStructure.images[1]} alt="" className="w-full h-full object-cover" />
                                        </div>
                                    </div>
                                </div>

                                {/* Star decoration — Figma 120:4938: 50×50, lime
                                    x=calc(50% - 9.21vw) [168/1824], y=calc(50% + 14.09vw) [257/1824] */}
                                <div
                                    className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                                    aria-hidden
                                    style={{ left: 'calc(50% - 9.21vw)', top: 'calc(50% + 14.09vw)' }}
                                >
                                    <Star size={50} strokeWidth={1.5} fill="#bce079" color="#bce079" />
                                </div>

                                {/* Dot decoration — Figma 120:4939: 9×9, lime
                                    x=calc(50% - 11.18vw) [203.5/1824], y=calc(50% + 12.20vw) [222.5/1824] */}
                                <div
                                    className="absolute -translate-x-1/2 -translate-y-1/2 size-[9px] rounded-full bg-brand-lime pointer-events-none"
                                    aria-hidden
                                    style={{ left: 'calc(50% - 11.18vw)', top: 'calc(50% + 12.20vw)' }}
                                />
                            </div>
                        </div>
                    </div>
                )}

                <div className="my-32 px-4 max-w-4xl mx-auto">
                    <NextChapterButton
                        title={data.nextButton?.title ?? 'סיימנו את פרק 3'}
                        subtitle={data.nextButton?.subtitle ?? 'פרק 04 - עבודה מנהלית'}
                        onClick={onNext}
                    />
                </div>
            </div>
        </div>
    );
};

export default Chapter3;
