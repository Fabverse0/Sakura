/** A link to one room of this page, for sharing. Pure: takes the current location. */
export function roomLink(base, sectionId) {
  const url = new URL(base);
  url.hash = sectionId ? `#${sectionId}` : "";
  return url.toString();
}
