import { sectionHref, sections } from "../data/sections.js";

/**
 * A slim column of dots on the left edge, one per room. The dot for the room
 * in view is lit. Each dot is a link, so it doubles as navigation.
 */
export function RoomDots({ activeId }) {
  return (
    <nav className="room-dots" aria-label="Posisi di halaman">
      <ol className="room-dots__list">
        {sections.map((section) => (
          <li key={section.id}>
            <a
              className="room-dots__dot"
              href={sectionHref(section.id)}
              aria-label={section.label}
              aria-current={activeId === section.id ? "location" : undefined}
            >
              <span className="visually-hidden">{section.label}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
