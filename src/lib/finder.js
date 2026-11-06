/** Painting aspect: y distances are scaled so the hit area is round on screen. */
const aspect = 9 / 16;

export function distanceTo(area, x, y) {
  return Math.hypot(area.x - x, (area.y - y) * aspect);
}

/** True when a guess at (x, y) percent lands on the area, with tolerance. */
export function isHit(area, x, y, tolerance = 1) {
  return distanceTo(area, x, y) <= area.radius * tolerance;
}

/** Rough direction from a guess toward the target, in Indonesian. */
export function directionHint(area, x, y) {
  const dx = area.x - x;
  const dy = area.y - y;
  const horizontal = Math.abs(dx) < 4 ? "" : dx > 0 ? "kanan" : "kiri";
  const vertical = Math.abs(dy) < 6 ? "" : dy > 0 ? "bawah" : "atas";
  if (!horizontal && !vertical) return "Sangat dekat.";
  return `Coba lebih ke ${[vertical, horizontal].filter(Boolean).join(" ")}.`;
}

/** Deterministic shuffle when given a seeded random, used to pick a round. */
export function pickRound(areas, count, random = Math.random) {
  const pool = [...areas];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, count);
}

export function formatDuration(ms) {
  const total = Math.round(ms / 1000);
  const minutes = Math.floor(total / 60);
  const seconds = String(total % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
}
