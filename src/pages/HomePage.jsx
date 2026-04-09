import React from 'react';
import HomeHero from '../components/home/HomeHero';
import HomeIntro from '../components/home/HomeIntro';
import HomeIntroDesktop from '../components/home/HomeIntroDesktop';
import HomeCarousel from '../components/home/HomeCarousel';
import HomeNewsletter from '../components/home/HomeNewsletter';
import NextChapterButton from '../components/common/NextChapterButton';

const HomePage = ({ data, navigateTo }) => {
    return (
        <div className="bg-[#F8F7FF] min-h-screen">
            {/* 1. Hero */}
            <HomeHero data={data.hero} />

            {/* Section 1 (Figma 36:1035): mobile */}
            <div
                className="md:hidden w-full rounded-2xl mt-3 mb-6 overflow-hidden"
                style={{
                    background: 'rgba(101, 70, 222, 0.08)',
                    border: '2px solid var(--Purple-Dark, #46319B)',
                    padding: 'clamp(1rem, 4vh, 2rem) clamp(1rem, 4%, 2rem)',
                }}
            >
                <HomeIntro data={data.intro} />
                <div className="mt-8 w-full min-w-0">
                    <HomeCarousel items={data.carousel} navigateTo={navigateTo} carouselHeader={data.carouselHeader} />
                </div>
            </div>

            {/* Section 1 desktop — mt matches Figma hero mb-[-24px] overlap */}
            <div
                className="relative -mt-6 mb-10 hidden w-full flex-col items-center justify-start gap-0 self-stretch overflow-visible md:flex"
                style={{
                    background: 'rgba(101, 70, 222, 0.08)',
                    paddingTop: 'var(--home-desktop-section-pad-top)',
                    paddingBottom: 'var(--home-desktop-section-pad-bottom)',
                    paddingInlineStart: 'var(--home-desktop-section-pad-x)',
                    paddingInlineEnd: 'var(--home-desktop-section-pad-x)',
                }}
            >
                <HomeIntroDesktop data={data.intro} />
                <div className="mt-10 w-full min-w-0 max-w-full md:mt-14">
                    <HomeCarousel
                        items={data.carousel}
                        navigateTo={navigateTo}
                        carouselHeader={data.carouselHeader}
                    />
                </div>
            </div>

            {/* 4. כפתור מעבר לפרק הראשון */}
            {navigateTo && (
                <div className="my-10 md:my-14">
                    <NextChapterButton
                        title="לפרק הראשון"
                        subtitle="פרק 01 - נעים להכיר"
                        onClick={() => navigateTo('chapter1')}
                    />
                </div>
            )}

            {/* 5. Newsletter Section */}
            <HomeNewsletter data={data.newsletter} photoGrid={data.photoGrid} />
        </div>
    );
};

export default HomePage;
