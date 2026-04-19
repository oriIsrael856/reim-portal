import React, { useState } from 'react';
import { Check, ArrowLeft, Plus, Minus } from 'lucide-react';
import AccordionRichContent from '../components/chapter2/AccordionRichContent';
import NextChapterButton from '../components/common/NextChapterButton';
import { Chapter2MobileView } from '../components/chapter2/mobile';
import Chapter2DesktopAudienceSection from '../components/chapter2/Chapter2DesktopAudienceSection';
import Chapter2DesktopHeroSection from '../components/chapter2/Chapter2DesktopHeroSection';
import { scrollToChapter2GroupSection } from '../utils/scrollToChapter2GroupSection';
import { useChapter2DesktopStyles } from '../hooks/useChapter2DesktopStyles';

/* ==============================================================================
   1. רכיבי עזר (ללא שינוי)
   ============================================================================== */
const GoalCard = ({ text, ch2 }) => (
    <div
        className="relative flex flex-1 items-center justify-center rounded-[8px] border-[1.5px] border-[#001d26] px-4 text-center shadow-[2px_2px_0_0_#001d26]"
        style={{ ...ch2?.goalsCardPad, backgroundImage: 'linear-gradient(180deg, rgba(188,224,121,0.08) 0%, #ffffff 100%)' }}
    >
        <div className="absolute top-[-25.5px] left-1/2 -translate-x-1/2 flex items-center justify-center rounded-[8px] border-[1.5px] border-[#001d26] bg-[#bce079] p-[12px]">
            <Check size={24} strokeWidth={2} className="text-[#001d26]" />
        </div>
        <p className="text-[#001d26] font-normal leading-[1.28] tracking-[0.15px]" style={ch2?.goalsCardFont}>{text}</p>
    </div>
);

const AccordionItem = ({ title, content, isOpen, onClick, ch2 }) => (
    <div
        className={`rounded-[8px] overflow-hidden transition-all duration-300 bg-white ${
            isOpen
                ? 'border border-[rgba(101,70,222,0.12)] border-s-[2px] border-s-[#6546de]'
                : 'border border-[rgba(101,70,222,0.08)]'
        }`}
    >
        <button
            onClick={onClick}
            className={`w-full flex items-center justify-between gap-4 px-4 text-start outline-none cursor-pointer transition-all duration-300 ${isOpen ? 'pt-4 pb-3' : 'px-4'}`}
            style={isOpen ? undefined : ch2?.groupDetailsAccRowH}
        >
            <div className={`shrink-0 size-[24px] rounded-[100px] flex items-center justify-center transition-colors duration-300 ${isOpen ? 'bg-[rgba(101,70,222,0.08)] text-[#6546de]' : 'bg-[rgba(0,29,38,0.06)] text-[#001d26]'}`}>
                {isOpen ? <Minus size={14} /> : <Plus size={14} />}
            </div>
            <span className={`flex-1 leading-[1.334] ${isOpen ? 'font-bold text-[#6546de]' : 'font-normal text-[#001d26]'}`} style={ch2?.groupDetailsAccTitleFont}>{title}</span>
        </button>
        <div
            className={`ps-4 text-[#001d26]/90 leading-relaxed overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}
            style={isOpen ? { ...ch2?.groupDetailsAccPanelPe, ...ch2?.groupDetailsAccPanelPb } : undefined}
        >
            <AccordionRichContent>{content}</AccordionRichContent>
        </div>
    </div>
);

const Accordion = ({ items, ch2 }) => {
    const [openIndex, setOpenIndex] = useState(0); 
    const handleItemClick = (index) => setOpenIndex(openIndex === index ? null : index);
    return <div className="w-full max-w-4xl mx-auto flex flex-col gap-2">{items.map((item, index) => <AccordionItem key={index} title={item.title} content={item.content} isOpen={openIndex === index} onClick={() => handleItemClick(index)} ch2={ch2} />)}</div>;
};

/* ==============================================================================
   2. הסקשנים הגדולים
   ============================================================================== */

/**
 * Figma 114:2495 / 114:2497 — two-line styled title.
 * Only applies when the CMS string matches the expected Hebrew phrase exactly (after
 * stripping bidi marks / ZWSP).  Any other CMS value falls through to the plain h1.
 */
const Ch2TabletHeroTitle = ({ title }) => {
    const normalized = typeof title === 'string'
        ? title.replace(/[\u200e\u200f\u202a-\u202e\ufeff]/g, '').replace(/\s+/g, ' ').trim()
        : '';
    const display = normalized || 'מי משתתפות ומשתתפים ברעים';
    const isExpectedPhrase = /^מי\s+משתתפות\s+ומשתתפים\s+ברעים$/u.test(normalized);
    const parts = isExpectedPhrase
        ? { line1Black: 'מי ', line1Purple: 'משתתפות', line2Purple: 'ומשתתפים', line2Black: ' ברעים' }
        : null;

    if (!parts) {
        return (
            <h1 className="mb-4 px-2 text-5xl leading-[1.1] font-black whitespace-pre-line text-[#2D2D44] md:text-7xl" dir="rtl">
                {display}
            </h1>
        );
    }

    return (
        <h1
            className="mb-4 flex flex-col items-center gap-0 px-2 text-5xl leading-none font-bold tracking-[-0.5px] whitespace-nowrap text-[#2D2D44] md:text-7xl"
            dir="rtl"
            style={{ fontFamily: 'var(--font-rubik), Rubik, sans-serif' }}
        >
            <span className="flex flex-row flex-wrap items-end justify-center leading-none">
                <span className="text-[var(--ch2-text-primary)]">{parts.line1Black}</span>
                <span className="relative inline-block text-[var(--ch2-text-purple)]">
                    <span className="relative z-[1]">{parts.line1Purple}</span>
                    <span
                        className="pointer-events-none absolute start-1/2 bottom-0 z-0 h-[length:var(--ch2-desktop-hero-yellow-bar-h)] w-[min(var(--ch2-desktop-hero-yellow-bar-line1-w),calc(100%+1.5rem))] max-w-[95vw] -translate-x-1/2 bg-[var(--ch2-orange)]"
                        aria-hidden
                    />
                </span>
            </span>
            <span className="flex flex-row flex-wrap items-end justify-center leading-none">
                <span className="relative inline-block text-[var(--ch2-text-purple)]">
                    <span className="relative z-[1]">{parts.line2Purple}</span>
                    <span
                        className="pointer-events-none absolute start-1/2 bottom-0 z-0 h-[length:var(--ch2-desktop-hero-yellow-bar-h)] w-[min(var(--ch2-desktop-hero-yellow-bar-line2-w),calc(100%+1.5rem))] max-w-[95vw] -translate-x-1/2 bg-[var(--ch2-orange)]"
                        aria-hidden
                    />
                </span>
                <span className="text-[var(--ch2-text-primary)]">{parts.line2Black}</span>
            </span>
        </h1>
    );
};


const HeroSection = ({ data, chapterNumber }) => (
    <div className="hidden md:block">
        {/* md–<lg: unchanged tablet layout */}
        <div className="relative mx-auto max-w-[1400px] px-4 pt-10 pb-12 text-center lg:hidden">
            <div className="relative z-20 mt-10">
                <div className="mb-6 inline-flex -rotate-1 transform items-center gap-2 rounded-full border-2 border-black bg-[#C5E080] px-5 py-1.5 shadow-[3px_3px_0px_black]">
                    <span className="font-bold text-[#2D2D44]">{data.tag}</span>
                    <div className="flex h-6 w-6 items-center justify-center rounded-full border border-black/10 bg-white/40 text-xs font-bold">
                        {chapterNumber ?? '02'}
                    </div>
                </div>
                <Ch2TabletHeroTitle title={data.title} />
                <div className="mt-10 flex gap-4 overflow-x-auto px-4 pb-4 no-scrollbar snap-x">
                    {[data.image1, data.image2, data.image3, data.image4].map((img, i) => (
                        <div
                            key={i}
                            className="h-48 w-64 shrink-0 snap-center overflow-hidden rounded-2xl border-2 border-black bg-gray-200 shadow-[4px_4px_0px_black]"
                        >
                            <img src={img} alt="" className="h-full w-full object-cover" />
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* lg+: Figma 106:3191 — extracted to Chapter2DesktopHeroSection */}
        <Chapter2DesktopHeroSection data={data} chapterNumber={chapterNumber} />
    </div>
);

const UnifiedOrangeSection = ({ data, ch2 }) => (
    <div className="relative z-20 w-full">
        <Chapter2DesktopAudienceSection data={data} />
        {/* Section 3 — Goals — Figma 114:2503 */}
        <section
            id="ch2-goals"
            className="w-full"
            style={{ ...ch2?.sectionGutter, ...ch2?.goalsSectionPad, backgroundImage: 'linear-gradient(90deg, rgba(255,178,59,0.08) 0%, rgba(255,178,59,0.08) 100%), linear-gradient(90deg, #fff 0%, #fff 100%)' }}
        >
            {/* Title — centered, max-w matches Figma 114:2572 */}
            <div className="relative mx-auto flex w-full max-w-[1000px] flex-col items-center justify-center" style={ch2?.goalsTitleMb}>
                {/* Green underline bar — Figma top:29px from container top */}
                <span
                    className="pointer-events-none absolute top-[29px] left-1/2 -translate-x-1/2 z-0 h-[13px] w-[112px] bg-[#bce079]"
                    aria-hidden
                />
                <h2
                    className="relative z-[1] text-center text-[34px] font-bold leading-[1.1] tracking-[0.25px]"
                    dir="rtl"
                >
                    <span className="text-[#6546de]">מטרות</span>
                    <br />
                    <span className="text-[#001d26]">תכנית רעים</span>
                </h2>
            </div>
            {/* Cards — two rows of 3, gap-x:24 gap-y:40 — Figma 114:2639 */}
            <div className="flex flex-col" style={ch2?.goalsRowGap}>
                <div className="flex" style={ch2?.goalsCardGap}>
                    {data.goals.slice(0, 3).map((item, index) => (
                        <GoalCard key={index} text={item} ch2={ch2} />
                    ))}
                </div>
                {data.goals.length > 3 && (
                    <div className="flex" style={ch2?.goalsCardGap}>
                        {data.goals.slice(3).map((item, index) => (
                            <GoalCard key={index + 3} text={item} ch2={ch2} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    </div>
);

const GroupsIntroSection = ({ data, ch2 }) => {
    if (!data) return null;
    return (
        <section
            className="w-full rounded-t-[24px] bg-white"
            style={{ ...ch2?.sectionGutter, ...ch2?.groupsIntroPad }}
            dir="rtl"
        >
            <div className="mx-auto flex items-center" style={{ maxWidth: ch2?.groupsIntroMaxWidth, ...ch2?.groupsIntroGap }}>

                {/* Text column — DOM-first = physical right in RTL */}
                <div className="flex min-w-0 flex-1 flex-col items-start text-start" style={ch2?.groupsIntroTextGap}>

                    {/* Heading block — subheading + title, no gap (Figma 115:2681) */}
                    <div className="flex w-full flex-col items-start">
                        <p className="font-normal leading-[1.32] tracking-[0.15px] text-[#001d26]" style={ch2?.groupsIntroSubFont}>
                            {data.subheading}
                        </p>
                        <h2 className="font-bold leading-[1.1] tracking-[0.25px] text-[#001d26]" style={ch2?.groupsIntroTitleFont}>
                            {data.title}
                        </h2>
                    </div>

                    {/* Body block — Figma 115:2685 */}
                    <div className="flex w-full flex-col items-start" style={ch2?.groupsIntroBodyGap}>
                        {data.intro && (
                            <p className="w-full font-normal leading-[1.28] tracking-[0.15px] text-[#001d26]" style={ch2?.groupsIntroBodyFont}>
                                {data.intro}
                            </p>
                        )}

                        {/* Population items — Figma 115:2743 */}
                        {data.populations && data.populations.length > 0 && (
                            <div className="flex w-full flex-col items-start" style={ch2?.groupsIntroPopListGap}>
                                {data.populations.map((pop, index) => {
                                    const numStr = String(pop.id).replace(/\D/g, '').padStart(2, '0');
                                    const handleClick = () => scrollToChapter2GroupSection(numStr);
                                    return (
                                        <button
                                            key={index}
                                            type="button"
                                            onClick={handleClick}
                                            className="group flex shrink-0 cursor-pointer items-center rounded-[8px] border border-[rgba(101,70,222,0.08)] bg-[rgba(101,70,222,0.08)] transition-colors duration-200 hover:border-[rgba(101,70,222,0.16)] hover:bg-[rgba(101,70,222,0.16)]"
                                            style={{ ...ch2?.groupsIntroPopBtnGap, ...ch2?.groupsIntroPopBtnPad }}
                                        >
                                            {/* Number badge — DOM-first = physical right in RTL */}
                                            <div className="flex shrink-0 items-center justify-center rounded-[200px] bg-[rgba(101,70,222,0.16)]" style={ch2?.groupsIntroPopBadge}>
                                                <span className="font-[family-name:var(--font-salsa)] leading-[1.28] text-[#001d26]" style={ch2?.groupsIntroPopBadgeFont} dir="ltr">{pop.id}</span>
                                            </div>
                                            {/* Text */}
                                            <p className="shrink-0 whitespace-nowrap font-normal leading-[1.28] tracking-[0.15px] text-[#001d26]" style={ch2?.groupsIntroPopTextFont}>{pop.text}</p>
                                            {/* Arrow — DOM-last = physical left in RTL */}
                                            <ArrowLeft size={16} className="shrink-0 text-[#6546de]" />
                                        </button>
                                    );
                                })}
                            </div>
                        )}

                        {data.description && (
                            <p className="w-full font-normal leading-[1.28] tracking-[0.15px] text-[#001d26]" style={ch2?.groupsIntroBodyFont}>
                                {data.description}
                            </p>
                        )}
                    </div>
                </div>

                {/* Image — DOM-second = physical left in RTL (Figma 115:2712) */}
                <div className="shrink-0 -rotate-2" style={ch2?.groupsIntroImgW}>
                    <img
                        src={data.image}
                        alt="קבוצת רעים"
                        className="block w-full rounded-[24px] border-[1.5px] border-[#001d26] object-cover shadow-[2px_2px_0_0_#001d26]"
                        style={ch2?.groupsIntroImgH}
                    />
                </div>
            </div>
        </section>
    );
};

const GroupDetailsSection = ({ data, ch2 }) => {
    if (!data) return null;
    return (
        <section
            className="w-full"
            style={{ ...ch2?.sectionGutter, ...ch2?.groupDetailsPad, background: 'var(--ch2-section5-bg)' }}
        >
            <div className="mx-auto" style={{ maxWidth: ch2?.groupDetailsMaxWidth }} dir="rtl">
                <div className="text-start" style={ch2?.groupDetailsTitleMb}>
                    {data.id && (
                        <p className="font-normal leading-[1.32] text-[#001d26] mb-1" style={ch2?.groupDetailsSubFont}>{data.id}</p>
                    )}
                    <h2 className="font-bold leading-[1.1] tracking-[0.25px] text-[#001d26]" style={ch2?.groupDetailsTitleFont}>{data.title}</h2>
                </div>
                <Accordion items={data.items} ch2={ch2} />
            </div>
        </section>
    );
};

/* Section 6 — Why Together — Figma 120:2475 */
const WhyTogetherSection = ({ data, ch2 }) => {
    if (!data) return null;

    const cardBg = 'linear-gradient(90deg, rgba(255,178,59,0.04) 0%, rgba(255,178,59,0.04) 100%), linear-gradient(90deg, #fff 0%, #fff 100%)';
    const rowBg  = 'linear-gradient(90deg, rgba(188,224,121,0.08) 0%, rgba(188,224,121,0.08) 100%), linear-gradient(90deg, #fff 0%, #fff 100%)';

    return (
        <section className="w-full" style={{ ...ch2?.sectionGutter, ...ch2?.whySectionPt }} dir="rtl">
            <div className="flex items-start justify-between">

                <div className="sticky top-0 flex flex-1 flex-col items-start justify-center" style={{ ...ch2?.whyStickyH, ...ch2?.whyStickyPe }}>
                    <div className="relative">
                        {/* Green bar — end-[-5px] = physical right in RTL, top:61.91px (Figma 120:2546) */}
                        <span
                            className="pointer-events-none absolute end-[-5px] z-0 h-[13px] w-[255px] bg-[#bce079]"
                            style={{ top: '61.91px' }}
                            aria-hidden
                        />
                        <h2 className="relative z-[1] whitespace-nowrap text-[34px] font-bold leading-[1.1] tracking-[0.25px] text-[#001d26]">
                            למה שתי
                            <br />
                            האוכלוסיות יחד?
                        </h2>
                    </div>
                </div>

                {/* Cards column — DOM-second = physical left in RTL (Figma 120:2478) */}
                <div
                    className="flex shrink-0 flex-col"
                    style={{ ...ch2?.whyCardColW, paddingBottom: 'var(--ch2-why-stack-padding-bottom)' }}
                >
                    {data.cards && data.cards.map((card, index) => (
                        <div key={index} className="sticky top-0 flex w-full items-center justify-center" style={ch2?.whyStickyH}>
                            <div
                                className="sticky top-0 flex w-full shrink-0 flex-col items-center overflow-hidden rounded-[24px] border-[1.5px] border-[#001d26] shadow-[2px_2px_0_0_#001d26]"
                                style={{ ...ch2?.whyCardInnerH, ...ch2?.whyCardPad, backgroundImage: cardBg }}
                            >
                                {card.type === 'list' ? (
                                    /* Card 1 — check-list */
                                    <>
                                        {/* Section header — "חוויות דומות:" rendered in olive #839c54 (Figma 120:2494) */}
                                        <div className="flex w-full shrink-0 flex-col items-start">
                                            {(() => {
                                                // Split last two Hebrew words ending with ":" into olive accent
                                                const m = card.title.match(/^([\s\S]*?)\s+(\S+\s+\S+:)\s*$/);
                                                return (
                                                    <p className="w-full text-[20px] font-semibold leading-[1.28] tracking-[0.15px] text-[#001d26] text-start">
                                                        <span className="whitespace-pre-line">{m ? m[1] : card.title}</span>
                                                        {m && <span className="text-[#839c54]"> {m[2]}</span>}
                                                    </p>
                                                );
                                            })()}
                                        </div>
                                        {/* Goals rows — gap-[16px] (Figma 120:2551) */}
                                        <div className="flex w-full shrink-0 flex-col gap-[16px]">
                                            {card.items && card.items.map((item, idx) => (
                                                <div
                                                    key={idx}
                                                    className="relative flex w-full items-center gap-[24px] rounded-[8px] border-[1.5px] border-[#001d26] px-[40px] py-[16px] shadow-[2px_2px_0_0_#001d26]"
                                                    style={{ backgroundImage: rowBg }}
                                                >
                                                    <p className="flex-1 text-[16px] font-normal leading-[1.32] tracking-[0.15px] text-[#001d26] text-start">{item}</p>
                                                    {/* Check badge — start-[-17.5px] = physical right in RTL, exact top from Figma */}
                                                    <div
                                                        className="absolute start-[-17.5px] -translate-y-1/2 flex size-[32px] items-center justify-center rounded-[8px] border-[1.5px] border-[#001d26] bg-[#bce079] p-[12px]"
                                                        style={{ top: 'calc(50% + 0.41px)' }}
                                                    >
                                                        <Check size={16} strokeWidth={2} className="text-[#001d26]" />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    /* Cards 2 & 3 — text (Figma 120:2580, 120:2603) */
                                    <>
                                        <p className="w-full shrink-0 text-[20px] font-semibold leading-[1.28] tracking-[0.15px] text-[#001d26] text-start">
                                            {card.title}
                                        </p>
                                        <div className="w-full text-[20px] font-normal leading-[1.28] tracking-[0.15px] text-[#001d26] text-start whitespace-pre-wrap">
                                            {card.text}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

/* ==============================================================================
   הרכיב הראשי
   ============================================================================== */
const Chapter2 = ({ data, onNext, content }) => {
    const d = useChapter2DesktopStyles();
    if (!data) return <div className="text-center p-20 text-[#816AFE]">טוען פרק 2...</div>;
    const groupsIntro = data.groupsIntro;

    return (
        <div className="flex min-h-[100dvh] flex-col font-['Rubik'] md:block md:min-h-screen md:bg-[#FAF7FF]">
            <Chapter2MobileView data={data} onNext={onNext} footerData={content?.footer} />

            {/* דסקטופ: הירו + בלוק תפוז + מטרות */}
            <HeroSection data={data.hero} chapterNumber={data.chapterNumber} />
            {/* Section 2: overlaps hero bottom by 24px — Figma y:956 in Section 1 height:980 */}
            {data.contentBox && <div className="relative z-10 hidden md:block" style={{ marginTop: 'var(--ch2-section-overlap-y)' }}><UnifiedOrangeSection data={data.contentBox} ch2={d} /></div>}
            {groupsIntro && <div className="hidden md:block"><GroupsIntroSection data={data.groupsIntro} ch2={d} /></div>}
            {data.group01 && (
                <div id="ch2-group01" data-ch2-group="01" className="hidden md:block">
                    <GroupDetailsSection data={data.group01} ch2={d} />
                </div>
            )}
            {data.group02 && (
                <div id="ch2-group02" data-ch2-group="02" className="hidden md:block">
                    <GroupDetailsSection data={data.group02} ch2={d} />
                </div>
            )}
            {data.whyTogether && <div className="hidden md:block"><WhyTogetherSection data={data.whyTogether} ch2={d} /></div>}

            <div className="my-20 hidden px-4 md:block">
                <NextChapterButton
                    title={data.nextButton?.title ?? 'לפרק הבא'}
                    subtitle={data.nextButton?.subtitle ?? 'פרק 03 - תפקיד הרכזת'}
                    onClick={onNext}
                />
            </div>
        </div>
    );
};

export default Chapter2;