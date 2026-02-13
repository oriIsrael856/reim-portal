import { useCallback, useState } from 'react';
import { saveContent } from '../services/contentService';
import { getNestedValue, setNestedValue } from '../utils/objectHelpers';

/**
 * Centralized draft-management hook for the admin CMS.
 * - Holds a mutable draft copy of the site content
 * - Tracks dirty state and save progress
 * - Exposes simple helpers for nested get/set via dot-notation paths
 */
export function useAdminDraft(initialContent, version) {
  const [draft, setDraft] = useState(initialContent || {});
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const [lastSavedAt, setLastSavedAt] = useState(null);

  const getValue = useCallback(
    (path) => getNestedValue(draft, path),
    [draft]
  );

  const update = useCallback((path, value) => {
    setDraft((prev) => setNestedValue(prev, path, value));
    setHasUnsavedChanges(true);
  }, []);

  const resetFromServer = useCallback((content) => {
    setDraft(content || {});
    setHasUnsavedChanges(false);
    setError(null);
  }, []);

  const save = useCallback(async () => {
    if (!version) return;
    setIsSaving(true);
    setError(null);
    try {
      await saveContent(version, draft);
      setHasUnsavedChanges(false);
      setLastSavedAt(new Date());
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setIsSaving(false);
    }
  }, [draft, version]);

  return {
    draft,
    getValue,
    update,
    save,
    resetFromServer,
    hasUnsavedChanges,
    isSaving,
    error,
    lastSavedAt,
  };
}

