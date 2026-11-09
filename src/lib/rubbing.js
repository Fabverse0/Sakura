/**
 * Rubbing (jiplak): a grain pattern of seeded pseudo-random dots. Brushing the
 * canvas "rubs" ink into the paper wherever the grain is raised. Pure helpers
 * so the maths can be tested without a canvas.
 */
export function seeded(seed) {
  let state = seed >>> 0 || 1;
  return () => {
    state ^= state << 13;
    state ^= state >>> 17;
    state ^= state << 5;
    return ((state >>> 0) % 100000) / 100000;
  };
}

/** Grain height (0..1) at a point; deterministic for a given seed. */
export function grainAt(x, y, seed = 1) {
  const n = Math.sin(x * 12.9898 + y * 78.233 + seed * 37.719) * 43758.5453;
  return n - Math.floor(n);
}

/** Ink strength for a brush touch: stronger where the grain is higher. */
export function inkAt(x, y, pressure = 1, seed = 1) {
  const grain = grainAt(x, y, seed);
  return Math.max(0, Math.min(1, pressure * (0.35 + grain * 0.9)));
}
