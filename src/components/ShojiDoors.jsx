import { useLayoutEffect, useState } from "react";
import shojiPaper from "../../assets/plates/shoji-paper.png";
import railTimber from "../../assets/plates/view-rail-timber.png";

const storageKey = "sakura:intro-played";

function hasPlayed() {
  try {
    return window.sessionStorage.getItem(storageKey) === "1";
  } catch {
    return false;
  }
}

function markPlayed() {
  try {
    window.sessionStorage.setItem(storageKey, "1");
  } catch {
    /* storage blocked: the intro simply plays again next load */
  }
}

/**
 * The focal sequence: two shoji panels cover the viewport, unlatch, and slide
 * apart to reveal the engawa. Plays once per session. The resting CSS state is
 * "open", so if anything fails the page is simply visible.
 */
export function ShojiDoors() {
  const [isPlaying, setIsPlaying] = useState(() => !hasPlayed());

  useLayoutEffect(() => {
    if (!isPlaying) return undefined;
    const root = document.documentElement;
    root.dataset.intro = "playing";
    // Safety net: never leave the doors mounted if animationend is missed.
    const timeout = window.setTimeout(() => setIsPlaying(false), 3200);
    // data-intro stays set: the hero sequence keys its delays off it, and
    // removing it mid-animation would make the timing jump.
    return () => window.clearTimeout(timeout);
  }, [isPlaying]);

  if (!isPlaying) return null;

  function finish(event) {
    if (event.target !== event.currentTarget) return;
    markPlayed();
    setIsPlaying(false);
  }

  const paper = { backgroundImage: `url(${shojiPaper})` };
  const stile = { backgroundImage: `url(${railTimber})` };

  return (
    <div className="shoji-doors" aria-hidden="true">
      <div className="shoji-doors__panel shoji-doors__panel--left" style={paper}>
        <span className="shoji-doors__kumiko" />
        <span className="shoji-doors__stile" style={stile} />
      </div>
      <div
        className="shoji-doors__panel shoji-doors__panel--right"
        style={paper}
        onAnimationEnd={finish}
      >
        <span className="shoji-doors__kumiko" />
        <span className="shoji-doors__stile" style={stile} />
      </div>
      <span className="shoji-doors__veil" onAnimationEnd={finish} />
    </div>
  );
}
