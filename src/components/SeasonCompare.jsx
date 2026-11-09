import { useRef, useState } from "react";
import { panoramaAt } from "../data/panorama.js";
import { findSeason, seasons } from "../data/seasons.js";
import { nextPercent, percentFromPointer } from "../lib/compare.js";

/**
 * Two seasons of the same painting split by a draggable shoji divider.
 * The right season is clipped, so the painting never moves.
 */
export function SeasonCompare({ leftId = "semi", rightId = "dingin", onChange }) {
  const stageRef = useRef(null);
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);
  const isDragging = useRef(false);
  const left = findSeason(leftId);
  const right = findSeason(rightId);

  function stop() {
    isDragging.current = false;
    setDragging(false);
  }

  function move(event) {
    setPosition(percentFromPointer(event.clientX, stageRef.current.getBoundingClientRect()));
  }

  const layer = (season) => (
    <span
      className="compare__layer"
      style={{ backgroundImage: `url(${panoramaAt(1536)})`, filter: season.filter }}
    >
      <span
        className="compare__tint"
        style={{
          backgroundColor: season.overlay.color,
          mixBlendMode: season.overlay.blend,
          opacity: season.overlay.opacity,
        }}
      />
    </span>
  );

  return (
    <div className="compare">
      <div className="compare__picks">
        <label className="compare__pick">
          <span>Kiri</span>
          <select value={leftId} onChange={(event) => onChange?.("left", event.target.value)}>
            {seasons.map((season) => (
              <option key={season.id} value={season.id}>
                {season.label}
              </option>
            ))}
          </select>
        </label>
        <label className="compare__pick">
          <span>Kanan</span>
          <select value={rightId} onChange={(event) => onChange?.("right", event.target.value)}>
            {seasons.map((season) => (
              <option key={season.id} value={season.id}>
                {season.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div
        className="compare__stage"
        ref={stageRef}
        data-dragging={dragging}
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId);
          isDragging.current = true;
          setDragging(true);
          move(event);
        }}
        onPointerMove={(event) => isDragging.current && move(event)}
        onPointerUp={stop}
        onPointerCancel={stop}
      >
        {layer(left)}
        <span className="compare__right" style={{ clipPath: `inset(0 0 0 ${position}%)` }}>
          {layer(right)}
        </span>
        <span className="compare__tag compare__tag--left">{left.label}</span>
        <span className="compare__tag compare__tag--right">{right.label}</span>
        <span
          className="compare__handle"
          role="slider"
          tabIndex={0}
          aria-label="Pembatas perbandingan musim"
          aria-orientation="horizontal"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(position)}
          aria-valuetext={`${Math.round(position)}% ${left.label}, ${Math.round(100 - position)}% ${right.label}`}
          style={{ left: `${position}%` }}
          onKeyDown={(event) => {
            const next = nextPercent(position, event.key, event.shiftKey);
            if (next !== position) {
              event.preventDefault();
              setPosition(next);
            }
          }}
        >
          <span className="compare__grip" aria-hidden="true" />
        </span>
      </div>
    </div>
  );
}
