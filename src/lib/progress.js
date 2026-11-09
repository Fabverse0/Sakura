/** Share of the page scrolled past, 0..100, rounded. */
export function readPercent(scrollY, scrollHeight, viewportHeight) {
  const max = scrollHeight - viewportHeight;
  if (max <= 0) return 100;
  return Math.round(Math.min(100, Math.max(0, (scrollY / max) * 100)));
}
