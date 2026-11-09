import { describe, expect, it } from "vitest";
import { hankoList } from "../data/hanko.js";
import { earn, hasHanko, progress, sanitizeHanko } from "../lib/hanko.js";

describe("hanko", () => {
  it("earns a stamp once and ignores unknown ids", () => {
    const first = earn([], "lensa", 10);
    expect(first).toEqual([{ id: "lensa", at: 10 }]);
    expect(earn(first, "lensa", 20)).toBe(first);
    expect(earn(first, "tidak-ada", 30)).toBe(first);
    expect(hasHanko(first, "lensa")).toBe(true);
  });

  it("sanitises stored data", () => {
    const stored = [
      { id: "lensa", at: 1 },
      { id: "lensa", at: 2 },
      { id: "hantu", at: 3 },
      { id: "haiku" },
    ];
    expect(sanitizeHanko(stored)).toEqual([{ id: "lensa", at: 1 }]);
    expect(sanitizeHanko("oops")).toEqual([]);
  });

  it("reports progress against the full list", () => {
    expect(progress([{ id: "buka", at: 1 }])).toEqual({ count: 1, total: hankoList.length });
  });

  it("has unique ids and a glyph for every stamp", () => {
    expect(new Set(hankoList.map((h) => h.id)).size).toBe(hankoList.length);
    for (const item of hankoList) expect(item.glyph).toHaveLength(1);
  });
});
