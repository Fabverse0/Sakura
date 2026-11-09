import { useEffect, useState } from "react";

const key = "sakura:kontras";

/** High-contrast switch on <html data-contrast>. Off by default, remembered per browser. */
export function useContrast() {
  const [high, setHigh] = useState(() => {
    try {
      return window.localStorage.getItem(key) === "high";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    document.documentElement.dataset.contrast = high ? "high" : "normal";
    try {
      window.localStorage.setItem(key, high ? "high" : "normal");
    } catch {
      /* storage blocked: the setting lasts for this visit */
    }
  }, [high]);

  return { high, toggle: () => setHigh((value) => !value) };
}
