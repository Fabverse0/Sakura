export const zoomLevels = [2, 3, 4];
export const minZoom = 1.5;
export const maxZoom = 5;

export function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

/** Keep the lens centre inside the painting (percent units). */
export function clampPosition({ x, y }) {
  return { x: clamp(x, 0, 100), y: clamp(y, 0, 100) };
}

/** Arrow-key step: 2% by default, 8% with Shift. */
export function stepPosition(position, key, big = false) {
  const step = big ? 8 : 2;
  const moves = {
    ArrowLeft: [-step, 0],
    ArrowRight: [step, 0],
    ArrowUp: [0, -step],
    ArrowDown: [0, step],
  };
  const move = moves[key];
  if (!move) return position;
  return clampPosition({ x: position.x + move[0], y: position.y + move[1] });
}

export function nudgeZoom(zoom, delta) {
  return clamp(Math.round((zoom + delta) * 10) / 10, minZoom, maxZoom);
}

/**
 * Geometry for a square lens of `size` px over a stage of width x height px.
 * Returns the lens translation and the magnified background size/position.
 */
export function lensGeometry({ width, height, x, y, zoom, size }) {
  const cx = (x / 100) * width;
  const cy = (y / 100) * height;
  return {
    tx: cx - size / 2,
    ty: cy - size / 2,
    bgWidth: width * zoom,
    bgHeight: height * zoom,
    bgX: -(cx * zoom - size / 2),
    bgY: -(cy * zoom - size / 2),
  };
}
