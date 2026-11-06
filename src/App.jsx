import { useEffect, useState } from "react";
import { PanoramaDetails } from "./sections/PanoramaDetails.jsx";
import { GuidedRoute } from "./sections/GuidedRoute.jsx";
import { PauseExperience } from "./sections/PauseExperience.jsx";
import { HeroComp } from "./sections/HeroComp.jsx";
import { useGuidedRoute } from "./hooks/useGuidedRoute.js";
import { usePrefersReducedMotion } from "./hooks/usePrefersReducedMotion.js";
import { usePauseTimer } from "./hooks/usePauseTimer.js";

export default function App() {
  const [activeView, setActiveView] = useState("overview");
  const route = useGuidedRoute(setActiveView);

  function selectView(viewId, returnToPanorama = false) {
    setActiveView(viewId);
    route.reset();

    if (returnToPanorama) {
      document.getElementById("panorama")?.scrollIntoView({ block: "start" });
    }
  }

  const pause = usePauseTimer();
  const reducedMotion = usePrefersReducedMotion();
  useEffect(() => {
    if (reducedMotion || !("IntersectionObserver" in window)) {
      return undefined;
    }

    const root = document.documentElement;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-revealed", "");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );

    document.querySelectorAll("[data-reveal]").forEach((element) => {
      observer.observe(element);
    });
    root.classList.add("reveal-ready");

    return () => {
      observer.disconnect();
      root.classList.remove("reveal-ready");
    };
  }, [reducedMotion]);

  return (
    <>
      <a className="skip-link" href="#top">
        Lewati ke konten utama
      </a>
      <HeroComp activeView={activeView} onSelectView={selectView} />

      <PanoramaDetails activeView={activeView} onSelectView={selectView} />

      <GuidedRoute route={route} />

      <PauseExperience pause={pause} />
    </>
  );
}
