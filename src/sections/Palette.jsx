import { useState } from "react";
import { Icon } from "../components/Icon.jsx";
import { useToast } from "../components/Toast.jsx";
import { useClipboard } from "../hooks/useClipboard.js";
import { labelColorFor, palette } from "../data/palette.js";
import { panoramaAt } from "../data/panorama.js";

/**
 * Palet Lukisan: colours sampled from the painting. Hovering or focusing a
 * swatch shows where it was taken; clicking copies its hex code.
 */
export function Palette() {
  const [current, setCurrent] = useState(palette[1]);
  const copy = useClipboard();
  const { show } = useToast();

  async function handleCopy(color) {
    const ok = await copy(color.hex);
    show(
      ok ? `${color.name} ${color.hex.toUpperCase()} disalin.` : `Tidak bisa menyalin. Kodenya ${color.hex.toUpperCase()}.`,
    );
  }

  return (
    <section className="room room--paper palette" id="palet" aria-labelledby="palette-title">
      <div className="room__inner">
        <div className="room__head">
          <h2 className="room__title" id="palette-title">
            Palet lukisan
          </h2>
          <p className="room__lead">
            Sepuluh warna yang diambil langsung dari lukisan. Arahkan ke sebuah warna untuk melihat
            asalnya, klik untuk menyalin kodenya.
          </p>
        </div>

        <div className="palette__layout">
          <figure className="palette__source">
            <div className="palette__art">
              <img
                src={panoramaAt(1280)}
                alt="Lukisan sumber palet warna."
                loading="lazy"
                decoding="async"
                draggable="false"
              />
              <span
                className="palette__marker"
                aria-hidden="true"
                key={current.id}
                style={{
                  left: `${current.x}%`,
                  top: `${Math.max(3, current.y)}%`,
                  "--marker-color": current.hex,
                }}
              />
            </div>
            <figcaption className="palette__caption" aria-live="polite">
              <span className="palette__caption-name">{current.name}</span>
              <span className="palette__caption-note">{current.note}</span>
            </figcaption>
          </figure>

          <ul className="palette__swatches">
            {palette.map((color, index) => (
              <li key={color.id} style={{ "--i": index }}>
                <button
                  className="palette__swatch"
                  type="button"
                  aria-pressed={current.id === color.id}
                  aria-label={`Salin ${color.name}, ${color.hex}`}
                  onMouseEnter={() => setCurrent(color)}
                  onFocus={() => setCurrent(color)}
                  onClick={() => handleCopy(color)}
                  style={{ "--swatch": color.hex, "--swatch-label": labelColorFor(color.hex) }}
                >
                  <span className="palette__chip" aria-hidden="true" />
                  <span className="palette__name">{color.name}</span>
                  <span className="palette__hex">
                    {color.hex.toUpperCase()}
                    <Icon name="copy" size={16} />
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
