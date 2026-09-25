'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import {
  motion,
  MotionValue,
  transform,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { FaPause, FaPlay } from 'react-icons/fa';
import { clampCam, type Cam } from './art-space';
import HeroThread from './HeroThread';
import { getHeroStatus, type HeroStatus } from './heroStatus';
import { COVER_BLUR } from './coverBlur';
import { TUMBLBUG_URL } from '@/app/data/album8';

const HeroCanvas = dynamic(() => import('./HeroCanvas'), { ssr: false });

const COVER_SRC = '/images/8th_album/hero/cover-2400.jpg';
const COVER_ALT =
  '정규 8집 〈모두가 아는 이야기〉 커버: 붉은 실에 눈이 가려진 채 위를 올려다보는 얼굴, 달과 빈 의자가 있는 어두운 입체파풍 회화';

type Size = { W: number; H: number };

/**
 * Camera keyframes in painting space (x, y = centre 0..1, z = zoom).
 * The visitor's scroll drives the camera: rest → covered eyes → along the thread → empty chair → pull back.
 */
const LANDSCAPE = {
  at: [0, 0.12, 0.36, 0.5, 0.62, 0.84, 1],
  x: [0.5, 0.5, 0.44, 0.66, 0.88, 0.5, 0.5],
  y: [0.37, 0.37, 0.3, 0.36, 0.58, 0.4, 0.4],
  z: [1, 1, 1.85, 1.95, 1.9, 1.06, 1.06],
};
const PORTRAIT = {
  at: [0, 0.1, 0.34, 0.5, 0.62, 0.84, 1],
  x: [0.5, 0.5, 0.42, 0.62, 0.86, 0.5, 0.5],
  y: [0.5, 0.5, 0.31, 0.36, 0.58, 0.5, 0.5],
  z: [1, 1, 1.5, 1.55, 1.45, 1, 1],
};

function camAt(p: number, { W, H }: Size): Cam {
  const k = W / H >= 1 ? LANDSCAPE : PORTRAIT;
  return clampCam({ x: transform(p, k.at, k.x), y: transform(p, k.at, k.y), z: transform(p, k.at, k.z) }, W, H);
}

interface Caps {
  mounted: boolean;
  reduced: boolean;
  fine: boolean;
  webgl: boolean;
}

function useCaps(): Caps {
  const [caps, setCaps] = useState<Caps>({ mounted: false, reduced: false, fine: false, webgl: false });
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(pointer: fine) and (hover: hover)').matches;
    const nav = navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
      deviceMemory?: number;
    };
    const slowNet = !!nav.connection?.saveData || /2g|3g/.test(nav.connection?.effectiveType ?? '');
    const weak = (nav.hardwareConcurrency ?? 8) < 4 || (nav.deviceMemory ?? 8) < 4;
    setCaps({
      mounted: true,
      reduced,
      fine,
      webgl: fine && !reduced && !slowNet && !weak && window.innerWidth >= 1024,
    });
  }, []);
  return caps;
}

function useHeroStatus(): HeroStatus {
  const [status, setStatus] = useState<HeroStatus>(() => getHeroStatus(Date.now()));
  useEffect(() => {
    const tick = () => setStatus(getHeroStatus(Date.now()));
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);
  return status;
}

/* ---------- title ---------- */

const TITLE_LINES = ['모두가 아는', '이야기'];

function SpreadChar({ ch, i, center, spread }: { ch: string; i: number; center: number; spread: MotionValue<number> }) {
  const x = useTransform(spread, (s) => (i - center) * s);
  return (
    <motion.span style={{ x }} className="inline-block">
      <span className="hero-char" style={{ ['--i' as string]: i }}>
        {ch === ' ' ? ' ' : ch}
      </span>
    </motion.span>
  );
}

function HeroTitle({ spread }: { spread: MotionValue<number> }) {
  let idx = 0;
  const total = TITLE_LINES.join('').length;
  const center = (total - 1) / 2;
  return (
    <h1
      id="hero-title"
      className="font-serif-kr text-[clamp(3.4rem,15vw,5.2rem)] font-extrabold leading-[1.02] tracking-[-0.03em] text-cream sm:text-[clamp(4rem,11vw,11rem)]"
    >
      <span className="sr-only">모두가 아는 이야기</span>
      <span aria-hidden="true">
        {TITLE_LINES.map((line, li) => (
          <span key={line} className="block whitespace-nowrap">
            {line.split('').map((ch) => {
              const i = idx++;
              return <SpreadChar key={`${li}-${i}`} ch={ch} i={i} center={center} spread={spread} />;
            })}
          </span>
        ))}
      </span>
    </h1>
  );
}

/* ---------- beats ---------- */

function Beat({
  opacity,
  className = '',
  children,
}: {
  opacity: MotionValue<number>;
  className?: string;
  children: React.ReactNode;
}) {
  const y = useTransform(opacity, [0, 1], [16, 0]);
  return (
    <motion.div aria-hidden="true" style={{ opacity, y }} className={`pointer-events-none absolute ${className}`}>
      {children}
    </motion.div>
  );
}

/* ---------- section ---------- */

export default function SectionHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const caps = useCaps();
  const status = useHeroStatus();
  const [paused, setPaused] = useState(false);
  const [loadGL, setLoadGL] = useState(false);
  const [glReady, setGlReady] = useState(false);
  const [texSrc, setTexSrc] = useState('/images/8th_album/hero/cover-tex-1600.webp');

  const pinned = caps.mounted ? !caps.reduced : true;
  const live = caps.mounted && !caps.reduced && !paused;

  // ----- scroll → camera -----
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.0005 });
  const size = useMotionValue<Size>({ W: 1440, H: 900 });
  const cam = useTransform(() => camAt(pinned ? smooth.get() : 0, size.get()));
  const boxX = useTransform(cam, (c) => `${(0.5 - c.x) * c.z * 100}%`);
  const boxY = useTransform(cam, (c) => `${(0.5 - c.y) * c.z * 100}%`);
  const boxS = useTransform(cam, (c) => c.z);

  // ----- beats -----
  const introOpacity = useTransform(smooth, [0, 0.07, 0.13, 0.86, 0.94], [1, 1, 0, 0, 1]);
  const introY = useTransform(smooth, [0, 0.13, 0.86, 0.94], [0, -36, 24, 0]);
  const spread = useTransform(() => (pinned ? transform(smooth.get(), [0, 0.13, 0.86, 0.94], [0, 34, 34, 0]) : 0));
  const dim = useTransform(smooth, [0.12, 0.2, 0.84, 0.92], [0, 0.42, 0.42, 0]);
  const beatA = useTransform(smooth, [0.15, 0.2, 0.31, 0.36], [0, 1, 1, 0]);
  const beatB = useTransform(smooth, [0.42, 0.47, 0.58, 0.63], [0, 1, 1, 0]);
  const beatC = useTransform(smooth, [0.66, 0.71, 0.8, 0.85], [0, 1, 1, 0]);
  const cueOpacity = useTransform(smooth, [0, 0.04], [1, 0]);

  // ----- stage size -----
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const ro = new ResizeObserver(([e]) => {
      const { width, height } = e.contentRect;
      if (width > 0 && height > 0) size.set({ W: width, H: height });
    });
    ro.observe(stage);
    return () => ro.disconnect();
  }, [size]);

  // ----- active: on screen, tab visible, not paused -----
  const active = useRef(true);
  const onScreen = useRef(true);
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const sync = () => {
      active.current = onScreen.current && document.visibilityState === 'visible' && !paused;
    };
    const io = new IntersectionObserver(([e]) => {
      onScreen.current = e.isIntersecting;
      sync();
    });
    io.observe(section);
    document.addEventListener('visibilitychange', sync);
    sync();
    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', sync);
    };
  }, [paused]);

  // ----- WebGL is progressive enhancement: start after LCP, when idle -----
  useEffect(() => {
    if (!caps.webgl) return;
    setTexSrc(
      window.innerWidth >= 1280 ? '/images/8th_album/hero/cover-tex-2048.webp' : '/images/8th_album/hero/cover-tex-1600.webp'
    );
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
    if (w.requestIdleCallback) {
      w.requestIdleCallback(() => setLoadGL(true), { timeout: 2500 });
    } else {
      const id = setTimeout(() => setLoadGL(true), 1200);
      return () => clearTimeout(id);
    }
  }, [caps.webgl]);

  const onGlReady = useCallback(() => setGlReady(true), []);
  const onGlFail = useCallback(() => {
    setGlReady(false);
    setLoadGL(false);
  }, []);

  const boxStyle = caps.mounted && pinned ? { x: boxX, y: boxY, scale: boxS } : undefined;

  return (
    <section
      ref={sectionRef}
      id="top"
      aria-labelledby="hero-title"
      className={`relative bg-ink text-cream ${
        pinned ? 'h-[200svh] md:h-[250svh] motion-reduce:h-svh md:motion-reduce:h-svh' : 'h-svh'
      } ${paused ? 'hero-paused' : ''}`}
    >
      <div
        ref={stageRef}
        className="sticky top-0 isolate h-lvh w-full overflow-hidden motion-reduce:h-svh"
        style={{ containerType: 'size' }}
      >
        {/* 1 — the painting (LCP element; also the fallback when WebGL is off) */}
        <motion.div
          className="hero-artbox absolute left-1/2 top-1/2 aspect-square -translate-x-1/2 -translate-y-1/2"
          style={{ width: 'max(100cqw, 100cqh)', ...boxStyle }}
        >
          <Image
            src={COVER_SRC}
            alt={COVER_ALT}
            fill
            priority
            quality={45}
            sizes="(max-aspect-ratio: 1/1) 60vh, 100vw"
            placeholder="blur"
            blurDataURL={COVER_BLUR}
            className={`object-cover transition-opacity duration-700 ${glReady ? 'opacity-0' : 'opacity-100'}`}
          />
          {!glReady && (
            <div aria-hidden="true">
              {/* moon breath */}
              <div
                className="hero-breathe absolute rounded-full"
                style={{
                  left: '12.8%',
                  top: '11.3%',
                  width: '22%',
                  height: '22%',
                  transform: 'translate(-50%, -50%)',
                  background: 'radial-gradient(circle, rgba(255,236,190,0.55) 0%, rgba(255,236,190,0.12) 35%, transparent 65%)',
                  mixBlendMode: 'screen',
                }}
              />
              {/* doorway light */}
              <div
                className="animate-flicker absolute"
                style={{
                  left: '83.5%',
                  top: '24.5%',
                  width: '13%',
                  height: '40.5%',
                  background: 'radial-gradient(ellipse at 50% 70%, rgba(245,197,106,0.28), transparent 70%)',
                  mixBlendMode: 'soft-light',
                }}
              />
            </div>
          )}
        </motion.div>

        {/* 2 — WebGL layer: painterly cubist displacement around the cursor */}
        {loadGL && (
          <div
            aria-hidden="true"
            className={`absolute inset-0 transition-opacity duration-500 ${glReady ? 'opacity-100' : 'opacity-0'}`}
          >
            <HeroCanvas src={texSrc} cam={cam} finePointer={caps.fine} active={active} onReady={onGlReady} onFail={onGlFail} />
          </div>
        )}

        {/* 3 — the thread, in the painting's coordinate space */}
        <motion.div
          aria-hidden="true"
          className="hero-artbox pointer-events-none absolute left-1/2 top-1/2 aspect-square -translate-x-1/2 -translate-y-1/2"
          style={{ width: 'max(100cqw, 100cqh)', ...boxStyle }}
        >
          <HeroThread
            cam={cam}
            size={size}
            progress={smooth}
            stageRef={stageRef}
            live={live}
            interactive={caps.fine}
            active={active}
          />
        </motion.div>

        {/* 4 — eyelids: the painting opens along the thread (CSS, runs before hydration) */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1]">
          <div className="hero-lid-top absolute inset-x-0 top-0 bg-ink" style={{ height: 'var(--hero-seam)' }} />
          <div className="hero-lid-bottom absolute inset-x-0 bottom-0 bg-ink" style={{ height: 'calc(100% - var(--hero-seam))' }} />
        </div>

        {/* 5 — scrims for legibility */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[2]">
          <div className="absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-ink via-ink/75 to-transparent" />
          <div className="absolute inset-y-0 left-0 hidden w-[55%] bg-gradient-to-r from-ink/70 to-transparent md:block" />
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink/70 to-transparent" />
          <motion.div className="absolute inset-0 bg-ink" style={{ opacity: dim }} />
        </div>

        {/* 6 — scroll beats (lyrics & story lines, only approved copy) */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-[3] h-svh">
          <Beat opacity={beatA} className="left-6 right-6 top-[24%] md:left-[8%] md:right-auto md:top-[30%] md:max-w-2xl">
            <p className="font-serif-kr text-[1.7rem] font-bold leading-snug text-cream sm:text-4xl md:text-5xl">
              사라졌다고 생각했던 그들은
              <br />
              정말 사라진 것일까요.
            </p>
          </Beat>
          <Beat opacity={beatB} className="left-6 right-6 top-[18%] md:left-[8%] md:right-auto md:top-[26%] md:max-w-xl">
            <p className="mb-3 font-sans text-xs font-semibold uppercase tracking-[0.3em] text-bulb">〈멜랑콜리아〉 가사 중</p>
            <p className="font-serif-kr text-[1.7rem] font-bold leading-snug text-cream sm:text-4xl md:text-5xl">
              그것은 내게 속삭여 줬어
              <br />빈 의자를 내게 남겨뒀다고
            </p>
          </Beat>
          <Beat opacity={beatC} className="inset-x-6 top-[26%] text-center md:top-[30%]">
            <p className="font-serif-kr text-[2.3rem] font-extrabold leading-[1.1] text-cream sm:text-6xl md:text-8xl">
              나의 노래는
              <br />
              <span className="text-thread">나의 부적</span>
            </p>
            <p className="mt-5 font-serif-latin text-xl italic text-cream/85 md:text-2xl">My song is my talisman</p>
          </Beat>
        </div>

        {/* 7 — persistent chrome & info (always inside the small viewport) */}
        <div className="absolute inset-x-0 top-0 z-[4] flex h-svh flex-col justify-between px-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] pt-4 md:px-10 md:pb-9 md:pt-6">
          {/* top bar */}
          <div className="flex items-center justify-between gap-3">
            <a
              href="#singles"
              className="order-last inline-flex min-h-11 items-center whitespace-nowrap rounded-full px-3 text-xs font-semibold uppercase tracking-[0.2em] text-cream/90 hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              <span className="sm:hidden">Skip ↓</span>
              <span className="hidden sm:inline">Skip intro ↓</span>
            </a>
            <div className="flex items-center gap-3">
              <Image src="/images/logo/white_logo.png" alt="Huckleberryfinn" width={150} height={36} className="h-6 w-auto md:h-8" priority />
              <span className="hidden text-xs font-medium tracking-[0.2em] text-cream/75 sm:inline">허클베리핀 · 1997–</span>
            </div>
            <div className="ml-auto flex items-center gap-1">
              <a
                href="#press"
                className="inline-flex min-h-11 items-center whitespace-nowrap rounded-full px-3 text-xs font-semibold uppercase tracking-[0.2em] text-cream/90 hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
              >
                <span className="sm:hidden">Press</span>
                <span className="hidden sm:inline">Press kit</span>
              </a>
              {caps.mounted && !caps.reduced && (
                <button
                  type="button"
                  onClick={() => setPaused((v) => !v)}
                  aria-pressed={paused}
                  aria-label={paused ? '배경 애니메이션 재생' : '배경 애니메이션 일시정지'}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full text-cream/80 hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                >
                  {paused ? <FaPlay size={11} /> : <FaPause size={11} />}
                </button>
              )}
            </div>
          </div>

          {/* bottom */}
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-10">
            <motion.div style={pinned ? { opacity: introOpacity, y: introY } : undefined} className="max-w-full">
              <p className="hero-fade mb-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-bulb md:mb-4 md:text-xs" style={{ ['--d' as string]: '0.2s' }}>
                <span className="hidden sm:inline">Huckleberryfinn · </span>8th Studio Album · 정규 8집
              </p>
              <HeroTitle spread={spread} />
              <p lang="en" className="hero-fade mt-3 font-serif-latin text-xl italic text-cream/90 md:mt-4 md:text-3xl" style={{ ['--d' as string]: '0.5s' }}>
                A Story Everyone Knows
              </p>
              <p className="hero-fade mt-4 text-[15px] font-semibold tracking-[0.04em] text-cream md:text-base" style={{ ['--d' as string]: '0.6s' }}>
                2026. 10. 23 FRI 12:00 KST <span className="font-medium text-cream/75">정규 8집 발매</span>
              </p>
              <p className="hero-fade mt-1.5 hidden text-sm font-medium text-cream/75 md:block" style={{ ['--d' as string]: '0.7s' }}>
                22th Yellow Concert — Seoul 10.31 · Busan 12.05
              </p>
            </motion.div>

            <div className="hero-fade flex shrink-0 flex-col gap-3 md:items-end" style={{ ['--d' as string]: '0.7s' }}>
              <p className="text-sm font-semibold text-cream" suppressHydrationWarning>
                <span aria-hidden="true" className="mr-2 inline-block h-2 w-2 rounded-full bg-thread align-middle" />
                <span aria-hidden="true" suppressHydrationWarning>
                  {status.line}
                </span>
                <span className="sr-only" suppressHydrationWarning>
                  {status.sr}
                </span>
              </p>
              <div className="flex flex-wrap gap-2.5">
                <a
                  href="#singles"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full bg-thread px-5 text-sm font-semibold text-white transition-transform hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                >
                  싱글 듣기 <span aria-hidden="true">↓</span>
                </a>
                {status.fundingOpen ? (
                  <a
                    href={TUMBLBUG_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center rounded-full bg-ink/80 px-5 text-sm font-semibold text-cream ring-1 ring-cream/40 transition-colors hover:bg-cream hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                  >
                    텀블벅 후원 ~10.11
                  </a>
                ) : (
                  <a
                    href="#concert"
                    className="inline-flex min-h-11 items-center rounded-full bg-ink/80 px-5 text-sm font-semibold text-cream ring-1 ring-cream/40 transition-colors hover:bg-cream hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                  >
                    Yellow Concert
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* scroll cue */}
        {pinned && (
          <motion.div
            aria-hidden="true"
            style={{ opacity: cueOpacity }}
            className="pointer-events-none absolute bottom-3 left-1/2 z-[4] hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
          >
            <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-cream/70">Scroll — follow the thread</span>
            <span className="hero-cue h-8 w-px bg-gradient-to-b from-thread to-transparent" />
          </motion.div>
        )}
      </div>
      <div id="hero-end" aria-hidden="true" className="absolute bottom-0 h-px w-full" />
    </section>
  );
}
