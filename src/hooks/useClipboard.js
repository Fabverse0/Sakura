import { useCallback } from "react";

/**
 * Copy text with the async Clipboard API, falling back to a hidden textarea
 * + execCommand where the API is missing (insecure context, older browsers).
 * Resolves to true when the copy most likely succeeded.
 */
export async function copyText(text) {
  try {
    if (navigator.clipboard?.writeText && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fall through to the legacy path */
  }

  try {
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand("copy");
    area.remove();
    return ok;
  } catch {
    return false;
  }
}

export function useClipboard() {
  return useCallback((text) => copyText(text), []);
}
