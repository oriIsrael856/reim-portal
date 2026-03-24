import React from 'react';
import AccordionMobileFigma from './AccordionMobileFigma';

export default function Chapter2MobileGroupAccordions({ data, groupsIntro }) {
    if (!data?.group01 && !data?.group02) return null;

    const snippet =
        groupsIntro?.description?.split('.')[0] != null ? `${groupsIntro.description.split('.')[0]}.` : null;

    return (
        <section className="ch2-mobile-section5">
            {data.group01 && (
                <div className="ch2-mobile-section5__group">
                    <div className="ch2-mobile-section5__heading">
                        <p className="ch2-mobile-section5__eyebrow">קבוצה 01</p>
                        <h2 className="ch2-mobile-section5__title">{data.group01.title}</h2>
                    </div>
                    {snippet ? <p className="ch2-mobile-section5__snippet">{snippet}</p> : null}
                    <AccordionMobileFigma items={data.group01.items} />
                </div>
            )}
            {data.group02 && (
                <div className="ch2-mobile-section5__group">
                    <div className="ch2-mobile-section5__heading">
                        <p className="ch2-mobile-section5__eyebrow">קבוצה 02</p>
                        <h2 className="ch2-mobile-section5__title">{data.group02.title}</h2>
                    </div>
                    {snippet ? <p className="ch2-mobile-section5__snippet">{snippet}</p> : null}
                    <AccordionMobileFigma items={data.group02.items} />
                </div>
            )}
        </section>
    );
}
