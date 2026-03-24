import React from 'react';
import NextChapterButton from '../../common/NextChapterButton';
import Footer from '../../layout/Footer';
import Page4HeroSection from './Page4HeroSection';
import Page4NativSection from './Page4NativSection';
import Page4CommitteesFaqSection from './Page4CommitteesFaqSection';
import Page4FilesSection from './Page4FilesSection';
import '../../../styles/chapter4-mobile.css';

/**
 * Chapter 4 — mobile main column (Figma 254:10551). App shell is unchanged.
 */
export default function Chapter4MobileView({ data, onNext, proceduresIntro, footerData }) {
    if (!data) return null;

    const chapterNumber = data.chapterNumber ?? '04';

    const nextSlot =
        onNext != null ? (
            <NextChapterButton
                title={data.nextButton?.title ?? 'לפרק הבא'}
                subtitle={data.nextButton?.subtitle ?? 'פרק 05 - כלים מעשיים'}
                onClick={onNext}
            />
        ) : null;

    const footerEl = footerData != null ? <Footer data={footerData} variant="chapter2Mobile" /> : null;

    return (
        <div className="ch4-mobile md:hidden" dir="rtl" lang="he">
            <Page4HeroSection hero={data.hero} chapterNumber={chapterNumber} features={data.features} />
            <Page4NativSection nativ={data.nativSystem} />
            <Page4CommitteesFaqSection committees={data.committees} qa={data.qa} />
            <Page4FilesSection
                filesTitle={data.filesTitle}
                proceduresIntro={proceduresIntro}
                files={data.files}
            />
            {nextSlot ? <div className="ch4-mobile__next">{nextSlot}</div> : null}
            {footerEl}
        </div>
    );
}
