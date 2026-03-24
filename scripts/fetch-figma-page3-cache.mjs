/**
 * One-shot Figma → docs/figma-cache-page3.json
 * Avoids repeated MCP/API calls during implementation: run once, commit JSON.
 *
 * Requires env (never commit secrets):
 *   FIGMA_API_KEY or FIGMA_TOKEN — Personal Access Token (X-Figma-Token)
 *
 * Usage (PowerShell):
 *   $env:FIGMA_API_KEY="figd_..."
 *   npm run figma:cache-page3
 *
 * Target: node 253:6705. Default file key matches current design copy:
 *   pCQsVHvp5kYNlIvoXTlqqf
 * Override: $env:FIGMA_FILE_KEY="C2NkiNoHtXbBcYwBG3u0Ad"
 * @see https://www.figma.com/design/pCQsVHvp5kYNlIvoXTlqqf/...?node-id=253-6705
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'docs', 'figma-cache-page3.json');

const FILE_KEY =
    process.env.FIGMA_FILE_KEY || 'pCQsVHvp5kYNlIvoXTlqqf';
const NODE_IDS = '253:6705';

const token = process.env.FIGMA_API_KEY || process.env.FIGMA_TOKEN || '';

function rgbaToHex(r, g, b, a = 1) {
    const R = Math.round(r * 255);
    const G = Math.round(g * 255);
    const B = Math.round(b * 255);
    if (a >= 1) return `#${[R, G, B].map((x) => x.toString(16).padStart(2, '0')).join('')}`;
    return `rgba(${R},${G},${B},${a})`;
}

function mapFill(fill) {
    if (!fill || fill.visible === false) return null;
    if (fill.type === 'SOLID' && fill.color) {
        const { r, g, b } = fill.color;
        const a = fill.opacity ?? fill.color.a ?? 1;
        return { type: 'SOLID', hexOrRgba: rgbaToHex(r, g, b, a), raw: fill.color };
    }
    return { type: fill.type, raw: fill };
}

function mapStroke(stroke) {
    if (!stroke || stroke.visible === false) return null;
    const out = { type: stroke.type, strokeWeight: stroke.strokeWeight };
    if (stroke.color) {
        const { r, g, b } = stroke.color;
        const a = stroke.opacity ?? stroke.color.a ?? 1;
        out.color = rgbaToHex(r, g, b, a);
    }
    return out;
}

function mapEffects(effects) {
    if (!effects?.length) return [];
    return effects
        .filter((e) => e.visible !== false)
        .map((e) => ({
            type: e.type,
            radius: e.radius,
            color: e.color ? rgbaToHex(e.color.r, e.color.g, e.color.b, e.color.a ?? e.opacity ?? 1) : undefined,
            offset: e.offset,
            spread: e.spread,
        }));
}

function extractNode(node, depth = 0, maxDepth = 12) {
    if (!node || depth > maxDepth) return null;

    const base = {
        figmaNodeId: node.id,
        name: node.name,
        type: node.type,
        visible: node.visible !== false,
    };

    if (node.absoluteBoundingBox) {
        base.absoluteBoundingBox = {
            x: node.absoluteBoundingBox.x,
            y: node.absoluteBoundingBox.y,
            width: node.absoluteBoundingBox.width,
            height: node.absoluteBoundingBox.height,
        };
    }

    if (node.layoutMode && node.layoutMode !== 'NONE') {
        base.autoLayout = {
            layoutMode: node.layoutMode,
            primaryAxisSizingMode: node.primaryAxisSizingMode,
            counterAxisSizingMode: node.counterAxisSizingMode,
            paddingLeft: node.paddingLeft,
            paddingRight: node.paddingRight,
            paddingTop: node.paddingTop,
            paddingBottom: node.paddingBottom,
            itemSpacing: node.itemSpacing,
            primaryAxisAlignItems: node.primaryAxisAlignItems,
            counterAxisAlignItems: node.counterAxisAlignItems,
            layoutWrap: node.layoutWrap,
        };
    }

    if (node.cornerRadius !== undefined) base.cornerRadius = node.cornerRadius;
    if (node.fills?.length) base.fills = node.fills.map(mapFill).filter(Boolean);
    if (node.strokes?.length) base.strokes = node.strokes.map(mapStroke).filter(Boolean);
    if (node.effects?.length) base.effects = mapEffects(node.effects);

    if (node.type === 'TEXT') {
        base.characters = node.characters ?? '';
        if (node.style) {
            base.typography = {
                fontFamily: node.style.fontFamily,
                fontPostScriptName: node.style.fontPostScriptName,
                fontWeight: node.style.fontWeight,
                fontSize: node.style.fontSize,
                lineHeightPx: node.style.lineHeightPx,
                lineHeightPercent: node.style.lineHeightPercent,
                letterSpacing: node.style.letterSpacing,
                textAlignHorizontal: node.style.textAlignHorizontal,
                textAlignVertical: node.style.textAlignVertical,
                textCase: node.style.textCase,
            };
        }
    }

    if (node.children?.length) {
        base.children = node.children.map((c) => extractNode(c, depth + 1, maxDepth)).filter(Boolean);
    }

    return base;
}

async function main() {
    if (!token) {
        console.error(
            'Missing FIGMA_API_KEY or FIGMA_TOKEN. Set in shell, then: npm run figma:cache-page3\n' +
                'Do not commit tokens. Use the same token as in Cursor MCP (Figma PAT).',
        );
        process.exit(1);
    }

    const url = `https://api.figma.com/v1/files/${FILE_KEY}/nodes?ids=${encodeURIComponent(NODE_IDS.replace('-', ':'))}`;
    const res = await fetch(url, {
        headers: { 'X-Figma-Token': token },
    });

    if (res.status === 429) {
        console.error('Figma API rate limited (429). Retry later or reduce calls.');
        process.exit(2);
    }

    if (!res.ok) {
        const t = await res.text();
        console.error(`Figma API ${res.status}:`, t.slice(0, 500));
        process.exit(3);
    }

    const json = await res.json();
    const key = NODE_IDS.replace('-', ':');
    const entry = json.nodes?.[key];
    if (!entry?.document) {
        console.error('No document for node', key, Object.keys(json.nodes || {}));
        process.exit(4);
    }

    const tree = extractNode(entry.document);
    const now = new Date().toISOString();

    const cache = {
        _meta: {
            title: 'Figma design cache — Page 3 (פרק 3)',
            figmaFileUrlPrimary: `https://www.figma.com/design/${FILE_KEY}/?node-id=${NODE_IDS}`,
            fileKeyPrimary: FILE_KEY,
            rootNodeId: key,
            rootNodeIdUrlForm: NODE_IDS,
            extractedAt: now,
            extractionStatus: 'api_nodes_dump',
            extractionNote:
                'Generated by scripts/fetch-figma-page3-cache.mjs from Figma GET /v1/files/{key}/nodes. Refine sections.* manually if you need semantic grouping; tree is structural truth.',
            doNotHallucinate:
                'Text in tree.characters comes from Figma. For CMS, align with content.chapter3 / src/data.js.',
        },
        _rtl: {
            layoutDirection: 'rtl',
            documentDir: 'rtl',
            noteHebrew:
                'הפרויקט בעברית — סידור RTL: משמאל לימין כמו שכותבים בעברית. סדר ילדים ב-DOM לפי כללי הפרויקט (ללא order/row-reverse כברירת מחדל).',
            figmaAuthoringNote: 'אם המסגרת ב-Figma ב-LTR, למפות במפורש ל-RTL ב-React.',
        },
        tree,
        typography: {
            _comment: 'Aggregate unique TEXT styles from tree (optional pass); source of truth is tree leaves.',
            collectedStyles: collectTextStyles(tree),
        },
        colors: {
            _comment: 'Sampled from fills/strokes in tree',
            sampled: collectColors(tree),
        },
        layout: {
            pageFrame: tree?.absoluteBoundingBox ?? null,
            structuralContainers: listFrames(tree),
        },
        assets: {
            _comment: 'IMAGE fills reference imageRef — export via Figma / separate API',
            imageRefs: collectImageRefs(tree),
            icons: [],
        },
        sections: {
            _comment: 'Map Figma frame names to these keys manually after review',
            rootSummary: {
                name: tree?.name,
                childNames: tree?.children?.map((c) => c.name) ?? [],
            },
        },
        mappingToCodebase: {
            reactEntry: 'src/pages/Chapter3.jsx',
            cmsShape: 'content.chapter3',
            adminEditor: 'src/components/admin/sections/Chapter3Section.jsx',
        },
    };

    fs.mkdirSync(path.dirname(OUT), { recursive: true });
    fs.writeFileSync(OUT, `${JSON.stringify(cache, null, 2)}\n`, 'utf8');
    console.log('Wrote', path.relative(ROOT, OUT));
}

function walk(n, fn) {
    if (!n) return;
    fn(n);
    (n.children || []).forEach((c) => walk(c, fn));
}

function collectTextStyles(tree) {
    const map = new Map();
    walk(tree, (n) => {
        if (n.type !== 'TEXT' || !n.typography) return;
        const k = JSON.stringify(n.typography);
        if (!map.has(k)) map.set(k, { typography: n.typography, sampleText: (n.characters || '').slice(0, 80) });
    });
    return [...map.values()];
}

function collectColors(tree) {
    const set = new Set();
    walk(tree, (n) => {
        (n.fills || []).forEach((f) => {
            if (f?.hexOrRgba) set.add(f.hexOrRgba);
        });
        (n.strokes || []).forEach((s) => {
            if (s?.color) set.add(s.color);
        });
    });
    return [...set].sort();
}

function listFrames(tree) {
    const out = [];
    walk(tree, (n) => {
        if (n.type === 'FRAME' || n.type === 'COMPONENT' || n.type === 'INSTANCE') {
            out.push({
                id: n.figmaNodeId,
                name: n.name,
                box: n.absoluteBoundingBox,
                autoLayout: n.autoLayout ?? null,
            });
        }
    });
    return out;
}

function collectImageRefs(tree) {
    const refs = [];
    walk(tree, (n) => {
        (n.fills || []).forEach((f) => {
            if (f?.raw?.type === 'IMAGE' && f.raw.imageRef) refs.push({ nodeId: n.figmaNodeId, imageRef: f.raw.imageRef });
        });
    });
    return refs;
}

main().catch((e) => {
    console.error(e);
    process.exit(99);
});
