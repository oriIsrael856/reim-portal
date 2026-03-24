import React from 'react';
import { Star } from 'lucide-react';
import Page3SessionAccordion from './Page3SessionAccordion';

/**
 * Figma Section Meeting `254:9802` — layout.sectionMeeting in docs/figma-cache-page3.json
 */
export default function Page3MeetingSection({ session }) {
    if (!session) return null;
    const images = session.images ?? [];
    const hasCopy = session.title || session.recommendation || session.items?.length;
    const hasVisuals = images.length > 0 || hasCopy;
    if (!hasVisuals) return null;

    return (
        <section className="ch3-mobile__section ch3-meeting" aria-labelledby="ch3-meeting-title">
            {images.length > 0 ? (
                <div className="ch3-meeting__collage">
                    {images[0] ? (
                        <div className="ch3-meeting__img ch3-meeting__img--a">
                            <img src={images[0]} alt="" loading="lazy" decoding="async" />
                        </div>
                    ) : null}
                    {images[1] ? (
                        <div className="ch3-meeting__img ch3-meeting__img--b">
                            <img src={images[1]} alt="" loading="lazy" decoding="async" />
                        </div>
                    ) : null}
                    <Star
                        className="ch3-meeting__decoStar"
                        size={44}
                        strokeWidth={1.5}
                        fill="var(--ch3-red-card-title)"
                        color="var(--ch3-red-card-title)"
                        aria-hidden
                    />
                    <span className="ch3-meeting__decoDot" aria-hidden />
                </div>
            ) : null}
            <div className="ch3-meeting__content">
                {(session.recommendation || session.title) && (
                    <div className="ch3-meeting__head">
                        {session.recommendation ? (
                            <p className="ch3-meeting__rec">{session.recommendation}</p>
                        ) : null}
                        {session.title ? (
                            <h2 id="ch3-meeting-title" className="ch3-meeting__title">
                                {session.title}
                            </h2>
                        ) : null}
                    </div>
                )}
                <Page3SessionAccordion items={session.items} />
            </div>
        </section>
    );
}
