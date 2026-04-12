import React from 'react';
import HomeHeroDesktop from './HomeHeroDesktop';

/**
 * Desktop hero (Figma 36:1025). Mobile home uses `HomeMobileFigma191View` (Figma 191:15288) in HomePage.
 */
const HomeHero = ({ data }) => {
    return <HomeHeroDesktop data={data} />;
};

export default HomeHero;
