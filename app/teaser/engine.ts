/**
 * Teaser timeline engine — deterministic, beat-based keyframes written straight to the DOM.
 *
 * Every animated element carries `data-tl="<name>"`. The score (score.ts) maps each name to a
 * list of keys in BEATS (SOUNDTRACK.bpm — 124, the tempo of 〈멜랑콜리아〉). Sampling is a pure function of
 * the playhead, so the teaser can be scrubbed, looped and screen-recorded frame-exactly.
 *
 * Only `opacity`, `transform` and SVG `stroke-dashoffset` are written. Lengths are container
 * query units of the stage (x → cqw, y → cqh), so one score renders identically at any size.
 */

import { SOUNDTRACK } from './soundtrack';

export const BPM = SOUNDTRACK.bpm;
export const BEAT = 60 / BPM;

export type Ease = 'lin' | 'out' | 'in' | 'inOut' | 'hold';

export interface Props {
  o?: number; // opacity
  x?: number; // cqw
  y?: number; // cqh
  s?: number; // uniform scale
  sx?: number;
  sy?: number;
  r?: number; // deg
  dash?: number; // stroke-dashoffset on a pathLength="1" path: 1 = hidden, 0 = drawn
}

/** [beat, props, ease into this key] */
export type Key = readonly [number, Props, Ease?];

type Full = Required<Props>;
const DEFAULTS: Full = { o: 1, x: 0, y: 0, s: 1, sx: 1, sy: 1, r: 0, dash: 0 };
const PROPS = Object.keys(DEFAULTS) as (keyof Full)[];
const TRANSFORM_PROPS: (keyof Full)[] = ['x', 'y', 's', 'sx', 'sy', 'r'];

const EASE: Record<Ease, (t: number) => number> = {
  lin: (t) => t,
  // Expo-out, the site's single entrance curve (lib/motion.ts EASE_OUT).
  out: (t) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t)),
  in: (t) => t * t * t,
  inOut: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
  // Jump cut at the key's beat — used for flickers and hard cuts.
  hold: (t) => (t >= 1 ? 1 : 0),
};

export interface Track {
  beats: number[];
  values: Full[];
  eases: Ease[];
  transform: boolean;
  dash: boolean;
}

/** Sort keys and forward-fill missing props so every key is complete. */
export function compile(keys: readonly Key[]): Track {
  const sorted = [...keys].sort((a, b) => a[0] - b[0]);
  const values: Full[] = [];
  let prev: Full = DEFAULTS;
  for (const [, p] of sorted) {
    prev = { ...prev, ...p };
    values.push(prev);
  }
  const used = new Set(sorted.flatMap(([, p]) => Object.keys(p)));
  return {
    beats: sorted.map((k) => k[0]),
    values,
    eases: sorted.map((k) => k[2] ?? 'out'),
    transform: TRANSFORM_PROPS.some((k) => used.has(k)),
    dash: used.has('dash'),
  };
}

export function sample(track: Track, beat: number): Full {
  const { beats, values, eases } = track;
  const n = beats.length;
  if (n === 0) return DEFAULTS;
  if (beat <= beats[0]) return values[0];
  if (beat >= beats[n - 1]) return values[n - 1];
  let i = 1;
  while (beats[i] < beat) i++;
  const a = values[i - 1];
  const b = values[i];
  const t = EASE[eases[i]]((beat - beats[i - 1]) / (beats[i] - beats[i - 1] || 1));
  const out = {} as Full;
  for (const k of PROPS) out[k] = a[k] + (b[k] - a[k]) * t;
  return out;
}

const r3 = (n: number) => Math.round(n * 1000) / 1000;

/** Cache of the last strings written per element, so unchanged frames cost no style writes. */
const written = new WeakMap<Element, { o: string; t: string; d: string }>();

export function apply(el: HTMLElement | SVGElement, track: Track, beat: number) {
  const v = sample(track, beat);
  const last = written.get(el) ?? { o: '', t: '', d: '' };

  const o = String(r3(v.o));
  if (o !== last.o) {
    el.style.opacity = o;
    // Fully transparent layers leave the paint tree.
    el.style.visibility = v.o <= 0.001 ? 'hidden' : '';
    last.o = o;
  }
  if (track.transform) {
    const t = `translate3d(${r3(v.x)}cqw,${r3(v.y)}cqh,0) rotate(${r3(v.r)}deg) scale(${r3(v.s * v.sx)},${r3(v.s * v.sy)})`;
    if (t !== last.t) {
      el.style.transform = t;
      last.t = t;
    }
  }
  if (track.dash) {
    const d = String(r3(v.dash));
    if (d !== last.d) {
      el.style.strokeDashoffset = d;
      last.d = d;
    }
  }
  written.set(el, last);
}

/** Decaying kick envelope, 1 on each downbeat → ~0 by the next. */
export const pulse = (beat: number) => Math.exp(-(((beat % 1) + 1) % 1) * 5);

export const fmtTime = (beat: number) => {
  const s = Math.max(0, Math.floor(beat * BEAT));
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
};
