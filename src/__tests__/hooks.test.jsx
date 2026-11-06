import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { copyText } from "../hooks/useClipboard.js";
import { useLocalStorage } from "../hooks/useLocalStorage.js";
import { usePauseTimer } from "../hooks/usePauseTimer.js";

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
  localStorage.clear();
});

describe("usePauseTimer", () => {
  it("counts down, alternates breath phases and finishes", () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => usePauseTimer());
    expect(result.current.phase).toBe("rest");
    act(() => result.current.start());
    expect(result.current.phase).toBe("inhale");
    act(() => vi.advanceTimersByTime(5000));
    expect(result.current.secondsRemaining).toBe(25);
    expect(result.current.phase).toBe("exhale");
    act(() => vi.advanceTimersByTime(25000));
    expect(result.current.isComplete).toBe(true);
    expect(result.current.status).toMatch(/selesai/);
  });

  it("ends on Escape", () => {
    const { result } = renderHook(() => usePauseTimer());
    act(() => result.current.start());
    act(() => window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" })));
    expect(result.current.isRunning).toBe(false);
    expect(result.current.secondsRemaining).toBe(30);
  });
});

describe("useLocalStorage", () => {
  it("persists values", () => {
    const { result } = renderHook(() => useLocalStorage("t:key", 1));
    act(() => result.current[1](5));
    expect(JSON.parse(localStorage.getItem("t:key"))).toBe(5);
    expect(result.current[2]).toBe(true);
  });

  it("falls back to memory when storage throws", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("quota");
    });
    const { result } = renderHook(() => useLocalStorage("t:fail", []));
    act(() => result.current[1](["note"]));
    expect(result.current[0]).toEqual(["note"]);
    expect(result.current[2]).toBe(false);
  });

  it("ignores stored values that fail validation", () => {
    localStorage.setItem("t:bad", JSON.stringify("nope"));
    const { result } = renderHook(() => useLocalStorage("t:bad", [], Array.isArray));
    expect(result.current[0]).toEqual([]);
  });
});

describe("copyText", () => {
  it("falls back to execCommand without the Clipboard API", async () => {
    document.execCommand = vi.fn(() => true);
    await expect(copyText("#bf1818")).resolves.toBe(true);
    expect(document.execCommand).toHaveBeenCalledWith("copy");
  });
});
