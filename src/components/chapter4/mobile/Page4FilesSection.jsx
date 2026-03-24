import React from 'react';
import { CH4_ASSETS } from '../chapter4Assets';

/** Figma 254:12359 */
export default function Page4FilesSection({ filesTitle, proceduresIntro, files }) {
    const title = filesTitle ?? 'נהלים וטפסים';
    const list = files ?? [];

    return (
        <section id="ch4-files" className="ch4-mobile__section ch4-files" aria-labelledby="ch4-files-title">
            <div className="ch4-files__head">
                <h2 id="ch4-files-title" className="ch4-files__title">
                    {title}
                </h2>
                {proceduresIntro ? <p className="ch4-files__intro">{proceduresIntro}</p> : null}
            </div>
            {list.length > 0 ? (
                <div className="ch4-files__track">
                    <div className="ch4-files__spacer" aria-hidden />
                    {list.map((f, i) => (
                        <article key={i} className="ch4-fileCard" tabIndex={0}>
                            <div className="ch4-fileCard__thumb">
                                <img
                                    src={CH4_ASSETS.fileThumbPlaceholder}
                                    alt=""
                                    className="ch4-fileCard__thumbImg"
                                    width={256}
                                    height={256}
                                    loading="lazy"
                                    decoding="async"
                                />
                                <div className="ch4-fileCard__hoverOverlay" aria-hidden>
                                    <span className="ch4-fileCard__hoverCta">
                                        <img src={CH4_ASSETS.fileDownloadPill} alt="" width={20} height={20} />
                                        <span>הורדת הקובץ</span>
                                    </span>
                                </div>
                            </div>
                            <div className="ch4-fileCard__row">
                                <div className="ch4-fileCard__text">
                                    <h3 className="ch4-fileCard__name">{f.name}</h3>
                                    <p className="ch4-fileCard__desc">{f.desc}</p>
                                </div>
                                <div className="ch4-fileCard__icon" aria-hidden>
                                    <img src={CH4_ASSETS.fileDownloadPill} alt="" width={36} height={36} />
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            ) : null}
        </section>
    );
}
