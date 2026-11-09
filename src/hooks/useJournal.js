import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage.js";
import { addNote, createNote, isNoteList, journalKey, sanitizeNotes } from "../lib/journal.js";

/** Shared journal state so any room (haiku maker, hanko, finder) can add a note. */
export function useJournal() {
  const [notes, setNotes, isPersistent] = useLocalStorage(journalKey, [], isNoteList, sanitizeNotes);
  const add = useCallback(
    (text, tag = "umum") => setNotes((current) => addNote(current, createNote(text, tag))),
    [setNotes],
  );
  return { notes, setNotes, isPersistent, add };
}
