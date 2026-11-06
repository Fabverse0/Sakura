import { useSyncExternalStore } from "react";

const query = "(prefers-reduced-motion: reduce)";

function subscribe(callback) {
  if (typeof window === "undefined" || !window.matchMedia) return () => {};
  const media = window.matchMedia(query);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

function getSnapshot() {
  return typeof window !== "undefined" && window.matchMedia
    ? window.matchMedia(query).matches
    : false;
}

/** Live `prefers-reduced-motion: reduce` flag that updates when the OS setting changes. */
export function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

export function prefersReducedMotion() {
  return getSnapshot();
}
