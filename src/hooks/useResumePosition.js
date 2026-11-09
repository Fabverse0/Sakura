import { useEffect } from "react";
import { sections } from "../data/sections.js";
import { resumeKey, resumeTarget } from "../lib/resume.js";
import { useLocalStorage } from "./useLocalStorage.js";

const ids = sections.map((section) => section.id);

/**
 * Remembers which room was in view and offers to jump back on the next visit.
 * Writes are throttled by the section changing, never by the scroll itself.
 */
export function useResumePosition(activeSection) {
  const [saved, setSaved] = useLocalStorage(resumeKey, null);

  useEffect(() => {
    if (activeSection && activeSection !== "panorama") {
      setSaved({ section: activeSection, at: Date.now() });
    }
  }, [activeSection, setSaved]);

  const target = resumeTarget(saved, ids);
  return { target };
}
