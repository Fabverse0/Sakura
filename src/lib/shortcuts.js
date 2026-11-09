import { shortcutFor } from "../data/shortcuts.js";

/** Ignore keys typed into fields, editable areas and while a dialog is open. */
export function shouldHandle(event) {
  const target = event.target;
  if (event.ctrlKey || event.metaKey || event.altKey) return false;
  if (target && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName))) return false;
  if (document.querySelector("dialog[open]")) return false;
  return true;
}

export function resolveShortcut(event) {
  if (!shouldHandle(event)) return null;
  return shortcutFor(event.key);
}
