/**
 * Hanko (stamps) the visitor earns by doing things in the rooms. Each stamp is
 * a square seal with one authored glyph. Earned stamps are stored locally.
 */
export const hankoList = [
  { id: "buka", glyph: "桜", name: "Pembuka", how: "Membuka halaman.", room: "panorama" },
  { id: "fokus", glyph: "景", name: "Pemandang", how: "Memilih ketiga fokus panorama.", room: "panorama" },
  { id: "lensa", glyph: "眼", name: "Mata dekat", how: "Memakai lensa pandang.", room: "lensa" },
  { id: "temukan", glyph: "見", name: "Pencari", how: "Menemukan semua detail dalam satu ronde.", room: "temukan" },
  { id: "haiku", glyph: "詩", name: "Penyair", how: "Menyusun dan menyimpan sebuah haiku.", room: "haiku" },
  { id: "musim", glyph: "季", name: "Empat musim", how: "Melihat keempat musim.", room: "musim" },
  { id: "napas", glyph: "息", name: "Pernapas", how: "Menyelesaikan satu jeda napas.", room: "pause-experience" },
  { id: "catatan", glyph: "記", name: "Pencatat", how: "Menulis satu catatan di jurnal.", room: "jurnal" },
  { id: "tinta", glyph: "墨", name: "Pelukis tinta", how: "Menyimpan lukisan dari kanvas sumi.", room: "kanvas" },
];

export const hankoStorageKey = "sakura:hanko";

export function hankoById(id) {
  return hankoList.find((item) => item.id === id);
}
