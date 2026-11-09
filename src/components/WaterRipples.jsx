import { useEffect, useRef } from "react";
import { useInView } from "../hooks/useInView.js";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion.js";
import { createRipple, pruneRipples, rippleProgress, ringsAt } from "../lib/ripples.js";

/**
 * A transparent canvas over the lake: clicking or dragging across the water
 * (lower 30% of the panorama) sends out ripples. Everything above the water
 * line ignores the pointer, so the focus rail and headline keep working.
 */
export function WaterRipples() {
  const canvasRef = useRef(null);
  const ripples = useRef([]);
  const last = useRef({ x: 0, y: 0, t: 0 });
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

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    function tick(now) {
      ctx.clearRect(0, 0, width, height);
      ripples.current = pruneRipples(ripples.current, now);
      for (const ripple of ripples.current) {
        const t = rippleProgress(ripple, now);
        for (const ring of ringsAt(t, ripple.strength)) {
          ctx.beginPath();
          ctx.ellipse(ripple.x, ripple.y, ring.radius, ring.radius * 0.28, 0, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(244, 237, 234, ${ring.alpha})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      }
      frame = window.requestAnimationFrame(tick);
    }
    frame = window.requestAnimationFrame(tick);
    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [visible, reduced]);

  function add(event, strength) {
    const rect = canvasRef.current.getBoundingClientRect();
    ripples.current.push(
      createRipple(event.clientX - rect.left, event.clientY - rect.top, performance.now(), strength),
    );
    if (ripples.current.length > 24) ripples.current.shift();
  }

  function handleMove(event) {
    if (event.buttons !== 1 && event.pointerType === "mouse") {
      // hovering: a faint ripple every ~140 ms of travel
      const now = performance.now();
      const moved = Math.hypot(event.clientX - last.current.x, event.clientY - last.current.y);
      if (now - last.current.t < 140 || moved < 24) return;
      last.current = { x: event.clientX, y: event.clientY, t: now };
      add(event, 0.45);
    }
  }

  return (
    <canvas
      className="water-ripples"
      ref={canvasRef}
      aria-hidden="true"
      onPointerDown={(event) => add(event, 1)}
      onPointerMove={handleMove}
    />
  );
}
