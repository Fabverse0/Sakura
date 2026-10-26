import { useEffect, useState } from "react";
import panoramaArtJpeg from "../assets/plates/panorama-art.jpg";
import panoramaArt from "../assets/plates/panorama-art.png";
import topTimber from "../assets/plates/top-charred-timber.png";
import railTimber from "../assets/plates/view-rail-timber.png";
import shojiPaper from "../assets/plates/shoji-paper.png";
import shojiLintel from "../assets/plates/shoji-lintel.png";
import shojiPost from "../assets/plates/shoji-post.png";
import shojiMapleShadow from "../assets/plates/shoji-maple-shadow.png";

const views = [
  {
    id: "cabang",
    label: "Cabang",
    title: "Kanopi merah",
    description: "Ranting dan daun merah membingkai sisi kiri panorama.",
    origin: "17% 52%",
  },
  {
    id: "puncak",
    label: "Puncak",
    title: "Gunung Fuji",
    description: "Gunung Fuji berdiri di tengah, di bawah matahari merah.",
    origin: "52% 40%",
  },
  {
    id: "pagoda",
    label: "Pagoda",
    title: "Pagoda di tepi air",
    description: "Pagoda bertingkat berdiri di tepi danau, dengan pantulan di permukaan air.",
    origin: "72% 57%",
  },
];

const overviewNote = "Pilih satu fokus untuk membaca detail yang terlihat di panorama.";
const pauseDurationSeconds = 30;
const breathCycleSeconds = 10;
const inhaleSeconds = 4;

export default function App() {
  const [activeView, setActiveView] = useState("overview");
  const [isPauseRunning, setIsPauseRunning] = useState(false);
  const [pauseSecondsRemaining, setPauseSecondsRemaining] = useState(
    pauseDurationSeconds,
  );
  const selectedView = views.find((view) => view.id === activeView);
  const activeOrigin = selectedView?.origin ?? "50% 50%";
  const elapsedPauseSeconds = pauseDurationSeconds - pauseSecondsRemaining;
  const isInhalePhase = elapsedPauseSeconds % breathCycleSeconds < inhaleSeconds;
  const pausePhase = isPauseRunning
    ? isInhalePhase
      ? "inhale"
      : "exhale"
    : "rest";
  const pauseStatus = isPauseRunning
    ? isInhalePhase
      ? "Tarik napas pelan."
      : "Hembuskan perlahan."
    : pauseSecondsRemaining === 0
      ? "Jeda selesai. Lanjutkan saat siap."
      : "Pandang panorama, lalu mulai kapan pun kamu siap.";

  useEffect(() => {
    if (!isPauseRunning) return undefined;

    const endsAt = Date.now() + pauseDurationSeconds * 1000;
    const intervalId = window.setInterval(() => {
      const nextSecondsRemaining = Math.max(
        0,
        Math.ceil((endsAt - Date.now()) / 1000),
      );

      setPauseSecondsRemaining(nextSecondsRemaining);

      if (nextSecondsRemaining === 0) {
        setIsPauseRunning(false);
      }
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [isPauseRunning]);

  function selectView(viewId, returnToPanorama = false) {
    setActiveView(viewId);

    if (returnToPanorama) {
      document.getElementById("panorama")?.scrollIntoView({ block: "start" });
    }
  }

  function startPause() {
    setPauseSecondsRemaining(pauseDurationSeconds);
    setIsPauseRunning(true);
  }

  function endPause() {
    setIsPauseRunning(false);
    setPauseSecondsRemaining(pauseDurationSeconds);
  }

  return (
    <>
      <div
        className="comp-frame"
        data-focus={activeView}
        style={{ "--focus-origin": activeOrigin }}
      >
        <header
          className="top-beam"
          style={{ backgroundImage: "url(" + topTimber + ")" }}
        >
          <a className="brand-wordmark" href="#top" aria-label="Sakura, awal halaman">
            SAKURA
          </a>
          <nav className="header-nav" aria-label="Navigasi utama">
            <a className="header-nav__link header-nav__link--active" href="#panorama">
              Karya
            </a>
            <a className="header-nav__link" href="#tentang">
              Tentang
            </a>
          </nav>
        </header>

        <main className="page-main" id="top">
          <section className="hero-stage" id="panorama" aria-labelledby="hero-title">
            <img
              className="panorama-art"
              src={panoramaArtJpeg}
              srcSet={`${panoramaArtJpeg} 1x, ${panoramaArt} 2x`}
              alt="Ilustrasi lanskap dengan maple merah, Gunung Fuji, matahari merah, pagoda, dan perahu di danau."
              draggable="false"
              fetchPriority="high"
            />
            <h1 className="hero-headline" id="hero-title">
              Satu lanskap.
              <br />
              Tiga cara memandang.
            </h1>
            <a className="primary-action" href="#view-controls">
              Jelajahi panorama
            </a>
          </section>

          <nav
            className="view-rail"
            id="view-controls"
            aria-label="Pilih fokus panorama"
            style={{ backgroundImage: "url(" + railTimber + ")" }}
          >
            {views.map((view) => (
              <button
                className="view-control"
                key={view.id}
                type="button"
                aria-pressed={activeView === view.id}
                aria-controls="panorama"
                onClick={() => selectView(view.id)}
              >
                {view.label}
              </button>
            ))}
          </nav>

          <section
            className="shoji-wall"
            id="tentang"
            aria-labelledby="section-heading"
            style={{ backgroundImage: "url(" + shojiPaper + ")" }}
          >
            <div
              className="shoji-lintel"
              aria-hidden="true"
              style={{ backgroundImage: "url(" + shojiLintel + ")" }}
            />
            <div className="shoji-lattice shoji-lattice--left" aria-hidden="true" />
            <div className="shoji-lattice shoji-lattice--right" aria-hidden="true" />
            <img
              className="shoji-maple-shadow"
              src={shojiMapleShadow}
              alt=""
              aria-hidden="true"
              draggable="false"
            />
            <div
              className="shoji-post shoji-post--left"
              aria-hidden="true"
              style={{ backgroundImage: "url(" + shojiPost + ")" }}
            />
            <div
              className="shoji-post shoji-post--right"
              aria-hidden="true"
              style={{ backgroundImage: "url(" + shojiPost + ")" }}
            />
            <h2 className="section-heading" id="section-heading">
              Memandang pelan
            </h2>
            <p className="section-description" aria-live="polite" aria-atomic="true">
              {selectedView?.description ?? overviewNote}
            </p>
          </section>
        </main>
      </div>

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

      <section className="pause-experience" aria-labelledby="pause-title">
        <div className="pause-experience__inner">
          <div className="pause-experience__copy">
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
              {pauseStatus}
            </p>
          </div>

          <div className="pause-experience__practice">
            <div
              className="pause-experience__window"
              data-running={isPauseRunning}
              data-phase={pausePhase}
              aria-hidden="true"
            >
              <span
                className="pause-experience__pane"
                style={{ backgroundImage: "url(" + shojiPaper + ")" }}
              />
            </div>
            <time
              className="pause-experience__timer"
              dateTime={`PT${pauseSecondsRemaining}S`}
              aria-label={`${pauseSecondsRemaining} detik tersisa`}
            >
              00:{String(pauseSecondsRemaining).padStart(2, "0")}
            </time>
            {isPauseRunning ? (
              <button
                className="pause-experience__button"
                type="button"
                aria-controls="pause-status"
                onClick={endPause}
              >
                Akhiri jeda
              </button>
            ) : (
              <button
                className="pause-experience__button"
                type="button"
                aria-controls="pause-status"
                onClick={startPause}
              >
                {pauseSecondsRemaining === 0
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
