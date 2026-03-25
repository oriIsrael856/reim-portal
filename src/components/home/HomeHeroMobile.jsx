import React from 'react';

const MOBILE_HERO_CARD_FRAME =
    'overflow-hidden rounded-2xl border-[1.5px] border-[#001D26] shadow-[2px_2px_0_0_#001D26]';

/**
 * Mobile-only hero (Figma 191:9369). Isolated from desktop so layout tokens never leak.
 */
export default function HomeHeroMobile({ data }) {
    const images = data.images || [];

    return (
        <div
            className="relative overflow-hidden overflow-x-clip bg-white text-center md:hidden"
            style={{
                paddingTop: 'clamp(3rem, 10vh, 6.25rem)',
                paddingBottom: 'clamp(1.5rem, 6vh, 6.75rem)',
                maxWidth: 'min(1100px, 92vw)',
                marginInline: 'auto',
                paddingInline: 'clamp(1rem, 4%, 2rem)',
            }}
        >
            <div
                className="pointer-events-none absolute rounded-full blur-[100px]"
                style={{
                    width: 'min(496px, 130vw)',
                    height: 'min(496px, 130vw)',
                    background: 'rgba(101, 70, 222, 0.12)',
                    top: 'clamp(-4rem, 2vh, 4rem)',
                    insetInlineStart: 'clamp(-6rem, -15vw, -2rem)',
                }}
                aria-hidden
            />
            <div
                className="pointer-events-none absolute rounded-[50%] blur-[100px]"
                style={{
                    width: 'min(435px, 100vw)',
                    height: 'min(310px, 55vw)',
                    background: 'rgba(255, 178, 59, 0.08)',
                    bottom: 'clamp(-5rem, -8vh, 0rem)',
                    insetInlineEnd: 'clamp(-8rem, -20vw, -3rem)',
                }}
                aria-hidden
            />

            <img
                src="/assets/home/home-hero-plane-2.svg"
                alt=""
                className="pointer-events-none absolute z-10 w-[clamp(3.25rem,20vw,4.5rem)] select-none"
                style={{ top: 'clamp(6rem, 14vh, 9rem)', insetInlineStart: 'clamp(0.5rem, 3vw, 2rem)' }}
            />

            <img
                src="/assets/home/home-hero-star-deco.svg"
                alt=""
                className="pointer-events-none absolute z-10 w-9 select-none"
                style={{ top: 'clamp(4rem, 10vh, 6rem)', insetInlineEnd: 'clamp(0.75rem, 5vw, 2.5rem)' }}
            />

            <div className="relative z-20 mx-auto w-full max-w-[22rem]" style={{ marginBottom: 'clamp(1.25rem, 4vh, 2rem)' }} dir="rtl">
                <p
                    className="text-center font-['Rubik'] font-semibold text-[rgba(0,29,38,0.87)]"
                    style={{
                        fontSize: '20px',
                        lineHeight: 1.28,
                        letterSpacing: '0.0075em',
                        marginBottom: '4px',
                    }}
                >
                    {data.subtitle}
                </p>
                <h1
                    className="text-center font-['Rubik'] font-bold text-[#001D26]"
                    style={{
                        fontSize: 'clamp(1.5rem, 5.2vw, 34px)',
                        lineHeight: 1.1,
                        letterSpacing: '0.00735em',
                    }}
                >
                    {data.title1}
                    {data.titleLine2 ? (
                        <>
                            <br />
                            {data.titleLine2}
                        </>
                    ) : null}
                </h1>
                <div className="mx-auto mt-1 inline-flex max-w-full flex-col items-center">
                    <h1
                        className="text-center font-['Rubik'] font-bold text-[#001D26]"
                        style={{
                            fontSize: 'clamp(1.5rem, 5.2vw, 34px)',
                            lineHeight: 1.1,
                            letterSpacing: '0.00735em',
                        }}
                    >
                        {data.title2}
                    </h1>
                    <div className="mt-1 h-3 w-[min(191px,72%)] max-w-full rounded-sm bg-[#FFB23B]" aria-hidden />
                </div>
            </div>

            <div
                className="relative z-10 mx-auto w-full max-w-[356px]"
                style={{ marginTop: 'clamp(0.5rem, 2vh, 1.25rem)' }}
            >
                <div dir="ltr" className="relative mx-auto w-full" style={{ aspectRatio: '356 / 500' }}>
                    {images[0] ? (
                        <div
                            className={`absolute ${MOBILE_HERO_CARD_FRAME} z-10 bg-white`}
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
                            className={`absolute ${MOBILE_HERO_CARD_FRAME} z-20 bg-white`}
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
                            className={`absolute ${MOBILE_HERO_CARD_FRAME} z-20 bg-white`}
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

            <div className="flex flex-shrink-0 justify-center" style={{ marginTop: 'clamp(2rem, 6vh, 3.5rem)' }}>
                <button
                    type="button"
                    className="rounded-full p-2 transition hover:opacity-90"
                    aria-label="גלילה למטה"
                >
                    <img
                        src="/assets/home/home-hero-scroll-arrow.svg"
                        alt=""
                        className="block h-14 w-[3.75rem] max-w-none"
                    />
                </button>
            </div>
        </div>
    );
}
