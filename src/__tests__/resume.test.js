import { describe, expect, it } from "vitest";
import { isFreshResume, resumeTarget } from "../lib/resume.js";

const ids = ["panorama", "lensa", "rute"];

describe("resume position", () => {
  it("resumes only a known, recent section", () => {
    const fresh = { section: "lensa", at: 1000 };
    expect(resumeTarget(fresh, ids, 2000)).toBe("lensa");
    expect(resumeTarget({ section: "hantu", at: 1000 }, ids, 2000)).toBeNull();
  });

  it("forgets positions older than a week", () => {
    const old = { section: "lensa", at: 0 };
    expect(isFreshResume(old, 8 * 24 * 60 * 60 * 1000)).toBe(false);
  });

  it("ignores corrupt values", () => {
    expect(isFreshResume("oops")).toBe(false);
    expect(isFreshResume(null)).toBeFalsy();
  });
});
