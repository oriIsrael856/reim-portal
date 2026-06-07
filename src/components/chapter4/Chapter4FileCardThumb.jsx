import React from 'react';
import {
    getChapter4CardEmbedSrc,
    getChapter4FilePreviewKind,
    isChapter4FileDownloadUrl,
} from '../../utils/chapter4Files';

const EMBED_FRAME_STYLE = {
    width: '400%',
    height: '400%',
    transform: 'scale(0.25)',
    transformOrigin: 'top left',
};

/**
 * Card thumbnail — mini embedded preview (Google viewer for PDF/Office),
 * direct image for images, else CMS `image` / placeholder.
 */
export default function Chapter4FileCardThumb({ url, image, placeholder, imgClassName = '' }) {
    const href = isChapter4FileDownloadUrl(url) ? url.trim() : null;
    const kind = href ? getChapter4FilePreviewKind(href) : null;
    const embedSrc = href ? getChapter4CardEmbedSrc(href) : null;
    const manualImage = image && String(image).trim();

    if (embedSrc) {
        return (
            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[12px] bg-white" aria-hidden>
                <iframe
                    src={embedSrc}
                    title=""
                    tabIndex={-1}
                    className="absolute start-0 top-0 border-0"
                    style={EMBED_FRAME_STYLE}
                    loading="lazy"
                />
            </div>
        );
    }

    if (kind === 'image' && href) {
        return (
            <img
                alt=""
                src={href}
                className={imgClassName}
                loading="lazy"
                decoding="async"
            />
        );
    }

    return (
        <img
            alt=""
            src={manualImage || placeholder}
            className={imgClassName}
            loading="lazy"
            decoding="async"
        />
    );
}
