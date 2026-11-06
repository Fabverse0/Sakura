import { useCallback, useRef } from "react";
import { flushSync } from "react-dom";
import { prefersReducedMotion } from "./usePrefersReducedMotion.js";

function supportsTypes() {
  return typeof window !== "undefined" && "types" in (window.ViewTransition?.prototype ?? {});
}

/**
 * Run a React state update inside document.startViewTransition when available.
 * Falls back to an immediate update (no API, reduced motion, or a transition
 * already running). Returns the ViewTransition or null.
 */
export function runViewTransition(update, types = []) {
  if (typeof document === "undefined" || !document.startViewTransition || prefersReducedMotion()) {
    update();
    return null;
  }

  const commit = () => flushSync(update);
  const transition = supportsTypes()
    ? document.startViewTransition({ update: commit, types })
    : document.startViewTransition(commit);

  transition.ready.catch(() => {});
  transition.finished.catch(() => {});
  return transition;
}

export function useViewTransition() {
  const current = useRef(null);

  return useCallback((update, types) => {
    current.current?.skipTransition?.();
    const transition = runViewTransition(update, types);
    current.current = transition;
    transition?.finished.finally(() => {
      if (current.current === transition) current.current = null;
    });
    return transition;
  }, []);
}
