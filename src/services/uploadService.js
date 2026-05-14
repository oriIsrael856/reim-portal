import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { app } from '../firebase';

const storage = getStorage(app);
const IMAGES_PREFIX = 'site_images';
const DOCUMENTS_PREFIX = 'site_documents';

/** Max upload size for CMS documents (bytes). */
export const MAX_DOCUMENT_UPLOAD_BYTES = 25 * 1024 * 1024;

const ALLOWED_DOCUMENT_MIME_TYPES = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
]);

function isAllowedDocumentFile(file) {
  if (!file) return false;
  const type = (file.type || '').toLowerCase().trim();
  if (type && ALLOWED_DOCUMENT_MIME_TYPES.has(type)) return true;
  const name = (file.name || '').toLowerCase();
  return /\.(pdf|doc|docx|xls|xlsx)$/.test(name);
}

function runResumableUpload(task, onProgress) {
  return new Promise((resolve, reject) => {
    task.on(
      'state_changed',
      (snapshot) => {
        if (onProgress && snapshot.totalBytes > 0) {
          const pct = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          onProgress(pct);
        }
      },
      (err) => reject(err),
      async () => {
        try {
          const url = await getDownloadURL(task.snapshot.ref);
          resolve(url);
        } catch (err) {
          reject(err);
        }
      }
    );
  });
}

/**
 * Uploads an image file to Firebase Storage and returns the public download URL.
 * Path: site_images/{timestamp}_{sanitizedName}
 *
 * @param {File} file - The image file to upload.
 * @param {(progress: number) => void} [onProgress] - Optional callback called with
 *   a 0–100 progress value as the upload proceeds.
 * @returns {Promise<string>} Resolves with the public download URL on success.
 */
export function uploadImageFile(file, onProgress) {
  if (!file || !file.type.startsWith('image/')) {
    return Promise.reject(new Error('יש לבחור קובץ תמונה'));
  }
  const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
  const path = `${IMAGES_PREFIX}/${Date.now()}_${safeName}`;
  const storageRef = ref(storage, path);
  const task = uploadBytesResumable(storageRef, file);
  return runResumableUpload(task, onProgress);
}

/**
 * Uploads a document (PDF / Office) to Firebase Storage for download links.
 * Path: site_documents/{timestamp}_{sanitizedName}
 *
 * @param {File} file
 * @param {(progress: number) => void} [onProgress]
 * @returns {Promise<string>}
 */
export function uploadSiteDocumentFile(file, onProgress) {
  if (!file) {
    return Promise.reject(new Error('לא נבחר קובץ'));
  }
  if (file.size > MAX_DOCUMENT_UPLOAD_BYTES) {
    return Promise.reject(
      new Error('הקובץ גדול מדי (מקסימום 25 מ״ב)')
    );
  }
  if (!isAllowedDocumentFile(file)) {
    return Promise.reject(
      new Error('סוג קובץ לא נתמך (PDF, Word, Excel בלבד)')
    );
  }
  const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
  const path = `${DOCUMENTS_PREFIX}/${Date.now()}_${safeName}`;
  const storageRef = ref(storage, path);
  const task = uploadBytesResumable(storageRef, file);
  return runResumableUpload(task, onProgress);
}
