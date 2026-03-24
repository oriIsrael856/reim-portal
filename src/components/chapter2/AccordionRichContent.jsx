import React from 'react';

/**
 * Renders accordion body text with optional **bold** segments.
 *
 * Figma-style blocks (e.g. "מאפיינים מרכזיים"): a line that is only `**Section title**`
 * starts a section — the list disc sits on that heading; following lines are body copy
 * (leading "- " is stripped). No bullets on body lines.
 *
 * Standalone lines starting with "- " (no such section headings) still render as <ul>/<li>.
 */
function parseBoldSegments(text) {
    if (typeof text !== 'string') return [];
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.filter((p) => p.length > 0).map((part) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return { type: 'bold', value: part.slice(2, -2) };
        }
        return { type: 'text', value: part };
    });
}

/** True when the whole line is only a **…** span (Figma subsection heading). */
function isTitleOnlyLine(line) {
    return /^\s*\*\*[^*]+\*\*\s*$/.test(line);
}

/**
 * Parse DSM-style accordion copy: intro paragraph(s), then repeating
 * title line + body lines (optional "- " prefix on body lines).
 */
function parseFigmaSubsectionList(text) {
    if (typeof text !== 'string') return null;
    const lines = text.split('\n');
    let i = 0;
    const introLines = [];

    while (i < lines.length && !isTitleOnlyLine(lines[i])) {
        introLines.push(lines[i]);
        i += 1;
    }

    if (i >= lines.length) {
        return null;
    }

    const sections = [];

    while (i < lines.length) {
        if (!isTitleOnlyLine(lines[i])) {
            const orphan = lines[i];
            const dash = orphan.match(/^\s*-\s+(.*)$/);
            const row = dash ? dash[1] : orphan;
            if (sections.length > 0) {
                sections[sections.length - 1].bodyLines.push(row);
            } else {
                introLines.push(orphan);
            }
            i += 1;
            continue;
        }
        const titleLine = lines[i].trim();
        i += 1;
        const bodyLines = [];
        while (i < lines.length && !isTitleOnlyLine(lines[i])) {
            let row = lines[i];
            const dash = row.match(/^\s*-\s+(.*)$/);
            if (dash) {
                row = dash[1];
            }
            bodyLines.push(row);
            i += 1;
        }
        sections.push({ titleLine, bodyLines });
    }

    if (sections.length === 0) {
        return null;
    }

    return {
        intro: introLines.join('\n'),
        sections,
    };
}

/** Split copy into alternating prose blocks and bullet lists (lines beginning with "- "). */
function splitTextAndBulletLists(text) {
    if (typeof text !== 'string') return [];
    const lines = text.split('\n');
    const blocks = [];
    let textBuf = [];
    let listBuf = null;

    const flushText = () => {
        if (textBuf.length > 0) {
            blocks.push({ type: 'text', value: textBuf.join('\n') });
            textBuf = [];
        }
    };
    const flushList = () => {
        if (listBuf && listBuf.length > 0) {
            blocks.push({ type: 'list', items: [...listBuf] });
            listBuf = null;
        }
    };

    for (const line of lines) {
        const m = line.match(/^\s*-\s+(.*)$/);
        if (m) {
            flushText();
            if (!listBuf) listBuf = [];
            listBuf.push(m[1]);
        } else {
            flushList();
            textBuf.push(line);
        }
    }
    flushList();
    flushText();
    return blocks;
}

function BoldSegments({ text }) {
    const segments = parseBoldSegments(text);
    return segments.map((seg, i) =>
        seg.type === 'bold' ? (
            <strong key={i} className="font-semibold text-inherit">
                {seg.value}
            </strong>
        ) : (
            <span key={i}>{seg.value}</span>
        )
    );
}

function FigmaSubsectionListView({ intro, sections, className }) {
    return (
        <div className={`rich-accordion-body space-y-3 ${className}`.trim()}>
            {intro.trim() !== '' && (
                <div className="whitespace-pre-line leading-relaxed">
                    <BoldSegments text={intro} />
                </div>
            )}
            <ul className="list-disc list-outside space-y-3 ps-5 marker:text-current/75">
                {sections.map((sec, si) => (
                    <li key={si} className="leading-relaxed">
                        <span className="block text-inherit">
                            <BoldSegments text={sec.titleLine} />
                        </span>
                        {sec.bodyLines.some((l) => l.trim() !== '') && (
                            <div className="mt-1.5 space-y-1.5 font-normal">
                                {sec.bodyLines.map((bl, bi) =>
                                    bl.trim() === '' ? (
                                        <div key={bi} className="h-1" aria-hidden />
                                    ) : (
                                        <p key={bi} className="mb-0 text-inherit leading-relaxed">
                                            <BoldSegments text={bl} />
                                        </p>
                                    )
                                )}
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default function AccordionRichContent({ children: text, className = '' }) {
    if (typeof text !== 'string') return null;

    const figmaSections = parseFigmaSubsectionList(text);
    if (figmaSections) {
        return <FigmaSubsectionListView intro={figmaSections.intro} sections={figmaSections.sections} className={className} />;
    }

    const blocks = splitTextAndBulletLists(text);
    const hasList = blocks.some((b) => b.type === 'list');
    const hasBold = blocks.some((b) => {
        if (b.type === 'list') return b.items.some((item) => /\*\*[^*]+\*\*/.test(item));
        return /\*\*[^*]+\*\*/.test(b.value);
    });

    if (!hasList && !hasBold) {
        return <div className={`whitespace-pre-line ${className}`.trim()}>{text}</div>;
    }

    if (!hasList && hasBold) {
        return (
            <div className={`whitespace-pre-line ${className}`.trim()}>
                <BoldSegments text={text} />
            </div>
        );
    }

    return (
        <div className={`rich-accordion-body space-y-2 ${className}`.trim()}>
            {blocks.map((block, bi) => {
                if (block.type === 'list') {
                    return (
                        <ul
                            key={bi}
                            className="list-disc list-outside space-y-1.5 ps-5 marker:text-current/75"
                        >
                            {block.items.map((item, li) => (
                                <li key={li} className="leading-relaxed text-inherit">
                                    <BoldSegments text={item} />
                                </li>
                            ))}
                        </ul>
                    );
                }
                if (!block.value.trim()) {
                    return null;
                }
                return (
                    <div key={bi} className="whitespace-pre-line leading-relaxed">
                        <BoldSegments text={block.value} />
                    </div>
                );
            })}
        </div>
    );
}
