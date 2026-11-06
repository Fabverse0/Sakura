import { useRef } from "react";
import { panoramaAt, panoramaArtSrcSet } from "../data/panorama.js";

/**
 * Lensa Pandang: the whole painting in a timber frame with a square
 * magnifier that follows the pointer or the arrow keys.
 */
export function Lens() {
  const stageRef = useRef(null);

  return (
    <section className="room room--sumi lens" id="lensa" aria-labelledby="lens-title">
      <div className="room__inner">
        <div className="room__head">
          <h2 className="room__title" id="lens-title">
            Lensa pandang
          </h2>
          <p className="room__lead">
            Dekatkan mata ke lukisan. Gerakkan kursor di atasnya, putar roda tetikus untuk
            memperbesar, atau gunakan tombol panah setelah memilih lukisan.
          </p>
        </div>

        <div className="lens__frame">
          <div className="lens__stage" ref={stageRef}>
            <img
              className="lens__art"
              src={panoramaAt(1920)}
              srcSet={panoramaArtSrcSet}
              sizes="(min-width: 1400px) 1320px, 92vw"
              alt="Lukisan lanskap utuh untuk diperbesar dengan lensa."
              loading="lazy"
              decoding="async"
              draggable="false"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
