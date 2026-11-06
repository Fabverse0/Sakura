import { useEffect, useState } from "react";
import shojiPaper from "../assets/plates/shoji-paper.png";
import { panoramaArt, panoramaArtSrcSet } from "./data/panorama.js";
import { views } from "./data/views.js";
import { HeroComp } from "./sections/HeroComp.jsx";
import { useGuidedRoute } from "./hooks/useGuidedRoute.js";
import { usePrefersReducedMotion } from "./hooks/usePrefersReducedMotion.js";
import { usePauseTimer } from "./hooks/usePauseTimer.js";

export default function App() {
  const [activeView, setActiveView] = useState("overview");
  const route = useGuidedRoute(setActiveView);
  const guidedStepIndex = route.stepIndex;
  const guidedView = route.currentView;
  const isGuidedRouteComplete = route.isComplete;

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

      <section
        className="panorama-details"
        aria-labelledby="details-title"
        style={{ backgroundImage: "url(" + shojiPaper + ")" }}
      >
        <div className="panorama-details__inner">
          <h2 className="panorama-details__title" id="details-title">
            Perhatikan detailnya
          </h2>
          <p className="panorama-details__intro">
            Pilih satu detail untuk kembali ke panorama dengan fokus tersebut.
          </p>

          <div className="detail-grid">
            {views.map((view) => (
              <button
                className="detail-card"
                data-reveal
                key={view.id}
                type="button"
                aria-pressed={activeView === view.id}
                aria-controls="panorama"
                onClick={() => selectView(view.id, true)}
              >
                <span className="detail-card__label">{view.label}</span>
                <span className="detail-card__title">{view.title}</span>
                <span className="detail-card__description">{view.description}</span>
                <span className="detail-card__action">Pilih fokus</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="guided-route" aria-labelledby="guided-route-title">
        <div className="guided-route__inner">
          <div className="guided-route__intro" data-reveal>
            <h2 className="guided-route__title" id="guided-route-title">
              Rute pandang
            </h2>
            <p className="guided-route__description">
              Ikuti tiga fokus panorama secara berurutan, satu perhatian pada satu waktu.
            </p>
          </div>

          <div className="guided-route__panel" data-reveal>
            {guidedStepIndex === null ? (
              <>
                <p className="guided-route__sequence">
                  <span>Cabang</span>
                  <span aria-hidden="true">→</span>
                  <span>Puncak</span>
                  <span aria-hidden="true">→</span>
                  <span>Pagoda</span>
                </p>
                <p className="guided-route__prompt">
                  Mulai dari sisi kiri, lalu ikuti pandangan melintasi panorama.
                </p>
                <button
                  className="guided-route__button guided-route__button--primary"
                  type="button"
                  ref={route.startButtonRef}
                  onClick={route.start}
                >
                  Mulai rute pandang
                </button>
              </>
            ) : isGuidedRouteComplete ? (
              <div className="guided-route__completion">
                <h3
                  className="guided-route__step-title"
                  ref={route.headingRef}
                  tabIndex="-1"
                >
                  Rute selesai
                </h3>
                <p className="guided-route__status" role="status" aria-live="polite">
                  Rute pandang selesai.
                </p>
                <p className="guided-route__prompt">
                  Tiga fokus telah dijelajahi. Kamu bisa melanjutkan dengan jeda 30 detik.
                </p>
                <div className="guided-route__actions">
                  <a
                    className="guided-route__button guided-route__button--primary"
                    href="#pause-experience"
                  >
                    Lanjut ke jeda
                  </a>
                  <button
                    className="guided-route__button guided-route__button--quiet"
                    type="button"
                    onClick={route.start}
                  >
                    Ulangi rute
                  </button>
                </div>
              </div>
            ) : (
              <div
                className="guided-route__step"
                role="group"
                aria-labelledby="guided-route-step-title"
              >
                <img
                  className="guided-route__image"
                  src={panoramaArt}
                  srcSet={panoramaArtSrcSet}
                  sizes="(max-width: 700px) 86vw, 34vw"
                  alt=""
                  aria-hidden="true"
                  draggable="false"
                  loading="lazy"
                  decoding="async"
                  style={{ "--focus-origin": guidedView.origin }}
                />
                <div className="guided-route__step-content">
                  <p className="guided-route__status" role="status" aria-live="polite" aria-atomic="true">
                    Langkah {guidedStepIndex + 1} dari {views.length}: {guidedView.label}
                  </p>
                  <ol className="guided-route__progress" aria-label="Progres rute pandang">
                    {views.map((view, index) => (
                      <li
                        className="guided-route__progress-step"
                        key={view.id}
                        aria-current={index === guidedStepIndex ? "step" : undefined}
                        data-complete={index < guidedStepIndex}
                      >
                        {view.label}
                      </li>
                    ))}
                  </ol>
                  <p className="guided-route__focus">{guidedView.label}</p>
                  <h3
                    className="guided-route__step-title"
                    id="guided-route-step-title"
                    ref={route.headingRef}
                    tabIndex="-1"
                  >
                    {guidedView.title}
                  </h3>
                  <p className="guided-route__prompt">{guidedView.routePrompt}</p>
                  <div className="guided-route__actions">
                    {guidedStepIndex > 0 && (
                      <button
                        className="guided-route__button guided-route__button--quiet"
                        type="button"
                        onClick={route.back}
                      >
                        Sebelumnya
                      </button>
                    )}
                    <button
                      className="guided-route__button guided-route__button--primary"
                      type="button"
                      onClick={route.advance}
                    >
                      {guidedStepIndex === views.length - 1 ? "Selesaikan rute" : "Lanjut"}
                    </button>
                    <button
                      className="guided-route__button guided-route__button--quiet"
                      type="button"
                      onClick={route.end}
                    >
                      Akhiri rute
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

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
