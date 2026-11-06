import { describe, expect, it } from "vitest";
import {
  commitStroke,
  emptyHistory,
  hasRealPressure,
  nextWidth,
  redo,
  taperEnd,
  undo,
} from "../lib/brush.js";

describe("brush model", () => {
  it("ignores the default mouse pressure", () => {
    expect(hasRealPressure(0.5)).toBe(false);
    expect(hasRealPressure(0)).toBe(false);
    expect(hasRealPressure(0.8)).toBe(true);
  });

  it("draws thinner when moving fast", () => {
    const slow = nextWidth({ previous: 10, pressure: 0.5, velocity: 0.1, size: 14 });
    const fast = nextWidth({ previous: 10, pressure: 0.5, velocity: 2, size: 14 });
    expect(fast).toBeLessThan(slow);
  });

  it("tapers the end of a stroke", () => {
    const points = Array.from({ length: 8 }, (_, i) => ({ x: i, y: 0, w: 10 }));
    const tapered = taperEnd(points);
    expect(tapered[0].w).toBe(10);
    expect(tapered.at(-1).w).toBeLessThan(tapered.at(-3).w);
  });

  it("undoes and redoes strokes, and a new stroke clears redo", () => {
    let history = emptyHistory();
    history = commitStroke(history, { id: "a" });
    history = commitStroke(history, { id: "b" });
    history = undo(history);
    expect(history.strokes.map((s) => s.id)).toEqual(["a"]);
    history = redo(history);
    expect(history.strokes.map((s) => s.id)).toEqual(["a", "b"]);
    history = undo(history);
    history = commitStroke(history, { id: "c" });
    expect(history.undone).toEqual([]);
    expect(undo(emptyHistory())).toEqual(emptyHistory());
  });
});
