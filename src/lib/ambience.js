import { setAmbienceContext } from "./ambience-context.js";

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
    this.loops = { jump: 0, chirp: 0, suspend: 0 };
    this.crickets = null;
    this.volume = 0.6;
    this.paused = true;
  }

  get isRunning() {
    return this.ctx?.state === "running";
  }

  /** Start (or restart) with a context created inside the visitor's click. */
  start(ctx) {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const context = ctx ?? (AudioContext ? new AudioContext() : null);
      if (!context) return false;
      this.build(context);
    }
    window.clearTimeout(this.loops.suspend);
    this.ctx.resume();
    this.paused = false;
    this.runLoops();
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
    this.paused = true;
    this.stopLoops();
    window.clearTimeout(this.loops.suspend);
    this.loops.suspend = window.setTimeout(() => this.ctx?.suspend(), 900);
  }

  setVolume(value) {
    this.volume = value;
    if (this.ctx && this.master.gain.value > 0) {
      this.master.gain.setTargetAtTime(value, this.ctx.currentTime, 0.2);
    }
  }

  suspend() {
    this.stopLoops();
    this.ctx?.suspend();
  }

  resume() {
    if (this.paused) return;
    this.ctx?.resume();
    this.runLoops();
  }

  /* Timer loops (water babble, cricket chirps): one handle each, paused with the sound. */
  runLoops() {
    this.stopLoops();
    const jump = () => {
      if (!this.ctx || this.paused) return;
      this.babble.frequency.setTargetAtTime(600 + Math.random() * 1800, this.ctx.currentTime, 0.03);
      this.loops.jump = window.setTimeout(jump, 70 + Math.random() * 90);
    };
    jump();
    if (this.crickets) this.chirp();
  }

  stopLoops() {
    window.clearTimeout(this.loops.jump);
    window.clearTimeout(this.loops.chirp);
  }

  chirp() {
    if (!this.crickets || !this.ctx || this.paused) return;
    const cricket = this.crickets[Math.floor(Math.random() * 2)];
    let t = this.ctx.currentTime + 0.02;
    for (let pulse = 0; pulse < 3 + Math.floor(Math.random() * 2); pulse++) {
      cricket.gain.gain.setValueAtTime(0.035, t);
      cricket.gain.gain.setValueAtTime(0, t + 0.015);
      t += 0.04;
    }
    this.loops.chirp = window.setTimeout(() => this.chirp(), 600 + Math.random() * 600);
  }

  build(ctx) {
    this.ctx = ctx;
    setAmbienceContext(ctx);
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

    this.babble = babble;

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
      window.clearTimeout(this.loops.chirp);
      this.chirp();
    }
    if (!isNight && this.crickets) {
      window.clearTimeout(this.loops.chirp);
      for (const cricket of this.crickets) cricket.osc.stop();
      this.crickets = null;
    }
  }

  dispose() {
    this.paused = true;
    this.stopLoops();
    window.clearTimeout(this.loops.suspend);
    this.crickets = null;
    this.ctx?.close();
    this.ctx = null;
  }
}
