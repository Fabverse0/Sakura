import { useCallback, useEffect, useRef, useState } from "react";
import { Ambience } from "../lib/ambience.js";

/**
 * Opt-in ambience. Sound never starts on its own: the AudioContext is only
 * created inside the visitor's click. Suspends while the tab is hidden and
 * follows night mode (crickets).
 */
export function useAmbience(isNight) {
  const engine = useRef(null);
  const [isOn, setIsOn] = useState(false);
  const [volume, setVolume] = useState(0.6);

  const toggle = useCallback(() => {
    if (!engine.current) engine.current = new Ambience();
    if (isOn) {
      engine.current.stop();
      setIsOn(false);
    } else if (engine.current.start()) {
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
