/**
 * The teaser score — 88 beats at 124 bpm (≈ 42.6 s), then it loops.
 *
 *  0 ─ 12  I.   Light      a line-drawn bulb, the filament flickers on
 * 12 ─ 32  II.  Figures    the selves we left behind (story), 〈박쥐〉 blooms behind the third
 * 32 ─ 40  III. Question   "정말 사라진 것일까요." — the red thread draws itself
 * 40 ─ 56  IV.  Melancholia the thread is revealed to be the painting's own (match cut), chorus
 * 56 ─ 64  V.   Album      cobalt · teal · coral fields wipe in, become the cover, the bulb flares
 * 64 ─ 88  VI.  Release    the cover settles beside the release card
 *
 * Copy comes from app/data/album8.ts so the teaser never drifts from the site.
 */
import { album, singles, story } from '@/app/data/album8';
import { compile, type Key, type Props, type Track } from './engine';

export const LENGTH = 88;

export const CHAPTERS = [
  { at: 0, label: 'Light' },
  { at: 12, label: 'Figures' },
  { at: 32, label: 'Question' },
  { at: 40, label: 'Melancholia' },
  { at: 56, label: 'Album' },
  { at: 64, label: 'Release' },
] as const;

/** Beat where every end-card element is fully in — the still frame for reduced motion. */
export const POSTER_BEAT = 76;

export type LayoutKind = 'land' | 'port';
export interface Layout {
  kind: LayoutKind;
  /** stage width / height */
  aspect: number;
}

export const layoutFor = (aspect: number): Layout => ({ kind: aspect > 1.2 ? 'land' : 'port', aspect });

/** Drum intensity per section — scales the shared `--beat` pulse. */
export function intensity(beat: number) {
  if (beat < 43.5) return 0;
  if (beat < 56) return 1;
  if (beat < 60) return 0.35;
  if (beat < 86) return 0.55;
  return 0;
}

/* ───────────────────────── Text ───────────────────────── */

const bat = singles.find((s) => s.id === 'bat')!;
const mel = singles.find((s) => s.id === 'melancholia')!;

export interface LineSpec {
  text: string;
  at: number;
  out?: number;
  /** beats between characters */
  stagger?: number;
  /** rise distance in cqh */
  rise?: number;
}

export const LINES = {
  intro: { text: '허클베리핀은 1997년부터\n수많은 밤과 어둠을 노래해왔습니다.', at: 5.6, out: 10.6, stagger: 0.045 },
  opener: { text: '오랫동안 살아오면서 우리는\n수많은 자신을 뒤에 남겨둡니다.', at: 12.3, out: 15.7, stagger: 0.04 },
  fig1: { text: story.figures[0], at: 16.2, out: 19.7 },
  fig2: { text: story.figures[1], at: 20.2, out: 23.7 },
  fig3: { text: story.figures[2], at: 24.2, out: 27.7 },
  fig4: { text: story.figures[3], at: 28.2, out: 31.7 },
  q1: { text: '사라졌다고 생각했던 그들은', at: 32.2, out: 38.6, stagger: 0.06 },
  q2: { text: '정말 사라진 것일까요.', at: 34, out: 38.6, stagger: 0.08 },
  chant1: { text: '나의 노래는', at: 44, out: 49.6, stagger: 0.14, rise: 4 },
  chant2: { text: '나의 부적', at: 46, out: 49.6, stagger: 0.18, rise: 4 },
  chant3: { text: '끝없는 어둠을 건너게 해', at: 50, out: 55.2, stagger: 0.07 },
  eTitle: { text: album.title, at: 65.2, out: 86.2, stagger: 0.14, rise: 3 },
} satisfies Record<string, LineSpec>;

export type LineId = keyof typeof LINES;

export interface Word {
  chars: { ch: string; i: number }[];
}

/** Lines → words → characters, with one running index per character (spaces and breaks excluded). */
export function splitLine(text: string): Word[][] {
  let i = 0;
  return text.split('\n').map((line) =>
    line
      .split(' ')
      .filter(Boolean)
      .map((w) => ({ chars: Array.from(w).map((ch) => ({ ch, i: i++ })) }))
  );
}

const charCount = (text: string) => splitLine(text).flat().reduce((n, w) => n + w.chars.length, 0);

function charKeys(spec: LineSpec, i: number, n: number): Key[] {
  const stagger = Math.min(spec.stagger ?? 0.06, 2.4 / n);
  const rise = spec.rise ?? 2.2;
  const start = spec.at + i * stagger;
  const keys: Key[] = [
    [start, { o: 0, y: rise }],
    [start + 1.8, { o: 1, y: 0 }, 'out'],
  ];
  if (spec.out !== undefined) {
    // Leave together, with a hair of stagger so the line exhales rather than blinks.
    const leave = spec.out + i * 0.012;
    keys.push([leave, { o: 1, y: 0 }], [leave + 0.9, { o: 0, y: -rise * 0.6 }, 'in']);
  }
  return keys;
}

/* ───────────────────────── Captions ───────────────────────── */

export const CAPTIONS = {
  eyebrow: 'Huckleberryfinn — 8th Studio Album',
  bat: { order: bat.orderLabel, title: bat.title, latin: bat.titleLatin, date: '2026. 08. 21' },
  mel: { order: mel.orderLabel, title: mel.title, latin: mel.titleLatin, bpm: mel.bpm, date: '2026. 09. 29 12:00 KST' },
  chorus: mel.keyLine,
};

/* ───────────────────────── Tracks ───────────────────────── */

/** Quick in/hold/out envelope. */
const env = (a: number, b: number, c: number, d: number, peak = 1, from: Props = {}, to: Props = {}): Key[] => [
  [a, { o: 0, ...from }],
  [b, { o: peak }, 'inOut'],
  [c, { o: peak }],
  [d, { o: 0, ...to }, 'inOut'],
];

/** Caption rise-in and fade-out. */
const caption = (at: number, out: number): Key[] => [
  [at, { o: 0, y: 1.2 }],
  [at + 1.2, { o: 1, y: 0 }, 'out'],
  [out, { o: 1, y: 0 }],
  [out + 0.8, { o: 0, y: 0 }, 'inOut'],
];

/** Flash hits on accents: jump up, decay over one beat. */
const HITS = [44, 46, 56, 61.5];
const flashKeys: Key[] = [[0, { o: 0 }], ...HITS.flatMap((b): Key[] => [[b - 0.01, { o: 0 }], [b, { o: 0.22 }, 'hold'], [b + 1, { o: 0 }, 'out']])];

/** Where the cover lands on the end card, per layout. The cover box is a 100cqmin square centred on the stage. */
export function coverEnd(l: Layout) {
  if (l.kind === 'land') return { s: 0.62, x: -20, y: 0, bottom: 0 };
  // Portrait / square: box height ≈ 44% of the stage, 6% from the top; the card sits below it.
  const s = Math.min(0.78, 0.44 / Math.min(1, l.aspect));
  const h = s * Math.min(1, l.aspect) * 100; // cqh
  return { s, x: 0, y: 6 + h / 2 - 50, bottom: 6 + h };
}

function coverKeys(l: Layout): Key[] {
  // Portrait: start scaled up to fill the height, so the colour fields cover the frame.
  const s0 = l.kind === 'port' ? Math.max(1, 1 / l.aspect) : 1;
  const { s, x, y } = coverEnd(l);
  const end: Props = { s, x, y };
  return [
    [0, { o: 0, s: s0, x: 0, y: 0 }],
    [55.99, { o: 0 }],
    [56, { o: 1 }, 'hold'],
    [64, { s: s0, x: 0, y: 0 }],
    [68, end, 'inOut'],
    [86, {}],
    [88, { o: 0 }, 'inOut'],
  ];
}

export function buildTracks(l: Layout): Map<string, Track> {
  const raw: Record<string, Key[]> = {
    /* I. Light */
    eyebrow: env(1, 3, 10.5, 12, 0.75),
    bulb: [
      [0, { o: 1, s: 1 }],
      [10, { o: 1, s: 1.05 }, 'lin'],
      [12, { o: 0, s: 1.08 }, 'inOut'],
    ],
    bulbGlass: [
      [0.5, { dash: 1 }],
      [3.5, { dash: 0 }, 'inOut'],
    ],
    bulbFil: [
      [2, { dash: 1 }],
      [4, { dash: 0 }, 'inOut'],
    ],
    bulbHot: [
      [4, { o: 0 }],
      [4.25, { o: 1 }, 'hold'],
      [4.45, { o: 0.15 }, 'hold'],
      [4.75, { o: 1 }, 'hold'],
      [4.95, { o: 0.4 }, 'hold'],
      [5.1, { o: 1 }, 'hold'],
    ],
    bulbGlow: [
      [4, { o: 0, s: 0.5 }],
      [4.25, { o: 0.7, s: 0.8 }, 'hold'],
      [4.45, { o: 0.08 }, 'hold'],
      [4.75, { o: 0.8 }, 'hold'],
      [4.95, { o: 0.3 }, 'hold'],
      [5.1, { o: 1, s: 0.9 }, 'hold'],
      [7, { o: 0.9, s: 1.1 }, 'out'],
      [10.5, { o: 0.8, s: 1.25 }, 'lin'],
      [12, { o: 0, s: 1.6 }, 'inOut'],
    ],

    /* II. Figures */
    photo1: env(11.5, 14, 23, 24.2, 0.3, { s: 1.12 }, { s: 1 }),
    bat: [
      [23.6, { o: 0, s: 1.22 }],
      [24.6, { o: 0.5, s: 1.1 }, 'out'],
      [28, { o: 0.45, s: 1.03 }, 'lin'],
      [28.6, { o: 0, s: 1.02 }, 'in'],
    ],
    batTag: caption(24.6, 27.6),
    photo2: env(28, 29, 31.4, 32, 0.28, { s: 1.1 }, { s: 1.02 }),

    /* III–IV. Thread & Melancholia */
    paintingCam: [
      [0, { o: 0, s: 1 }],
      [34.99, { o: 0 }],
      [35, { o: 1 }, 'hold'],
      [41, { s: 1 }],
      [55.5, { o: 1, s: 1.16 }, 'lin'],
      [56, { o: 0 }, 'in'],
    ],
    painting: [
      [39, { o: 0 }],
      [41.2, { o: 1 }, 'inOut'],
    ],
    thread: [
      [35, { o: 1, dash: 1 }],
      [39, { dash: 0 }, 'inOut'],
      [44, { o: 1 }],
      [47.5, { o: 0 }, 'inOut'],
    ],
    threadGlow: [
      [35, { o: 0.28, dash: 1 }],
      [39, { dash: 0 }, 'inOut'],
      [40, { o: 0.28 }],
      [42, { o: 0 }, 'inOut'],
    ],
    scrim: env(40, 43, 55.5, 56, 1),
    melTag: caption(41.6, 55),
    flash: flashKeys,

    /* V–VI. Album & release */
    cover: coverKeys(l),
    pCobalt: [
      [56, { sy: 0 }],
      [56.9, { sy: 1 }, 'out'],
      [62, { o: 1 }],
      [64, { o: 0 }, 'inOut'],
    ],
    pTeal: [
      [57, { sy: 0 }],
      [57.9, { sy: 1 }, 'out'],
      [62, { o: 1 }],
      [64, { o: 0 }, 'inOut'],
    ],
    pCoral: [
      [58, { sy: 0 }],
      [58.9, { sy: 1 }, 'out'],
      [62, { o: 1 }],
      [64, { o: 0 }, 'inOut'],
    ],
    shelf: [
      [59, { sx: 0 }],
      [60.2, { sx: 1 }, 'out'],
      [62, { o: 1 }],
      [64, { o: 0 }, 'inOut'],
    ],
    coverImg: [
      [60, { o: 0 }],
      [61.5, { o: 1 }, 'inOut'],
    ],
    flare: [
      [60.9, { o: 0, s: 0.3 }],
      [61, { o: 0.9, s: 0.6 }, 'hold'],
      [61.2, { o: 0.15 }, 'hold'],
      [61.5, { o: 1, s: 1 }, 'hold'],
      [63, { o: 0.5, s: 1.35 }, 'out'],
    ],
    eEyebrow: caption(64.6, 86),
    eTag: caption(67.2, 86),
    eRule: [
      [67.6, { sx: 0, o: 1 }],
      [69.4, { sx: 1 }, 'out'],
      [86, { o: 1 }],
      [86.8, { o: 0 }, 'inOut'],
    ],
    eDate: caption(68.2, 86),
    eRow0: caption(69.2, 86),
    eRow1: caption(69.7, 86),
    eRow2: caption(70.2, 86),
  };

  const map = new Map<string, Track>();
  for (const [name, keys] of Object.entries(raw)) map.set(name, compile(keys));
  for (const [id, spec] of Object.entries(LINES) as [LineId, LineSpec][]) {
    const n = charCount(spec.text);
    for (let i = 0; i < n; i++) map.set(`${id}.${i}`, compile(charKeys(spec, i, n)));
  }
  return map;
}
