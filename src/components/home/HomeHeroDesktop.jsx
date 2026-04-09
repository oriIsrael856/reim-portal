import React from 'react';
import HomeHeroDesktopCollage from './desktop/HomeHeroDesktopCollage';

/** Figma 36:1025 — desktop only */
export default function HomeHeroDesktop({ data }) {
    const desktopCollage = data.desktopCollage || {};

    return (
        <div
            className="relative mx-auto hidden w-full max-w-[1920px] overflow-x-visible bg-white md:block md:min-h-[min(1024px,100svh)] md:px-[var(--home-desktop-hero-pad-x)] md:pb-[var(--home-desktop-hero-pad-bottom)] md:pt-[var(--home-desktop-hero-pad-top)]"
        >
            <div
                className="pointer-events-none absolute rounded-full"
                style={{
                    width: 'min(1044px, 72vw)',
                    height: 'min(1044px, 72vw)',
                    background: 'var(--home-desktop-hero-blur-purple)',
                    filter: 'blur(200px)',
                    top: 'clamp(-12rem, -18vw, -8rem)',
                    left: 'clamp(-14rem, -20vw, -10rem)',
                }}
                aria-hidden
            />
            <div
                className="pointer-events-none absolute rounded-full"
                style={{
                    width: 'min(704px, 48vw)',
                    height: 'min(704px, 48vw)',
                    background: 'var(--home-desktop-hero-blur-amber)',
                    filter: 'blur(200px)',
                    top: 'clamp(18rem, 38vh, 28rem)',
                    right: 'clamp(-8rem, -12vw, -4rem)',
                }}
                aria-hidden
            />

            <img
                src="/assets/home/home-hero-plane-2.svg"
                alt=""
                className="pointer-events-none absolute z-10 select-none"
                style={{
                    width: 'var(--home-desktop-hero-plane-w)',
                    top: 'min(265px, 26vh)',
                    left: 'clamp(2rem, 22.4vw, 431px)',
                }}
            />

            <img
                src="/assets/home/home-hero-star-deco.svg"
                alt=""
                className="pointer-events-none absolute z-10 select-none"
                style={{
                    width: 'var(--home-desktop-hero-star-w)',
                    top: 'min(338px, 33vh)',
                    right: 'clamp(1rem, 12vw, 200px)',
                }}
            />

            <div
                className="relative z-20 mx-auto w-full"
                style={{
                    maxWidth: 'var(--home-desktop-hero-text-max-w)',
                    marginBottom: 'clamp(1.5rem, 3vh, 2.5rem)',
                }}
                dir="rtl"
            >
                <div className="relative w-full">
                    <div
                        className="absolute z-0 rounded-sm bg-[#FFB23B]"
                        style={{
                            left: 'var(--home-desktop-hero-yellow-bar-left)',
                            top: 'var(--home-desktop-hero-yellow-bar-top)',
                            width: 'var(--home-desktop-hero-yellow-bar-w)',
                            height: 'var(--home-desktop-hero-yellow-bar-h)',
                        }}
                        aria-hidden
                    />
                    <p
                        className="relative z-10 text-center font-['Rubik'] font-bold text-[rgba(0,29,38,0.87)]"
                        style={{
                            fontSize: 'var(--home-desktop-hero-subtitle-size)',
                            lineHeight: 'var(--home-desktop-hero-subtitle-line)',
                            marginBottom: 'var(--home-desktop-hero-text-stack-gap)',
                        }}
                    >
                        {data.subtitle}
                    </p>
                    <h1
                        className="relative z-10 text-center font-['Rubik'] font-bold text-[#001D26]"
                        style={{
                            fontSize: 'var(--home-desktop-hero-title-size)',
                            lineHeight: 'var(--home-desktop-hero-title-line)',
                            letterSpacing: 'var(--home-desktop-hero-title-tracking)',
                        }}
                    >
                        {data.title1}
                        <br />
                        {data.titleLine2 ? <>{data.titleLine2}{' '}</> : null}
                        <span style={{ color: '#6546de' }}>{data.title2}</span>
                    </h1>
                </div>
            </div>

            <div className="relative z-0 mx-auto w-full" style={{ marginTop: 'clamp(5px, 0.42vw, 11px)' }}>
                <HomeHeroDesktopCollage sources={desktopCollage} />
            </div>

            {/* Scroll arrow — absolute so it doesn't add flow height (Figma: top 788/1024 ≈ 77%) */}
            <div className="pointer-events-none absolute z-20 left-0 right-0 flex justify-center" style={{ top: '77%' }}>
                <button
                    type="button"
                    className="pointer-events-auto rounded-full p-2 transition hover:opacity-90"
                    aria-label="גלילה למטה"
                >
                    <img
                        src="/assets/home/home-hero-scroll-arrow.svg"
                        alt=""
                        className="block h-16 w-[3.75rem] max-w-none"
                    />
                </button>
            </div>
        </div>
    );
}
