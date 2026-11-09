import { describe, expect, it } from "vitest";
import { phrases } from "../data/phrases.js";
import { composePoem, cycle, isComplete, isMetrical, randomSelection } from "../lib/composer.js";

describe("haiku composer", () => {
  it("keeps every phrase on its 5-7-5 line", () => {
    for (const phrase of phrases.first) expect(phrase.syllables).toBe(5);
    for (const phrase of phrases.second) expect(phrase.syllables).toBe(7);
    for (const phrase of phrases.third) expect(phrase.syllables).toBe(5);
  });

  it("composes only complete selections", () => {
    expect(composePoem({ first: "f1", second: "s1" })).toBeNull();
    const poem = composePoem({ first: "f1", second: "s1", third: "t1" });
    expect(poem).toEqual(["Daun merah gugur", "menyentuh air yang tenang", "aku ikut diam"]);
    expect(isComplete({ first: "f1" })).toBe(false);
  });

  it("random selections are complete and metrical", () => {
    let seed = 7;
    const random = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    const pick = randomSelection(random);
    expect(isComplete(pick)).toBe(true);
    expect(isMetrical(pick)).toBe(true);
  });

  it("cycles through a column and wraps", () => {
    expect(cycle("first", "f5")).toBe("f1");
    expect(cycle("first", "f1", -1)).toBe("f5");
  });
});
