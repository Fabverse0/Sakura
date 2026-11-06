/**
 * One icon family for the whole page: 24px grid, 1.5px stroke, square caps and
 * mitred joins to match the square-edged engawa world. Decorative by default.
 */
const paths = {
  "arrow-right": <path d="M4 12h15M13 6l6 6-6 6" />,
  "arrow-left": <path d="M20 12H5M11 6l-6 6 6 6" />,
  "arrow-up": <path d="M12 20V5M6 11l6-6 6 6" />,
  "chevron-left": <path d="M15 5l-7 7 7 7" />,
  "chevron-right": <path d="M9 5l7 7-7 7" />,
  menu: <path d="M3 6h18M3 12h18M3 18h12" />,
  close: <path d="M5 5l14 14M19 5L5 19" />,
  plus: <path d="M12 4v16M4 12h16" />,
  minus: <path d="M4 12h16" />,
  check: <path d="M4 12.5l5 5L20 6.5" />,
  copy: (
    <>
      <path d="M8 8h12v12H8z" />
      <path d="M4 16V4h12" />
    </>
  ),
  trash: (
    <>
      <path d="M4 6h16M9 6V3h6v3" />
      <path d="M6 6l1 15h10l1-15M10 10v7M14 10v7" />
    </>
  ),
  undo: <path d="M9 5L4 10l5 5M4 10h10a6 6 0 010 12h-3" />,
  redo: <path d="M15 5l5 5-5 5M20 10H10a6 6 0 000 12h3" />,
  download: <path d="M12 3v13M6 10l6 6 6-6M4 21h16" />,
  lens: (
    <>
      <path d="M3 3h12v12H3z" />
      <path d="M15 15l6 6M9 6v6M6 9h6" />
    </>
  ),
  brush: <path d="M14 4l6 6-8 8H6v-6zM4 20h4" />,
  moon: <path d="M20 14.5A8.5 8.5 0 019.5 4 8.5 8.5 0 1020 14.5z" />,
  sun: (
    <>
      <path d="M8 8h8v8H8z" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1" />
    </>
  ),
  sound: (
    <>
      <path d="M4 9h4l5-4v14l-5-4H4z" />
      <path d="M16.5 8.5a5 5 0 010 7M19 6a8.5 8.5 0 010 12" />
    </>
  ),
  "sound-off": (
    <>
      <path d="M4 9h4l5-4v14l-5-4H4z" />
      <path d="M17 9l5 5M22 9l-5 5" />
    </>
  ),
  rooms: (
    <>
      <path d="M3 4h18v16H3z" />
      <path d="M12 4v16M3 12h18" />
    </>
  ),
  target: (
    <>
      <path d="M5 5h14v14H5z" />
      <path d="M12 2v6M12 16v6M2 12h6M16 12h6" />
    </>
  ),
  eye: (
    <>
      <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z" />
      <path d="M10 10h4v4h-4z" />
    </>
  ),
};

export function Icon({ name, size = 20, label, className = "", strokeWidth = 1.5 }) {
  const shape = paths[name];
  if (!shape) return null;

  return (
    <svg
      className={`icon icon--${name} ${className}`.trim()}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="square"
      strokeLinejoin="miter"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : "true"}
      focusable="false"
    >
      {shape}
    </svg>
  );
}

export const iconNames = Object.keys(paths);
