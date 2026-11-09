/** The shared AudioContext of the ambience engine, when the visitor has turned sound on. */
let shared = null;

export function setAmbienceContext(ctx) {
  shared = ctx;
}

export function getAmbienceContext() {
  return shared;
}
