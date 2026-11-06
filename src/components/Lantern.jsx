import { useId } from "react";

/**
 * A paper chochin lantern drawn in SVG: sumi caps, paper body with ribs and a
 * warm core. Decorative; it hangs from the beam and glows in night mode.
 */
export function Lantern({ className = "", style }) {
  const gradientId = useId();
  return (
    <svg
      className={`lantern ${className}`.trim()}
      viewBox="0 0 60 120"
      aria-hidden="true"
      focusable="false"
      style={style}
    >
      <defs>
        <radialGradient id={gradientId} cx="50%" cy="55%" r="60%">
          <stop offset="0%" stopColor="#fff2d6" />
          <stop offset="55%" stopColor="#e8c896" />
          <stop offset="100%" stopColor="#bf1818" />
        </radialGradient>
      </defs>
      <line x1="30" y1="0" x2="30" y2="22" stroke="#1e1a22" strokeWidth="1.5" />
      <rect x="20" y="22" width="20" height="7" fill="#1e1a22" />
      <path
        d="M20 29 C 4 40, 4 88, 20 99 L 40 99 C 56 88, 56 40, 40 29 Z"
        fill={`url(#${gradientId})`}
        stroke="#1e1a22"
        strokeWidth="1.2"
      />
      {[40, 50, 60, 70, 80, 90].map((y) => (
        <path
          key={y}
          d={`M${9 + Math.abs(64 - y) * 0.18} ${y} Q 30 ${y + 3}, ${51 - Math.abs(64 - y) * 0.18} ${y}`}
          fill="none"
          stroke="#7a1f1c"
          strokeOpacity="0.55"
          strokeWidth="0.8"
        />
      ))}
      <rect x="20" y="99" width="20" height="7" fill="#1e1a22" />
      <line x1="30" y1="106" x2="30" y2="118" stroke="#1e1a22" strokeWidth="1.5" />
    </svg>
  );
}
