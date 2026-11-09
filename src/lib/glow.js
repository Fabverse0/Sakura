/**
 * Fireflies drift toward the pointer, slowly. Given a firefly and the pointer
 * (both in px), returns the next velocity. Pure so it can be tested.
 */
export function attractStep(firefly, pointer, strength = 0.0009) {
  const dx = pointer.x - firefly.x;
  const dy = pointer.y - firefly.y;
  const dist = Math.hypot(dx, dy) || 1;
  const pull = Math.min(1, 220 / dist);
  return {
    vx: firefly.vx * 0.98 + (dx / dist) * strength * pull * 60,
    vy: firefly.vy * 0.98 + (dy / dist) * strength * pull * 60,
  };
}

/** Brightness 0..1 for a firefly at time t (ms), breathing slowly. */
export function fireflyBrightness(t, phase = 0) {
  return 0.35 + 0.65 * Math.sin(t * 0.0021 + phase) ** 2;
}
