import React from 'react';
import Footer from '../../layout/Footer';
import NextChapterButton from '../../common/NextChapterButton';
import Chapter2MobileShell from './Chapter2MobileShell';
import Chapter2MobileHero from './Chapter2MobileHero';
import Chapter2MobileAudience from './Chapter2MobileAudience';
import Chapter2MobileGoals from './Chapter2MobileGoals';
import Chapter2MobileGroupsIntro from './Chapter2MobileGroupsIntro';
import Chapter2MobileGroupAccordions from './Chapter2MobileGroupAccordions';
import Chapter2MobileSection6 from './Chapter2MobileSection6';

/**
 * Chapter 2 — mobile composition (Figma "Main content" 194:16436).
 */
export default function Chapter2MobileView({ data, onNext, footerData }) {
    const contentBox = data.contentBox;
    const goals = contentBox && contentBox.goals ? contentBox.goals : [];

    const footerEl =
        footerData != null ? <Footer data={footerData} variant="chapter2Mobile" /> : null;

    const nextSlot =
        onNext != null ? (
            <NextChapterButton
                title={data.nextButton?.title ?? 'לפרק הבא'}
                subtitle={data.nextButton?.subtitle ?? 'פרק 03 - תפקיד הרכזת'}
                onClick={onNext}
            />
        ) : null;

    return (
        <div className="flex min-h-0 flex-1 flex-col md:hidden">
            <Chapter2MobileShell nextSlot={nextSlot} footer={footerEl}>
                <Chapter2MobileHero hero={data.hero} chapterNumber={data.chapterNumber} />
                {contentBox ? <Chapter2MobileAudience contentBox={contentBox} /> : null}
                {contentBox && goals.length > 0 ? (
                    <Chapter2MobileGoals goals={goals} goalsTitle={contentBox.goalsTitle} />
                ) : null}
                {data.groupsIntro ? <Chapter2MobileGroupsIntro groupsIntro={data.groupsIntro} /> : null}
                <Chapter2MobileGroupAccordions data={data} groupsIntro={data.groupsIntro} />
                <Chapter2MobileSection6 whyTogether={data.whyTogether} />
            </Chapter2MobileShell>
        </div>
    );
}
