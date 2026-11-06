/**
 * Things visible in the painting, located on the full 16:9 image (percent of
 * width / height). Measured on public/images/sakura-landscape-640.jpg.
 * `radius` is the hit tolerance (percent of width) for the finding game.
 */
export const areas = [
  { id: "kanopi", name: "Kanopi maple merah", x: 14, y: 17, radius: 9, hint: "kiri atas" },
  { id: "batang", name: "Batang maple tua", x: 6, y: 55, radius: 5, hint: "tepi kiri" },
  { id: "puncak", name: "Puncak Gunung Fuji", x: 58, y: 26, radius: 5, hint: "tengah atas" },
  { id: "matahari", name: "Matahari merah", x: 73, y: 22, radius: 4.5, hint: "kanan atas" },
  { id: "burung", name: "Kawanan burung kecil", x: 74, y: 35, radius: 4, hint: "kanan Fuji" },
  { id: "kabut", name: "Kabut di kaki gunung", x: 52, y: 44, radius: 7, hint: "tengah" },
  { id: "pagoda", name: "Pagoda bertingkat", x: 71, y: 57, radius: 4.5, hint: "kanan tengah" },
  { id: "pohon-kecil", name: "Pohon kecil di tepi pagoda", x: 63, y: 62, radius: 3.5, hint: "kiri pagoda" },
  { id: "pohon-gundul", name: "Pohon gundul di kanan", x: 92, y: 39, radius: 5, hint: "tepi kanan" },
  { id: "perahu", name: "Perahu kayu", x: 31, y: 84, radius: 5, hint: "kiri bawah" },
  { id: "pemancing", name: "Pemancing di perahu", x: 28, y: 79, radius: 3, hint: "di atas perahu" },
  { id: "kelopak-air", name: "Daun merah di permukaan air", x: 16, y: 92, radius: 6, hint: "bawah kiri" },
  { id: "pantulan", name: "Pantulan matahari di air", x: 73, y: 97, radius: 4, hint: "bawah kanan" },
];

export function nearestArea(x, y) {
  let best = areas[0];
  let bestDistance = Infinity;
  for (const area of areas) {
    const distance = Math.hypot(area.x - x, (area.y - y) * (9 / 16));
    if (distance < bestDistance) {
      bestDistance = distance;
      best = area;
    }
  }
  return { area: best, distance: bestDistance };
}
