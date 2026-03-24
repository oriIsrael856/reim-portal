import React from 'react';
import { Star, Users, User } from 'lucide-react';
import BigChapterDigits from './BigChapterDigits';
import Chapter2MobileChapterLabel from './Chapter2MobileChapterLabel';

/**
 * Section 1 — Hero (Figma 194:16437)
 * - layout_BHDVF9: padding 120×24×0, column gap 8
 * - layout_ZCDEKN: text column max 303px, gap 16
 * - layout_3U64B4: collage stack height 560, gap 8
 * All copy: `hero.*` + `chapterNumber` from Firestore / data (no hardcoded headings).
 */
export default function Chapter2MobileHero({ hero, chapterNumber }) {
    if (!hero) return null;

    const title = typeof hero.title === 'string' ? hero.title : '';

    return (
        <section className="ch2-mobile-section1" aria-labelledby="ch2-mobile-hero-title">
            {/* Decorative blurs — Figma Ellipse 2 / 3 */}
            <div
                className="pointer-events-none absolute -left-20 top-16 h-[31rem] w-[31rem] rounded-full opacity-90"
                style={{ background: 'var(--ch2-glow-purple)', filter: 'blur(80px)' }}
                aria-hidden
            />
            <div
                className="pointer-events-none absolute -bottom-32 -left-36 h-[12rem] w-[16rem] rounded-full opacity-80"
                style={{ background: 'var(--ch2-glow-orange)', filter: 'blur(60px)' }}
                aria-hidden
            />

            <div className="ch2-mobile-hero__text-col">
                <Chapter2MobileChapterLabel tag={hero.tag} chapterNumber={chapterNumber} />
                <h1 id="ch2-mobile-hero-title" className="ch2-mobile-type-h4">
                    {title}
                </h1>
            </div>

            <div className="ch2-mobile-hero__collage">
                <div className="absolute left-0 top-6 z-10 w-[56%] max-w-[220px]">
                    <div className="relative aspect-[3/4] w-full">
                        <div
                            className="absolute inset-0 z-10 origin-center -rotate-[7deg] overflow-hidden rounded-2xl bg-gray-200"
                            style={{
                                border: 'var(--ch2-image-border)',
                                boxShadow: 'var(--ch2-chapter-label-shadow)',
                            }}
                        >
                            <img src={hero.image1} alt="" className="h-full w-full object-cover" />
                        </div>
                        <Star
                            className="pointer-events-none absolute left-0 top-2 z-20 h-8 w-8 fill-[var(--ch2-lime)] text-[var(--ch2-text-primary)]"
                            strokeWidth={1.5}
                            aria-hidden
                        />
                        <Star
                            className="pointer-events-none absolute -bottom-1 -right-1 z-[25] h-7 w-7 fill-[var(--ch2-orange)] text-[var(--ch2-text-primary)]"
                            strokeWidth={1.5}
                            aria-hidden
                        />
                        <div className="absolute left-1/2 top-1 z-30 w-[78%] max-w-[142px] origin-top-left rotate-[6deg]">
                            <div
                                className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-200"
                                style={{
                                    border: 'var(--ch2-image-border)',
                                    boxShadow: 'var(--ch2-chapter-label-shadow)',
                                }}
                            >
                                <img src={hero.image2} alt="" className="h-full w-full object-cover" />
                            </div>
                            <Users
                                className="absolute -right-2 top-1/2 h-7 w-7 -translate-y-1/2 text-[var(--ch2-text-red)]"
                                strokeWidth={2}
                                aria-hidden
                            />
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-2 right-1 z-20 w-[44%] max-w-[150px]">
                    <User
                        className="absolute -left-2 top-[-18px] z-10 h-6 w-6 text-[var(--ch2-orange)]"
                        strokeWidth={2.5}
                        aria-hidden
                    />
                    <div
                        className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-200"
                        style={{
                            border: 'var(--ch2-image-border)',
                            boxShadow: 'var(--ch2-chapter-label-shadow)',
                        }}
                    >
                        <img src={hero.image3} alt="" className="h-full w-full object-cover" />
                    </div>
                </div>
            </div>

            <div className="relative z-10 mt-10 w-full">
                <BigChapterDigits digits={chapterNumber || '02'} />
            </div>
        </section>
    );
}
