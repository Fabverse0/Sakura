import { useCallback, useEffect, useState } from "react";
import {
  breathCycleSeconds,
  inhaleSeconds,
  pauseDurationSeconds,
} from "../data/pause.js";

/**
 * Drives the 30-second breathing pause: countdown, breath phase and status copy.
 * Escape ends a running pause.
 */
export function usePauseTimer() {
  const [isRunning, setIsRunning] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(pauseDurationSeconds);

  useEffect(() => {
    if (!isRunning) return undefined;

    const endsAt = Date.now() + pauseDurationSeconds * 1000;
    const intervalId = window.setInterval(() => {
      const next = Math.max(0, Math.ceil((endsAt - Date.now()) / 1000));
      setSecondsRemaining(next);
      if (next === 0) setIsRunning(false);
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [isRunning]);

  const end = useCallback(() => {
    setIsRunning(false);
    setSecondsRemaining(pauseDurationSeconds);
  }, []);

  const start = useCallback(() => {
    setSecondsRemaining(pauseDurationSeconds);
    setIsRunning(true);
  }, []);

  useEffect(() => {
    if (!isRunning) return undefined;

    function handleKeyDown(event) {
      if (event.key === "Escape") end();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isRunning, end]);

  const elapsed = pauseDurationSeconds - secondsRemaining;
  const isInhale = elapsed % breathCycleSeconds < inhaleSeconds;
  const phase = isRunning ? (isInhale ? "inhale" : "exhale") : "rest";
  const status = isRunning
    ? isInhale
      ? "Tarik napas pelan."
      : "Hembuskan perlahan."
    : secondsRemaining === 0
      ? "Jeda selesai. Lanjutkan saat siap."
      : "Pandang panorama, lalu mulai kapan pun kamu siap.";

  return {
    isRunning,
    secondsRemaining,
    progress: secondsRemaining / pauseDurationSeconds,
    phase,
    status,
    isComplete: !isRunning && secondsRemaining === 0,
    start,
    end,
  };
}
