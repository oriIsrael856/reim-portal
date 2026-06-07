/** Valid download / preview URL for Chapter 4 procedure files. */
export function isChapter4FileDownloadUrl(url) {
    if (!url || typeof url !== 'string') return false;
    const u = url.trim();
    if (!u || u === '#') return false;
    return u.startsWith('https://') || u.startsWith('http://') || u.startsWith('/');
}

function decodeUrlPath(url) {
    const raw = url.trim().split('#')[0].split('?')[0];
    try {
        return decodeURIComponent(raw).toLowerCase();
    } catch {
        return raw.toLowerCase();
    }
}

/** @returns {'pdf' | 'image' | 'office' | 'remote' | null} */
export function getChapter4FilePreviewKind(url) {
    if (!isChapter4FileDownloadUrl(url)) return null;
    const path = decodeUrlPath(url);
    if (path.endsWith('.pdf') || /\.pdf$/i.test(path)) return 'pdf';
    if (/\.(png|jpe?g|webp|gif|svg)$/i.test(path)) return 'image';
    if (/\.(doc|docx|xls|xlsx)$/i.test(path)) return 'office';
    return 'remote';
}

/** Card embed — Google viewer so many PDFs/docs can render on one page (Chrome limits native PDF iframes). */
export function getChapter4CardEmbedSrc(url) {
    if (!isChapter4FileDownloadUrl(url)) return null;
    const kind = getChapter4FilePreviewKind(url);
    if (kind === 'image') return null;
    return `https://docs.google.com/gview?url=${encodeURIComponent(url.trim())}&embedded=true`;
}

/** Full modal — native PDF when possible; viewer for Office / unknown. */
export function getChapter4ModalEmbedSrc(url) {
    if (!isChapter4FileDownloadUrl(url)) return null;
    const kind = getChapter4FilePreviewKind(url);
    if (kind === 'image') return null;
    if (kind === 'pdf') {
        const base = url.trim();
        const params = 'toolbar=0&navpanes=0&scrollbar=0&view=FitH';
        return base.includes('#') ? `${base}&${params}` : `${base}#${params}`;
    }
    return getChapter4CardEmbedSrc(url);
}

export function canChapter4FilePreview(url) {
    return isChapter4FileDownloadUrl(url) && getChapter4FilePreviewKind(url) !== 'image';
}

export function canChapter4FilePreviewInModal(url) {
    return Boolean(getChapter4ModalEmbedSrc(url) || getChapter4FilePreviewKind(url) === 'image');
}
