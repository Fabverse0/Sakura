import { describe, expect, it } from "vitest";
import { breathPatterns } from "../data/pause.js";
import { cycleLength, cyclesIn, phaseAt } from "../lib/breath.js";

const [soft, box, long] = breathPatterns;

describe("breath patterns", () => {
  it("keeps the default 4-6 rhythm over 10 s", () => {
    expect(cycleLength(soft)).toBe(10);
    expect(phaseAt(soft, 0).phase).toBe("inhale");
    expect(phaseAt(soft, 3.9).phase).toBe("inhale");
    expect(phaseAt(soft, 4).phase).toBe("exhale");
    expect(phaseAt(soft, 10).phase).toBe("inhale");
  });

  it("holds after both halves in box breathing", () => {
    expect(cycleLength(box)).toBe(16);
    expect(phaseAt(box, 5).phase).toBe("hold-in");
    expect(phaseAt(box, 9).phase).toBe("exhale");
    expect(phaseAt(box, 13).phase).toBe("hold-out");
  });

  it("counts whole cycles in a duration", () => {
    expect(cyclesIn(soft, 30)).toBe(3);
    expect(cyclesIn(long, 60)).toBe(5);
  });
});
