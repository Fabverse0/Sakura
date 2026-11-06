import { panoramaArt, panoramaArtSrcSet } from "../data/panorama.js";
import { views } from "../data/views.js";

export function GuidedRoute({ route }) {
  const guidedStepIndex = route.stepIndex;
  const guidedView = route.currentView;
  const isGuidedRouteComplete = route.isComplete;

  return (
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
  );
}
