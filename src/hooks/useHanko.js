import { useCallback, useRef } from "react";
import { useToast } from "../components/Toast.jsx";
import { hankoById, hankoStorageKey } from "../data/hanko.js";
import { earn, isHankoList, sanitizeHanko } from "../lib/hanko.js";
import { useLocalStorage } from "./useLocalStorage.js";

/**
 * Collection of earned stamps. `award(id)` is safe to call repeatedly: only
 * the first call stamps and announces it.
 */
export function useHanko() {
  const [earned, setEarned] = useLocalStorage(hankoStorageKey, [], isHankoList, sanitizeHanko);
  const { show } = useToast();
  const known = useRef(new Set());
  known.current = new Set(earned.map((entry) => entry.id));

  const award = useCallback(
    (id) => {
      if (known.current.has(id)) return;
      known.current.add(id);
      setEarned((current) => earn(current, id));
      const item = hankoById(id);
      if (item) show(`Cap baru: ${item.name} ${item.glyph}`, { duration: 4200 });
    },
    [setEarned, show],
  );

  return { earned, award };
}
