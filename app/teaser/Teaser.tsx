'use client';

import { Fragment, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaCompress, FaExpand, FaPause, FaPlay, FaRedoAlt, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
import { album, concert, story, TUMBLBUG_URL } from '@/app/data/album8';
import { useMotionPrefs } from '@/lib/motionPrefs';
import { useNow } from '@/lib/useNow';
import { isFundingOpen, isMelancholiaOut, isReleased } from '@/lib/timeline';
import { THREAD_D } from '@/app/_components/album8/hero/art-space';
import { apply, BEAT, BPM, fmtTime, pulse, type Track } from './engine';
import { SOUNDTRACK } from './soundtrack';
import {
  buildTracks,
  CAPTIONS,
  CHAPTERS,
  coverEnd,
  intensity,
  layoutFor,
  LENGTH,
  LINES,
  POSTER_BEAT,
  splitLine,
  type Layout,
  type LineId,
} from './score';
import './teaser.css';

/* ───────────────────────── Stage ratios ───────────────────────── */

const RATIOS = {
  '16x9': { label: '16:9', r: 16 / 9 },
  '9x16': { label: '9:16', r: 9 / 16 },
  '1x1': { label: '1:1', r: 1 },
  fill: { label: '화면', r: 0 },
} as const;
type Ratio = keyof typeof RATIOS;
const isRatio = (v: string | null): v is Ratio => !!v && v in RATIOS;

function stageSize(ratio: Ratio): React.CSSProperties {
  const { r } = RATIOS[ratio];
  if (!r) return { width: '100%', height: '100%' };
  return { width: `min(100vw, calc(100svh * ${r}))`, height: `min(100svh, calc(100vw / ${r}))` };
}

const IMAGES = 5;
const focusRing = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bulb focus-visible:ring-offset-2 focus-visible:ring-offset-black';

/* ───────────────────────── Text ───────────────────────── */

/** A line split into per-character spans. Words never break inside; lines wrap between words. */
function Line({ id, className }: { id: LineId; className?: string }) {
  const lines = useMemo(() => splitLine(LINES[id].text), [id]);
  return (
    <p className={className}>
      {lines.map((words, li) => (
        <span key={li} className="block">
          {words.map((w, wi) => (
            <Fragment key={wi}>
              {wi > 0 && ' '}
              <span className="inline-block whitespace-nowrap">
                {w.chars.map((c) => (
                  <span key={c.i} data-tl={`${id}.${c.i}`} className="inline-block">
                    {c.ch}
                  </span>
                ))}
              </span>
            </Fragment>
          ))}
        </span>
      ))}
    </p>
  );
}

function Caption({ tl, order, title, latin, meta, className = '' }: { tl: string; order: string; title: string; latin: string; meta: string; className?: string }) {
  return (
    <div data-tl={tl} className={`teaser-caption absolute flex flex-wrap items-center gap-x-[1.6cqmin] gap-y-[0.6cqmin] text-[length:calc(var(--u)*1.9)] text-cream/85 ${className}`}>
      <span className="font-serif-latin text-[length:calc(var(--u)*2.3)] italic text-bulb">{order}</span>
      <span className="h-[1.6cqmin] w-px bg-cream/30" />
      <span className="font-serif-kr font-bold">〈{title}〉</span>
      <span className="font-serif-latin text-[length:calc(var(--u)*2.3)] italic text-cream/70">{latin}</span>
      <span className="tracking-[0.08em] text-cream/70">{meta}</span>
    </div>
  );
}

/* ───────────────────────── Teaser ───────────────────────── */

export default function Teaser() {
  const { reduced, paused: sitePaused } = useMotionPrefs();
  const now = useNow();
  const released = isReleased(now);
  const melOut = isMelancholiaOut(now);
  const fundingOpen = isFundingOpen(now);

  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const rangeRef = useRef<HTMLInputElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const timeRef = useRef<HTMLSpanElement>(null);

  const [ratio, setRatio] = useState<Ratio>('16x9');
  const [layout, setLayout] = useState<Layout>(() => layoutFor(16 / 9));
  const [playing, setPlaying] = useState(false);
  const [clean, setClean] = useState(false);
  const [idle, setIdle] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [loaded, setLoaded] = useState(0);
  const [ready, setReady] = useState(false);

  const beatRef = useRef(0);
  const playingRef = useRef(false);
  const bindingsRef = useRef<[HTMLElement | SVGElement, Track][]>([]);
  const lastSecond = useRef(-1);

  /* Render one frame at the given beat. Pure DOM writes, no React state. */
  const render = useCallback((beat: number) => {
    for (const [el, track] of bindingsRef.current) apply(el, track, beat);
    const stage = stageRef.current;
    if (stage) {
      const k = playingRef.current ? pulse(beat) * intensity(beat) : 0;
      stage.style.setProperty('--beat', k.toFixed(3));
    }
    if (rangeRef.current) rangeRef.current.value = String(beat);
    if (fillRef.current) fillRef.current.style.transform = `scaleX(${beat / LENGTH})`;
    const sec = Math.floor(beat * BEAT);
    if (timeRef.current && sec !== lastSecond.current) {
      lastSecond.current = sec;
      timeRef.current.textContent = fmtTime(beat);
    }
  }, []);

  /* Bind every [data-tl] element to its track; rebuilt when the layout changes. */
  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const tracks = buildTracks(layout);
    const bindings: [HTMLElement | SVGElement, Track][] = [];
    stage.querySelectorAll<HTMLElement | SVGElement>('[data-tl]').forEach((el) => {
      const track = tracks.get(el.dataset.tl!);
      if (track) bindings.push([el, track]);
      else if (process.env.NODE_ENV !== 'production') console.warn(`[teaser] no track for "${el.dataset.tl}"`);
    });
    bindingsRef.current = bindings;
    render(beatRef.current);
  }, [layout, released, melOut, fundingOpen, render]);

  /* Stage size → layout (landscape / portrait end card, portrait cover fill). */
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (!width || !height) return;
      const next = layoutFor(width / height);
      setLayout((prev) => (prev.kind === next.kind && Math.abs(prev.aspect - next.aspect) < 0.01 ? prev : next));
    });
    ro.observe(stage);
    return () => ro.disconnect();
  }, []);

  /* Soundtrack: optional. When it is on, the audio clock drives the playhead so picture and music never drift. */
  const audioRef = useRef<HTMLAudioElement>(null);
  const [soundAvailable, setSoundAvailable] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const soundOnRef = useRef(false);

  const syncAudio = useCallback((beat: number) => {
    const a = audioRef.current;
    if (a && soundOnRef.current) a.currentTime = SOUNDTRACK.offset + beat * BEAT;
  }, []);

  useEffect(() => {
    soundOnRef.current = soundOn;
    const a = audioRef.current;
    if (!a || !soundAvailable) return;
    if (playing && soundOn) {
      a.currentTime = SOUNDTRACK.offset + beatRef.current * BEAT;
      // Blocked autoplay (no user gesture yet) just leaves the teaser silent.
      a.play().catch(() => setSoundOn(false));
    } else {
      a.pause();
    }
  }, [playing, soundOn, soundAvailable]);

  /* Playback loop. Delta is clamped, so a background tab resumes where it left off. */
  useEffect(() => {
    playingRef.current = playing;
    if (!playing) {
      render(beatRef.current);
      return;
    }
    let raf = 0;
    let last = performance.now();
    const tick = (t: number) => {
      const dt = Math.min(0.1, (t - last) / 1000);
      last = t;
      const a = audioRef.current;
      if (a && soundOnRef.current && !a.paused) {
        let beat = (a.currentTime - SOUNDTRACK.offset) / BEAT;
        if (beat >= LENGTH || a.ended) {
          beat = 0;
          a.currentTime = SOUNDTRACK.offset;
          if (a.ended) void a.play();
        }
        beatRef.current = Math.max(0, beat);
      } else {
        beatRef.current = (beatRef.current + dt / BEAT) % LENGTH;
      }
      render(beatRef.current);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing, render]);

  const seek = useCallback(
    (beat: number) => {
      beatRef.current = Math.min(LENGTH - 0.001, Math.max(0, beat));
      syncAudio(beatRef.current);
      render(beatRef.current);
    },
    [render, syncAudio]
  );

  const restart = useCallback(() => {
    seek(0);
    setPlaying(true);
  }, [seek]);

  /* URL options: ?ratio=9x16&clean=1 — handy for repeatable screen recordings. */
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const r = q.get('ratio');
    if (isRatio(r)) setRatio(r);
    if (q.get('clean') === '1') setClean(true);
  }, []);

  /* Start once the artwork is decoded (or after 5 s regardless). */
  useEffect(() => {
    if (loaded >= IMAGES) setReady(true);
  }, [loaded]);
  useEffect(() => {
    const id = setTimeout(() => setReady(true), 5000);
    return () => clearTimeout(id);
  }, []);
  const started = useRef(false);
  useEffect(() => {
    if (!ready || started.current) return;
    started.current = true;
    // Reduced motion or the site-wide pause: show the release card as a still, play on request.
    if (reduced || sitePaused) seek(POSTER_BEAT);
    else setPlaying(true);
  }, [ready, reduced, sitePaused, seek]);

  const toggleFullscreen = useCallback(() => {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void rootRef.current?.requestFullscreen?.();
  }, []);
  useEffect(() => {
    const on = () => setFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', on);
    return () => document.removeEventListener('fullscreenchange', on);
  }, []);

  /* Controls fade out while playing and the pointer rests. */
  const idleTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const wake = useCallback(() => {
    setIdle(false);
    clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => setIdle(true), 2400);
  }, []);
  useEffect(() => () => clearTimeout(idleTimer.current), []);
  useEffect(() => {
    if (clean) wake();
  }, [clean, wake]);

  /* Keyboard: Space/K play, R restart, ←/→ one bar, H clean, F fullscreen, 1–4 ratio. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const target = e.target as HTMLElement;
      const onControl = target.closest('button, input, a');
      wake();
      switch (e.key) {
        case ' ':
        case 'k':
          if (onControl && e.key === ' ') return;
          e.preventDefault();
          setPlaying((p) => !p);
          break;
        case 'r':
          restart();
          break;
        case 'ArrowLeft':
        case 'ArrowRight':
          if (target.tagName === 'INPUT') return;
          e.preventDefault();
          seek(beatRef.current + (e.key === 'ArrowLeft' ? -4 : 4));
          break;
        case 'h':
          setClean((c) => !c);
          break;
        case 'm':
          if (soundAvailable) setSoundOn((v) => !v);
          break;
        case 'f':
          toggleFullscreen();
          break;
        case '1':
        case '2':
        case '3':
        case '4':
          setRatio((Object.keys(RATIOS) as Ratio[])[Number(e.key) - 1]);
          break;
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [restart, seek, toggleFullscreen, wake, soundAvailable]);

  const onImg = useCallback(() => setLoaded((n) => n + 1), []);

  /* Camera origin on the face: the painting is square and covers the stage (object-fit: cover). */
  const faceOrigin = useMemo(() => {
    const a = layout.aspect;
    const ox = a >= 1 ? 0.44 : (0.44 - (0.5 - a / 2)) / a;
    const oy = a >= 1 ? (0.3 - (0.5 - 0.5 / a)) * a : 0.3;
    return `${(ox * 100).toFixed(1)}% ${(oy * 100).toFixed(1)}%`;
  }, [layout.aspect]);

  const end = coverEnd(layout);
  const land = layout.kind === 'land';
  const controlsHidden = clean || (playing && idle);

  const [seoul, busan] = concert.shows;
  const releaseLine = released ? 'Out now' : '2026. 10. 23 FRI 12:00 KST';
  const melMeta = melOut ? `${CAPTIONS.mel.bpm} BPM · Out now` : `${CAPTIONS.mel.bpm} BPM · ${CAPTIONS.mel.date}`;

  return (
    <div
      ref={rootRef}
      onPointerMove={wake}
      className={`fixed inset-0 z-[55] flex items-center justify-center overflow-hidden bg-black ${clean && idle ? 'cursor-none' : ''}`}
    >
      <audio
        ref={audioRef}
        src={SOUNDTRACK.src}
        preload="auto"
        onCanPlayThrough={() => setSoundAvailable(true)}
        onError={() => setSoundAvailable(false)}
      />
      <h1 className="sr-only">허클베리핀 정규 8집 〈모두가 아는 이야기〉 티저</h1>

      {/* ═══════════════ Stage ═══════════════ */}
      <div
        ref={stageRef}
        role="img"
        aria-label={`허클베리핀 정규 8집 〈${album.title}〉 모션 티저. 불이 켜지는 전구, 뒤에 남겨둔 자신들에 대한 문장, 〈박쥐〉와 〈멜랑콜리아〉의 커버, 붉은 실, 앨범 커버로 이어지며 ${album.releaseLabel} 발매를 알립니다.`}
        className="teaser-stage relative overflow-hidden bg-ink text-cream"
        style={{ ...stageSize(ratio), ['--u' as string]: layout.aspect < 0.8 ? '1.3cqw' : '1cqmin' }}
      >
        {/* ── II. Figures: photographs behind the lines ── */}
        <div data-tl="photo1" className="absolute inset-0">
          <Image src={story.images[0].src} alt="" fill priority sizes="100vw" className="teaser-photo object-cover" onLoad={onImg} />
        </div>
        <div data-tl="bat" className="absolute inset-0">
          <Image src="/images/8th_album/single-bat.jpg" alt="" fill priority sizes="(orientation: portrait) 100vh, 100vw" className="object-cover" onLoad={onImg} />
          <div className="absolute inset-0 bg-ink/35 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(10,13,20,0.75)_100%)]" />
        </div>
        <div data-tl="photo2" className="absolute inset-0">
          <Image src={story.images[1].src} alt="" fill priority sizes="100vw" className="teaser-photo object-cover" onLoad={onImg} />
        </div>

        {/* ── I. Light: line-drawn bulb ── */}
        <div
          data-tl="bulb"
          className="absolute left-1/2 top-[42%] ml-[-12cqmin] mt-[-17cqmin] h-[34cqmin] w-[24cqmin]"
        >
          <div data-tl="bulbGlow" className="teaser-glow absolute left-[-43cqmin] top-[-40cqmin] h-[110cqmin] w-[110cqmin] rounded-full" />
          <svg viewBox="0 0 100 140" className="absolute inset-0 h-full w-full overflow-visible" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path
              data-tl="bulbGlass"
              pathLength={1}
              strokeDasharray="1 1"
              stroke="#F1E8D6"
              strokeOpacity={0.8}
              strokeWidth={0.7}
              d="M50 10 C29 10 15 26 15 46 C15 61 24 70 31 79 C35 85 37 91 37 97 L63 97 C63 91 65 85 69 79 C76 70 85 61 85 46 C85 26 71 10 50 10 Z M37 102 H63 M37.5 107 H62.5 M38.5 112 H61.5 M41 117 H59 M45 122 H55"
            />
            <path
              data-tl="bulbFil"
              pathLength={1}
              strokeDasharray="1 1"
              stroke="#F1E8D6"
              strokeOpacity={0.55}
              strokeWidth={0.5}
              d={FILAMENT}
            />
            <path data-tl="bulbHot" stroke="#FFE3A3" strokeWidth={1.2} d={FILAMENT} />
          </svg>
        </div>
        <p data-tl="eyebrow" className="absolute inset-x-0 top-[7cqh] text-center font-serif-latin text-[length:calc(var(--u)*2.2)] italic tracking-[0.18em] text-cream/80">
          {CAPTIONS.eyebrow}
        </p>
        <div className="absolute inset-x-[8cqw] bottom-[13cqh] text-center">
          <Line id="intro" className="font-serif-kr text-[length:calc(var(--u)*3.3)] font-bold leading-[1.7] text-cream/90" />
        </div>

        {/* ── II. Figures: the selves left behind ── */}
        {(['opener', 'fig1', 'fig2', 'fig3', 'fig4'] as const).map((id) => (
          <div key={id} className="absolute inset-0 flex items-center justify-center px-[8cqw] text-center">
            <Line
              id={id}
              className={`teaser-shadow font-serif-kr font-extrabold leading-[1.45] ${id === 'opener' ? 'text-[length:calc(var(--u)*4)] text-cream/90' : 'text-[length:calc(var(--u)*5.4)]'}`}
            />
          </div>
        ))}
        <Caption
          tl="batTag"
          order={CAPTIONS.bat.order}
          title={CAPTIONS.bat.title}
          latin={CAPTIONS.bat.latin}
          meta={`${CAPTIONS.bat.date} · Out now`}
          className="inset-x-0 bottom-[7cqh] justify-center px-[6cqw]"
        />

        {/* ── III–IV. The red thread becomes the painting's own ── */}
        <div data-tl="paintingCam" className="absolute inset-0" style={{ transformOrigin: faceOrigin }}>
          <div data-tl="painting" className="absolute inset-0">
            <Image
              src="/images/8th_album/single-melancholia.jpg"
              alt=""
              fill
              priority
              sizes="(orientation: portrait) 100vh, 100vw"
              className="object-cover"
              onLoad={onImg}
            />
          </div>
          <svg viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" fill="none" strokeLinecap="round">
            <path data-tl="threadGlow" d={THREAD_D} pathLength={1} strokeDasharray="1 1" stroke="#E2482F" strokeWidth={10} />
            <path data-tl="thread" d={THREAD_D} pathLength={1} strokeDasharray="1 1" stroke="#E2482F" strokeWidth={5} />
          </svg>
        </div>
        <div data-tl="scrim" className="teaser-scrim absolute inset-0" />

        <div className="absolute inset-x-[8cqw] top-[52%] text-center">
          <Line id="q1" className="teaser-shadow font-serif-kr text-[length:calc(var(--u)*4.4)] font-bold leading-[1.5] text-cream/85" />
          <Line id="q2" className="teaser-shadow mt-[1.2cqmin] font-serif-kr text-[length:calc(var(--u)*6)] font-extrabold leading-[1.4]" />
        </div>

        <div className="beat-pulse absolute inset-x-[6cqw] bottom-[11cqh] text-center">
          <Line id="chant1" className="teaser-shadow font-serif-kr text-[length:calc(var(--u)*10)] font-extrabold leading-[1.15]" />
          <Line id="chant2" className="teaser-shadow font-serif-kr text-[length:calc(var(--u)*10)] font-extrabold leading-[1.15] text-bulb-hot" />
        </div>
        <div className="beat-pulse-soft absolute inset-x-[6cqw] bottom-[16cqh] text-center">
          <Line id="chant3" className="teaser-shadow font-serif-kr text-[length:calc(var(--u)*5.4)] font-extrabold leading-[1.4]" />
        </div>
        <Caption
          tl="melTag"
          order={CAPTIONS.mel.order}
          title={CAPTIONS.mel.title}
          latin={CAPTIONS.mel.latin}
          meta={melMeta}
          className="left-[6cqw] right-[6cqw] top-[7cqh]"
        />

        {/* ── V. Colour fields → the album cover ── */}
        <div data-tl="cover" className="absolute left-1/2 top-1/2 ml-[-50cqmin] mt-[-50cqmin] h-[100cqmin] w-[100cqmin]">
          <div data-tl="pCobalt" className="teaser-cobalt absolute inset-y-0 left-[-300%] w-[344%] origin-top" />
          <div data-tl="pTeal" className="teaser-teal absolute inset-y-0 left-[44%] w-[28%] origin-bottom" />
          <div data-tl="pCoral" className="teaser-coral absolute inset-y-0 left-[72%] w-[328%] origin-top" />
          <div data-tl="shelf" className="teaser-shelf absolute left-[-300%] top-[64.5%] h-[9.5%] w-[700%]" />
          <div data-tl="coverImg" className="teaser-cover absolute inset-0">
            <Image src={album.cover} alt="" fill priority sizes="100vmin" className="object-cover" onLoad={onImg} />
          </div>
          <div data-tl="flare" className="teaser-flare beat-pulse absolute left-[15%] top-[14%] h-[70%] w-[70%] rounded-full" />
        </div>

        {/* ── VI. Release card ── */}
        <div
          className={`absolute flex flex-col ${land ? 'bottom-0 left-[54cqw] right-[6cqw] top-0 items-start justify-center text-left' : 'inset-x-[7cqw] bottom-[4cqh] items-center justify-start text-center'}`}
          style={land ? undefined : { top: `${end.bottom + 5}cqh` }}
        >
          <p data-tl="eEyebrow" className="font-serif-latin text-[length:calc(var(--u)*2.2)] italic tracking-[0.14em] text-cream/75">
            Huckleberryfinn · 8th Studio Album
          </p>
          <Line
            id="eTitle"
            className={`mt-[1.2cqmin] font-serif-kr font-extrabold leading-[1.2] ${land ? 'text-[length:calc(var(--u)*6.2)]' : 'text-[length:calc(var(--u)*6.6)]'}`}
          />
          <p data-tl="eTag" className="mt-[1.6cqmin] font-serif-kr text-[length:calc(var(--u)*2.1)] font-bold text-cream/70">
            {album.tagline}
          </p>
          <div data-tl="eRule" className={`my-[2.6cqmin] h-[0.3cqmin] w-[20cqmin] bg-thread ${land ? 'origin-left' : 'origin-center'}`} />
          <p data-tl="eDate" className="font-serif-latin text-[length:calc(var(--u)*3.6)] leading-none text-bulb">
            {releaseLine}
          </p>
          <ul className={`mt-[2.6cqmin] space-y-[0.9cqmin] text-[length:calc(var(--u)*1.85)] text-cream/80 ${land ? '' : 'flex flex-col items-center'}`}>
            <li data-tl="eRow0">
              <span className="text-cream/50">2nd Single</span> 〈멜랑콜리아〉 {melOut ? 'Out now' : '09.29 (화) 12:00 공개'}
            </li>
            <li data-tl="eRow1">
              <span className="text-cream/50">22nd Yellow Concert</span> 서울 {mmdd(seoul.date)} {seoul.venue.replace('KT&G ', '')} · 부산{' '}
              {mmdd(busan.date)} {busan.venue}
            </li>
            <li data-tl="eRow2">
              {fundingOpen ? (
                <>
                  <span className="text-cream/50">텀블벅 후원</span> ~10.11 · {TUMBLBUG_URL.replace('https://', '')}
                </>
              ) : (
                <>
                  <span className="text-cream/50">EPK</span> huckleberryfinn.vercel.app
                </>
              )}
            </li>
          </ul>
        </div>

        {/* Accents and lens */}
        <div data-tl="flash" className="pointer-events-none absolute inset-0 bg-bulb-hot" />
        <div className="teaser-vignette pointer-events-none absolute inset-0" />

        {!ready && (
          <p className="motion-loop teaser-loading absolute inset-x-0 bottom-[8cqh] text-center font-serif-latin text-[length:calc(var(--u)*2)] italic text-cream/50">
            Lighting the bulb…
          </p>
        )}
      </div>

      {/* ═══════════════ Controls ═══════════════ */}
      <div
        className={`absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/85 via-black/50 to-transparent px-4 pb-4 pt-12 transition-opacity duration-500 sm:px-6 ${controlsHidden ? 'pointer-events-none opacity-0' : 'opacity-100'}`}
        onFocusCapture={wake}
      >
        <div className="mx-auto max-w-5xl">
          {/* Scrubber with chapter marks */}
          <div className="relative mb-3 h-5">
            <div className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 overflow-hidden rounded-full bg-cream/15">
              <div ref={fillRef} className="h-full w-full origin-left bg-thread" style={{ transform: 'scaleX(0)' }} />
            </div>
            {CHAPTERS.map((c) => (
              <span
                key={c.label}
                aria-hidden
                className="pointer-events-none absolute top-1/2 h-2 w-px -translate-y-1/2 bg-cream/40"
                style={{ left: `${(c.at / LENGTH) * 100}%` }}
              >
                <span className="absolute bottom-full left-1/2 mb-1.5 hidden -translate-x-1/2 whitespace-nowrap font-serif-latin text-[11px] italic text-cream/45 md:block">
                  {c.label}
                </span>
              </span>
            ))}
            <input
              ref={rangeRef}
              type="range"
              min={0}
              max={LENGTH}
              step={0.01}
              defaultValue={0}
              aria-label="재생 위치"
              onInput={(e) => seek(Number(e.currentTarget.value))}
              className={`teaser-range absolute inset-0 w-full cursor-pointer ${focusRing}`}
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 text-sm text-cream/80">
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? '일시정지' : '재생'}
              className={`flex h-10 w-10 items-center justify-center rounded-full bg-cream text-ink transition-transform hover:scale-105 ${focusRing}`}
            >
              {playing ? <FaPause aria-hidden /> : <FaPlay aria-hidden className="ml-0.5" />}
            </button>
            <button
              type="button"
              onClick={restart}
              aria-label="처음부터"
              className={`flex h-10 w-10 items-center justify-center rounded-full text-cream/80 hover:text-cream ${focusRing}`}
            >
              <FaRedoAlt aria-hidden />
            </button>
            {soundAvailable && (
              <button
                type="button"
                onClick={() => {
                  setSoundOn((v) => !v);
                  setPlaying(true);
                }}
                aria-pressed={soundOn}
                aria-label={soundOn ? '소리 끄기' : '소리 켜기'}
                className={`flex h-10 items-center gap-2 rounded-full px-3 text-xs ${soundOn ? 'text-cream' : 'text-cream/60 hover:text-cream'} ${focusRing}`}
              >
                {soundOn ? <FaVolumeUp aria-hidden /> : <FaVolumeMute aria-hidden />}
                <span className="hidden sm:inline">{soundOn ? 'Sound on' : 'Sound off'}</span>
              </button>
            )}
            <span className="ml-1 font-mono text-xs tabular-nums text-cream/60">
              <span ref={timeRef}>00:00</span> / {fmtTime(LENGTH)} · {BPM} BPM
            </span>

            <div className="ml-auto flex items-center gap-1" role="group" aria-label="화면 비율">
              {(Object.keys(RATIOS) as Ratio[]).map((k) => (
                <button
                  key={k}
                  type="button"
                  aria-pressed={ratio === k}
                  onClick={() => setRatio(k)}
                  className={`rounded-full px-3 py-1.5 text-xs transition-colors ${ratio === k ? 'bg-cream/15 text-cream' : 'text-cream/55 hover:text-cream'} ${focusRing}`}
                >
                  {RATIOS[k].label}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setClean(true)}
              className={`rounded-full px-3 py-1.5 text-xs text-cream/55 hover:text-cream ${focusRing}`}
              title="컨트롤 숨기기 (H)"
            >
              녹화 모드
            </button>
            <button
              type="button"
              onClick={toggleFullscreen}
              aria-label={fullscreen ? '전체 화면 종료' : '전체 화면'}
              className={`flex h-9 w-9 items-center justify-center rounded-full text-cream/70 hover:text-cream ${focusRing}`}
            >
              {fullscreen ? <FaCompress aria-hidden /> : <FaExpand aria-hidden />}
            </button>
            <Link href="/" className={`rounded-full px-3 py-1.5 text-xs text-cream/55 hover:text-cream ${focusRing}`}>
              EPK로
            </Link>
          </div>
          <p className="mt-2 hidden text-[11px] text-cream/35 sm:block">
            Space 재생 · M 소리 · ←/→ 한 마디 · R 처음부터 · H 녹화 모드 · F 전체 화면 · 1–4 비율 · URL에 ?ratio=9x16&amp;clean=1
          </p>
        </div>
      </div>

      {clean && (
        <button
          type="button"
          onClick={() => setClean(false)}
          className={`absolute right-3 top-3 z-10 rounded-full bg-black/40 px-3 py-1.5 text-xs text-cream/70 transition-opacity duration-500 ${idle ? 'pointer-events-none opacity-0' : 'opacity-100'} ${focusRing}`}
        >
          컨트롤 보기 (H)
        </button>
      )}
    </div>
  );
}

/** '2026-10-31T19:00…' → '10.31' */
const mmdd = (iso: string) => iso.slice(5, 10).replace('-', '.');

/** Two supports, then the coil. */
const FILAMENT =
  'M44 97 L43 64 M56 97 L57 64 M43 64 C44 58 46 58 46.5 62 C47 66 49 66 49.5 62 C50 58 52 58 52.5 62 C53 66 55 66 55.5 62 C56 58 57 60 57 64';
