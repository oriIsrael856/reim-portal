import React from 'react';
import NextChapterButton from '../../common/NextChapterButton';
import Footer from '../../layout/Footer';
import Page3HeroSection from './Page3HeroSection';
import Page3PageContentColumn from './Page3PageContentColumn';
import Page3OnboardingSection from './Page3OnboardingSection';
import Page3MeetingSection from './Page3MeetingSection';
import '../../../styles/chapter3-mobile.css';

/**
 * Chapter 3 — mobile main content only (Figma 253:6715).
 * Shell (menu, logo pill, status, global footer) stays in app chrome.
 */
export default function Chapter3MobileView({ data, onNext, footerData }) {
    if (!data) return null;

    const chapterNumber = data.chapterNumber ?? '03';

    const nextSlot =
        onNext != null ? (
            <NextChapterButton
                title={data.nextButton?.title ?? 'לפרק הבא'}
                subtitle={data.nextButton?.subtitle ?? 'פרק 04 - עבודה מנהלית'}
                onClick={onNext}
            />
        ) : null;
    const footerEl = footerData != null ? <Footer data={footerData} variant="chapter2Mobile" /> : null;

    return (
        <div className="ch3-mobile md:hidden" dir="rtl" lang="he">
            <Page3HeroSection hero={data.hero} chapterNumber={chapterNumber} />
            <Page3PageContentColumn
                hero={data.hero}
                responsibilities={data.responsibilities}
                chapterNumber={chapterNumber}
            />
            <Page3OnboardingSection onboarding={data.onboarding} />
            <Page3MeetingSection session={data.sessionStructure} />
            {nextSlot ? <div className="ch3-mobile__next">{nextSlot}</div> : null}
            {footerEl}
        </div>
    );
}
