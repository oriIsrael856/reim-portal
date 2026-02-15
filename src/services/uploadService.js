import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from '../firebase';

const storage = getStorage(app);

const IMAGES_PREFIX = 'site_images';

/**
 * Uploads an image file to Firebase Storage and returns the public URL.
 * Path: site_images/{timestamp}_{originalName}
 */
export async function uploadImageFile(file) {
  if (!file || !file.type.startsWith('image/')) {
    throw new Error('יש לבחור קובץ תמונה');
  }
  const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
  const path = `${IMAGES_PREFIX}/${Date.now()}_${safeName}`;
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
}
