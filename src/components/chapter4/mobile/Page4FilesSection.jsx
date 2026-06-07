import React, { useState } from 'react';
import { CH4_ASSETS } from '../chapter4Assets';
import Chapter4FilePreviewModal from '../Chapter4FilePreviewModal';
import Chapter4FileCardThumb from '../Chapter4FileCardThumb';
import {
    canChapter4FilePreview,
    isChapter4FileDownloadUrl,
} from '../../../utils/chapter4Files';

function Page4FileCard({ file }) {
    const [previewOpen, setPreviewOpen] = useState(false);
    const href = isChapter4FileDownloadUrl(file.url) ? file.url.trim() : null;
    const showPreview = href && canChapter4FilePreview(href);

    return (
        <>
            <article className="ch4-fileCard" tabIndex={href ? 0 : undefined}>
                <div className="ch4-fileCard__thumb">
                    <Chapter4FileCardThumb
                        url={file.url}
                        image={file.image}
                        placeholder={CH4_ASSETS.fileThumbPlaceholder}
                        imgClassName="ch4-fileCard__thumbImg"
                    />
                    {href ? (
                        <div className="ch4-fileCard__hoverOverlay">
                            <div className="ch4-fileCard__hoverActions">
                                {showPreview ? (
                                    <button
                                        type="button"
                                        className="ch4-fileCard__hoverCta ch4-fileCard__hoverCta--preview"
                                        onClick={() => setPreviewOpen(true)}
                                    >
                                        תצוגה מקדימה
                                    </button>
                                ) : null}
                                <a
                                    href={href}
                                    className="ch4-fileCard__hoverCta"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <img src={CH4_ASSETS.fileDownloadPill} alt="" width={20} height={20} />
                                    <span>הורדת הקובץ</span>
                                </a>
                            </div>
                        </div>
                    ) : null}
                </div>
                <div className="ch4-fileCard__row">
                    <div className="ch4-fileCard__text">
                        <h3 className="ch4-fileCard__name">{file.name}</h3>
                        <p className="ch4-fileCard__desc">{file.desc}</p>
                    </div>
                    <div className="ch4-fileCard__icon" aria-hidden>
                        <img src={CH4_ASSETS.fileDownloadPill} alt="" width={36} height={36} />
                    </div>
                </div>
            </article>

            <Chapter4FilePreviewModal
                open={previewOpen}
                url={href}
                title={file.name}
                onClose={() => setPreviewOpen(false)}
            />
        </>
    );
}

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
                        <Page4FileCard key={i} file={f} />
                    ))}
                </div>
            ) : null}
        </section>
    );
}
