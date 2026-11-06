/** Shared SVG filter defs: a slight turbulence bleed that makes strokes read as ink on paper. */
export function InkFilters() {
  return (
    <svg className="ink-filters" width="0" height="0" aria-hidden="true" focusable="false">
      <defs>
        <filter id="ink-bleed" x="-5%" y="-40%" width="110%" height="180%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" result="grain" />
          <feDisplacementMap in="SourceGraphic" in2="grain" scale="3" />
        </filter>
      </defs>
    </svg>
  );
}
