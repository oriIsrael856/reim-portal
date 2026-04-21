import React from 'react';
import { ArrowLeft } from 'lucide-react';
import ChapterDigitSvg from '../components/common/ChapterDigitSvg';
import Accordion from '../components/common/Accordion';
import Page5MarketingStepsAccordion from '../components/chapter5/Page5MarketingStepsAccordion';
import CheckCard from '../components/chapter5/CheckCard';
import '../styles/chapter5-mobile.css';
import NextChapterButton from '../components/common/NextChapterButton';
import NewsletterCard from '../components/common/NewsletterCard';
import { useChapter5DesktopStyles } from '../hooks/useChapter5DesktopStyles';

const Chapter5 = ({ data, onNext, onPrev }) => {
    const d = useChapter5DesktopStyles();

    if (!data) return <div className="p-20 text-center font-bold text-[#816AFE]">טוען נתוני כלים מעשיים...</div>;

    const marketingParagraphs = (data.marketing?.text ?? '').split(/\n\n+/).filter(Boolean);
    const networkingCardsReversed = [...(data.networking?.cards ?? [])].reverse();

    return (
        <div className="min-h-screen bg-[#FFFDF5] pt-24 pb-12 md:pt-0 font-['Rubik']">
            {/* ========== מובייל בלבד ========== */}
            <div className="md:hidden">
                {/* 1. Hero */}
                <section className="max-w-lg mx-auto px-4 pb-8">
                    <div className="relative overflow-hidden rounded-[40px] bg-[#FFFDF5] border-2 border-[#2D2D44]/10 shadow-[6px_6px_0px_rgba(45,45,68,0.08)] p-6 text-center">
                        <div className="inline-flex items-center gap-2 bg-[#C5E080] border-2 border-[#2D2D44] px-4 py-2 rounded-full mb-4 font-bold text-sm shadow-[3px_3px_0px_#2D2D44]">
                            <span>05</span>
                            <span>{data.hero?.tag}</span>
                        </div>
                        <h1 className="text-3xl font-black text-[#2D2D44] mb-2">
                            {data.hero?.title}
                        </h1>
                        <span className="inline-block w-24 h-2 bg-[#FFB84C] rounded-full" aria-hidden />
                        <ChapterDigitSvg digits="05" className="mx-auto mt-4 w-[110px] opacity-80" />
                    </div>
                </section>

                {/* 2. שיווק וגיוס משתתפים ומשתתפות */}
                <section className="mx-auto w-full max-w-[359px] rounded-t-[24px] bg-[linear-gradient(180deg,rgba(255,178,59,0.08)_0%,#fff_100%)] px-6 pb-[100px] pt-[60px]">
                    <div className="flex flex-col gap-[52px]">
                        <div className="flex flex-col gap-6">
                            <div className="relative flex w-full justify-end">
                                <span
                                    aria-hidden
                                    className="absolute right-0 top-5 h-2 w-[119px] rounded-[2px] bg-[#BCE079]"
                                />
                                <h2 className="relative z-[1] whitespace-pre-line text-right text-2xl font-bold leading-[1.334] text-[#001D26]">
                                    {'שיווק וגיוס\nמשתתפים ומשתתפות'}
                                </h2>
                            </div>
                            {marketingParagraphs.map((para, i) => (
                                <p key={i} className="whitespace-pre-line text-right text-base font-normal leading-[1.32] tracking-[0.009375em] text-[#001D26]">
                                    {para}
                                </p>
                            ))}
                        </div>

                        <div className="flex flex-col gap-3">
                            <h3 className="text-right text-xl font-semibold leading-[1.28] tracking-[0.0075em] text-[#001D26]">
                                {data.marketing?.stepsTitle ?? 'צעדי פעולה מרכזיים:'}
                            </h3>
                            <div className="w-full rounded-lg">
                                <Page5MarketingStepsAccordion items={data.marketing?.steps || []} />
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. למי כדאי לפנות? */}
                <section className="mx-auto w-full max-w-[359px] bg-[linear-gradient(180deg,rgba(255,178,59,0.08)_0%,#fff_100%)] px-6 pb-[100px] pt-6">
                    <div className="flex flex-col gap-[52px]">
                        <div className="flex w-full items-center justify-center">
                            <h2 className="text-center text-2xl font-bold leading-[1.334] text-[#001D26]">
                                {data.networking?.title ?? 'למי כדאי לפנות?'}
                            </h2>
                        </div>

                        <div className="flex flex-col gap-8">
                            {networkingCardsReversed.map((c, i) => (
                                <article
                                    key={i}
                                    className="relative flex flex-col items-stretch gap-2 rounded-lg border-[1.5px] border-[#001D26] bg-[linear-gradient(180deg,rgba(188,224,121,0.08)_0%,#fff_100%)] px-6 pb-6 pt-10 shadow-[2px_2px_0_#001D26]"
                                >
                                    <span
                                        aria-hidden
                                        className="absolute -top-6 left-1/2 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-lg border-[1.5px] border-[#001D26] bg-[#BCE079]"
                                    >
                                        <span className="text-base leading-none text-white">✓</span>
                                    </span>

                                    <h3 className="text-center text-base font-medium leading-[1.22] tracking-[0.009375em] text-[#001D26]">
                                        {c.title}
                                    </h3>
                                    <p className="text-center text-base font-normal leading-[1.32] tracking-[0.009375em] text-[#001D26]">
                                        {c.text}
                                    </p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 4+5. משאבים: הרכזיה + ניוזלטר (Figma 254:13614) */}
                <section className="relative mx-auto flex w-full max-w-[359px] flex-col gap-6 px-6 py-20">
                    <div
                        aria-hidden
                        className="pointer-events-none absolute -left-[500px] -top-[50px] h-[1040px] w-[1360px] rounded-full bg-[rgba(101,70,222,0.08)] blur-[200px]"
                    />

                    <article
                        className="relative flex h-[460px] flex-col justify-end overflow-hidden rounded-3xl border-[1.5px] border-[#001D26] p-4"
                        style={{
                            backgroundImage: data.resources?.library?.image
                                ? `url(${data.resources.library.image})`
                                : undefined,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    >
                        <div className="flex flex-col gap-6 rounded-3xl border-[1.5px] border-[#001D26] bg-white p-4 shadow-[2px_2px_0_#001D26]">
                            <div className="flex flex-col gap-2 text-center">
                                <h3 className="text-2xl font-bold leading-[1.334] text-[#001D26]">
                                    {data.resources?.library?.title ?? 'הרכזיה'}
                                </h3>
                                <p className="whitespace-pre-line text-center text-base font-normal leading-[1.32] tracking-[0.009375em] text-[#001D26]">
                                    {data.resources?.library?.desc}
                                </p>
                            </div>
                            <a
                                href={data.resources?.library?.btnUrl ?? 'https://www.reimsys.org.il/index.php'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex w-full items-center justify-between gap-3 rounded-[100px] border border-[#6546DE] bg-[#6546DE] px-6 py-2 text-white no-underline"
                            >
                                <span className="text-base font-bold uppercase leading-[1.625] tracking-[0.02875em]">
                                    {data.resources?.library?.btnText ?? 'הצגת מאגר'}
                                </span>
                                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
                                    <ArrowLeft size={14} strokeWidth={2.5} />
                                </span>
                            </a>
                        </div>
                    </article>

                    <NewsletterCard
                        data={{
                            subtitle: data.resources?.newsletter?.subtitle ?? 'השראות מיוחדות ישירות לתיבה שלך',
                            title: data.resources?.newsletter?.title ?? 'ניוזלטר רעים',
                            text:
                                data.resources?.newsletter?.text ??
                                'מנה חודשית מרוכזת של חדשנות, משחק ומיטב השראה מהשטח.',
                            placeholder:
                                data.resources?.newsletter?.placeholder ?? 'הקלידי את כתובת המייל שלך',
                        }}
                        className="w-full"
                    />
                </section>

                {/* 6. כפתור סיום */}
                <div className="px-4 pb-8">
                    <NextChapterButton
                        title={data.nextButton?.title ?? 'סיימנו את האוגדן!'}
                        subtitle={data.nextButton?.subtitle ?? 'חזרה לעמוד הבית'}
                        onClick={onNext}
                    />
                </div>
            </div>

            {/* ========== דסקטופ בלבד ========== */}
            <div className="hidden md:block w-full">
              <div className="relative w-full">

                {/* Figma 125:4285 — amber blurred ellipse background */}
                <div
                    className="pointer-events-none absolute z-0 rounded-full"
                    aria-hidden
                    style={{
                        width: d.heroAmberBlurSize,
                        height: d.heroAmberBlurSize,
                        background: 'rgba(255, 178, 59, 0.08)',
                        filter: 'blur(200px)',
                        top: 'clamp(-16rem, -24vw, -6rem)',
                        left: 'clamp(-14rem, -22vw, -5rem)',
                    }}
                />

                {/* Figma 125:4283 — Section 1: chapter label + title + photo collage */}
                <header
                    dir="rtl"
                    className="relative z-[1] flex flex-col items-center"
                    style={d.heroHeader}
                >
                    {/* Chapter label pill + title — Figma 125:4286 */}
                    <div className="flex flex-col items-center" style={d.heroTitleStackGap}>

                        {/* Chapter label pill */}
                        <div
                            className="relative flex items-center justify-center rounded-[24px] border-[1.5px] border-[#001d26] bg-[#bce079] shadow-[2px_2px_0px_0px_#001d26]"
                            style={d.heroChapterPill}
                        >
                            <div
                                className="absolute left-1/2 top-[-23.5px] -translate-x-1/2 z-10 flex items-center justify-center rounded-full border-[1.5px] border-[#001d26] bg-[#839c54]"
                                aria-hidden
                                style={d.heroChapterBadge}
                            >
                                <span
                                    className="font-['Salsa'] font-normal leading-[1.28] tracking-[0.15px] text-white"
                                    style={d.heroChapterNumeralFont}
                                >
                                    05
                                </span>
                            </div>
                            <span
                                className="whitespace-nowrap text-center font-normal leading-[1.28] tracking-[0.15px] text-[#001d26]"
                                style={d.heroChapterTagFont}
                            >
                                {data.hero?.tag ?? 'פרק חמישי ואחרון'}
                            </span>
                        </div>

                        {/* Title with orange underline bar — Figma 125:4288–4290 */}
                        <div className="relative">
                            <div
                                className="pointer-events-none absolute left-1/2 z-0 -translate-x-1/2 bg-[#ffb23b]"
                                aria-hidden
                                style={{
                                    top: d.heroOrangeBar.top,
                                    height: d.heroOrangeBar.height,
                                    width: d.heroOrangeBar.width,
                                }}
                            />
                            <h1
                                className="relative z-[1] text-center font-bold leading-none tracking-[-0.5px] text-[#001d26]"
                                style={d.heroH1}
                            >
                                {data.hero?.title ?? 'כלים מעשיים'}
                            </h1>
                        </div>
                    </div>

                    {/* Photo collage — Figma 125:4787, 1424×400px frame at x=200 y=425 in section */}
                    <div className="relative w-full shrink-0" style={d.heroCollageHeight}>

                        {/* Main center photo — Figma: centered, -2deg — z=0 (background) */}
                        <div className="absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 -rotate-2">
                            <div
                                className="overflow-hidden rounded-[24px] border-[1.5px] border-[#001d26] shadow-[2px_2px_0px_0px_#001d26]"
                                style={{
                                    width: d.heroMainPhotoMaxWidth,
                                    height: d.heroMainPhoto.height,
                                }}
                            >
                                <img
                                    src={data.hero?.images?.[0]}
                                    alt=""
                                    className="h-full w-full object-cover pointer-events-none"
                                />
                            </div>
                        </div>

                        {/* Top-left small photo — Figma: x=96 y=-3 size=192, +2deg — z=10 */}
                        <div className="absolute z-10 rotate-2" style={{ left: '6.74%', top: '-3px' }}>
                            <div
                                className="overflow-hidden rounded-[24px] border-[1.5px] border-[#001d26] shadow-[2px_2px_0px_0px_#001d26]"
                                style={{ width: d.heroSidePhotoSm.width, height: d.heroSidePhotoSm.height }}
                            >
                                <img
                                    src={data.hero?.images?.[1]}
                                    alt=""
                                    className="h-full w-full object-cover pointer-events-none"
                                />
                            </div>
                        </div>

                        {/* Bottom-right small photo — Figma: x=1086 y=220 size=240, bleeds 60px below — z=10 */}
                        <div className="absolute z-10" style={{ right: '6.88%', bottom: '-60px' }}>
                            <div
                                className="overflow-hidden rounded-[24px] border-[1.5px] border-[#001d26] shadow-[2px_2px_0px_0px_#001d26]"
                                style={{ width: d.heroSidePhotoLg.width, height: d.heroSidePhotoLg.height }}
                            >
                                <img
                                    src={data.hero?.images?.[2]}
                                    alt=""
                                    className="h-full w-full object-cover pointer-events-none"
                                />
                            </div>
                        </div>

                        {/* "05" + red wave overlay — Figma 125:4779 */}
                        {/* top=319px: section y=744 → collage-relative; extends 73px below collage */}
                        <div
                            className="pointer-events-none absolute left-0 z-0"
                            aria-hidden
                            dir="ltr"
                            style={{ top: d.heroCollageDigitTop.top }}
                        >
                            <div className="relative inline-block">
                                <p
                                    className="font-['Salsa'] font-normal leading-[1.28] tracking-[0.15px] text-[#6546de] whitespace-nowrap"
                                    style={d.heroCollageDigit}
                                >
                                    05
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
                    </div>
                </header>

                {/* Section Meeting — Figma 125:4865 */}
                <section
                    id="ch5-marketing"
                    dir="rtl"
                    className="w-full bg-white rounded-tl-[24px] rounded-tr-[24px] flex items-start"
                    style={d.marketingSection}
                >
                    {/* Group Info — RIGHT in RTL: flex-col + items-start hugs physical right (reading start) */}
                    <div
                        className="flex shrink-0 flex-col items-start min-w-0"
                        style={{
                            width: d.marketingCol.width,
                            gap: d.marketingCol.gap,
                            paddingTop: d.marketingCol.paddingTop,
                        }}
                    >
                        {/* Title with green highlight behind "שיווק וגיוס" */}
                        <div className="relative flex w-full flex-col items-start">
                            <div
                                className="pointer-events-none absolute bg-[#bce079]"
                                aria-hidden
                                style={{
                                    right: '-5px',
                                    top: d.marketingHighlight.top,
                                    width: d.marketingHighlight.width,
                                    height: d.marketingHighlight.height,
                                }}
                            />
                            <p
                                className="relative w-full text-start font-bold leading-[1.1] tracking-[0.25px] text-[#001d26]"
                                style={d.marketingTitleFont}
                            >
                                <span className="text-[#6546de]">{data.marketing?.stickyTitle?.split('\n')[0] ?? 'שיווק וגיוס'}</span>
                                <br />
                                {data.marketing?.stickyTitle?.split('\n')[1] ?? 'משתתפים ומשתתפות'}
                            </p>
                        </div>
                        {/* Description paragraphs */}
                        <div
                            className="w-full text-start font-normal leading-[1.28] tracking-[0.15px] text-[#001d26]"
                            style={d.marketingBodyFont}
                        >
                            {marketingParagraphs.map((p, i) => (
                                <p key={i} className={i < marketingParagraphs.length - 1 ? 'mb-[1.28em]' : ''}>{p}</p>
                            ))}
                        </div>
                    </div>

                    {/* Steps list — LEFT in RTL (DOM-second = visually left) */}
                    <div className="flex flex-1 flex-col min-w-0" style={d.marketingStepsCol}>
                        <p
                            className="font-bold leading-[1.334] text-right w-full text-[#001d26]"
                            style={d.marketingStepsTitleFont}
                        >
                            {data.marketing?.stepsTitle ?? 'צעדי פעולה מרכזיים:'}
                        </p>
                        <Accordion items={data.marketing?.steps ?? []} viewportCh5Styles={d} />
                    </div>
                </section>

                <section
                    className="mx-auto text-center w-full"
                    style={{
                        maxWidth: d.networkingContainerMaxWidth,
                        ...d.networkingSection,
                    }}
                >
                    <h2
                        className="font-black font-rubik text-[#001d26]"
                        style={{ ...d.networkingTitleFont, marginBottom: d.networkingTitleMargin.marginBottom }}
                    >
                        {data.networking?.title}
                    </h2>
                    <div
                        className="grid grid-cols-1 items-stretch md:grid-cols-3 lg:grid-cols-5"
                        style={d.networkingGridGap}
                    >
                        {data.networking?.cards?.map((c, i) => (
                            <CheckCard key={i} title={c.title} text={c.text} ch5AudienceDesktop={d} />
                        ))}
                    </div>
                </section>

                {/* Section 2 — Figma 125:5338: ספרייה | ניוזלטר | תמונה */}
                <section className="relative w-full" style={d.resourcesSection}>
                    {/* Figma 125:5412 — purple blurred ellipse bg */}
                    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
                        <div
                            className="absolute rounded-full"
                            style={{
                                ...d.resourcesPurpleBlurStyle,
                                background: 'rgba(101, 70, 222, 0.08)',
                                filter: 'blur(200px)',
                            }}
                        />
                    </div>

                    {/* Three-card flex row — dir ltr keeps physical left→right order matching Figma canvas */}
                    <div className="relative z-[1] flex w-full items-stretch" style={d.resourcesRowGap} dir="ltr">

                        {/* Library card — Figma 125:5339: w=700px, image bg + white panel flush-left */}
                        <div
                            id="ch5-library"
                            className="relative flex flex-col items-start justify-end overflow-hidden rounded-[24px] border-[1.5px] border-[#001D26] shrink-0"
                            style={{
                                width: d.resourcesLibraryCard.width,
                                height: d.resourcesLibraryCard.height,
                                padding: d.resourcesLibraryCard.padding,
                            }}
                        >
                            {/* Background photo fills entire card */}
                            <div className="pointer-events-none absolute inset-0">
                                <img
                                    src={data.resources?.library?.image}
                                    alt=""
                                    className="size-full object-cover"
                                />
                            </div>

                            {/* White inner panel — Figma 125:5362: w=260px, full-height via flex-1, pt-24 pb-40 px-40 */}
                            <div
                                className="relative z-[1] flex flex-1 flex-col justify-between max-w-full rounded-[24px] border-[1.5px] border-[#001D26] bg-white shadow-[2px_2px_0_0_#001D26]"
                                style={d.resourcesLibraryPanel}
                                dir="rtl"
                            >
                                <div className="flex flex-col gap-2 text-center">
                                    <h3
                                        className="font-bold leading-[1.1] tracking-[0.25px] text-[#001D26]"
                                        style={d.resourcesLibraryTitleFont}
                                    >
                                        {data.resources?.library?.title ?? 'הרכזיה'}
                                    </h3>
                                    <p
                                        className="font-normal leading-[1.28] tracking-[0.15px] text-[#001D26]"
                                        style={d.resourcesLibraryBodyFont}
                                    >
                                        {data.resources?.library?.desc}
                                    </p>
                                </div>
                                <a
                                    href={data.resources?.library?.btnUrl ?? 'https://www.reimsys.org.il/index.php'}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex w-full items-center justify-center rounded-full bg-[#6546DE] px-3 text-white no-underline"
                                    style={d.resourcesLibraryBtn}
                                >
                                    <ArrowLeft size={18} strokeWidth={2.5} />
                                    <span className="text-base font-bold uppercase tracking-[0.46px]">
                                        {data.resources?.library?.btnText ?? 'הצגת מאגר'}
                                    </span>
                                </a>
                            </div>
                        </div>

                        {/* Newsletter — same fixed height as library card (row cross-size); avoids % height gaps */}
                        <div
                            id="ch5-newsletter"
                            className="flex min-h-0 shrink-0 flex-col"
                            style={{
                                width: d.resourcesNewsletterCol.width,
                                height: d.resourcesLibraryCard.height,
                                minHeight: d.resourcesLibraryCard.height,
                            }}
                        >
                            <NewsletterCard
                                data={data.resources?.newsletter}
                                className="h-full min-h-0 w-full flex-1"
                                embeddedInRow
                                embeddedStyles={{
                                    padding: d.resourcesNewsletterPadding,
                                    stackGap: d.resourcesNewsletterStackGap,
                                    titleFont: d.resourcesNewsletterTitleFont,
                                    bodyFont: d.resourcesNewsletterBodyFont,
                                    inputMinH: d.resourcesNewsletterInputMinH,
                                }}
                            />
                        </div>

                        {/* Side image card — Figma 125:5350: flex-1, fills remaining row space */}
                        <div className="relative flex-1 min-w-0 overflow-hidden rounded-[24px] border-[1.5px] border-[#001D26]">
                            {data.resources?.sideImage && (
                                <img
                                    src={data.resources.sideImage}
                                    alt=""
                                    className="pointer-events-none absolute inset-0 size-full object-cover"
                                />
                            )}
                        </div>
                    </div>
                </section>

                <footer
                    className="mx-auto w-full"
                    style={{
                        maxWidth: d.footerContentMaxWidth,
                        ...d.footerSection,
                    }}
                >
                    <NextChapterButton
                        title="סיימנו את האוגדן!"
                        subtitle="חזרה לעמוד הבית"
                        onClick={onNext}
                    />
                </footer>
              </div>
            </div>
        </div>
    );
};

export default Chapter5;
