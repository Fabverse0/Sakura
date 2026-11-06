import { useCallback, useEffect, useRef, useState } from "react";
import { views } from "../data/views.js";

/**
 * Self-paced route through the three panorama views.
 * stepIndex: null = not started, 0..n-1 = step, n = complete.
 * Moves keyboard focus to the step heading (or back to the start button).
 */
export function useGuidedRoute(onSelectView) {
  const [stepIndex, setStepIndex] = useState(null);
  const focusTarget = useRef(null);
  const headingRef = useRef(null);
  const startButtonRef = useRef(null);

  useEffect(() => {
    if (focusTarget.current === "start") {
      startButtonRef.current?.focus();
    } else if (focusTarget.current === "heading") {
      headingRef.current?.focus();
    }
    focusTarget.current = null;
  }, [stepIndex]);

  const goTo = useCallback(
    (index) => {
      focusTarget.current = "heading";
      setStepIndex(index);
      if (index < views.length) onSelectView(views[index].id);
    },
    [onSelectView],
  );

  const start = useCallback(() => goTo(0), [goTo]);

  const advance = useCallback(() => {
    setStepIndex((current) => {
      const next = current === null ? 0 : current + 1;
      focusTarget.current = "heading";
      if (next < views.length) onSelectView(views[next].id);
      return Math.min(next, views.length);
    });
  }, [onSelectView]);

  const back = useCallback(() => {
    setStepIndex((current) => {
      const prev = Math.max(0, (current ?? 0) - 1);
      focusTarget.current = "heading";
      onSelectView(views[prev].id);
      return prev;
    });
  }, [onSelectView]);

  const end = useCallback(() => {
    focusTarget.current = "start";
    setStepIndex(null);
  }, []);

  const reset = useCallback(() => setStepIndex(null), []);

  return {
    stepIndex,
    isComplete: stepIndex === views.length,
    currentView: stepIndex === null ? undefined : views[stepIndex],
    headingRef,
    startButtonRef,
    start,
    advance,
    back,
    end,
    reset,
  };
}
