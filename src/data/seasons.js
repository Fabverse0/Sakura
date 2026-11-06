/**
 * Empat Musim: an imagined recolouring of the same painting. These are
 * interpretations, not claims about how the depicted place looks.
 * Filters are static (never animated); the change between seasons is a wipe.
 */
export const seasons = [
  {
    id: "semi",
    label: "Semi",
    title: "Musim semi",
    particle: "petal",
    filter: "hue-rotate(-14deg) saturate(0.62) brightness(1.1) contrast(0.94)",
    overlay: { color: "#d5c6c2", blend: "soft-light", opacity: 0.55 },
    tone: "#c66661",
    note: "Bayangkan merah maple melunak menjadi kelopak merah muda, dan udara di kaki gunung terasa lebih hangat.",
  },
  {
    id: "panas",
    label: "Panas",
    title: "Musim panas",
    particle: "firefly",
    filter: "hue-rotate(108deg) saturate(0.7) brightness(0.92) contrast(1.05)",
    overlay: { color: "#1e1a22", blend: "multiply", opacity: 0.28 },
    tone: "#8a8381",
    note: "Dalam tafsir ini daun berubah hijau tua, senja turun lebih lambat, dan cahaya kecil melayang di atas danau.",
  },
  {
    id: "gugur",
    label: "Gugur",
    title: "Musim gugur",
    particle: "leaf",
    filter: "saturate(1.12) contrast(1.04)",
    overlay: { color: "#a62728", blend: "soft-light", opacity: 0.18 },
    tone: "#bf1818",
    note: "Warna lukisan aslinya: maple merah menyala, daun berguguran ke permukaan air di dekat perahu.",
  },
  {
    id: "dingin",
    label: "Dingin",
    title: "Musim dingin",
    particle: "snow",
    filter: "grayscale(0.88) brightness(1.12) contrast(0.92)",
    overlay: { color: "#e7ddd9", blend: "screen", opacity: 0.3 },
    tone: "#e7ddd9",
    note: "Bayangkan merah memudar di bawah salju tipis, gunung dan pagoda menyatu dengan kabut putih.",
  },
];

export const defaultSeasonId = "gugur";

export function findSeason(id) {
  return seasons.find((season) => season.id === id) ?? seasons[2];
}
