import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import {
    getChapter4FilePreviewKind,
    getChapter4ModalEmbedSrc,
    isChapter4FileDownloadUrl,
} from '../../utils/chapter4Files';

/**
 * Full-screen preview for Chapter 4 procedure / form files.
 */
export default function Chapter4FilePreviewModal({ open, url, title, onClose }) {
    useEffect(() => {
        if (!open) return undefined;
        const onKey = (event) => {
            if (event.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', onKey);
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', onKey);
            document.body.style.overflow = prevOverflow;
        };
    }, [open, onClose]);

    if (!open || !isChapter4FileDownloadUrl(url)) return null;

    const kind = getChapter4FilePreviewKind(url);
    const embedSrc = getChapter4ModalEmbedSrc(url);
    const safeTitle = title || 'תצוגה מקדימה';

    return (
        <div
            className="fixed inset-0 z-[2000] flex items-center justify-center bg-[#001d26]/60 p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="ch4-file-preview-title"
            onClick={onClose}
        >
            <div
                dir="rtl"
                className="flex max-h-[min(92vh,900px)] w-full max-w-4xl flex-col overflow-hidden rounded-[16px] border border-[#6546de]/20 bg-white shadow-2xl"
                onClick={(event) => event.stopPropagation()}
            >
                <header className="flex shrink-0 items-center gap-3 border-b border-[#6546de]/10 px-4 py-3">
                    <h3
                        id="ch4-file-preview-title"
                        className="min-w-0 flex-1 text-start font-['Rubik'] text-base font-bold leading-snug text-[#001d26]"
                    >
                        {safeTitle}
                    </h3>
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex size-9 shrink-0 items-center justify-center rounded-full text-[#001d26] transition-colors hover:bg-[#6546de]/10"
                        aria-label="סגירת תצוגה מקדימה"
                    >
                        <X size={20} aria-hidden />
                    </button>
                </header>

                <div className="min-h-0 flex-1 overflow-auto bg-[#f5f3fa] p-4">
                    {embedSrc ? (
                        <iframe
                            title={safeTitle}
                            src={embedSrc}
                            className="h-[min(68vh,720px)] w-full rounded-[12px] border-0 bg-white"
                        />
                    ) : null}
                    {kind === 'image' ? (
                        <img
                            src={url.trim()}
                            alt={safeTitle}
                            className="mx-auto block max-h-[68vh] w-auto max-w-full rounded-[12px]"
                        />
                    ) : null}
                </div>

                <footer className="flex shrink-0 justify-start border-t border-[#6546de]/10 px-4 py-3">
                    <a
                        href={url.trim()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-full border-[1.5px] border-[#6546de] bg-[#6546de] px-5 py-2 font-['Rubik'] text-sm font-bold text-white no-underline transition-colors hover:bg-[#5435c9]"
                    >
                        הורדת הקובץ
                    </a>
                </footer>
            </div>
        </div>
    );
}
