import { useEffect, useState } from "react";

/**
 * Returns the id of the section currently crossing the reading line
 * (a band around 40% of the viewport height). Sections not yet in the DOM
 * are picked up on the next mutation.
 */
export function useActiveSection(ids) {
  const [activeId, setActiveId] = useState(ids[0]);
  const key = ids.join("|");

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length) setActiveId(visible[visible.length - 1].target.id);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );

    const observed = new Set();
    const observeAll = () => {
      for (const id of key.split("|")) {
        const element = document.getElementById(id);
        if (element && !observed.has(element)) {
          observed.add(element);
          observer.observe(element);
        }
      }
    };
    observeAll();
    const mutations = new MutationObserver(observeAll);
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, [key]);

  return activeId;
}
