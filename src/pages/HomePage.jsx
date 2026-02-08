import React from 'react';
import HomeHero from '../components/home/HomeHero';
import HomeIntro from '../components/home/HomeIntro';
import HomeCarousel from '../components/home/HomeCarousel';
import HomeNewsletter from '../components/home/HomeNewsletter'; // <--- וודא שזה מיובא

const HomePage = ({ data, navigateTo }) => {
    return (
        <div className="bg-[#F8F7FF] min-h-screen">
            {/* 1. Hero */}
            <HomeHero data={data.hero} />

            {/* 2. Intro Box */}
            <HomeIntro data={data.intro} />

            {/* 3. Carousel */}
            <HomeCarousel items={data.carousel} navigateTo={navigateTo} />

            {/* 4. Newsletter Section - זה החלק שהיה חסר לך! */}
            <HomeNewsletter data={data.newsletter} />
        </div>
    );
};

export default HomePage;