import { useEffect, useState } from "react";
import shojiPaper from "../assets/plates/shoji-paper.png";
import { panoramaArt, panoramaArtSrcSet } from "./data/panorama.js";
import { views } from "./data/views.js";
import { PanoramaDetails } from "./sections/PanoramaDetails.jsx";
import { GuidedRoute } from "./sections/GuidedRoute.jsx";
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

      <section
        className="pause-experience"
        id="pause-experience"
        aria-labelledby="pause-title"
      >
        <div className="pause-experience__inner">
          <div className="pause-experience__copy" data-reveal>
            <h2 className="pause-experience__title" id="pause-title">
              Jeda 30 detik
            </h2>
            <p className="pause-experience__description">
              Tarik napas selama empat detik, lalu hembuskan selama enam detik.
              Ulangi tiga kali, atau cukup memandang panorama.
            </p>
            <p
              className="pause-experience__status"
              id="pause-status"
              role="status"
              aria-live="polite"
              aria-atomic="true"
            >
              {pause.status}
            </p>
          </div>

          <div className="pause-experience__practice" data-reveal>
            <div
              className="pause-experience__window"
              data-running={pause.isRunning}
              data-phase={pause.phase}
              aria-hidden="true"
            >
              <span
                className="pause-experience__pane"
                style={{ backgroundImage: "url(" + shojiPaper + ")" }}
              />
            </div>
            <time
              className="pause-experience__timer"
              dateTime={`PT${pause.secondsRemaining}S`}
              aria-label={`${pause.secondsRemaining} detik tersisa`}
            >
              00:{String(pause.secondsRemaining).padStart(2, "0")}
            </time>
            <div className="pause-experience__progress" aria-hidden="true">
              <span
                style={{
                  transform: `scaleX(${pause.progress})`,
                }}
              />
            </div>
            {pause.isRunning ? (
              <button
                className="pause-experience__button"
                type="button"
                aria-controls="pause-status"
                onClick={pause.end}
              >
                Akhiri jeda
              </button>
            ) : (
              <button
                className="pause-experience__button"
                type="button"
                aria-controls="pause-status"
                onClick={pause.start}
              >
                {pause.secondsRemaining === 0
                  ? "Ulangi jeda"
                  : "Mulai jeda 30 detik"}
              </button>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
