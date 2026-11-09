import { describe, expect, it } from "vitest";
import { areas } from "../data/areas.js";
import { haiku } from "../data/haiku.js";
import { labelColorFor, palette } from "../data/palette.js";
import { seasons } from "../data/seasons.js";
import { sections } from "../data/sections.js";
import { views } from "../data/views.js";

describe("content data", () => {
  it("places every area inside the painting", () => {
    for (const area of areas) {
      expect(area.x).toBeGreaterThanOrEqual(0);
      expect(area.x).toBeLessThanOrEqual(100);
      expect(area.y).toBeGreaterThanOrEqual(0);
      expect(area.y).toBeLessThanOrEqual(100);
      expect(area.name.trim()).not.toBe("");
    }
  });

  it("has one three-line poem per focus", () => {
    expect(haiku.map((poem) => poem.viewId)).toEqual(views.map((view) => view.id));
    for (const poem of haiku) expect(poem.lines).toHaveLength(3);
  });

  it("uses valid hex colours with readable labels", () => {
    for (const color of palette) {
      expect(color.hex).toMatch(/^#[0-9a-f]{6}$/);
      expect(["#141211", "#f2eee7"]).toContain(labelColorFor(color.hex));
    }
    expect(labelColorFor("#1e1a22")).toBe("#f2eee7");
    expect(labelColorFor("#fcfcfc")).toBe("#141211");
  });

  it("keeps ids unique across rooms and seasons", () => {
    expect(new Set(sections.map((s) => s.id)).size).toBe(sections.length);
    expect(seasons.map((s) => s.id)).toEqual(["semi", "panas", "gugur", "dingin"]);
  });
});

import { shortcuts } from "../data/shortcuts.js";

describe("shortcuts", () => {
  it("uses unique single keys", () => {
    const keys = shortcuts.map((s) => s.key);
    expect(new Set(keys).size).toBe(keys.length);
    for (const key of keys) expect(key).toHaveLength(1);
  });
});

import { readPercent } from "../lib/progress.js";

describe("reading progress", () => {
  it("is 0 at the top, 100 at the bottom and clamped", () => {
    expect(readPercent(0, 3000, 900)).toBe(0);
    expect(readPercent(2100, 3000, 900)).toBe(100);
    expect(readPercent(5000, 3000, 900)).toBe(100);
    expect(readPercent(1050, 3000, 900)).toBe(50);
  });

  it("treats a page shorter than the viewport as fully read", () => {
    expect(readPercent(0, 500, 900)).toBe(100);
  });
});

import { paletteAsText } from "../lib/palette.js";

describe("palette export", () => {
  it("lists every colour once, one per line", () => {
    const text = paletteAsText([
      { name: "Sumi", hex: "#1e1a22" },
      { name: "Maple", hex: "#a62728" },
    ]);
    expect(text.split("\n")).toEqual(["Sumi\t#1E1A22", "Maple\t#A62728"]);
  });
});
