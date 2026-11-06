/**
 * Every room of the engawa walk, in scroll order. `id` is the DOM id of the
 * section; `summary` is shown in the Ruang panel.
 */
export const sections = [
  { id: "panorama", label: "Panorama", summary: "Lukisan utuh dan tiga fokus." },
  { id: "detail", label: "Detail", summary: "Cabang, Puncak, dan Pagoda dari dekat." },
  { id: "lensa", label: "Lensa", summary: "Kaca pembesar di atas lukisan." },
  { id: "temukan", label: "Temukan", summary: "Cari benda kecil yang tersembunyi." },
  { id: "haiku", label: "Haiku", summary: "Tiga sajak pendek, satu untuk tiap fokus." },
  { id: "rute", label: "Rute", summary: "Ikuti tiga fokus secara berurutan." },
  { id: "musim", label: "Musim", summary: "Lukisan yang sama dalam empat warna musim." },
  { id: "palet", label: "Palet", summary: "Warna-warna yang diambil dari lukisan." },
  { id: "pause-experience", label: "Jeda", summary: "Tiga tarikan napas selama 30 detik." },
  { id: "jurnal", label: "Jurnal", summary: "Catatan pribadi yang tersimpan di peramban." },
  { id: "kanvas", label: "Kanvas", summary: "Melukis bebas dengan tinta sumi." },
];

export function sectionHref(id) {
  return `#${id}`;
}
