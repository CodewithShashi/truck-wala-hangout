/**
 * Tiny Web Audio engine — no asset files needed.
 * Everything is synthesised on the fly so the experience stays instant.
 * Swap `playTrack` for real <audio> sources later without touching the UI.
 */

let ctx: AudioContext | null = null;

export function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

function envTone(
  freq: number,
  duration: number,
  type: OscillatorType = "sine",
  gain = 0.2,
  delay = 0,
) {
  const c = getCtx();
  if (!c) return;
  const t0 = c.currentTime + delay;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(gain, t0 + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
  osc.connect(g).connect(c.destination);
  osc.start(t0);
  osc.stop(t0 + duration + 0.05);
}

export const sfx = {
  horn() {
    // Two-tone desi pressure horn
    [0, 0.28].forEach((d, i) => {
      envTone(i === 0 ? 320 : 240, 0.3, "sawtooth", 0.16, d);
      envTone(i === 0 ? 484 : 362, 0.3, "square", 0.07, d);
    });
    envTone(160, 0.6, "triangle", 0.08, 0);
  },
  click() {
    envTone(880, 0.07, "square", 0.05);
  },
  lights() {
    envTone(1400, 0.06, "sine", 0.06);
    envTone(2100, 0.09, "sine", 0.04, 0.05);
  },
  start() {
    const c = getCtx();
    if (!c) return;
    const t0 = c.currentTime;
    const osc = c.createOscillator();
    const g = c.createGain();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(60, t0);
    osc.frequency.exponentialRampToValueAtTime(150, t0 + 0.5);
    osc.frequency.exponentialRampToValueAtTime(90, t0 + 1.2);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(0.12, t0 + 0.1);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + 1.3);
    osc.connect(g).connect(c.destination);
    osc.start(t0);
    osc.stop(t0 + 1.4);
  },
  notification() {
    envTone(660, 0.09, "triangle", 0.07);
    envTone(990, 0.12, "triangle", 0.06, 0.08);
  },
};

export interface Track {
  id: string;
  title: string;
  artist: string;
  duration: number;
  /** Root note of the synthesised loop (Hz) */
  root: number;
  scale: number[];
  tempo: number;
}

export const TRACKS: Track[] = [
  {
    id: "izhaar",
    title: "Mujhse Mohabbat Ka Izhaar Karta",
    artist: "Satrang Music Official",
    duration: 212,
    root: 220,
    scale: [0, 2, 3, 5, 7, 8, 10],
    tempo: 108,
  },
  {
    id: "highway",
    title: "Highway Ka Raja",
    artist: "Dhaba Sound System",
    duration: 184,
    root: 196,
    scale: [0, 3, 5, 7, 10],
    tempo: 124,
  },
  {
    id: "hornok",
    title: "Horn OK Please (Remix)",
    artist: "DJ Punjab Roadways",
    duration: 231,
    root: 261,
    scale: [0, 2, 4, 7, 9],
    tempo: 96,
  },
];

/** Simple sequencer that "plays" a track and exposes an analyser for the visualiser. */
export class TruckPlayer {
  private timer: number | null = null;
  private master: GainNode | null = null;
  analyser: AnalyserNode | null = null;
  private step = 0;

  start(track: Track, volume: number) {
    this.stop();
    const c = getCtx();
    if (!c) return;
    this.master = c.createGain();
    this.master.gain.value = volume;
    this.analyser = c.createAnalyser();
    this.analyser.fftSize = 64;
    this.master.connect(this.analyser).connect(c.destination);
    this.step = 0;
    const interval = 60000 / track.tempo / 2;
    const tick = () => {
      const cc = getCtx();
      if (!cc || !this.master) return;
      const deg = track.scale[Math.floor(Math.random() * track.scale.length)] ?? 0;
      const oct = this.step % 8 < 4 ? 1 : 2;
      const freq = track.root * oct * Math.pow(2, deg / 12);
      const t0 = cc.currentTime;
      const osc = cc.createOscillator();
      const g = cc.createGain();
      osc.type = this.step % 4 === 0 ? "triangle" : "sine";
      osc.frequency.setValueAtTime(freq, t0);
      g.gain.setValueAtTime(0.0001, t0);
      g.gain.exponentialRampToValueAtTime(0.25, t0 + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.4);
      osc.connect(g).connect(this.master);
      osc.start(t0);
      osc.stop(t0 + 0.45);
      if (this.step % 4 === 0) {
        const b = cc.createOscillator();
        const bg = cc.createGain();
        b.type = "sine";
        b.frequency.setValueAtTime(track.root / 2, t0);
        bg.gain.setValueAtTime(0.3, t0);
        bg.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.3);
        b.connect(bg).connect(this.master);
        b.start(t0);
        b.stop(t0 + 0.35);
      }
      this.step++;
    };
    tick();
    this.timer = window.setInterval(tick, interval);
  }

  setVolume(v: number) {
    if (this.master) this.master.gain.value = v;
  }

  stop() {
    if (this.timer) window.clearInterval(this.timer);
    this.timer = null;
    try {
      this.master?.disconnect();
      this.analyser?.disconnect();
    } catch {
      /* noop */
    }
    this.master = null;
    this.analyser = null;
  }
}
