import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { app } from '../firebase';

const storage = getStorage(app);
const IMAGES_PREFIX = 'site_images';

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
