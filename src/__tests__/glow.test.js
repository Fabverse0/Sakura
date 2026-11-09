import { describe, expect, it } from "vitest";
import { attractStep, fireflyBrightness } from "../lib/glow.js";

describe("firefly glow", () => {
  it("is pulled toward the pointer", () => {
    const next = attractStep({ x: 0, y: 0, vx: 0, vy: 0 }, { x: 100, y: 0 });
    expect(next.vx).toBeGreaterThan(0);
    expect(Math.abs(next.vy)).toBeLessThan(1e-9);
  });

  it("stays between 0.35 and 1 brightness", () => {
    for (let t = 0; t < 10000; t += 137) {
      const b = fireflyBrightness(t, 0.4);
      expect(b).toBeGreaterThanOrEqual(0.35);
      expect(b).toBeLessThanOrEqual(1);
    }
  });
});
