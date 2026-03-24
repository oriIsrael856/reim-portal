import { useState, useEffect, useRef } from 'react';
import { subscribeToContent, getContent, DATA_VERSION } from '../services/contentService';
import { INITIAL_DATA } from '../data';

const CONTENT_SAVED_EVENT = 'reim-content-saved';

export function useFirebaseContent(version = DATA_VERSION) {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const isFirstLoad = useRef(true);

  // שמירה באדמין — ריענון תוכן מ-Firestore כדי שהאתר יציג נתונים עדכניים
  useEffect(() => {
    const handler = async () => {
      const data = await getContent(version);
      if (data) setContent(data);
    };
    window.addEventListener(CONTENT_SAVED_EVENT, handler);
    return () => window.removeEventListener(CONTENT_SAVED_EVENT, handler);
  }, [version]);

  useEffect(() => {
    isFirstLoad.current = true;
    const unsub = subscribeToContent(
      version,
      (data) => {
        setContent(data);
        if (isFirstLoad.current) {
          setLoading(false);
          isFirstLoad.current = false;
        }
      },
      () => {
        setContent(INITIAL_DATA);
        if (isFirstLoad.current) {
          setLoading(false);
          isFirstLoad.current = false;
        }
      }
    );

    // אם Firestore לא עונה (אופליין / איטי / אין מסמך) — אחרי השהייה קצרה מציגים INITIAL_DATA
    const timeout = setTimeout(() => {
      if (isFirstLoad.current) {
        isFirstLoad.current = false;
        setContent((prev) => (prev == null ? INITIAL_DATA : prev));
        setLoading(false);
      }
    }, 8000);

    return () => {
      clearTimeout(timeout);
      unsub();
    };
  }, [version]);

  return { content, loading };
}
