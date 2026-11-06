import { useRef } from "react";
import { useInView } from "../hooks/useInView.js";
import topTimber from "../../assets/plates/top-charred-timber.png";
import railTimber from "../../assets/plates/view-rail-timber.png";
import shojiPaper from "../../assets/plates/shoji-paper.png";
import shojiLintel from "../../assets/plates/shoji-lintel.png";
import shojiPost from "../../assets/plates/shoji-post.png";
import shojiMapleShadow from "../../assets/plates/shoji-maple-shadow-1280.png";
import { panoramaAlt, panoramaArt, panoramaArtSrcSet } from "../data/panorama.js";
import { createPetals } from "../data/particles.js";
import { findView, overviewNote, views } from "../data/views.js";

const petals = createPetals();

/**
 * The approved engawa comp: timber beam, panorama, focus rail and shoji wall.
 * Desktop geometry is percentage based and must stay pixel-stable.
 */
export function HeroComp({ activeView, onSelectView, onOpenRooms }) {
  const heroRef = useRef(null);
  const isHeroVisible = useInView(heroRef);
  const selectedView = findView(activeView);
  const activeOrigin = selectedView?.origin ?? "50% 50%";

  return (
    <div
      className="comp-frame"
      data-focus={activeView}
      style={{ "--focus-origin": activeOrigin }}
    >
      <header className="top-beam" style={{ backgroundImage: "url(" + topTimber + ")" }}>
        <a className="brand-wordmark" href="#top" aria-label="Sakura, awal halaman">
          SAKURA
        </a>
        <nav className="header-nav" aria-label="Navigasi utama">
          <button
            className="header-nav__link header-nav__link--ruang"
            type="button"
            aria-haspopup="dialog"
            onClick={onOpenRooms}
          >
            Ruang
          </button>
          <a
            className="header-nav__link header-nav__link--active"
            href="#panorama"
            aria-current="page"
          >
            Karya
          </a>
          <a className="header-nav__link header-nav__link--tentang" href="#tentang">
            Tentang
          </a>
        </nav>
      </header>

      <main className="page-main" id="top">
        <section
          className="hero-stage"
          id="panorama"
          aria-labelledby="hero-title"
          ref={heroRef}
        >
          <img
            className="panorama-art"
            src={panoramaArt}
            srcSet={panoramaArtSrcSet}
            sizes="112vw"
            alt={panoramaAlt}
            draggable="false"
            fetchPriority="high"
          />
          <div className="petals" aria-hidden="true" data-paused={!isHeroVisible}>
            {petals.map((petal, index) => (
              <span
                className="petal"
                key={index}
                style={{
                  "--petal-left": petal.left,
                  "--petal-size": petal.size,
                  "--petal-duration": petal.duration,
                  "--petal-delay": petal.delay,
                  "--petal-drift": petal.drift,
                  "--petal-tone": petal.tone,
                }}
              />
            ))}
          </div>
          <h1 className="hero-headline" id="hero-title">
            <span className="hero-headline__line">
              <span>Satu lanskap.</span>
            </span>
            <span className="hero-headline__line">
              <span>Tiga cara memandang.</span>
            </span>
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
              onClick={() => onSelectView(view.id)}
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
  );
}
