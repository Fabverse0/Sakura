import { useCallback, useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { prefersReducedMotion } from "./usePrefersReducedMotion.js";

const storageKey = "sakura:mode";

function initialMode() {
  try {
    const stored = window.localStorage.getItem(storageKey);
    if (stored === "day" || stored === "night") return stored;
  } catch {
    /* storage blocked */
  }
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "night" : "day";
}

/**
 * Day / night mode on <html data-mode>. Switching runs a circular wipe from
 * the control that was pressed (view transition), or applies instantly.
 */
export function useNightMode() {
  const [mode, setMode] = useState(initialMode);

  useEffect(() => {
    document.documentElement.dataset.mode = mode;
    try {
      window.localStorage.setItem(storageKey, mode);
    } catch {
      /* storage blocked: mode simply resets next visit */
    }
  }, [mode]);

  const toggle = useCallback(
    (origin) => {
      const current = document.documentElement.dataset.mode === "night" ? "night" : "day";
      const next = current === "night" ? "day" : "night";
      const apply = () => {
        document.documentElement.dataset.mode = next;
        // flush so the wipe's new snapshot already shows the new label and icon
        flushSync(() => setMode(next));
      };

      const canWipe =
        document.startViewTransition &&
        !prefersReducedMotion() &&
        "types" in (window.ViewTransition?.prototype ?? {});
      if (!canWipe) {
        apply();
        return;
      }

      const x = origin?.x ?? window.innerWidth - 80;
      const y = origin?.y ?? 30;
      const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
      const transition = document.startViewTransition({ update: apply, types: ["mode"] });
      transition.ready
        .then(() => {
          document.documentElement.animate(
            { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
            {
              duration: 1000,
              easing: "cubic-bezier(0.65, 0, 0.35, 1)",
              pseudoElement: "::view-transition-new(root)",
            },
          );
        })
        .catch(() => {});
    },
    [],
  );

  return { mode, isNight: mode === "night", toggle };
}
