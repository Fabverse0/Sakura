import { useCallback, useEffect, useRef, useState } from "react";
import { commitStroke, emptyHistory, midpoint, nextWidth, taperEnd } from "../lib/brush.js";

export const inks = [
  { id: "sumi", label: "Sumi", color: "#1e1a22" },
  { id: "maple", label: "Maple", color: "#a62728" },
  { id: "fuji", label: "Abu Fuji", color: "#8a8381" },
];

function drawStroke(ctx, stroke, width, height) {
  const pts = stroke.points;
  if (!pts.length) return;
  ctx.strokeStyle = stroke.color;
  ctx.fillStyle = stroke.color;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.globalAlpha = 0.88;

  if (pts.length === 1) {
    ctx.beginPath();
    ctx.arc(pts[0].x * width, pts[0].y * height, pts[0].w / 2, 0, Math.PI * 2);
    ctx.fill();
    return;
  }

  let from = { x: pts[0].x * width, y: pts[0].y * height };
  for (let i = 1; i < pts.length; i++) {
    const a = { x: pts[i - 1].x * width, y: pts[i - 1].y * height };
    const b = { x: pts[i].x * width, y: pts[i].y * height };
    const m = midpoint(a, b);
    ctx.lineWidth = pts[i].w;
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.quadraticCurveTo(a.x, a.y, m.x, m.y);
    ctx.stroke();
    from = m;
  }
}

/** Wet-ink bleed: a faint blurred copy under each finished stroke. */
function drawBleed(ctx, stroke, width, height) {
  ctx.save();
  ctx.filter = "blur(2px)";
  ctx.globalAlpha = 0.16;
  drawStroke(ctx, stroke, width, height);
  ctx.restore();
}

/**
 * Kanvas Sumi: free ink drawing on shoji paper.
 */
export function SumiCanvas() {
  const canvasRef = useRef(null);
  const size = useRef({ width: 0, height: 0 });
  const live = useRef(null);
  const [history, setHistory] = useState(emptyHistory);
  const [ink] = useState(inks[0]);
  const [brushSize] = useState(14);

  const replay = useCallback((strokes) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const { width, height } = size.current;
    ctx.clearRect(0, 0, width, height);
    for (const stroke of strokes) {
      drawBleed(ctx, stroke, width, height);
      ctx.globalAlpha = 1;
      drawStroke(ctx, stroke, width, height);
    }
    ctx.globalAlpha = 1;
  }, []);

  // DPR-aware sizing; strokes are replayed after every resize.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");
    const observer = new ResizeObserver(() => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      size.current = { width: rect.width, height: rect.height };
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      replay(historyRef.current.strokes);
    });
    observer.observe(canvas);
    return () => observer.disconnect();
  }, [replay]);

  const historyRef = useRef(history);
  useEffect(() => {
    historyRef.current = history;
    replay(history.strokes);
  }, [history, replay]);

  function toPoint(event) {
    const rect = canvasRef.current.getBoundingClientRect();
    return {
      x: (event.clientX - rect.left) / rect.width,
      y: (event.clientY - rect.top) / rect.height,
      t: event.timeStamp,
      pressure: event.pressure,
    };
  }

  function handlePointerDown(event) {
    if (event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    const p = toPoint(event);
    live.current = {
      stroke: { color: ink.color, points: [{ x: p.x, y: p.y, w: brushSize * 0.4 }] },
      last: p,
      width: brushSize * 0.4,
    };
  }

  function handlePointerMove(event) {
    const current = live.current;
    if (!current) return;
    const ctx = canvasRef.current.getContext("2d");
    const { width, height } = size.current;
    const events = event.nativeEvent.getCoalescedEvents?.() ?? [event.nativeEvent];

    for (const raw of events) {
      const p = toPoint(raw);
      const dx = (p.x - current.last.x) * width;
      const dy = (p.y - current.last.y) * height;
      const distance = Math.hypot(dx, dy);
      if (distance < 1.5) continue;
      const velocity = distance / Math.max(1, p.t - current.last.t);
      current.width = nextWidth({ previous: current.width, pressure: p.pressure, velocity, size: brushSize });
      const points = current.stroke.points;
      points.push({ x: p.x, y: p.y, w: current.width });
      current.last = p;
      // draw just the newest segment
      drawStroke(ctx, { color: current.stroke.color, points: points.slice(-3) }, width, height);
    }
    ctx.globalAlpha = 1;
  }

  function handlePointerUp() {
    const current = live.current;
    live.current = null;
    if (!current) return;
    const stroke = { ...current.stroke, points: taperEnd(current.stroke.points) };
    setHistory((h) => commitStroke(h, stroke));
  }

  return (
    <section className="room room--mist sumi" id="kanvas" aria-labelledby="sumi-title">
      <div className="room__inner">
        <div className="room__head">
          <h2 className="room__title" id="sumi-title">
            Kanvas sumi
          </h2>
          <p className="room__lead">
            Lukis bebas dengan kuas tinta. Tarik pelan untuk garis tebal, cepat untuk garis tipis;
            pena dengan tekanan juga terbaca.
          </p>
        </div>

        <div className="sumi__frame">
          <canvas
            className="sumi__canvas"
            ref={canvasRef}
            role="img"
            aria-label={`Kanvas tinta dengan ${history.strokes.length} goresan.`}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          />
        </div>
      </div>
    </section>
  );
}
