import React from 'react';
import HomeHeroDesktop from './HomeHeroDesktop';
import HomeHeroMobile from './HomeHeroMobile';

/**
 * Mobile (Figma 191:9369) and desktop (Figma 36:1025) are isolated — no shared layout wrapper
 * so desktop tokens never affect mobile sizing.
 */
const HomeHero = ({ data }) => {
    return (
        <>
            <HomeHeroMobile data={data} />
            <HomeHeroDesktop data={data} />
        </>
    );
};

export default HomeHero;
