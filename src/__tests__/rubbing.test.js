import { describe, expect, it } from "vitest";
import { grainAt, inkAt, seeded } from "../lib/rubbing.js";

describe("rubbing", () => {
  it("grain is deterministic and stays in 0..1", () => {
    expect(grainAt(10, 20, 3)).toBe(grainAt(10, 20, 3));
    for (let x = 0; x < 50; x++) {
      const g = grainAt(x, x * 2, 9);
      expect(g).toBeGreaterThanOrEqual(0);
      expect(g).toBeLessThan(1);
    }
  });

  it("ink follows pressure and never leaves 0..1", () => {
    expect(inkAt(5, 5, 0)).toBe(0);
    expect(inkAt(5, 5, 2)).toBeLessThanOrEqual(1);
    expect(inkAt(5, 5, 0.5)).toBeLessThan(inkAt(5, 5, 1));
  });

  it("seeded generator gives values in range", () => {
    const rand = seeded(42);
    for (let i = 0; i < 100; i++) {
      const v = rand();
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThan(1);
    }
  });
});
