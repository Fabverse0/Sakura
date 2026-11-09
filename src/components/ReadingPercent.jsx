import { useEffect, useState } from "react";
import { readPercent } from "../lib/progress.js";

/** Small percentage in the beam: how far down the walk the visitor is. */
export function ReadingPercent() {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setPercent(readPercent(window.scrollY, document.documentElement.scrollHeight, window.innerHeight));
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <span className="reading-percent" aria-hidden="true">
      {String(percent).padStart(3, " ")}%
    </span>
  );
}
