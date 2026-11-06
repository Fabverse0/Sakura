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
    const next = stepIndex === null ? 0 : stepIndex + 1;
    if (next >= views.length) {
      focusTarget.current = "heading";
      setStepIndex(views.length);
      return;
    }
    goTo(next);
  }, [stepIndex, goTo]);

  const back = useCallback(() => {
    goTo(Math.max(0, (stepIndex ?? 0) - 1));
  }, [stepIndex, goTo]);

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
