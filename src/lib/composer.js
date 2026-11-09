import { lineKeys, lineTargets, phrases } from "../data/phrases.js";

export function phraseById(key, id) {
  return phrases[key].find((phrase) => phrase.id === id);
}

/** Poem text for a selection {first, second, third}; null when incomplete. */
export function composePoem(selection) {
  const lines = lineKeys.map((key) => phraseById(key, selection[key])?.text);
  return lines.every(Boolean) ? lines : null;
}

export function isComplete(selection) {
  return composePoem(selection) !== null;
}

/** True when every chosen phrase matches its line's syllable target. */
export function isMetrical(selection) {
  return lineKeys.every((key) => phraseById(key, selection[key])?.syllables === lineTargets[key]);
}

export function randomSelection(random = Math.random) {
  return Object.fromEntries(
    lineKeys.map((key) => [key, phrases[key][Math.floor(random() * phrases[key].length)].id]),
  );
}

export function cycle(key, currentId, step = 1) {
  const list = phrases[key];
  const index = list.findIndex((phrase) => phrase.id === currentId);
  return list[(index + step + list.length) % list.length].id;
}
