import { useEffect, useState } from "react";
import topTimber from "../../assets/plates/top-charred-timber.png";
import { Icon } from "../components/Icon.jsx";
import { sectionHref, sections } from "../data/sections.js";

/**
 * A slim timber beam that slides down once the hero comp has scrolled away.
 * It mirrors the comp's own beam so the engawa frame follows the visitor.
 */
export function ScrollBeam({ activeId, onOpenRooms, children }) {
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    const frame = document.querySelector(".comp-frame");
    if (!frame || !("IntersectionObserver" in window)) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => setIsShown(!entry.isIntersecting),
      { rootMargin: "-120px 0px 0px 0px" },
    );
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className="scroll-beam"
      data-shown={isShown}
      inert={isShown ? undefined : ""}
      style={{ backgroundImage: `url(${topTimber})` }}
    >
      <a className="scroll-beam__wordmark" href="#top" aria-label="Sakura, kembali ke panorama">
        SAKURA
      </a>
      <nav className="scroll-beam__nav" aria-label="Ruang di halaman">
        <ul className="scroll-beam__list">
          {sections.slice(1).map((section) => (
            <li key={section.id}>
              <a
                className="scroll-beam__link"
                href={sectionHref(section.id)}
                aria-current={activeId === section.id ? "location" : undefined}
              >
                {section.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="scroll-beam__tools">
        {children}
        <button className="scroll-beam__rooms" type="button" onClick={onOpenRooms}>
          <Icon name="rooms" size={18} />
          <span>Ruang</span>
        </button>
      </div>
      <span className="scroll-beam__progress" aria-hidden="true" />
    </header>
  );
}
