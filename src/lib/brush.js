/**
 * Sumi brush model. Points are stored normalised (0..1) so strokes survive a
 * canvas resize; widths are stored in CSS pixels at the brush's base size.
 */

/** Mouse reports pressure 0.5 (or 0); only trust other values. */
export function hasRealPressure(pressure) {
  return pressure > 0 && pressure !== 0.5;
}

/**
 * Target width from pressure (pen) or speed (mouse: fast = thin), low-pass
 * filtered against the previous width so the stroke swells and tapers.
 */
export function nextWidth({ previous, pressure, velocity, size }) {
  const target = hasRealPressure(pressure)
    ? 0.25 + pressure * 0.95
    : Math.max(0.18, 1.1 - velocity * 0.55);
  const smoothed = previous + (target * size - previous) * 0.28;
  return Math.max(size * 0.12, Math.min(size * 1.35, smoothed));
}

export function midpoint(a, b) {
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
}

/** Taper the last few points toward a hairline so strokes end like a brush lift. */
export function taperEnd(points, count = 4) {
  return points.map((point, index) => {
    const fromEnd = points.length - 1 - index;
    if (fromEnd >= count) return point;
    return { ...point, w: point.w * ((fromEnd + 1) / (count + 1)) };
  });
}

/* Undo / redo history: two stacks, both immutable. */
export function emptyHistory() {
  return { strokes: [], undone: [] };
}

export function commitStroke(history, stroke) {
  return { strokes: [...history.strokes, stroke], undone: [] };
}

export function undo(history) {
  if (!history.strokes.length) return history;
  const last = history.strokes[history.strokes.length - 1];
  return { strokes: history.strokes.slice(0, -1), undone: [...history.undone, last] };
}

export function redo(history) {
  if (!history.undone.length) return history;
  const next = history.undone[history.undone.length - 1];
  return { strokes: [...history.strokes, next], undone: history.undone.slice(0, -1) };
}
