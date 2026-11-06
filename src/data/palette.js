/**
 * Colours sampled from the painting: k-means (k = 10) over a 160x90 copy of
 * public/images/sakura-landscape-640.jpg, then each centroid paired with a
 * point in the painting where that colour appears (percent of width/height).
 */
export const palette = [
  { id: "sumi", name: "Sumi ranting", hex: "#1e1a22", x: 15, y: 33, note: "Tinta gelap pada batang dan ranting maple." },
  { id: "maple", name: "Merah maple", hex: "#a62728", x: 22, y: 26, note: "Daun maple yang paling pekat di kanopi." },
  { id: "kelopak", name: "Daun gugur", hex: "#c66661", x: 40, y: 17, note: "Daun yang melayang, lebih terang dari kanopi." },
  { id: "kabut-mawar", name: "Kabut mawar", hex: "#d5c6c2", x: 14, y: 58, note: "Kabut hangat di balik cabang kiri." },
  { id: "debu-senja", name: "Debu senja", hex: "#baa6a2", x: 53, y: 9, note: "Langit kemerahan di atas gunung." },
  { id: "abu-fuji", name: "Abu Fuji", hex: "#8a8381", x: 51, y: 41, note: "Lereng gunung yang tertutup kabut." },
  { id: "bayangan-pagoda", name: "Bayangan pagoda", hex: "#524246", x: 98, y: 48, note: "Pepohonan gelap di tepi kanan." },
  { id: "air-berkabut", name: "Air berkabut", hex: "#e7ddd9", x: 61, y: 92, note: "Permukaan danau yang memantulkan kabut." },
  { id: "salju-senja", name: "Salju senja", hex: "#f4edea", x: 81, y: 40, note: "Cahaya pucat di belakang pagoda." },
  { id: "langit-kertas", name: "Langit kertas", hex: "#fcfcfc", x: 77, y: 4, note: "Langit kosong yang dibiarkan putih." },
];

/** Relative luminance, used to pick a readable label colour on each swatch. */
export function luminance(hex) {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function labelColorFor(hex) {
  return luminance(hex) > 0.28 ? "#141211" : "#f2eee7";
}
