import { useCallback, useEffect, useRef, useState } from "react";

function createContext() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  return AudioContext ? new AudioContext() : null;
}

/**
 * Opt-in ambience. Sound never starts on its own: the AudioContext is created
 * and resumed synchronously inside the visitor's click (autoplay policy), and
 * the engine code is downloaded only then. Suspends while the tab is hidden
 * and follows night mode (crickets).
 */
export function useAmbience(isNight) {
  const engine = useRef(null);
  const context = useRef(null);
  const loading = useRef(null);
  const disposed = useRef(false);
  const [isOn, setIsOn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [volume, setVolume] = useState(0.6);

  const toggle = useCallback(() => {
    if (loading.current) return; // ignore clicks while the engine downloads

    if (isOn) {
      engine.current?.stop();
      setIsOn(false);
      return;
    }

    if (engine.current) {
      if (engine.current.start()) {
        engine.current.setNight(isNight);
        setIsOn(true);
      }
      return;
    }

    // First time: make and resume the context inside the click itself.
    context.current ??= createContext();
    if (!context.current) return;
    context.current.resume();
    setIsLoading(true);

    loading.current = import("../lib/ambience.js")
      .then(({ Ambience }) => {
        if (disposed.current) return;
        engine.current = new Ambience();
        engine.current.setVolume(volume);
        engine.current.start(context.current);
        engine.current.setNight(isNight);
        setIsOn(context.current.state !== "closed");
      })
      .catch(() => {
        setIsOn(false);
      })
      .finally(() => {
        loading.current = null;
        setIsLoading(false);
      });
  }, [isOn, isNight, volume]);

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

  useEffect(() => {
    disposed.current = false;
    return () => {
      disposed.current = true;
      engine.current?.dispose();
      engine.current = null;
      if (context.current && context.current.state !== "closed") context.current.close();
      context.current = null;
    };
  }, []);

  return { isOn, isLoading, toggle, volume, setVolume };
}
