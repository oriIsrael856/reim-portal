import React from 'react';
import HomeHero from '../components/home/HomeHero';
import HomeMobileFigma191View from '../components/home/HomeMobileFigma191View';
import HomeIntroDesktop from '../components/home/HomeIntroDesktop';
import HomeCarousel from '../components/home/HomeCarousel';
import HomeNewsletter from '../components/home/HomeNewsletter';
import NextChapterButton from '../components/common/NextChapterButton';

const HomePage = ({ data, navigateTo, content }) => {
    return (
        <div className="min-h-screen bg-transparent md:bg-[#F8F7FF]">
            {/* Figma 191:15288 — mobile home column (NavBar frame main content) */}
            <div className="md:hidden">
                <HomeMobileFigma191View
                    data={data}
                    navigateTo={navigateTo}
                    footer={content?.footer}
                    header={content?.header}
                />
            </div>

            {/* Desktop */}
            <div className="hidden md:block">
                <HomeHero data={data.hero} />
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

            {/* כפתור מעבר לפרק הראשון — desktop; mobile in Figma view */}
            {navigateTo && (
                <div className="my-10 hidden md:my-14 md:block">
                    <NextChapterButton
                        title="לפרק הראשון"
                        subtitle="פרק 01 - נעים להכיר"
                        onClick={() => navigateTo('chapter1')}
                    />
                </div>
            )}

            {/* Newsletter — desktop */}
            <div className="hidden md:block">
                <HomeNewsletter data={data.newsletter} photoGrid={data.photoGrid} />
            </div>
        </div>
    );
};

export default HomePage;
