import { describe, expect, it } from "vitest";
import { playChime } from "../lib/chime.js";

describe("chime", () => {
  it("never plays without a running context", () => {
    expect(playChime(null)).toBe(false);
    expect(playChime({ state: "suspended", currentTime: 0 })).toBe(false);
  });
});
