
/** The whole palette as plain text, one colour per line, for pasting into a design tool. */
export function paletteAsText(colors) {
  return colors.map((color) => `${color.name}\t${color.hex.toUpperCase()}`).join("\n");
}
