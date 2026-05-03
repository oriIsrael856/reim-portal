import React, { useLayoutEffect, useRef } from 'react';
import { ArrowDown, Bell, ExternalLink, Facebook, Layers, Star, ThumbsUp, Users } from 'lucide-react';
import NextChapterButton from '../common/NextChapterButton';
import NewsletterCard from '../common/NewsletterCard';

const CARD_ID_TO_PAGE = {
    '01': 'chapter1',
    '02': 'chapter2',
    '03': 'chapter3',
    '04': 'chapter4',
    '05': 'chapter5',
};

const ICON_MAP = {
    ThumbsUp,
    Users,
    Star,
    Layers,
    Bell,
};

const MOBILE_CARD_FRAME =
    'overflow-hidden rounded-3xl border-[1.5px] border-[#001D26] shadow-[2px_2px_0_0_#001D26]';

const SOCIAL_LINKS = [
    { Icon: Facebook, href: 'https://www.facebook.com/reimprogram/', label: 'פייסבוק – תוכנית רעים' },
];

const REIM_SITE_URL = 'https://www.reim-groups.org.il/index.php';

/**
 * Figma 191:15288 — NavBar / mobile home column (375 logical): hero, intro, chapter cards,
 * newsletter, photo strip, footer card. Top bar pill + −24 overlap content/Hero per spec.
 * Desktop: hidden (see HomePage).
 */
export default function HomeMobileFigma191View({ data, navigateTo, footer, header }) {
    const hero = data?.hero || {};
    const intro = data?.intro || {};
    const carouselHeader = data?.carouselHeader || {};
    const carousel = data?.carousel || [];
    const newsletter = data?.newsletter || {};
    const photoGrid = data?.photoGrid || {};

    const images = hero.images || [];
    const scrollRef = useRef(null);

    const carouselForFigma = [...carousel].reverse();

    /* Safari/iOS: horizontal overflow-x scroll often fails inside dir=rtl; strip uses dir=ltr for the scrollport only. */
    /* Snap scroll to the rightmost edge once on mount so the first card is visible. */
    /* No ResizeObserver: it would re-snap on every layout shift and fight the user's swipes. */
    useLayoutEffect(() => {
        const el = scrollRef.current;
        if (!el) return;
        el.scrollLeft = Math.max(0, el.scrollWidth - el.clientWidth);
    }, [carouselForFigma.length]);

    const handleCardNav = (card) => {
        const page = card.page || CARD_ID_TO_PAGE[card.id];
        if (page && navigateTo) navigateTo(page);
    };

    const introParagraphs = (intro.text || '').split(/\n\n+/).filter(Boolean);
    const introLead = introParagraphs[0] || '';
    const introRest = introParagraphs.slice(1).join('\n\n') || '';

    const leadLines = introLead.split('\n');
    const introLineRegular = leadLines[0] || '';
    const introLineMedium = leadLines.slice(1).join('\n') || '';

    const contact = footer?.contact ?? {};
    const bottomLinks = footer?.bottomLinks ?? [
        { text: 'מדיניות פרטיות', url: '#' },
        { text: 'תקנון אתר', url: '#' },
    ];
    const copyright = footer?.copyright ?? '© כל הזכויות שמורות לחברה למתנ"סים';
    const organization = footer?.organization ?? 'תוכנית רעים מבית החברה למתנ"סים';
    const logos = footer?.logos ?? { reim: '/Logo (1).png', matnasim: '/matnasimLogo.png' };

    return (
        <div
            className="mx-auto min-w-0 w-full max-w-[359px] overflow-x-hidden"
            dir="rtl"
        >
            {/* overflow-x-clip על אב חוסם לעיתים גלילה אופקית במגע ב-Safari; כאן overflow-x-hidden + min-w-0 */}
            {/* Figma 191:15298 Main content — white column, rounded 24, Hero + content −24 gap */}
            <div className="flex flex-col -space-y-6">
                {/* Hero 191:15299 */}
                <section
                    className="relative z-0 overflow-hidden bg-white text-center"
                    style={{ paddingTop: '100px', paddingBottom: '32px', paddingInline: '0' }}
                >
                    <div
                        className="pointer-events-none absolute rounded-full"
                        style={{
                            width: '496px',
                            height: '496px',
                            background: 'hsla(252, 70%, 57%, 0.12)',
                            filter: 'blur(200px)',
                            top: '163px',
                            insetInlineStart: '-75px',
                        }}
                        aria-hidden
                    />
                    <div
                        className="pointer-events-none absolute rounded-[50%]"
                        style={{
                            width: '435px',
                            height: '310px',
                            background: 'hsla(36, 100%, 62%, 0.08)',
                            filter: 'blur(200px)',
                            top: '705px',
                            insetInlineEnd: '-138px',
                        }}
                        aria-hidden
                    />

                    {/* Figma 191:15361 Top bar — 335×56, y 108, frosted pill */}
                    <div
                        className="absolute start-1/2 z-30 flex h-14 w-[335px] max-w-[calc(100%-24px)] -translate-x-1/2 items-center justify-between rounded-full border border-[rgba(0,29,38,0.08)] bg-[hsla(0,0%,100%,0.4)] px-3.5 shadow-[0px_4px_24px_rgba(101,70,222,0.04)]"
                        style={{ top: '108px' }}
                    >
                        <img
                            src={header?.logo || logos.reim}
                            alt=""
                            className="h-6 max-w-[109px] object-contain opacity-80"
                        />
                        <button
                            type="button"
                            className="shrink-0 rounded-full border border-[#001D26] px-3 py-2 text-sm font-bold text-[#001D26]"
                            onClick={() => {
                                document.getElementById('home-mobile-newsletter-191')?.scrollIntoView({
                                    behavior: 'smooth',
                                    block: 'start',
                                });
                            }}
                        >
                            הרשמה לניוזלטר
                        </button>
                    </div>

                    <img
                        src="/assets/home/home-hero-plane-2.svg"
                        alt=""
                        className="pointer-events-none absolute z-10 w-10 select-none"
                        style={{ top: '220px', insetInlineStart: '12px' }}
                    />
                    <img
                        src="/assets/home/home-hero-star-deco.svg"
                        alt=""
                        className="pointer-events-none absolute z-10 w-9 select-none"
                        style={{ top: '180px', insetInlineEnd: '16px' }}
                    />

                    <div className="relative z-20 mx-auto flex w-[295px] max-w-full flex-col items-center gap-[9px]">
                        <p
                            className="w-full text-center font-rubik font-normal text-[hsla(194,100%,7%,0.87)]"
                            style={{ fontSize: '24px', lineHeight: '133.4%' }}
                        >
                            {hero.subtitle}
                        </p>
                        <h1
                            className="w-full text-center font-rubik font-bold leading-[110%] tracking-[0.25px]"
                            style={{ fontSize: '34px' }}
                        >
                            <span className="text-[#001D26]">
                                {hero.title1}
                                {hero.titleLine2 ? (
                                    <>
                                        <br />
                                        {hero.titleLine2}{' '}
                                    </>
                                ) : null}
                            </span>
                            <span className="text-[#6546DE]">{hero.title2}</span>
                        </h1>
                        <div className="relative mt-1 h-3 w-[191px] max-w-full">
                            <div className="absolute inset-0 rounded-none bg-[#FFB23B]" aria-hidden />
                        </div>
                    </div>

                    <div className="relative z-10 mx-auto mt-2 w-[356px] max-w-full">
                        <div dir="ltr" className="relative mx-auto w-full" style={{ aspectRatio: '356 / 500' }}>
                            {images[0] ? (
                                <div
                                    className={`absolute ${MOBILE_CARD_FRAME} z-10 bg-white`}
                                    style={{
                                        left: '11.76%',
                                        top: '13.2%',
                                        width: '76.3%',
                                        height: '53.82%',
                                        transform: 'rotate(-3.5deg)',
                                        transformOrigin: 'center center',
                                    }}
                                >
                                    <img src={images[0]} alt="" className="h-full w-full object-cover" />
                                </div>
                            ) : null}
                            {images[1] ? (
                                <div
                                    className={`absolute ${MOBILE_CARD_FRAME} z-20 bg-white`}
                                    style={{
                                        left: '4%',
                                        top: '45.5%',
                                        width: '43.22%',
                                        height: '30.77%',
                                        transform: 'rotate(7deg)',
                                        transformOrigin: '88% 78%',
                                    }}
                                >
                                    <img src={images[1]} alt="" className="h-full w-full object-cover" />
                                </div>
                            ) : null}
                            {images[2] ? (
                                <div
                                    className={`absolute ${MOBILE_CARD_FRAME} z-20 bg-white`}
                                    style={{
                                        left: '56%',
                                        top: '57.8%',
                                        width: '39.83%',
                                        height: '35.2%',
                                        transform: 'rotate(-12deg)',
                                        transformOrigin: '22% 85%',
                                    }}
                                >
                                    <img src={images[2]} alt="" className="h-full w-full object-cover" />
                                </div>
                            ) : null}
                        </div>
                    </div>

                    <div className="relative z-20 mt-8 flex justify-center">
                        <button
                            type="button"
                            className="flex h-16 w-[60px] items-center justify-center rounded-full p-2.5 transition hover:opacity-90"
                            aria-label="גלילה למטה"
                            onClick={() => document.getElementById('home-intro-section-mobile')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                        >
                            <div className="flex size-10 items-center justify-center rounded-[32px] border border-[#001D26] bg-[#BCE079] p-1.5 shadow-[2px_2px_0_0_#001d26]">
                                <ArrowDown className="size-6 text-[#001D26]" strokeWidth={2} aria-hidden />
                            </div>
                        </button>
                    </div>
                </section>

                {/* content 191:15319 — overlap Hero, top border purple 2 */}
                <div
                    id="home-intro-section-mobile"
                    className="relative z-10 overflow-hidden rounded-[24px] border-t-2 border-[#6546DE] bg-white"
                >
                    {/* Section 1 191:15320 */}
                    <div
                        className="flex flex-col items-center justify-center gap-8 overflow-hidden bg-[hsla(252,70%,57%,0.08)]"
                        style={{ padding: '80px 24px' }}
                    >
                        <div
                            className="flex w-[311px] max-w-full flex-col items-center justify-center gap-4 rounded-[24px] border-[1.5px] border-[#001D26] bg-[#6546DE] p-12 text-center shadow-[2px_2px_0_0_#001d26]"
                        >
                            <div className="flex w-full max-w-[263px] flex-col items-center justify-center gap-0">
                                <p
                                    className="self-end text-right font-rubik font-normal text-white"
                                    style={{ fontSize: '16px', lineHeight: '132%', letterSpacing: '0.15px' }}
                                >
                                    {intro.subtitle}
                                </p>
                                <h2
                                    className="w-full text-center font-rubik font-bold text-white"
                                    style={{ fontSize: '24px', lineHeight: '133.4%' }}
                                >
                                    {intro.title}
                                </h2>
                            </div>
                            <div className="flex w-[263px] max-w-full flex-col gap-1 text-right">
                                {introLineRegular ? (
                                    <p
                                        className="text-center font-rubik font-normal text-white"
                                        style={{ fontSize: '16px', lineHeight: '132%', letterSpacing: '0.15px' }}
                                    >
                                        {introLineRegular}
                                    </p>
                                ) : null}
                                {introLineMedium ? (
                                    <p
                                        className="text-center font-rubik font-medium text-white"
                                        style={{ fontSize: '16px', lineHeight: '122%', letterSpacing: '0.15px' }}
                                    >
                                        {introLineMedium}
                                    </p>
                                ) : null}
                            </div>
                            {introRest ? (
                                <div className="flex w-[263px] max-w-full flex-col gap-2">
                                    <p
                                        className="text-center font-rubik font-normal text-white"
                                        style={{ fontSize: '16px', lineHeight: '132%', letterSpacing: '0.15px' }}
                                    >
                                        {introRest}
                                    </p>
                                </div>
                            ) : null}
                        </div>
                    </div>

                    {/* links 191:15333 */}
                    <div className="relative overflow-hidden bg-[hsla(252,70%,57%,0.08)] px-6 pb-10 pt-0">
                        <div
                            className="pointer-events-none absolute rounded-full"
                            style={{
                                width: '468px',
                                height: '468px',
                                background: 'hsla(252, 70%, 57%, 0.12)',
                                filter: 'blur(100px)',
                                top: '20%',
                                insetInlineStart: '50%',
                                transform: 'translateX(-50%)',
                            }}
                            aria-hidden
                        />
                        <div className="relative z-10 mb-2 flex w-full max-w-[335px] flex-row items-center justify-end">
                            <div className="flex max-w-[242px] flex-col items-end justify-center gap-0 text-end">
                                <p
                                    className="font-rubik font-normal text-[#001D26]"
                                    style={{ fontSize: '16px', lineHeight: '132%', letterSpacing: '0.15px' }}
                                >
                                    {carouselHeader.label}
                                </p>
                                <h3
                                    className="font-rubik font-bold text-[#001D26]"
                                    style={{ fontSize: '24px', lineHeight: '133.4%' }}
                                >
                                    {carouselHeader.title}
                                </h3>
                            </div>
                        </div>

                        <div
                            ref={scrollRef}
                            dir="ltr"
                            className="relative z-10 flex w-[335px] max-w-full min-w-0 flex-row flex-nowrap justify-start gap-3 overflow-x-auto overscroll-x-contain pb-4 pt-1 no-scrollbar"
                            style={{
                                height: '360px',
                                WebkitOverflowScrolling: 'touch',
                                touchAction: 'pan-x',
                            }}
                        >
                            <div className="w-[180px] shrink-0" aria-hidden />
                            {carouselForFigma.map((card) => {
                                const Icon = ICON_MAP[card.icon] || Star;
                                return (
                                    <button
                                        key={card.id}
                                        type="button"
                                        dir="rtl"
                                        onClick={() => handleCardNav(card)}
                                        className="relative flex h-[340px] w-[260px] shrink-0 touch-pan-x flex-col justify-between overflow-hidden rounded-2xl border-[1.5px] border-[hsla(252,70%,57%,0.16)] bg-white p-6 text-start"
                                    >
                                        <span
                                            className="font-salsa font-normal text-[#001D26]"
                                            style={{ fontSize: '40px', lineHeight: '128%', letterSpacing: '0.15px' }}
                                        >
                                            {card.id}
                                        </span>
                                        <div className="flex flex-col items-start gap-4">
                                            <div className="flex h-8 w-8 items-center justify-center text-[#001D26]">
                                                <Icon className="size-8" strokeWidth={2} aria-hidden />
                                            </div>
                                            <div className="flex w-full flex-col gap-1 text-start">
                                                <h4
                                                    className="whitespace-pre-line font-rubik font-semibold text-[#001D26]"
                                                    style={{
                                                        fontSize: '20px',
                                                        lineHeight: '128%',
                                                        letterSpacing: '0.15px',
                                                    }}
                                                >
                                                    {card.title}
                                                </h4>
                                                <p
                                                    className="font-rubik font-normal text-[#001D26]"
                                                    style={{
                                                        fontSize: '16px',
                                                        lineHeight: '132%',
                                                        letterSpacing: '0.15px',
                                                    }}
                                                >
                                                    {card.desc}
                                                </p>
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {navigateTo ? (
                        <div className="bg-[hsla(252,70%,57%,0.08)] px-4 pb-8">
                            <NextChapterButton
                                title="לפרק הראשון"
                                subtitle="פרק 01 - נעים להכיר"
                                onClick={() => navigateTo('chapter1')}
                            />
                        </div>
                    ) : null}

                    {/* Section 2 191:15346 */}
                    <div
                        id="home-mobile-newsletter-191"
                        className="flex flex-col items-center gap-4 overflow-hidden"
                        style={{ padding: '80px 24px' }}
                    >
                        {/* Functional newsletter card (was a static visual mock — replaced with real form). */}
                        <div className="w-[311px] max-w-full" style={{ ['--home-newsletter-card-h']: '400px' }}>
                            <NewsletterCard data={newsletter} />
                        </div>

                        <div
                            className="flex w-[311px] max-w-full flex-row items-start justify-center gap-4"
                            style={{ minHeight: '240px' }}
                        >
                            <div
                                className={`${MOBILE_CARD_FRAME} h-[240px] w-[215px] shrink-0 overflow-hidden bg-white`}
                            >
                                <img
                                    src={photoGrid.left || newsletter.images?.left || 'https://placehold.co/215x240/e8e8e8/001d26?text=Photo'}
                                    alt=""
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <div
                                className={`${MOBILE_CARD_FRAME} h-[240px] w-20 shrink-0 overflow-hidden bg-white`}
                            >
                                <img
                                    src={photoGrid.right || newsletter.images?.right || 'https://placehold.co/80x240/e8e8e8/001d26?text=Photo'}
                                    alt=""
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Footer instance 191:15360 — mobile card inside column */}
                    <footer className="w-full pb-6">
                        <div className="mx-auto flex w-[327px] max-w-full flex-col items-center gap-6 rounded-[24px] bg-[hsla(252,70%,57%,0.08)] p-6">
                            <div className="flex w-full max-w-[295px] flex-col items-center gap-6">
                                <div className="flex flex-row flex-wrap items-start justify-center gap-6">
                                    <img
                                        src="/matnasimLogo.png"
                                        alt="החברה למתנ״סים"
                                        className="h-6 max-w-[104px] object-contain"
                                        style={{ filter: 'invert(32%) sepia(89%) saturate(1582%) hue-rotate(231deg)' }}
                                    />
                                    <img src={logos.reim || '/Logo (1).png'} alt="רעים" className="h-6 object-contain" />
                                </div>
                                <p
                                    className="max-w-[212px] text-center font-rubik text-sm font-normal leading-[143%] tracking-[0.17px] text-[#001D26]"
                                >
                                    {organization}
                                    <br />
                                    טלפון: {contact.phone}
                                    <br />
                                    פקס: {contact.fax}
                                    <br />
                                    מייל:{' '}
                                    <a href={`mailto:${contact.email}`} className="text-[#6546DE] underline">
                                        {contact.email}
                                    </a>
                                </p>
                            </div>
                            <div className="flex w-full max-w-[295px] flex-col items-center gap-4 rounded-lg bg-[hsla(252,70%,57%,0.08)] p-4">
                                <div className="flex flex-row flex-wrap items-center justify-center gap-2.5">
                                    {SOCIAL_LINKS.map((link, i) => {
                                        const ItemIcon = link.Icon;
                                        return (
                                            <a
                                                key={i}
                                                href={link.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={link.label}
                                                className="flex size-8 items-center justify-center rounded-full bg-[hsla(252,70%,57%,0.87)] text-white"
                                            >
                                                <ItemIcon size={18} strokeWidth={2} aria-hidden />
                                            </a>
                                        );
                                    })}
                                    <a
                                        href={REIM_SITE_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 rounded-full bg-[#6546DE] px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-[#4a2fc7]"
                                    >
                                        <span>לאתר רעים</span>
                                        <ExternalLink size={14} aria-hidden />
                                    </a>
                                </div>
                                <div className="flex flex-row flex-wrap items-center justify-center gap-2 text-sm text-[#001D26]">
                                    {bottomLinks.map((link, i) => (
                                        <React.Fragment key={link.text}>
                                            {i > 0 ? <span className="text-[#001D26]/30">|</span> : null}
                                            <a href={link.url} className="underline">
                                                {link.text}
                                            </a>
                                        </React.Fragment>
                                    ))}
                                </div>
                                <p
                                    className="w-full max-w-[240px] text-end font-rubik text-sm font-normal leading-[143%] tracking-[0.17px] text-[hsla(194,100%,7%,0.6)]"
                                >
                                    {copyright}
                                </p>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    );
}
