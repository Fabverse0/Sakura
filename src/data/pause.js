export const pauseDurationSeconds = 30;
export const breathCycleSeconds = 10;
export const inhaleSeconds = 4;

/**
 * Breathing patterns. The default stays 4 s in / 6 s out for 30 s, as in
 * PRODUCT.md; the others are optional and chosen by the visitor.
 */
export const breathPatterns = [
  { id: "lembut", label: "Lembut", inhale: 4, exhale: 6, hold: 0, description: "Empat tarik, enam hembus." },
  { id: "kotak", label: "Kotak", inhale: 4, exhale: 4, hold: 4, description: "Empat tarik, tahan, hembus, tahan." },
  { id: "panjang", label: "Hembus panjang", inhale: 4, exhale: 8, hold: 0, description: "Empat tarik, delapan hembus." },
];

export const pauseDurations = [30, 60, 120];
export const defaultPatternId = "lembut";
