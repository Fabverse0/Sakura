import { useRef, useState } from "react";
import { Icon } from "../components/Icon.jsx";
import { areas } from "../data/areas.js";
import { panoramaAt, panoramaArtSrcSet } from "../data/panorama.js";
import { directionHint, isHit, pickRound } from "../lib/finder.js";

const roundSize = 6;

/**
 * Temukan Detail: a small looking game. Find six details of the painting,
 * one at a time, by clicking where they are.
 */
export function Finder() {
  const [round, setRound] = useState(() => pickRound(areas, roundSize));
  const [index, setIndex] = useState(0);
  const [marks, setMarks] = useState([]);
  const [feedback, setFeedback] = useState("Klik lukisan tepat di tempat benda itu berada.");
  const stageRef = useRef(null);

  const target = round[index];
  const isDone = index >= round.length;

  function guess(x, y) {
    if (isDone) return;
    if (isHit(target, x, y)) {
      setMarks((current) => [...current, { id: target.id, x: target.x, y: target.y, kind: "hit" }]);
      setFeedback(`Tepat. ${target.name} ditemukan.`);
      setIndex((current) => current + 1);
    } else {
      setMarks((current) => [...current, { id: `${target.id}-${Date.now()}`, x, y, kind: "miss" }]);
      setFeedback(`Belum. ${directionHint(target, x, y)}`);
    }
  }

  function handleClick(event) {
    const rect = stageRef.current.getBoundingClientRect();
    guess(((event.clientX - rect.left) / rect.width) * 100, ((event.clientY - rect.top) / rect.height) * 100);
  }

  function restart() {
    setRound(pickRound(areas, roundSize));
    setIndex(0);
    setMarks([]);
    setFeedback("Ronde baru. Klik lukisan tepat di tempat benda itu berada.");
  }

  return (
    <section className="room room--paper finder" id="temukan" aria-labelledby="finder-title">
      <div className="room__inner">
        <div className="room__head">
          <h2 className="room__title" id="finder-title">
            Temukan detail
          </h2>
          <p className="room__lead">
            Enam benda kecil tersembunyi di lukisan. Cari satu per satu, dan klik tepat di tempatnya.
          </p>
        </div>

        <div className="finder__layout">
          <div className="finder__board">
            <div className="finder__stage" ref={stageRef} onClick={handleClick}>
              <img
                className="finder__art"
                src={panoramaAt(1920)}
                srcSet={panoramaArtSrcSet}
                sizes="(min-width: 1400px) 880px, 64vw"
                alt="Lukisan untuk permainan mencari detail."
                loading="lazy"
                decoding="async"
                draggable="false"
              />
              {marks.map((mark) => (
                <span
                  key={mark.id}
                  className={`finder__mark finder__mark--${mark.kind}`}
                  aria-hidden="true"
                  style={{ left: `${mark.x}%`, top: `${mark.y}%` }}
                />
              ))}
            </div>
          </div>

          <aside className="finder__panel" aria-label="Permainan Temukan detail">
            <p className="finder__progress">
              <span className="finder__count">{Math.min(index, round.length)}</span>
              <span className="finder__of">dari {round.length} ditemukan</span>
            </p>

            {isDone ? (
              <p className="finder__prompt">Semua detail ditemukan.</p>
            ) : (
              <p className="finder__prompt">
                <span className="finder__prompt-label">Temukan</span>
                <span className="finder__target" key={target.id}>
                  {target.name}
                </span>
              </p>
            )}

            <p className="finder__feedback" role="status" aria-live="polite">
              {feedback}
            </p>

            <ol className="finder__list">
              {round.map((area, areaIndex) => (
                <li
                  key={area.id}
                  className="finder__item"
                  data-state={areaIndex < index ? "found" : areaIndex === index ? "current" : "todo"}
                >
                  {areaIndex < index && <Icon name="check" size={16} />}
                  {areaIndex < index || areaIndex === index ? area.name : "Belum dibuka"}
                </li>
              ))}
            </ol>

            <button className="room-button room-button--quiet" type="button" onClick={restart}>
              Ronde baru
            </button>
          </aside>
        </div>
      </div>
    </section>
  );
}
