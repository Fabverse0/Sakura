import { useCallback, useEffect, useRef, useState } from "react";

function readStorage(key, fallback, validate, sanitize) {
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) return { value: fallback, available: true };
    const parsed = JSON.parse(raw);
    if (validate(parsed)) return { value: parsed, available: true };
    return { value: sanitize ? sanitize(parsed) : fallback, available: true };
  } catch {
    return { value: fallback, available: false };
  }
}

/**
 * State persisted to localStorage. Every access is guarded: private mode,
 * quota errors or corrupt JSON fall back to in-memory state, and
 * `isPersistent` tells the UI so it can say so.
 */
export function useLocalStorage(key, fallback, validate = () => true, sanitize) {
  const validateRef = useRef(validate);
  const sanitizeRef = useRef(sanitize);
  const [state, setState] = useState(() =>
    readStorage(key, fallback, validateRef.current, sanitizeRef.current),
  );

  const setValue = useCallback(
    (update) => {
      setState((current) => {
        const value = typeof update === "function" ? update(current.value) : update;
        let available = current.available;
        try {
          window.localStorage.setItem(key, JSON.stringify(value));
          available = true;
        } catch {
          available = false;
        }
        return { value, available };
      });
    },
    [key],
  );

  // Keep tabs in sync.
  useEffect(() => {
    function handleStorage(event) {
      if (event.key !== key) return;
      setState(readStorage(key, fallback, validateRef.current, sanitizeRef.current));
    }
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
    // fallback is intentionally read once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return [state.value, setValue, state.available];
}
