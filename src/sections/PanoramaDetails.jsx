import shojiPaper from "../../assets/plates/shoji-paper.png";
import { views } from "../data/views.js";

export function PanoramaDetails({ activeView, onSelectView }) {
  return (
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
              onClick={() => onSelectView(view.id, true)}
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
  );
}
