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

/** Keep every valid note from stored data; drop only the broken ones. */
export function sanitizeNotes(value) {
  return Array.isArray(value) ? value.filter(isNote) : [];
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

/** Replace one note's text (trimmed and capped). Other fields are kept. */
export function updateNoteText(notes, id, text) {
  const trimmed = text.trim().slice(0, maxNoteLength);
  return notes.map((note) => (note.id === id ? { ...note, text: trimmed } : note));
}

const rtf = new Intl.RelativeTimeFormat("id", { numeric: "auto" });

/** "baru saja", "2 jam yang lalu", "kemarin"; falls back to the full date after a week. */
export function relativeTime(timestamp, now = Date.now()) {
  const diff = timestamp - now;
  const minutes = Math.round(diff / 60000);
  if (Math.abs(minutes) < 1) return "baru saja";
  if (Math.abs(minutes) < 60) return rtf.format(minutes, "minute");
  const hours = Math.round(minutes / 60);
  if (Math.abs(hours) < 24) return rtf.format(hours, "hour");
  const days = Math.round(hours / 24);
  if (Math.abs(days) < 7) return rtf.format(days, "day");
  return formatNoteDate(timestamp);
}
