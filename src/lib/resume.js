export const resumeKey = "sakura:posisi";
export const resumeMaxAgeMs = 1000 * 60 * 60 * 24 * 7; // a week

export function isFreshResume(value, now = Date.now()) {
  return (
    value &&
    typeof value.section === "string" &&
    typeof value.at === "number" &&
    now - value.at < resumeMaxAgeMs
  );
}

/** Keep the section the visitor was reading, not a pixel offset that drifts. */
export function resumeTarget(value, knownIds, now = Date.now()) {
  if (!isFreshResume(value, now)) return null;
  return knownIds.includes(value.section) ? value.section : null;
}
