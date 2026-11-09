import { useEffect } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion.js";

/**
 * Writes --px / --py (-1..1) on the element as the pointer moves over it,
 * eased with rAF so layers can drift at different depths via CSS only.
 */
export function usePointerParallax(ref) {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element || reduced) return undefined;
    let tx = 0;
    let ty = 0;
    let x = 0;
    let y = 0;
    let frame = 0;

    function loop() {
      x += (tx - x) * 0.07;
      y += (ty - y) * 0.07;
      element.style.setProperty("--px", x.toFixed(4));
      element.style.setProperty("--py", y.toFixed(4));
      frame = Math.abs(tx - x) + Math.abs(ty - y) > 0.001 ? window.requestAnimationFrame(loop) : 0;
    }
    const kick = () => {
      if (!frame) frame = window.requestAnimationFrame(loop);
    };
    function move(event) {
      const rect = element.getBoundingClientRect();
      tx = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      ty = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      kick();
    }
    function leave() {
      tx = 0;
      ty = 0;
      kick();
    }
    element.addEventListener("pointermove", move, { passive: true });
    element.addEventListener("pointerleave", leave);
    return () => {
      window.cancelAnimationFrame(frame);
      element.removeEventListener("pointermove", move);
      element.removeEventListener("pointerleave", leave);
    };
  }, [ref, reduced]);
}
