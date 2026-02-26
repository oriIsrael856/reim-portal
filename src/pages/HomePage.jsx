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

            {/* קונטיינר: התחלה חדשה בפתח + קרוסלה – רווח ברור בין החץ הירוק לתמונות */}
            <div
                className="w-full rounded-2xl md:rounded-[28px] mt-3 md:mt-4 mb-6 md:mb-10 overflow-hidden"
                style={{
                    background: '#EBE8FC',
                    border: '2px solid var(--Purple-Dark, #46319B)',
                    padding: 'clamp(1rem, 4vh, 2rem) clamp(1rem, 4%, 2rem)'
                }}
            >
                {/* 2. Intro Box – התחלה חדשה בפתח */}
                <HomeIntro data={data.intro} />

                {/* 3. Carousel */}
                <HomeCarousel items={data.carousel} navigateTo={navigateTo} carouselHeader={data.carouselHeader} />
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
            <HomeNewsletter data={data.newsletter} />
        </div>
    );
};

export default HomePage;