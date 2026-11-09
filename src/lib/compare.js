export function clampPercent(value) {
  return Math.min(100, Math.max(0, value));
}

export function percentFromPointer(clientX, rect) {
  return clampPercent(((clientX - rect.left) / rect.width) * 100);
}

/** Keyboard: arrows move 2%, Shift 10%, Home/End jump to the ends. */
export function nextPercent(current, key, shift = false) {
  const step = shift ? 10 : 2;
  if (key === "ArrowLeft" || key === "ArrowDown") return clampPercent(current - step);
  if (key === "ArrowRight" || key === "ArrowUp") return clampPercent(current + step);
  if (key === "Home") return 0;
  if (key === "End") return 100;
  return current;
}
