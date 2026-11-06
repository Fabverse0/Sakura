import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "../components/Icon.jsx";
import {
  commitStroke,
  emptyHistory,
  midpoint,
  nextWidth,
  redo,
  taperEnd,
  undo,
} from "../lib/brush.js";

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
  const [ink, setInk] = useState(inks[0]);
  const [brushSize, setBrushSize] = useState(14);
  const [confirmClear, setConfirmClear] = useState(false);

  // Ctrl/Cmd+Z undoes, Ctrl/Cmd+Shift+Z or Ctrl+Y redoes while focus is inside the room.
  function handleKeyDown(event) {
    const mod = event.ctrlKey || event.metaKey;
    if (!mod) return;
    const key = event.key.toLowerCase();
    if (key === "z" && !event.shiftKey) {
      event.preventDefault();
      setHistory(undo);
    } else if ((key === "z" && event.shiftKey) || key === "y") {
      event.preventDefault();
      setHistory(redo);
    }
  }

  function handleSave() {
    const source = canvasRef.current;
    if (!source) return;
    const out = document.createElement("canvas");
    out.width = source.width;
    out.height = source.height;
    const ctx = out.getContext("2d");
    ctx.fillStyle = "#f4edea";
    ctx.fillRect(0, 0, out.width, out.height);
    ctx.drawImage(source, 0, 0);
    // a small maple seal in the corner, like a hanko on a finished sheet
    const seal = Math.round(out.height * 0.07);
    const margin = Math.round(seal * 0.6);
    ctx.fillStyle = "#bf1818";
    ctx.fillRect(out.width - seal - margin, out.height - seal - margin, seal, seal);
    ctx.fillStyle = "#f4edea";
    ctx.font = `${Math.round(seal * 0.62)}px serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("桜", out.width - margin - seal / 2, out.height - margin - seal / 2);
    out.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `sakura-sumi-${new Date().toISOString().slice(0, 10)}.png`;
      link.click();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    }, "image/png");
  }

  function handleClear() {
    if (!confirmClear) {
      setConfirmClear(true);
      return;
    }
    setHistory(emptyHistory());
    setConfirmClear(false);
  }

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
    event.currentTarget.focus({ preventScroll: true });
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
    <section
      className="room room--mist sumi"
      id="kanvas"
      aria-labelledby="sumi-title"
      onKeyDown={handleKeyDown}
    >
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

        <div className="sumi__toolbar" role="toolbar" aria-label="Alat kanvas">
          <div className="sumi__group" role="radiogroup" aria-label="Tinta">
            {inks.map((item) => (
              <button
                key={item.id}
                className="sumi__ink"
                type="button"
                role="radio"
                aria-checked={ink.id === item.id}
                onClick={() => setInk(item)}
                style={{ "--ink-color": item.color }}
              >
                <span className="sumi__ink-dot" aria-hidden="true" />
                {item.label}
              </button>
            ))}
          </div>

          <label className="sumi__size">
            <span>Ukuran kuas</span>
            <input
              type="range"
              min="4"
              max="40"
              step="1"
              value={brushSize}
              onChange={(event) => setBrushSize(Number(event.target.value))}
            />
            <output className="sumi__size-value">{brushSize}</output>
          </label>

          <div className="sumi__group">
            <button
              className="room-button room-button--quiet sumi__tool"
              type="button"
              disabled={!history.strokes.length}
              onClick={() => setHistory(undo)}
            >
              <Icon name="undo" size={18} />
              Urungkan
            </button>
            <button
              className="room-button room-button--quiet sumi__tool"
              type="button"
              disabled={!history.undone.length}
              onClick={() => setHistory(redo)}
            >
              <Icon name="redo" size={18} />
              Ulangi
            </button>
            <button
              className="room-button room-button--quiet sumi__tool"
              type="button"
              data-confirm={confirmClear}
              disabled={!history.strokes.length}
              onClick={handleClear}
              onBlur={() => setConfirmClear(false)}
            >
              <Icon name="trash" size={18} />
              {confirmClear ? "Yakin bersihkan?" : "Bersihkan"}
            </button>
            <button
              className="room-button sumi__tool"
              type="button"
              disabled={!history.strokes.length}
              onClick={handleSave}
            >
              <Icon name="download" size={18} />
              Simpan PNG
            </button>
          </div>
        </div>

        <div className="sumi__frame">
          <canvas
            className="sumi__canvas"
            ref={canvasRef}
            role="img"
            tabIndex={0}
            aria-label={`Kanvas tinta dengan ${history.strokes.length} goresan.`}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          />
        </div>
        <p className="sumi__hint">
          Ctrl + Z untuk mengurungkan, Ctrl + Shift + Z untuk mengulangi. Kanvas ini tidak
          disimpan otomatis; gunakan Simpan PNG untuk menyimpan hasilnya.
        </p>
      </div>
    </section>
  );
}
