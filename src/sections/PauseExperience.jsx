import { useEffect } from "react";
import shojiPaper from "../../assets/plates/shoji-paper.png";
import { Icon } from "../components/Icon.jsx";
import { breathPatterns, pauseDurations } from "../data/pause.js";
import { cyclesIn } from "../lib/breath.js";
import { panoramaAt } from "../data/panorama.js";

/**
 * Jeda 30 detik: three breaths with the painting dimmed behind a shoji window.
 * The window brightens and opens on the inhale (4 s) and settles on the
 * exhale (6 s), like light through paper.
 */
export function PauseExperience({ pause, onComplete }) {
  useEffect(() => {
    if (pause.isComplete) onComplete?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pause.isComplete]);

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
            Jeda napas
          </h2>
          <p className="room__lead pause-experience__description">
            {pause.pattern.description} Ulangi {cyclesIn(pause.pattern, pause.duration)} kali, atau
            cukup memandang panorama.
          </p>

          <div className="pause-options">
            <div className="pause-options__group" role="radiogroup" aria-label="Pola napas">
              {breathPatterns.map((item) => (
                <button
                  key={item.id}
                  className="pause-options__choice"
                  type="button"
                  role="radio"
                  aria-checked={pause.patternId === item.id}
                  disabled={pause.isRunning}
                  onClick={() => pause.choosePattern(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="pause-options__group" role="radiogroup" aria-label="Lama jeda">
              {pauseDurations.map((seconds) => (
                <button
                  key={seconds}
                  className="pause-options__choice"
                  type="button"
                  role="radio"
                  aria-checked={pause.duration === seconds}
                  disabled={pause.isRunning}
                  onClick={() => pause.setDuration(seconds)}
                >
                  {seconds >= 60 ? `${seconds / 60} menit` : `${seconds} detik`}
                </button>
              ))}
            </div>
          </div>
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
            style={{
              "--breath-in": `${pause.pattern.inhale}s`,
              "--breath-out": `${pause.pattern.exhale}s`,
            }}
            aria-hidden="true"
          >
            <span className="pause-experience__pane" style={{ backgroundImage: `url(${shojiPaper})` }}>
              <span className="pause-experience__light" />
              <span className="pause-experience__kumiko" />
            </span>
          </div>

          <time className="pause-experience__timer" dateTime={`PT${pause.secondsRemaining}S`}>
            <span aria-hidden="true">{String(Math.floor(pause.secondsRemaining / 60)).padStart(2, "0")}:{String(pause.secondsRemaining % 60).padStart(2, "0")}</span>
            <span className="visually-hidden">{pause.secondsRemaining} detik tersisa</span>
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
                : `Mulai jeda ${pause.duration >= 60 ? `${pause.duration / 60} menit` : `${pause.duration} detik`}`}
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
