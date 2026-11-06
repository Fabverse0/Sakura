import { useEffect, useRef } from "react";
import shojiPaper from "../../assets/plates/shoji-paper.png";
import { Icon } from "../components/Icon.jsx";
import { sectionHref, sections } from "../data/sections.js";

/**
 * "Ruang": a shoji panel that slides in from the right as a modal <dialog>.
 * Lists every room of the page with a one-line summary.
 */
export function NavPanel({ isOpen, onClose, activeId }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  return (
    <dialog
      className="nav-panel"
      ref={dialogRef}
      aria-labelledby="nav-panel-title"
      onClose={onClose}
      onClick={(event) => {
        // A click on the dialog box itself (not its content) is the backdrop.
        if (event.target === event.currentTarget) onClose();
      }}
      style={{ backgroundImage: `url(${shojiPaper})` }}
    >
      <div className="nav-panel__inner">
        <div className="nav-panel__head">
          <h2 className="nav-panel__title" id="nav-panel-title">
            Ruang
          </h2>
          <button className="nav-panel__close" type="button" onClick={onClose}>
            <Icon name="close" size={20} />
            <span className="visually-hidden">Tutup daftar ruang</span>
          </button>
      </div>
        <nav aria-label="Semua ruang">
          <ol className="nav-panel__list">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  className="nav-panel__link"
                  href={sectionHref(section.id)}
                  aria-current={activeId === section.id ? "location" : undefined}
                  onClick={onClose}
                >
                  <span className="nav-panel__label">{section.label}</span>
                  <span className="nav-panel__summary">{section.summary}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </dialog>
  );
}
