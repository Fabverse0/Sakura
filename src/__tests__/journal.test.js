import { describe, expect, it } from "vitest";
import {
  addNote,
  createNote,
  isNoteList,
  maxNoteLength,
  maxNotes,
  removeNote,
  restoreNote,
  validateNoteText,
} from "../lib/journal.js";

describe("journal", () => {
  it("validates empty and overlong text", () => {
    expect(validateNoteText("   ")).toMatch(/Tulis sesuatu/);
    expect(validateNoteText("x".repeat(maxNoteLength + 1))).toMatch(/maksimal/);
    expect(validateNoteText("Perahu menunggu.")).toBeNull();
  });

  it("creates trimmed notes and keeps the newest first, capped", () => {
    const note = createNote("  halo  ", "pagoda", 1000);
    expect(note.text).toBe("halo");
    let notes = [];
    for (let i = 0; i < maxNotes + 5; i++) notes = addNote(notes, createNote(`n${i}`, "umum", i));
    expect(notes).toHaveLength(maxNotes);
    expect(notes[0].text).toBe(`n${maxNotes + 4}`);
  });

  it("restores a removed note at its old position", () => {
    const notes = ["a", "b", "c"].map((t, i) => createNote(t, "umum", i));
    const removed = removeNote(notes, notes[1].id);
    expect(restoreNote(removed, notes[1], 1).map((n) => n.text)).toEqual(["a", "b", "c"]);
  });

  it("rejects corrupt stored data", () => {
    expect(isNoteList([{ id: 1 }])).toBe(false);
    expect(isNoteList("oops")).toBe(false);
    expect(isNoteList([createNote("ok", "cabang")])).toBe(true);
  });
});
