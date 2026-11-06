import { useEffect, useRef } from "react";
import { useInView } from "../hooks/useInView.js";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion.js";

/**
 * One canvas particle field for every ambient effect on the page:
 * petals, fireflies, maple leaves and snow. Pauses when offscreen or when the
 * tab is hidden; reduced motion keeps a few slow particles.
 */
const palettes = {
  petal: ["#c66661", "#d5c6c2", "#bf1818", "#f4edea"],
  leaf: ["#bf1818", "#a62728", "#d51e1a", "#8f1212"],
  snow: ["#fcfcfc", "#f4edea", "#e7ddd9"],
  firefly: ["#f4edea"],
};

function rand(min, max) {
  return min + Math.random() * (max - min);
}

function spawn(type, width, height, initial) {
  const fromTop = type !== "firefly";
  return {
    x: rand(0, width),
    y: initial ? rand(0, height) : fromTop ? rand(-40, -10) : rand(height * 0.3, height),
    size: type === "snow" ? rand(1.5, 4) : type === "firefly" ? rand(1.5, 3) : rand(6, 13),
    vx: type === "firefly" ? rand(-0.25, 0.25) : rand(-0.35, 0.35),
    vy: type === "snow" ? rand(0.35, 0.9) : type === "firefly" ? rand(-0.2, 0.2) : rand(0.45, 1.1),
    spin: rand(-0.02, 0.02),
    angle: rand(0, Math.PI * 2),
    sway: rand(0.004, 0.012),
    phase: rand(0, Math.PI * 2),
    color: palettes[type][Math.floor(rand(0, palettes[type].length))],
  };
}

function drawPetal(ctx, p) {
  const s = p.size;
  ctx.beginPath();
  ctx.moveTo(0, -s);
  ctx.bezierCurveTo(s * 0.9, -s * 0.6, s * 0.7, s * 0.7, 0, s);
  ctx.bezierCurveTo(-s * 0.7, s * 0.7, -s * 0.9, -s * 0.6, 0, -s);
  ctx.fill();
  // the small notch of a sakura petal
  ctx.globalCompositeOperation = "destination-out";
  ctx.beginPath();
  ctx.moveTo(-s * 0.18, -s);
  ctx.lineTo(0, -s * 0.72);
  ctx.lineTo(s * 0.18, -s);
  ctx.fill();
  ctx.globalCompositeOperation = "source-over";
}

function drawLeaf(ctx, p) {
  const s = p.size;
  ctx.beginPath();
  for (let i = 0; i < 5; i++) {
    const a = -Math.PI / 2 + (i * Math.PI * 2) / 5;
    const b = a + Math.PI / 5;
    ctx.lineTo(Math.cos(a) * s, Math.sin(a) * s);
    ctx.lineTo(Math.cos(b) * s * 0.42, Math.sin(b) * s * 0.42);
  }
  ctx.closePath();
  ctx.fill();
}

function drawSnow(ctx, p) {
  ctx.beginPath();
  ctx.arc(0, 0, p.size, 0, Math.PI * 2);
  ctx.fill();
}

function drawFirefly(ctx, p, t) {
  const glow = 0.45 + 0.55 * Math.sin(t * 0.003 + p.phase) ** 2;
  const r = p.size * 6;
  const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, r);
  gradient.addColorStop(0, `rgb(244 237 234 / ${0.95 * glow})`);
  gradient.addColorStop(0.25, `rgb(232 200 150 / ${0.45 * glow})`);
  gradient.addColorStop(1, "rgb(232 200 150 / 0)");
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.fill();
}

const drawers = { petal: drawPetal, leaf: drawLeaf, snow: drawSnow, firefly: drawFirefly };

export function Particles({ type = "petal", count = 24, className = "" }) {
  const canvasRef = useRef(null);
  const isVisible = useInView(canvasRef);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isVisible) return undefined;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const total = reducedMotion ? Math.min(6, count) : count;
    const speed = reducedMotion ? 0.35 : 1;
    let width = 0;
    let height = 0;
    let particles = [];
    let frame = 0;

    function resize() {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!particles.length) {
        particles = Array.from({ length: total }, () => spawn(type, width, height, true));
      }
    }

    const draw = drawers[type] ?? drawPetal;

    function tick(t) {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.phase += p.sway * speed * 6;
        p.x += (p.vx + Math.sin(p.phase) * (type === "snow" ? 0.25 : 0.6)) * speed;
        p.y += p.vy * speed;
        p.angle += p.spin * speed;
        const out =
          type === "firefly"
            ? p.x < -30 || p.x > width + 30 || p.y < -30 || p.y > height + 30
            : p.y > height + 30;
        if (out) particles[i] = spawn(type, width, height, false);
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = type === "firefly" ? 1 : 0.88;
        draw(ctx, p, t);
        ctx.restore();
      }
      frame = window.requestAnimationFrame(tick);
    }

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    frame = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [type, count, isVisible, reducedMotion]);

  return <canvas className={`particles ${className}`.trim()} ref={canvasRef} aria-hidden="true" />;
}
