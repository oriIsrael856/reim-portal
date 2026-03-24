import React from 'react';
import { ExternalLink } from 'lucide-react';
import { CH4_ASSETS } from '../chapter4Assets';

/** Figma node 254:12080 — Section Meeting / nativSystem */
export default function Page4NativSection({ nativ }) {
    if (!nativ) return null;

    const ctaHref = (typeof nativ.ctaUrl === 'string' && nativ.ctaUrl.trim()) || '#';
    const ctaIsExternal = ctaHref !== '#';

    const mainLead = [nativ.description, 'עקרונות העבודה בנתיב:'].filter(Boolean).join('\n\n');

    const supportBlock =
        nativ.support &&
        `תמיכה והדרכה:\n\n${nativ.support}`.replace(/\n{3,}/g, '\n\n');

    return (
        <section id="ch4-nativ" className="ch4-mobile__section ch4-nativ" aria-labelledby="ch4-nativ-title">
            <div className="ch4-nativ__group">
                <div className="ch4-nativ__headInner">
                    {nativ.label ? <p className="ch4-nativ__label">{nativ.label}</p> : null}
                    <h2 id="ch4-nativ-title" className="ch4-nativ__title">
                        {nativ.title}
                    </h2>
                </div>
                <div className="ch4-nativ__bodyCol">
                    <div className="ch4-nativ__principlesBlock">
                        {mainLead ? (
                            <p className="ch4-nativ__desc ch4-nativ__mainLead" dir="rtl">
                                {mainLead}
                            </p>
                        ) : null}
                        <ul className="ch4-nativ__list">
                            {(nativ.principles ?? []).map((p, i) => (
                                <li key={i} className="ch4-nativ__principle" dir="rtl">
                                    <span className="ch4-nativ__principleIcon" aria-hidden>
                                        <img src={CH4_ASSETS.nativPrinciple} alt="" />
                                    </span>
                                    <span className="ch4-nativ__principleText">{p}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {supportBlock ? (
                        <p className="ch4-nativ__desc ch4-nativ__supportFull" dir="rtl">
                            {supportBlock}
                        </p>
                    ) : null}
                </div>
            </div>
            <a
                href={ctaHref}
                className="ch4-nativ__imageCard"
                target={ctaIsExternal ? '_blank' : undefined}
                rel={ctaIsExternal ? 'noopener noreferrer' : undefined}
            >
                <img
                    src={CH4_ASSETS.nativMock}
                    alt=""
                    className="ch4-nativ__imageCardImg"
                    width={1200}
                    height={364}
                    decoding="async"
                />
                <span className="ch4-nativ__imageCardBadge" aria-hidden>
                    <ExternalLink className="ch4-nativ__imageCardBadgeIcon" size={20} strokeWidth={2.5} />
                </span>
            </a>
        </section>
    );
}
