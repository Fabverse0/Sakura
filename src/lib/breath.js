/**
 * Pure breathing-phase maths. A cycle is: inhale, optional hold, exhale,
 * optional hold (box breathing holds after the exhale too).
 */
export function cycleLength(pattern) {
  return pattern.inhale + pattern.exhale + pattern.hold * (pattern.id === "kotak" ? 2 : 0);
}

/** Phase at `elapsed` seconds: { phase: inhale|hold-in|exhale|hold-out, left } */
export function phaseAt(pattern, elapsed) {
  const holdAfterInhale = pattern.id === "kotak" ? pattern.hold : 0;
  const holdAfterExhale = pattern.id === "kotak" ? pattern.hold : 0;
  let t = elapsed % cycleLength(pattern);
  if (t < pattern.inhale) return { phase: "inhale", left: pattern.inhale - t };
  t -= pattern.inhale;
  if (t < holdAfterInhale) return { phase: "hold-in", left: holdAfterInhale - t };
  t -= holdAfterInhale;
  if (t < pattern.exhale) return { phase: "exhale", left: pattern.exhale - t };
  t -= pattern.exhale;
  return { phase: "hold-out", left: holdAfterExhale - t };
}

export const phaseCopy = {
  inhale: "Tarik napas pelan.",
  "hold-in": "Tahan sebentar.",
  exhale: "Hembuskan perlahan.",
  "hold-out": "Tunggu sejenak.",
};

export function cyclesIn(pattern, seconds) {
  return Math.floor(seconds / cycleLength(pattern));
}
