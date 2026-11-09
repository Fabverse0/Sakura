import { useEffect, useRef } from "react";
import { attractStep, fireflyBrightness } from "../lib/glow.js";
import { useInView } from "../hooks/useInView.js";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion.js";

/** A few fireflies in the lens room that drift toward the visitor's pointer. */
export function Fireflies({ count = 9 }) {
  const canvasRef = useRef(null);
  const pointer = useRef({ x: -999, y: -999 });
  const visible = useInView(canvasRef);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !visible || reduced) return undefined;
    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let frame = 0;
    const flies = Array.from({ length: count }, (_, i) => ({
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      phase: i * 1.7,
    }));

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      for (const fly of flies) {
        if (!fly.placed) {
          fly.x = Math.random() * width;
          fly.y = Math.random() * height;
          fly.placed = true;
        }
      }
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    function tick(now) {
      ctx.clearRect(0, 0, width, height);
      for (const fly of flies) {
        const next = attractStep(fly, pointer.current);
        fly.vx = Math.max(-1.2, Math.min(1.2, next.vx)) + (Math.random() - 0.5) * 0.02;
        fly.vy = Math.max(-1.2, Math.min(1.2, next.vy)) + (Math.random() - 0.5) * 0.02;
        fly.x = (fly.x + fly.vx + width) % width;
        fly.y = (fly.y + fly.vy + height) % height;
        const b = fireflyBrightness(now, fly.phase);
        const r = 2 + b * 2.5;
        const gradient = ctx.createRadialGradient(fly.x, fly.y, 0, fly.x, fly.y, r * 5);
        gradient.addColorStop(0, `rgba(232, 200, 150, ${0.85 * b})`);
        gradient.addColorStop(1, "rgba(232, 200, 150, 0)");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(fly.x, fly.y, r * 5, 0, Math.PI * 2);
        ctx.fill();
      }
      frame = window.requestAnimationFrame(tick);
    }
    frame = window.requestAnimationFrame(tick);

    const onMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      pointer.current = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      observer.disconnect();
    };
  }, [visible, reduced, count]);

  return <canvas className="fireflies" ref={canvasRef} aria-hidden="true" />;
}
