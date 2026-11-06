import { describe, expect, it } from "vitest";
import { clampPosition, lensGeometry, nudgeZoom, stepPosition } from "../lib/lens.js";

describe("lens helpers", () => {
  it("clamps the lens centre to the painting", () => {
    expect(clampPosition({ x: -5, y: 120 })).toEqual({ x: 0, y: 100 });
  });

  it("steps 2% normally and 8% with Shift", () => {
    expect(stepPosition({ x: 50, y: 50 }, "ArrowRight")).toEqual({ x: 52, y: 50 });
    expect(stepPosition({ x: 50, y: 50 }, "ArrowUp", true)).toEqual({ x: 50, y: 42 });
    expect(stepPosition({ x: 50, y: 50 }, "Enter")).toEqual({ x: 50, y: 50 });
  });

  it("keeps zoom between 1.5x and 5x", () => {
    expect(nudgeZoom(4.9, 0.5)).toBe(5);
    expect(nudgeZoom(1.6, -0.5)).toBe(1.5);
  });

  it("centres the magnified background under the lens", () => {
    const g = lensGeometry({ width: 1000, height: 500, x: 50, y: 50, zoom: 2, size: 200 });
    expect(g.tx).toBe(400);
    expect(g.ty).toBe(150);
    expect(g.bgWidth).toBe(2000);
    // centre of the painting (500,250) * 2 = (1000,500) should sit at lens centre (100,100)
    expect(g.bgX).toBe(-900);
    expect(g.bgY).toBe(-400);
  });
});
