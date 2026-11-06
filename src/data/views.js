export const views = [
  {
    id: "cabang",
    label: "Cabang",
    title: "Kanopi merah",
    description: "Ranting dan daun merah membingkai sisi kiri panorama.",
    routePrompt: "Mulailah dari ranting dan daun merah di sisi kiri panorama.",
    origin: "17% 52%",
  },
  {
    id: "puncak",
    label: "Puncak",
    title: "Gunung Fuji",
    description: "Gunung Fuji berdiri di tengah, di bawah matahari merah.",
    routePrompt: "Lanjutkan ke Gunung Fuji di tengah, tepat di bawah matahari merah.",
    origin: "52% 40%",
  },
  {
    id: "pagoda",
    label: "Pagoda",
    title: "Pagoda di tepi air",
    description: "Pagoda bertingkat berdiri di tepi danau, dengan pantulan di permukaan air.",
    routePrompt: "Akhiri dengan melihat pagoda bertingkat dan pantulannya di danau.",
    origin: "72% 57%",
  },
];

export const overviewNote = "Pilih satu fokus untuk membaca detail yang terlihat di panorama.";

export function findView(viewId) {
  return views.find((view) => view.id === viewId);
}
