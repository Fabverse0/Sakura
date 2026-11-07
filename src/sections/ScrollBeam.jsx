import { useEffect, useState } from "react";
import topTimber from "../../assets/plates/top-charred-timber.png";
import { Icon } from "../components/Icon.jsx";
import { useScrollProgressFallback } from "../hooks/useScrollProgressFallback.js";
import { sectionHref, sections } from "../data/sections.js";

/**
 * A slim timber beam that slides down once the hero comp has scrolled away.
 * It mirrors the comp's own beam so the engawa frame follows the visitor.
 */
export function ScrollBeam({ activeId, onOpenRooms, isNight, onToggleNight, sound }) {
  const [isShown, setIsShown] = useState(false);
  useScrollProgressFallback();

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
      inert={!isShown}
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
        <button
          className="beam-toggle"
          type="button"
          aria-pressed={sound.isOn}
          aria-busy={sound.isLoading || undefined}
          onClick={sound.toggle}
        >
          <Icon name={sound.isOn ? "sound" : "sound-off"} size={18} />
          <span>Suara</span>
        </button>
        {sound.isOn && (
          <label className="beam-volume">
            <span className="visually-hidden">Volume suara</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={sound.volume}
              onChange={(event) => sound.setVolume(Number(event.target.value))}
            />
          </label>
        )}
        <button
          className="beam-toggle"
          type="button"
          aria-pressed={isNight}
          onClick={(event) => {
            const rect = event.currentTarget.getBoundingClientRect();
            onToggleNight({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
          }}
        >
          <Icon name={isNight ? "sun" : "moon"} size={18} />
          <span>{isNight ? "Siang" : "Malam"}</span>
        </button>
        <button className="scroll-beam__rooms" type="button" onClick={onOpenRooms}>
          <Icon name="rooms" size={18} />
          <span>Ruang</span>
        </button>
      </div>
      <span className="scroll-beam__progress" aria-hidden="true" />
    </header>
  );
}
