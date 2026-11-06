export const maxNoteLength = 280;
export const maxNotes = 50;
export const journalKey = "sakura:jurnal";

export const noteTags = [
  { id: "umum", label: "Umum" },
  { id: "cabang", label: "Cabang" },
  { id: "puncak", label: "Puncak" },
  { id: "pagoda", label: "Pagoda" },
];

export function isNote(value) {
  return (
    value &&
    typeof value.id === "string" &&
    typeof value.text === "string" &&
    typeof value.createdAt === "number" &&
    noteTags.some((tag) => tag.id === value.tag)
  );
}

export function isNoteList(value) {
  return Array.isArray(value) && value.every(isNote);
}

/** Returns an error message, or null when the text can be saved. */
export function validateNoteText(text) {
  const trimmed = text.trim();
  if (!trimmed) return "Tulis sesuatu dulu sebelum menyimpan.";
  if (trimmed.length > maxNoteLength) return `Catatan maksimal ${maxNoteLength} karakter.`;
  return null;
}

export function createNote(text, tag = "umum", now = Date.now()) {
  return {
    id: `${now.toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
    text: text.trim().slice(0, maxNoteLength),
    tag,
    createdAt: now,
  };
}

/** Newest first, capped at maxNotes. */
export function addNote(notes, note) {
  return [note, ...notes].slice(0, maxNotes);
}

export function removeNote(notes, id) {
  return notes.filter((note) => note.id !== id);
}

/** Put a removed note back where it was. */
export function restoreNote(notes, note, index) {
  const next = [...notes];
  next.splice(Math.min(index, next.length), 0, note);
  return next.slice(0, maxNotes);
}

const dateFormatter = new Intl.DateTimeFormat("id-ID", {
  day: "numeric",
  month: "long",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

export function formatNoteDate(timestamp) {
  return dateFormatter.format(new Date(timestamp));
}
