import { useEffect, useState } from "react";

/**
 * True while the element is (near) the viewport AND the tab is visible.
 * Used to pause loops (particles, ambient motion) when nobody can see them.
 */
export function useInView(ref, { rootMargin = "120px", threshold = 0 } = {}) {
  const [isIntersecting, setIsIntersecting] = useState(true);
  const [isPageVisible, setIsPageVisible] = useState(
    typeof document === "undefined" ? true : document.visibilityState !== "hidden",
  );

  useEffect(() => {
    const element = ref.current;
    if (!element || !("IntersectionObserver" in window)) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      { rootMargin, threshold },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, rootMargin, threshold]);

  useEffect(() => {
    function handleVisibility() {
      setIsPageVisible(document.visibilityState !== "hidden");
    }
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  return isIntersecting && isPageVisible;
}
