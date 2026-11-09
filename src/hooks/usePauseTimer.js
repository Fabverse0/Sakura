import { useCallback, useEffect, useState } from "react";
import { breathPatterns, defaultPatternId, pauseDurationSeconds } from "../data/pause.js";
import { phaseAt, phaseCopy } from "../lib/breath.js";

/**
 * Drives the breathing pause: countdown, breath phase and status copy.
 * Defaults to 30 s with a soft 4 s in / 6 s out rhythm; the visitor may pick
 * another pattern or a longer duration while no pause is running.
 * Escape ends a running pause (unless a dialog is open).
 */
export function usePauseTimer() {
  const [isRunning, setIsRunning] = useState(false);
  const [duration, setDurationState] = useState(pauseDurationSeconds);
  const [patternId, setPatternId] = useState(defaultPatternId);
  const [secondsRemaining, setSecondsRemaining] = useState(pauseDurationSeconds);
  const pattern = breathPatterns.find((item) => item.id === patternId) ?? breathPatterns[0];

  useEffect(() => {
    if (!isRunning) return undefined;

    const endsAt = Date.now() + duration * 1000;
    const intervalId = window.setInterval(() => {
      const next = Math.max(0, Math.ceil((endsAt - Date.now()) / 1000));
      setSecondsRemaining(next);
      if (next === 0) setIsRunning(false);
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [isRunning, duration]);

  const end = useCallback(() => {
    setIsRunning(false);
    setSecondsRemaining(duration);
  }, [duration]);

  const start = useCallback(() => {
    setSecondsRemaining(duration);
    setIsRunning(true);
  }, [duration]);

  const setDuration = useCallback(
    (seconds) => {
      if (isRunning) return;
      setDurationState(seconds);
      setSecondsRemaining(seconds);
    },
    [isRunning],
  );

  const choosePattern = useCallback(
    (id) => {
      if (!isRunning) setPatternId(id);
    },
    [isRunning],
  );

  useEffect(() => {
    if (!isRunning) return undefined;

    function handleKeyDown(event) {
      // Escape that closes a dialog (e.g. Ruang) should not also end the pause.
      if (event.key !== "Escape" || event.defaultPrevented) return;
      if (document.querySelector("dialog[open]")) return;
      end();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isRunning, end]);

  const elapsed = duration - secondsRemaining;
  const { phase: breathPhase } = phaseAt(pattern, elapsed);
  // The window only has two visual states: opening (inhale) and settling.
  const phase = isRunning ? (breathPhase === "inhale" || breathPhase === "hold-in" ? "inhale" : "exhale") : "rest";
  const status = isRunning
    ? phaseCopy[breathPhase]
    : secondsRemaining === 0
      ? "Jeda selesai. Lanjutkan saat siap."
      : "Pandang panorama, lalu mulai kapan pun kamu siap.";

  return {
    isRunning,
    secondsRemaining,
    duration,
    pattern,
    patternId,
    progress: secondsRemaining / duration,
    phase,
    breathPhase,
    status,
    isComplete: !isRunning && secondsRemaining === 0,
    start,
    end,
    setDuration,
    choosePattern,
  };
}
