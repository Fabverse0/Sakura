import { useCallback, useEffect, useRef, useState } from "react";
import { panoramaAt, panoramaArtSrcSet } from "../data/panorama.js";
import { clampPosition, lensGeometry, nudgeZoom } from "../lib/lens.js";

const lensSize = 240;

/**
 * Lensa Pandang: the whole painting in a timber frame with a square
 * magnifier that follows the pointer or the arrow keys.
 */
export function Lens() {
  const stageRef = useRef(null);
  const lensRef = useRef(null);
  const frame = useRef(0);
  const position = useRef({ x: 50, y: 50 });
  const [isActive, setIsActive] = useState(false);
  const [hasHiRes, setHasHiRes] = useState(false);
  const [zoom, setZoom] = useState(3);

  // Wheel zoom needs a non-passive listener so the page does not scroll
  // while the lens is in use.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;
    function handleWheel(event) {
      if (!stage.dataset.active || stage.dataset.active === "false") return;
      event.preventDefault();
      setZoom((current) => nudgeZoom(current, event.deltaY < 0 ? 0.25 : -0.25));
    }
    stage.addEventListener("wheel", handleWheel, { passive: false });
    return () => stage.removeEventListener("wheel", handleWheel);
  }, []);

  const paint = useCallback(() => {
    frame.current = 0;
    const stage = stageRef.current;
    const lens = lensRef.current;
    if (!stage || !lens) return;
    const { width, height } = stage.getBoundingClientRect();
    const g = lensGeometry({ width, height, ...position.current, zoom, size: lensSize });
    lens.style.transform = `translate3d(${g.tx}px, ${g.ty}px, 0)`;
    lens.style.backgroundSize = `${g.bgWidth}px ${g.bgHeight}px`;
    lens.style.backgroundPosition = `${g.bgX}px ${g.bgY}px`;
  }, [zoom]);

  const schedulePaint = useCallback(() => {
    if (!frame.current) frame.current = window.requestAnimationFrame(paint);
  }, [paint]);

  useEffect(() => {
    schedulePaint();
    return () => window.cancelAnimationFrame(frame.current);
  }, [schedulePaint, isActive]);

  function activate() {
    setIsActive(true);
    setHasHiRes(true);
  }

  function handlePointerMove(event) {
    const rect = stageRef.current.getBoundingClientRect();
    position.current = clampPosition({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    });
    if (!isActive) activate();
    schedulePaint();
  }

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
          <div
            className="lens__stage"
            ref={stageRef}
            data-active={isActive}
            onPointerEnter={activate}
            onPointerMove={handlePointerMove}
            onPointerLeave={() => setIsActive(false)}
          >
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
            <div
              className="lens__glass"
              ref={lensRef}
              aria-hidden="true"
              style={{
                width: lensSize,
                height: lensSize,
                backgroundImage: hasHiRes ? `url(${panoramaAt(3840)})` : undefined,
              }}
            >
              <span className="lens__crosshair" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
