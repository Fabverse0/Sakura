import { describe, expect, it } from "vitest";
import { areas } from "../data/areas.js";
import { directionHint, formatDuration, isHit, pickRound } from "../lib/finder.js";

const boat = areas.find((area) => area.id === "perahu");

describe("finder", () => {
  it("hits inside the radius and misses outside it", () => {
    expect(isHit(boat, boat.x, boat.y)).toBe(true);
    expect(isHit(boat, boat.x + boat.radius * 0.9, boat.y)).toBe(true);
    expect(isHit(boat, boat.x + boat.radius * 1.5, boat.y)).toBe(false);
  });

  it("points the visitor toward the target", () => {
    expect(directionHint(boat, boat.x - 20, boat.y)).toBe("Coba lebih ke kanan.");
    expect(directionHint(boat, boat.x, boat.y - 30)).toBe("Coba lebih ke bawah.");
    expect(directionHint(boat, boat.x + 1, boat.y + 1)).toBe("Sangat dekat.");
  });

  it("picks a round of unique areas", () => {
    let seed = 1;
    const random = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    const round = pickRound(areas, 6, random);
    expect(round).toHaveLength(6);
    expect(new Set(round.map((area) => area.id)).size).toBe(6);
  });

  it("formats durations as m:ss", () => {
    expect(formatDuration(65_400)).toBe("1:05");
    expect(formatDuration(0)).toBe("0:00");
  });
});
