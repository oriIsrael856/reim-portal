import React from 'react';
import HomeHero from '../components/home/HomeHero';
import HomeIntro from '../components/home/HomeIntro';
import HomeCarousel from '../components/home/HomeCarousel';
import HomeNewsletter from '../components/home/HomeNewsletter';
import NextChapterButton from '../components/common/NextChapterButton';

const HomePage = ({ data, navigateTo }) => {
    return (
        <div className="bg-[#F8F7FF] min-h-screen">
            {/* 1. Hero */}
            <HomeHero data={data.hero} />

            {/* 2. Intro Box */}
            <HomeIntro data={data.intro} />

            {/* 3. Carousel */}
            <HomeCarousel items={data.carousel} navigateTo={navigateTo} carouselHeader={data.carouselHeader} />

            {/* 4. כפתור מעבר לפרק הראשון */}
            {navigateTo && (
                <div className="my-16 md:my-24">
                    <NextChapterButton
                        title="לפרק הראשון"
                        subtitle="פרק 01 - נעים להכיר"
                        onClick={() => navigateTo('chapter1')}
                    />
                </div>
            )}

            {/* 5. Newsletter Section */}
            <HomeNewsletter data={data.newsletter} />
        </div>
    );
};

export default HomePage;