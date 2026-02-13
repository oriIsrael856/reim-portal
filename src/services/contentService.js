import { db } from '../firebase';
import { doc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';

const COLLECTION = 'site_content';
export const DATA_VERSION = 'v11';

export function subscribeToContent(version, onData, onMissing) {
  return onSnapshot(doc(db, COLLECTION, version), (snap) => {
    if (snap.exists()) {
      onData(snap.data());
    } else if (onMissing) {
      onMissing();
    }
  });
}

export async function saveContent(version, data) {
  await updateDoc(doc(db, COLLECTION, version), data);
}

export async function resetContent(version, initialData) {
  await setDoc(doc(db, COLLECTION, version), initialData);
}
