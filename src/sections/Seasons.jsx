import { useRef, useState } from "react";
import { Particles } from "../components/Particles.jsx";
import { useViewTransition } from "../hooks/useViewTransition.js";
import { panoramaAt } from "../data/panorama.js";
import { defaultSeasonId, findSeason, seasons } from "../data/seasons.js";

/**
 * Empat Musim: the same painting re-lit through four imagined seasons.
 */
export function Seasons() {
  const [seasonId, setSeasonId] = useState(defaultSeasonId);
  const season = findSeason(seasonId);
  const transition = useViewTransition();

  const optionRefs = useRef([]);

  function handleKeyDown(event, index) {
    const keys = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    let next = null;
    if (event.key in keys) next = (index + keys[event.key] + seasons.length) % seasons.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = seasons.length - 1;
    if (next === null) return;
    event.preventDefault();
    optionRefs.current[next]?.focus();
    choose(seasons[next].id);
  }

  function choose(id) {
    if (id === seasonId) return;
    transition(() => setSeasonId(id), ["season"]);
  }

  return (
    <section className="room room--ink seasons" id="musim" aria-labelledby="seasons-title">
      <div className="room__inner">
        <div className="room__head">
          <h2 className="room__title" id="seasons-title">
            Empat musim
          </h2>
          <p className="room__lead">
            Lukisan ini menggambarkan musim gugur. Pilih musim lain untuk melihat tafsir warnanya:
            lukisan yang sama, diwarnai ulang.
          </p>
        </div>

        <div className="seasons__stage" data-season={season.id} style={{ "--season-tone": season.tone }}>
          <div className="seasons__art">
            <img
              className="seasons__image"
              src={panoramaAt(1920)}
              srcSet={`${panoramaAt(960)} 960w, ${panoramaAt(1536)} 1536w, ${panoramaAt(1920)} 1920w`}
              sizes="(min-width: 1400px) 1320px, 92vw"
              alt={`Lukisan lanskap dalam tafsir ${season.title.toLowerCase()}.`}
              loading="lazy"
              decoding="async"
              draggable="false"
              style={{ filter: season.filter }}
            />
            <span
              className="seasons__overlay"
              aria-hidden="true"
              style={{
                backgroundColor: season.overlay.color,
                mixBlendMode: season.overlay.blend,
                opacity: season.overlay.opacity,
              }}
            />
          </div>

          <Particles type={season.particle} count={season.particle === "snow" ? 90 : 26} />

          <div className="seasons__caption">
            <p className="seasons__name">{season.title}</p>
            <p className="seasons__note">{season.note}</p>
          </div>
        </div>

        <div className="seasons__picker" role="radiogroup" aria-label="Pilih musim">
          {seasons.map((item, index) => (
            <button
              key={item.id}
              ref={(node) => {
                optionRefs.current[index] = node;
              }}
              className="seasons__option"
              type="button"
              role="radio"
              aria-checked={item.id === season.id}
              tabIndex={item.id === season.id ? 0 : -1}
              onClick={() => choose(item.id)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              style={{ "--option-tone": item.tone }}
            >
              <span className="seasons__swatch" aria-hidden="true" />
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
