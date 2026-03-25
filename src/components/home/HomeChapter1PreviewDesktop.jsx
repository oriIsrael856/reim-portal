import React from 'react';
import { ThumbsUp } from 'lucide-react';

/**
 * Desktop home Section 1 — Figma-style split: chapter hero + «התוכנית» text card (narrow column).
 * RTL: hero on inline-start (visual right), program card on inline-end (visual left).
 */
export default function HomeChapter1PreviewDesktop({ chapter1, onOpenChapter }) {
    const data = chapter1;
    const card = data?.cards?.[0];
    if (!data?.hero || !card) return null;

    const open = () => onOpenChapter?.();

    return (
        <section className="relative z-10 mb-10 w-full md:mb-14" dir="rtl">
            <article
                className="mx-auto flex w-full max-w-[1424px] cursor-pointer flex-col items-stretch gap-10 rounded-none border-0 bg-transparent p-0 text-start shadow-none outline-none transition-opacity hover:opacity-[0.98] md:flex-row md:items-start md:gap-[clamp(1.5rem,4vw,3.5rem)]"
                role="link"
                tabIndex={0}
                onClick={open}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        open();
                    }
                }}
                aria-label="מעבר לפרק 01 — נעים להכיר"
            >
                {/* Hero — visual right in RTL */}
                <div className="relative min-w-0 flex-1 ps-2 pt-1">
                    <div
                        className="pointer-events-none absolute -bottom-6 -z-10 font-[family-name:var(--font-salsa)] text-[clamp(5rem,14vw,11rem)] font-black leading-none text-[#6546DE]/[0.12] select-none md:-bottom-10"
                        aria-hidden
                    >
                        {data.chapterNumber || '01'}
                    </div>

                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border-2 border-black bg-[#C5E080] px-4 py-1.5 shadow-[3px_3px_0_#000]">
                        <span className="text-sm font-bold text-[#2D2D44]">{data.hero.tag}</span>
                        <div className="rounded-full border border-black/10 bg-white/30 px-2 font-[family-name:var(--font-salsa)] text-xs font-bold text-[#2D2D44]">
                            {data.chapterNumber || '01'}
                        </div>
                    </div>

                    <h2 className="mb-6 font-['Rubik'] text-4xl font-black leading-[1.05] text-[#2D2D44] md:text-5xl lg:text-[3.5rem]">
                        <span className="text-black">{data.hero.title1}</span>
                        <br />
                        <span className="relative mt-1 inline-block pb-2 text-[#6546DE]">
                            {data.hero.title2}
                            <span
                                className="absolute bottom-0 start-0 end-0 h-1.5 rounded-full bg-[#FFD028]"
                                aria-hidden
                            />
                        </span>
                    </h2>

                    <div className="flex flex-wrap items-center gap-4">
                        <ThumbsUp className="h-8 w-8 shrink-0 text-[#E53935]" strokeWidth={2.2} />
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#EBE5FC] text-[#5E3BEE]">
                            <ThumbsUp className="h-6 w-6" fill="#EBE5FC" strokeWidth={2.2} />
                        </div>
                    </div>
                </div>

                {/* Program card — ~42% width, visual left in RTL */}
                <div className="w-full shrink-0 md:w-[min(100%,42%)] md:max-w-[560px] md:min-w-[min(100%,320px)]">
                    <div className="flex h-full min-h-[min(28rem,70vh)] max-h-[640px] flex-col gap-3.5 rounded-[24px] border border-[#001D26] bg-white p-10 shadow-[0_4px_24px_rgba(0,29,38,0.08)] md:min-h-[520px]">
                        <h3 className="text-[2rem] font-black leading-none text-[#6546DE] md:text-[2.25rem]">
                            {card.title}
                        </h3>
                        <p className="text-lg font-bold leading-snug text-[#46319B] md:text-xl">{card.subtitle}</p>
                        <p className="min-h-0 flex-1 overflow-y-auto text-base leading-relaxed text-[#001D26] whitespace-pre-line md:text-lg">
                            {card.text}
                        </p>
                    </div>
                </div>
            </article>
        </section>
    );
}
