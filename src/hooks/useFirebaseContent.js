import { useState, useEffect, useRef } from 'react';
import { subscribeToContent, getContent, DATA_VERSION } from '../services/contentService';
import { INITIAL_DATA } from '../data';

const CONTENT_SAVED_EVENT = 'reim-content-saved';

export function useFirebaseContent(version = DATA_VERSION) {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const isFirstLoad = useRef(true);

  // When admin saves, refresh content from Firestore so the site (e.g. homepage) shows the new data
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

    // If Firestore never responds (offline, slow, or no doc), show app with local data after a short delay
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
