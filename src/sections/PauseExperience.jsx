import shojiPaper from "../../assets/plates/shoji-paper.png";

export function PauseExperience({ pause }) {
  return (
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
  );
}
