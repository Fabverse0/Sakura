/**
 * Water ripples: each ripple is a set of concentric ellipses that grow and
 * fade. Pure state helpers so the drawing loop stays tiny and testable.
 */
export const rippleLife = 2400; // ms

export function createRipple(x, y, now, strength = 1) {
  return { x, y, born: now, strength };
}

/** 0..1 progress, or null once the ripple has finished. */
export function rippleProgress(ripple, now) {
  const t = (now - ripple.born) / rippleLife;
  return t >= 1 ? null : Math.max(0, t);
}

export function pruneRipples(ripples, now) {
  return ripples.filter((ripple) => rippleProgress(ripple, now) !== null);
}

/** Rings for one ripple at progress t: radius (px) and alpha. */
export function ringsAt(t, strength = 1, count = 3) {
  const rings = [];
  for (let i = 0; i < count; i++) {
    const local = t - i * 0.12;
    if (local <= 0) continue;
    const eased = 1 - (1 - local) ** 3;
    rings.push({ radius: eased * 120 * strength, alpha: (1 - local) * 0.55 });
  }
  return rings;
}
