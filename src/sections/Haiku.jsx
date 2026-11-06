import { useRef } from "react";
import { InkStroke } from "../components/InkStroke.jsx";
import { haiku, haikuFor } from "../data/haiku.js";
import { panoramaAt } from "../data/panorama.js";
import { findView } from "../data/views.js";

/**
 * Haiku: a hanging scroll (kakejiku) that shows the poem for the current
 * focus. Choosing a poem also moves the panorama focus.
 */
export function Haiku({ activeView, onSelectView }) {
  const poem = haikuFor(activeView);
  const view = findView(poem.viewId);
  // The first poem is written by scrolling; later poems write themselves on change.
  const firstPoem = useRef(poem.viewId);
  const hasChanged = useRef(false);
  if (poem.viewId !== firstPoem.current) hasChanged.current = true;

  return (
    <section className="room room--mist haiku" id="haiku" aria-labelledby="haiku-title">
      <div className="room__inner haiku__layout">
        <div className="haiku__intro">
          <h2 className="room__title haiku__title" id="haiku-title">
            Tiga sajak pendek
          </h2>
          <p className="room__lead haiku__lead">
            Satu sajak untuk setiap fokus. Memilih sajak juga menggeser pandangan panorama.
          </p>
          <div className="haiku__tabs" role="group" aria-label="Pilih sajak">
            {haiku.map((item) => (
              <button
                key={item.viewId}
                className="haiku__tab"
                type="button"
                aria-pressed={item.viewId === poem.viewId}
                onClick={() => onSelectView(item.viewId)}
              >
                {item.title}
              </button>
            ))}
          </div>
        </div>

        <figure className="haiku__scroll" key={poem.viewId}>
          <span className="haiku__rod haiku__rod--top" aria-hidden="true" />
          <div
            className="haiku__crop"
            aria-hidden="true"
            style={{
              backgroundImage: `url(${panoramaAt(1920)})`,
              backgroundPosition: view?.origin ?? "50% 50%",
            }}
          />
          <blockquote className="haiku__poem">
            {poem.lines.map((line, index) => (
              <span className="haiku__line" key={line} style={{ "--line": index }}>
                <span>{line}</span>
              </span>
            ))}
          </blockquote>
          <InkStroke
            className="haiku__stroke"
            variant="sweep"
            width={5}
            writing={hasChanged.current}
          />
          <figcaption className="haiku__caption">
            <span className="haiku__seal" aria-hidden="true">
              桜
            </span>
            Sajak untuk {poem.title}
          </figcaption>
          <span className="haiku__rod haiku__rod--bottom" aria-hidden="true" />
        </figure>
      </div>
    </section>
  );
}
