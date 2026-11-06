/**
 * A single sumi brush stroke drawn as a filled, tapered SVG shape plus a
 * centre-line path that "writes" it via stroke-dashoffset. Decorative.
 */
const variants = {
  sweep: {
    viewBox: "0 0 600 60",
    path: "M8 38 C 90 18, 170 44, 260 30 S 430 14, 520 28 S 580 36, 592 30",
  },
  rise: {
    viewBox: "0 0 600 60",
    path: "M10 46 C 120 44, 210 36, 300 26 S 470 10, 590 14",
  },
  enso: {
    viewBox: "0 0 120 120",
    path: "M64 14 C 30 12, 12 40, 16 66 S 48 108, 74 104 S 108 76, 104 52 S 84 18, 70 20",
  },
};

export function InkStroke({ variant = "sweep", className = "", width = 6 }) {
  const shape = variants[variant] ?? variants.sweep;
  return (
    <svg
      className={`ink-stroke ink-stroke--${variant} ${className}`.trim()}
      viewBox={shape.viewBox}
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        className="ink-stroke__path"
        d={shape.path}
        pathLength="1"
        fill="none"
        stroke="currentColor"
        strokeWidth={width}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
