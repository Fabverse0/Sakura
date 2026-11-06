/**
 * Three original short poems, one per focus. Each describes only what the
 * painting shows. Lines loosely follow a 5-7-5 rhythm in Indonesian.
 */
export const haiku = [
  {
    viewId: "cabang",
    title: "Cabang",
    lines: ["Ranting merah condong,", "daun gugur menyentuh air,", "perahu menunggu."],
  },
  {
    viewId: "puncak",
    title: "Puncak",
    lines: ["Salju di puncaknya,", "matahari merah diam,", "kabut menahan napas."],
  },
  {
    viewId: "pagoda",
    title: "Pagoda",
    lines: ["Atap bertingkat-tingkat", "berdiri di tepi danau,", "bayangnya bergetar."],
  },
];

export function haikuFor(viewId) {
  return haiku.find((poem) => poem.viewId === viewId) ?? haiku[0];
}
