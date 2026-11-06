import shojiPaper from "../../assets/plates/shoji-paper.png";
import { Icon } from "../components/Icon.jsx";
import { panoramaAt } from "../data/panorama.js";

/**
 * Jeda 30 detik: three breaths with the painting dimmed behind a shoji window.
 * The window brightens and opens on the inhale (4 s) and settles on the
 * exhale (6 s), like light through paper.
 */
export function PauseExperience({ pause }) {
  return (
    <section
      className="room room--sumi pause-experience"
      id="pause-experience"
      aria-labelledby="pause-title"
      data-running={pause.isRunning}
    >
      <span
        className="pause-experience__scene"
        aria-hidden="true"
        style={{ backgroundImage: `url(${panoramaAt(1920)})` }}
      />

      <div className="room__inner pause-experience__inner">
        <div className="pause-experience__copy">
          <h2 className="room__title pause-experience__title" id="pause-title">
            Jeda 30 detik
          </h2>
          <p className="room__lead pause-experience__description">
            Tarik napas selama empat detik, lalu hembuskan selama enam detik. Ulangi tiga kali,
            atau cukup memandang panorama.
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

        <div className="pause-experience__practice">
          <div
            className="pause-experience__window"
            data-running={pause.isRunning}
            data-phase={pause.phase}
            aria-hidden="true"
          >
            <span className="pause-experience__pane" style={{ backgroundImage: `url(${shojiPaper})` }}>
              <span className="pause-experience__light" />
              <span className="pause-experience__kumiko" />
            </span>
          </div>

          <time
            className="pause-experience__timer"
            dateTime={`PT${pause.secondsRemaining}S`}
            aria-label={`${pause.secondsRemaining} detik tersisa`}
          >
            00:{String(pause.secondsRemaining).padStart(2, "0")}
          </time>
          <div className="pause-experience__progress" aria-hidden="true">
            <span style={{ transform: `scaleX(${pause.progress})` }} />
          </div>

          <button
            className="room-button pause-experience__button"
            type="button"
            aria-controls="pause-status"
            onClick={pause.isRunning ? pause.end : pause.start}
          >
            {pause.isRunning
              ? "Akhiri jeda"
              : pause.secondsRemaining === 0
                ? "Ulangi jeda"
                : "Mulai jeda 30 detik"}
          </button>

          {pause.isComplete && (
            <a className="pause-experience__return" href="#panorama">
              <Icon name="arrow-up" size={18} />
              Kembali memandang panorama
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
