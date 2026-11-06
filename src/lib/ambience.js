/**
 * Synthesised engawa ambience: wind (low-passed brown noise with slow gusts),
 * water (band-passed noise with babbling filter jumps) and, at night,
 * crickets (short sine chirps). No audio files. Created only after the
 * visitor turns sound on.
 */
function noiseBuffer(ctx, seconds = 3, brown = false) {
  const length = ctx.sampleRate * seconds;
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  let last = 0;
  for (let i = 0; i < length; i++) {
    const white = Math.random() * 2 - 1;
    if (brown) {
      last = (last + 0.02 * white) / 1.02;
      data[i] = last * 3.5;
    } else {
      data[i] = white;
    }
  }
  return buffer;
}

function loop(ctx, buffer) {
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.loop = true;
  return source;
}

export class Ambience {
  constructor() {
    this.ctx = null;
    this.nodes = [];
    this.timers = [];
    this.crickets = null;
    this.volume = 0.6;
  }

  get isRunning() {
    return this.ctx?.state === "running";
  }

  start() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return false;
    if (!this.ctx) this.build(new AudioContext());
    this.ctx.resume();
    const now = this.ctx.currentTime;
    this.master.gain.cancelScheduledValues(now);
    this.master.gain.setValueAtTime(this.master.gain.value, now);
    this.master.gain.linearRampToValueAtTime(this.volume, now + 2);
    return true;
  }

  stop() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    this.master.gain.cancelScheduledValues(now);
    this.master.gain.setValueAtTime(this.master.gain.value, now);
    this.master.gain.linearRampToValueAtTime(0, now + 0.8);
    this.timers.push(window.setTimeout(() => this.ctx?.suspend(), 900));
  }

  setVolume(value) {
    this.volume = value;
    if (this.ctx && this.master.gain.value > 0) {
      this.master.gain.setTargetAtTime(value, this.ctx.currentTime, 0.2);
    }
  }

  suspend() {
    this.ctx?.suspend();
  }

  resume() {
    this.ctx?.resume();
  }

  build(ctx) {
    this.ctx = ctx;
    this.master = ctx.createGain();
    this.master.gain.value = 0;
    this.master.connect(ctx.destination);

    // Wind: brown noise -> low-pass whose cutoff drifts, gain gusts slowly.
    const wind = loop(ctx, noiseBuffer(ctx, 4, true));
    const windFilter = ctx.createBiquadFilter();
    windFilter.type = "lowpass";
    windFilter.frequency.value = 500;
    windFilter.Q.value = 0.7;
    const windGain = ctx.createGain();
    windGain.gain.value = 0.25;
    const sweep = ctx.createOscillator();
    sweep.frequency.value = 0.11;
    const sweepDepth = ctx.createGain();
    sweepDepth.gain.value = 350;
    sweep.connect(sweepDepth).connect(windFilter.frequency);
    const gust = ctx.createOscillator();
    gust.frequency.value = 0.07;
    const gustDepth = ctx.createGain();
    gustDepth.gain.value = 0.1;
    gust.connect(gustDepth).connect(windGain.gain);
    wind.connect(windFilter).connect(windGain).connect(this.master);

    // Water: white noise -> band-pass that jumps around (babble) + a low bed.
    const water = loop(ctx, noiseBuffer(ctx, 3));
    const babble = ctx.createBiquadFilter();
    babble.type = "bandpass";
    babble.frequency.value = 1200;
    babble.Q.value = 4;
    const waterGain = ctx.createGain();
    waterGain.gain.value = 0.1;
    const bed = ctx.createBiquadFilter();
    bed.type = "lowpass";
    bed.frequency.value = 300;
    const bedGain = ctx.createGain();
    bedGain.gain.value = 0.18;
    water.connect(babble).connect(waterGain).connect(this.master);
    water.connect(bed).connect(bedGain).connect(this.master);

    const jump = () => {
      if (!this.ctx) return;
      babble.frequency.setTargetAtTime(600 + Math.random() * 1800, this.ctx.currentTime, 0.03);
      this.timers.push(window.setTimeout(jump, 70 + Math.random() * 90));
    };
    jump();

    for (const node of [wind, sweep, gust, water]) node.start();
    this.nodes.push(wind, sweep, gust, water);
  }

  /** Night adds two crickets, panned apart; day removes them. */
  setNight(isNight) {
    if (!this.ctx) return;
    if (isNight && !this.crickets) {
      this.crickets = [4500, 4800].map((frequency, index) => {
        const osc = this.ctx.createOscillator();
        osc.frequency.value = frequency;
        const gain = this.ctx.createGain();
        gain.gain.value = 0;
        const pan = this.ctx.createStereoPanner();
        pan.pan.value = index === 0 ? -0.6 : 0.6;
        osc.connect(gain).connect(pan).connect(this.master);
        osc.start();
        return { osc, gain };
      });
      const chirp = () => {
        if (!this.crickets || !this.ctx) return;
        const cricket = this.crickets[Math.floor(Math.random() * 2)];
        let t = this.ctx.currentTime + 0.02;
        for (let pulse = 0; pulse < 3 + Math.floor(Math.random() * 2); pulse++) {
          cricket.gain.gain.setValueAtTime(0.035, t);
          cricket.gain.gain.setValueAtTime(0, t + 0.015);
          t += 0.04;
        }
        this.timers.push(window.setTimeout(chirp, 600 + Math.random() * 600));
      };
      chirp();
    }
    if (!isNight && this.crickets) {
      for (const cricket of this.crickets) cricket.osc.stop();
      this.crickets = null;
    }
  }

  dispose() {
    for (const timer of this.timers) window.clearTimeout(timer);
    this.timers = [];
    this.crickets = null;
    this.ctx?.close();
    this.ctx = null;
  }
}
