/**
 * A soft struck-bell chime for a newly earned stamp. Synthesised with two
 * detuned sines and a quick decay. Only plays when a context is already live
 * (the visitor has turned sound on), so it never starts audio by itself.
 */
export function playChime(ctx, frequency = 659.25) {
  if (!ctx || ctx.state !== "running") return false;
  const now = ctx.currentTime;
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.12, now + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.6);
  gain.connect(ctx.destination);
  for (const [freq, level] of [
    [frequency, 1],
    [frequency * 2.01, 0.35],
  ]) {
    const osc = ctx.createOscillator();
    const amp = ctx.createGain();
    osc.frequency.value = freq;
    amp.gain.value = level;
    osc.connect(amp).connect(gain);
    osc.start(now);
    osc.stop(now + 1.7);
  }
  return true;
}
