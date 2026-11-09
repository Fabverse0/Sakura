/** The light ground tones a room may take, in the order the visitor cycles. */
export const groundTones = ["paper", "ivory", "mist"];

export function nextTone(current, step = 1) {
  const index = groundTones.indexOf(current);
  return groundTones[(index + step + groundTones.length) % groundTones.length];
}
