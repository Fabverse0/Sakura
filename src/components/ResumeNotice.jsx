import { useState } from "react";
import { sections } from "../data/sections.js";

/**
 * A quiet offer on first paint: "Lanjutkan dari {room}". Dismissed for the
 * session once used or closed, so it never returns on its own.
 */
export function ResumeNotice({ target }) {
  const [hidden, setHidden] = useState(() => {
    try {
      return window.sessionStorage.getItem("sakura:resume-dismissed") === "1";
    } catch {
      return false;
    }
  });
  const room = sections.find((section) => section.id === target);
  if (!target || !room || hidden) return null;

  function dismiss() {
    try {
      window.sessionStorage.setItem("sakura:resume-dismissed", "1");
    } catch {
      /* storage blocked: the notice may return next visit */
    }
    setHidden(true);
  }

  return (
    <aside className="resume" aria-label="Lanjutkan membaca">
      <a className="resume__go" href={`#${target}`} onClick={dismiss}>
        Lanjutkan dari {room.label}
      </a>
      <button className="resume__close" type="button" onClick={dismiss}>
        <span aria-hidden="true">×</span>
        <span className="visually-hidden">Tutup</span>
      </button>
    </aside>
  );
}
