import { useState, useEffect, useRef } from 'react';
import { subscribeToContent, DATA_VERSION } from '../services/contentService';
import { INITIAL_DATA } from '../data';

export function useFirebaseContent(version = DATA_VERSION) {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const isFirstLoad = useRef(true);

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

    return unsub;
  }, [version]);

  return { content, loading };
}
