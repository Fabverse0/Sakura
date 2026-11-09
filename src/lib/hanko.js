import { hankoList } from "../data/hanko.js";

export function isHankoList(value) {
  return (
    Array.isArray(value) &&
    value.every((entry) => typeof entry?.id === "string" && typeof entry?.at === "number")
  );
}

/** Keep only stamps that still exist and drop duplicates. */
export function sanitizeHanko(value) {
  if (!Array.isArray(value)) return [];
  const seen = new Set();
  return value.filter((entry) => {
    const ok =
      typeof entry?.id === "string" &&
      typeof entry?.at === "number" &&
      hankoList.some((item) => item.id === entry.id) &&
      !seen.has(entry.id);
    if (ok) seen.add(entry.id);
    return ok;
  });
}

export function hasHanko(earned, id) {
  return earned.some((entry) => entry.id === id);
}

/** Returns the same array when already earned, so callers can detect "new". */
export function earn(earned, id, now = Date.now()) {
  if (hasHanko(earned, id) || !hankoList.some((item) => item.id === id)) return earned;
  return [...earned, { id, at: now }];
}

export function progress(earned) {
  return { count: sanitizeHanko(earned).length, total: hankoList.length };
}
