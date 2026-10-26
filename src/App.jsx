import { useState } from "react";
import panoramaArtJpeg from "../assets/plates/panorama-art.jpg";
import panoramaArt from "../assets/plates/panorama-art.png";
import topTimber from "../assets/plates/top-charred-timber.png";
import railTimber from "../assets/plates/view-rail-timber.png";
import shojiPaper from "../assets/plates/shoji-paper.png";
import shojiLintel from "../assets/plates/shoji-lintel.png";
import shojiPost from "../assets/plates/shoji-post.png";
import shojiMapleShadow from "../assets/plates/shoji-maple-shadow.png";

const views = [
  { id: "cabang", label: "Cabang", origin: "17% 52%" },
  { id: "puncak", label: "Puncak", origin: "52% 40%" },
  { id: "pagoda", label: "Pagoda", origin: "72% 57%" },
];

export default function App() {
  const [activeView, setActiveView] = useState("overview");
  const activeOrigin =
    views.find((view) => view.id === activeView)?.origin ?? "50% 50%";

  return (
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
          <a className="primary-action" href="#tentang">
            Jelajahi panorama
          </a>
        </section>

        <nav
          className="view-rail"
          aria-label="Pilih fokus panorama"
          style={{ backgroundImage: "url(" + railTimber + ")" }}
        >
          {views.map((view) => (
            <button
              className="view-control"
              key={view.id}
              type="button"
              aria-pressed={activeView === view.id}
              onClick={() => setActiveView(view.id)}
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
          <p className="section-description">
            Pohon maple merah menaungi danau yang memantulkan Gunung Fuji, dengan pagoda di tepinya
            <br />
            dan sebuah perahu kecil di permukaan air.
          </p>
        </section>
      </main>
    </div>
  );
}
