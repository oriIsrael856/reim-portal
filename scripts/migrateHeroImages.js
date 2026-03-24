#!/usr/bin/env node
/**
 * One-off Firestore migration: standardize Chapter 2 hero image URLs (image1–image4).
 *
 * Prerequisites:
 *   npm install   (adds firebase-admin as devDependency)
 *
 * Run (dry run — default):
 *   set GOOGLE_APPLICATION_CREDENTIALS=C:\path\to\serviceAccount.json
 *   node scripts/migrateHeroImages.js
 *
 * Apply writes:
 *   Set DRY_RUN = false below, then run again.
 *
 * @see src/services/contentService.js — COLLECTION / DATA_VERSION
 */

import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import admin from 'firebase-admin';

// ---------------------------------------------------------------------------
// CONFIG — adjust placeholders to match your project / environment
// ---------------------------------------------------------------------------

/** When true: log planned changes only; no Firestore writes. */
const DRY_RUN = false;

/**
 * Firestore location of site content (same as client `contentService`).
 * PLACEHOLDER: change if your collection or document ID differs.
 */
const COLLECTION_ID = 'site_content';
const DOCUMENT_ID = 'v11';

/**
 * If true: any value that is not exactly the canonical URL for that slot is replaced.
 * If false: only empty / legacy / obviously-corrupted URLs are replaced (safer for custom CDN art).
 */
const FORCE_REPLACE_ALL_NON_CANONICAL = false;

/**
 * Path to service account JSON.
 * Prefer env: GOOGLE_APPLICATION_CREDENTIALS=/absolute/path/to/key.json
 * PLACEHOLDER: fallback file next to this script (not committed).
 */
const SERVICE_ACCOUNT_JSON_PLACEHOLDER = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  'serviceAccountKey.json'
);

/**
 * Target URLs after migration (must match files under public/assets/chapter2/).
 * image4: add hero-collage-4.png in repo if you use the literal "-4" asset; or change to "-2" to match a 3-image Figma export.
 */
const CANONICAL_HERO_IMAGES = {
  image1: '/assets/chapter2/hero-collage-1.png',
  image2: '/assets/chapter2/hero-collage-2.png',
  image3: '/assets/chapter2/hero-collage-3.png',
  image4: '/assets/chapter2/hero-collage-4.png',
};

const HERO_IMAGE_KEYS = ['image1', 'image2', 'image3', 'image4'];

// ---------------------------------------------------------------------------
// Legacy / corruption detection for one-off migration (see script header).
// ---------------------------------------------------------------------------

const NEW_ASSET_MARKERS = ['hero-collage', '/assets/chapter2/hero-collage'];

const LEGACY_EXACT = new Set([
  '/group.jpg',
  '/game.jpg',
  '/stage.jpg',
  'group.jpg',
  'game.jpg',
  'stage.jpg',
  '/img1.jpg',
  '/img2.jpg',
  '/img3.jpg',
  '/img4.jpg',
  '/img5.jpg',
]);

const LEGACY_BASENAMES = new Set([
  'group.jpg',
  'game.jpg',
  'stage.jpg',
  'img1.jpg',
  'img2.jpg',
  'img3.jpg',
  'img4.jpg',
  'img5.jpg',
]);

/**
 * Extract a logical path for matching Firebase Storage URLs:
 *   https://firebasestorage.googleapis.com/v0/b/<bucket>/o/<encodedPath>?alt=media&token=...
 * The segment after /o/ is URL-encoded; decode to get e.g. "uploads/abc/group.jpg".
 */
function pathForLegacyCheck(url) {
  const trimmed = String(url).trim();
  try {
    const u = new URL(trimmed, 'https://placeholder.local');
    if (trimmed.startsWith('http') && u.hostname.includes('firebasestorage.googleapis.com')) {
      const m = u.pathname.match(/\/o\/(.+)/);
      if (m) {
        return decodeURIComponent(m[1].replace(/\+/g, ' '));
      }
    }
    if (trimmed.startsWith('http')) {
      return u.pathname || '';
    }
  } catch {
    /* relative path */
  }
  return trimmed.replace(/^\/+/, '');
}

/**
 * True if this URL is already the canonical asset for the given hero key.
 */
function isCanonicalForKey(url, key) {
  if (typeof url !== 'string') return false;
  const expected = CANONICAL_HERO_IMAGES[key];
  return url.trim() === expected;
}

/**
 * True if the string looks like a legacy placeholder or broken root path we want to fix.
 * Does NOT return true for arbitrary https URLs unless they resolve to legacy basenames.
 */
function isLegacyOrCorruptedUrl(url) {
  if (url == null) return true;
  if (typeof url !== 'string') return true;
  const trimmed = url.trim();
  if (trimmed === '') return true;

  const lower = trimmed.toLowerCase();
  for (const m of NEW_ASSET_MARKERS) {
    if (lower.includes(m)) return false;
  }

  if (LEGACY_EXACT.has(trimmed) || LEGACY_EXACT.has(lower)) return true;

  const logicalPath = pathForLegacyCheck(trimmed);
  const segments = logicalPath.split(/[/\\]/).filter(Boolean);
  const basename = (segments[segments.length - 1] || '').toLowerCase();
  if (basename && LEGACY_BASENAMES.has(basename)) return true;

  if (/(^|[/\\])(group|game|stage)\.jpe?g(\?|#|$)/i.test(logicalPath)) return true;

  // Root-level image path without /assets/ — e.g. /group.jpg, /photo.png
  if (
    trimmed.startsWith('/') &&
    !trimmed.toLowerCase().includes('/assets/') &&
    /^\/[^/?#]+\.(jpe?g|png|webp|gif)(\?|#|$)/i.test(trimmed)
  ) {
    return true;
  }

  // Non-canonical Firebase Storage object (UUID filenames still count as "non-standard" only when FORCE… is used)
  if (trimmed.startsWith('http') && trimmed.includes('firebasestorage.googleapis.com')) {
    // If it already points under a known "good" path in Storage, skip — we only standardize to /assets/… in this migration
    const p = pathForLegacyCheck(trimmed).toLowerCase();
    if (p.includes('hero-collage')) return false;
    // Storage URL with no hero-collage in path → treat as legacy for migration when you want static hosting paths
    return true;
  }

  return false;
}

/**
 * Whether this field should be written to `target` for this hero key.
 */
function shouldMigrateField(current, key, target) {
  if (isCanonicalForKey(current, key)) return false;

  if (FORCE_REPLACE_ALL_NON_CANONICAL) {
    return String(current ?? '').trim() !== target;
  }

  return isLegacyOrCorruptedUrl(current);
}

// ---------------------------------------------------------------------------
// Firebase Admin bootstrap
// ---------------------------------------------------------------------------

function initFirebaseAdmin() {
  const envPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  const keyPath =
    envPath && existsSync(envPath)
      ? envPath
      : existsSync(SERVICE_ACCOUNT_JSON_PLACEHOLDER)
        ? SERVICE_ACCOUNT_JSON_PLACEHOLDER
        : null;

  if (!keyPath) {
    console.error(
      '[migrateHeroImages] Set GOOGLE_APPLICATION_CREDENTIALS to your service account JSON path,\n' +
        `  or place a key file at: ${SERVICE_ACCOUNT_JSON_PLACEHOLDER}`
    );
    process.exit(1);
  }

  const raw = readFileSync(keyPath, 'utf8');
  const serviceAccount = JSON.parse(raw);

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  return admin.firestore();
}

// ---------------------------------------------------------------------------
// Migration
// ---------------------------------------------------------------------------

async function run() {
  const db = initFirebaseAdmin();
  const docRef = db.collection(COLLECTION_ID).doc(DOCUMENT_ID);

  const snap = await docRef.get();
  if (!snap.exists) {
    console.error(
      `[migrateHeroImages] Document not found: ${COLLECTION_ID}/${DOCUMENT_ID}`
    );
    process.exit(1);
  }

  const data = snap.data();
  const hero = data?.chapter2?.hero;

  if (!hero || typeof hero !== 'object') {
    console.log('[migrateHeroImages] No data.chapter2.hero — nothing to do.');
    process.exit(0);
  }

  /** @type {Record<string, string>} */
  const batchUpdates = {};

  console.log(
    `\n[migrateHeroImages] Target: ${COLLECTION_ID}/${DOCUMENT_ID} | DRY_RUN=${DRY_RUN} | FORCE_ALL=${FORCE_REPLACE_ALL_NON_CANONICAL}\n`
  );

  for (const key of HERO_IMAGE_KEYS) {
    const current = hero[key];
    const target = CANONICAL_HERO_IMAGES[key];

    if (!shouldMigrateField(current, key, target)) {
      continue;
    }

    const fieldPath = `chapter2.hero.${key}`;
    batchUpdates[fieldPath] = target;

    console.log(
      `  [${DOCUMENT_ID}] ${fieldPath}\n    OLD: ${JSON.stringify(current ?? null)}\n    NEW: ${JSON.stringify(target)}`
    );
  }

  const keys = Object.keys(batchUpdates);
  if (keys.length === 0) {
    console.log('\n[migrateHeroImages] No fields need migration.\n');
    process.exit(0);
  }

  if (DRY_RUN) {
    console.log(
      `\n[migrateHeroImages] DRY_RUN: ${keys.length} field(s) would be updated. Set DRY_RUN = false to commit.\n`
    );
    process.exit(0);
  }

  // Firestore batch (atomic; scales to 500 ops — we use ≤4)
  const batch = db.batch();
  batch.update(docRef, batchUpdates);
  await batch.commit();

  console.log(
    `\n[migrateHeroImages] Committed batch update (${keys.length} fields).\n`
  );
  process.exit(0);
}

run().catch((err) => {
  console.error('[migrateHeroImages] Failed:', err);
  process.exit(1);
});
