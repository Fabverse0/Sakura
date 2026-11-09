import { useEffect } from "react";
import { resolveShortcut } from "../lib/shortcuts.js";

/**
 * Global single-key shortcuts. `actions` maps a target name to a handler:
 * a section id jumps there; "__night" and "__help" are special.
 */
export function useShortcuts(actions) {
  useEffect(() => {
    function handleKeyDown(event) {
      const item = resolveShortcut(event);
      if (!item) return;
      event.preventDefault();
      if (item.target.startsWith("__")) actions[item.target]?.();
      else document.getElementById(item.target)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [actions]);
}
