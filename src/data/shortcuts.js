/**
 * Global keyboard shortcuts for the engawa walk. Shown in the Ruang panel and
 * in the footer. Keys are plain letters so they never clash with browser shortcuts.
 */
export const shortcuts = [
  { key: "p", label: "Panorama", target: "panorama" },
  { key: "d", label: "Detail", target: "detail" },
  { key: "l", label: "Lensa", target: "lensa" },
  { key: "h", label: "Haiku", target: "haiku" },
  { key: "r", label: "Rute", target: "rute" },
  { key: "m", label: "Musim", target: "musim" },
  { key: "j", label: "Jeda", target: "pause-experience" },
  { key: "k", label: "Kanvas", target: "kanvas" },
  { key: "n", label: "Malam / siang", target: "__night" },
  { key: "?", label: "Pintasan ini", target: "__help" },
];

export function shortcutFor(key) {
  return shortcuts.find((item) => item.key === key.toLowerCase());
}
