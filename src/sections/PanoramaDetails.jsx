import { Icon } from "../components/Icon.jsx";
import { panoramaAt } from "../data/panorama.js";
import { views } from "../data/views.js";

/**
 * Perhatikan detailnya: three shoji panes set between timber posts. Each pane
 * shows a crop of its focus; choosing one returns to the panorama with that
 * focus selected.
 */
export function PanoramaDetails({ activeView, onSelectView }) {
  return (
    <section className="room room--paper panorama-details" id="detail" aria-labelledby="details-title">
      <div className="room__inner">
        <div className="room__head">
          <h2 className="room__title" id="details-title">
            Perhatikan detailnya
          </h2>
          <p className="room__lead">
            Tiga bagian lukisan, tiga cara berhenti. Pilih satu untuk kembali ke panorama dengan
            fokus tersebut.
          </p>
        </div>

        <div className="detail-grid">
          {views.map((view) => (
            <button
              className="detail-card"
              key={view.id}
              type="button"
              aria-pressed={activeView === view.id}
              aria-controls="panorama"
              onClick={() => onSelectView(view.id, true)}
            >
              <span
                className="detail-card__crop"
                aria-hidden="true"
                style={{
                  backgroundImage: `url(${panoramaAt(1536)})`,
                  "--crop-origin": view.origin,
                }}
              />
              <span className="detail-card__body">
                <span className="detail-card__label">{view.label}</span>
                <span className="detail-card__title">{view.title}</span>
                <span className="detail-card__description">{view.description}</span>
                <span className="detail-card__action">
                  Pilih fokus
                  <Icon name="arrow-right" size={18} />
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
