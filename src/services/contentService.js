import { db } from '../firebase';
import { doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore';

const COLLECTION = 'site_content';
export const DATA_VERSION = 'v11';

export function subscribeToContent(version, onData, onMissing) {
  return onSnapshot(
    doc(db, COLLECTION, version),
    (snap) => {
      if (snap.exists()) {
        onData(snap.data());
      } else if (onMissing) {
        onMissing();
      }
    },
    (error) => {
      // Permission denied, network error, or missing document: fall back to local data so the app still loads
      console.warn('[contentService] Firestore read failed, using fallback:', error?.message || error);
      if (onMissing) onMissing();
    }
  );
}

// setDoc with merge: true creates the document if it doesn't exist, so the first save works without "No document to update"
export async function saveContent(version, data) {
  await setDoc(doc(db, COLLECTION, version), data, { merge: true });
}

/** Fetch current document once (e.g. after save so the rest of the app can refresh) */
export async function getContent(version) {
  const snap = await getDoc(doc(db, COLLECTION, version));
  return snap.exists() ? snap.data() : null;
}

export async function resetContent(version, initialData) {
  await setDoc(doc(db, COLLECTION, version), initialData);
}
