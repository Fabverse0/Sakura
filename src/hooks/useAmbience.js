import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Opt-in ambience. Sound never starts on its own: the AudioContext is only
 * created inside the visitor's click. Suspends while the tab is hidden and
 * follows night mode (crickets).
 */
export function useAmbience(isNight) {
  const engine = useRef(null);
  const [isOn, setIsOn] = useState(false);
  const [volume, setVolume] = useState(0.6);

  const toggle = useCallback(async () => {
    if (isOn) {
      engine.current?.stop();
      setIsOn(false);
      return;
    }
    // The engine is only downloaded when the visitor asks for sound. The
    // AudioContext is created right after, still inside the click's task chain.
    if (!engine.current) {
      const { Ambience } = await import("../lib/ambience.js");
      engine.current = new Ambience();
    }
    if (engine.current.start()) {
      engine.current.setNight(isNight);
      setIsOn(true);
    }
  }, [isOn, isNight]);

  useEffect(() => {
    if (isOn) engine.current?.setNight(isNight);
  }, [isNight, isOn]);

  useEffect(() => {
    engine.current?.setVolume(volume);
  }, [volume]);

  useEffect(() => {
    if (!isOn) return undefined;
    function handleVisibility() {
      if (document.visibilityState === "hidden") engine.current?.suspend();
      else engine.current?.resume();
    }
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [isOn]);

  useEffect(() => () => engine.current?.dispose(), []);

  return { isOn, toggle, volume, setVolume };
}
