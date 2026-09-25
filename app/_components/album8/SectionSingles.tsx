'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { FaPlay } from 'react-icons/fa';
import SectionLabel from '@/components/ui/SectionLabel';
import TiltCard from '@/components/features/TiltCard';
import Countdown from '@/components/features/Countdown';
import Lightbox from '@/components/ui/Lightbox';
import { singles, Single } from '@/app/data/album8';

function VideoFacade({ single }: { single: Single }) {
  const [playing, setPlaying] = useState(false);
  if (!single.videoId) return null;

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black ring-1 ring-cream/10">
      {playing ? (
        <iframe
          className="h-full w-full"
          src={`https://www.youtube.com/embed/${single.videoId}?autoplay=1&rel=0`}
          title={`${single.title} 뮤직비디오`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group relative h-full w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bulb"
          aria-label={`${single.title} 뮤직비디오 재생`}
        >
          {single.videoThumb && (
            <Image
              src={single.videoThumb}
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
          <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-bulb text-ink shadow-[0_0_40px_rgba(245,197,106,0.6)] transition-transform group-hover:scale-110">
            <FaPlay className="ml-1" />
          </span>
          <span className="absolute bottom-4 left-4 text-xs font-semibold uppercase tracking-[0.3em] text-cream/80">
            Official Music Video
          </span>
        </button>
      )}
    </div>
  );
}

function BpmPulse({ bpm }: { bpm: number }) {
  return (
    <div className="flex items-center gap-4" aria-label={`${bpm} BPM`}>
      <span className="relative flex h-10 w-10 items-center justify-center">
        <span className="bpm-ring absolute inline-flex h-full w-full rounded-full border border-teal/70" />
        <span className="bpm-dot inline-flex h-4 w-4 rounded-full bg-teal shadow-[0_0_20px_rgba(74,168,180,0.9)]" />
      </span>
      <div className="leading-tight">
        <p className="font-serif-latin text-3xl text-cream">{bpm} BPM</p>
        <p className="text-xs text-cream/50">긴 밤길을 조금 빠른 걸음으로 걷는 속도</p>
      </div>
    </div>
  );
}

function Lyrics({ single }: { single: Single }) {
  const [open, setOpen] = useState(false);
  if (!single.lyrics) return null;

  return (
    <div className="border-t border-cream/10 pt-6">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex items-center gap-3 text-sm font-semibold tracking-[0.2em] uppercase text-bulb transition-colors hover:text-bulb-hot focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bulb rounded"
      >
        <span className={`inline-block transition-transform ${open ? 'rotate-45' : ''}`} aria-hidden="true">
          +
        </span>
        가사 {open ? '닫기' : '전문 보기'}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="lyrics"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {single.lyrics.map((stanza, i) => (
                <div key={i} className="space-y-1.5 font-serif-kr text-[15px] leading-relaxed text-cream/75">
                  {stanza.map((line, j) => (
                    <p key={j} className={line.startsWith(single.keyLine ?? '\u0000') ? 'text-bulb' : ''}>
                      {line}
                    </p>
                  ))}
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs text-cream/40">작사 · 작곡 허클베리핀 / 가사 전문은 발매 후 음원 사이트에서도 확인하실 수 있습니다.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SinglePanel({ single, flip, onZoom }: { single: Single; flip: boolean; onZoom: (s: Single) => void }) {
  return (
    <article
      id={`single-${single.id}`}
      className="relative grid items-start gap-10 lg:grid-cols-12 lg:items-stretch lg:gap-14"
      aria-labelledby={`single-${single.id}-title`}
    >
      {/* Cover */}
      <motion.div
        className={`lg:col-span-5 ${flip ? 'lg:order-2' : ''}`}
        initial={{ opacity: 0, x: flip ? 60 : -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="lg:sticky lg:top-28">
          <TiltCard maxTilt={7} className="w-full">
            <button
              type="button"
              onClick={() => onZoom(single)}
              className="relative block aspect-square w-full cursor-zoom-in overflow-hidden rounded-sm shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)] ring-1 ring-cream/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bulb"
              aria-label={`${single.title} 싱글 커버 확대`}
            >
              <Image
                src={single.cover}
                alt={`${single.title} 싱글 커버`}
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover"
              />
            </button>
          </TiltCard>
          <div className="mt-4 hidden items-center justify-between text-xs uppercase tracking-[0.25em] text-cream/50 lg:flex">
            <span>{single.orderLabel}</span>
            <span>{single.releaseLabel}</span>
          </div>
        </div>
      </motion.div>

      {/* Copy */}
      <motion.div
        className={`space-y-8 lg:col-span-7 ${flip ? 'lg:order-1' : ''}`}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      >
        <header>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-bulb">
            {single.orderLabel} · {single.releaseLabel}
          </p>
          <h3 id={`single-${single.id}-title`} className="font-serif-kr text-5xl font-extrabold leading-none text-cream md:text-7xl">
            {single.title}
          </h3>
          <p className="mt-3 font-serif-latin text-2xl italic text-cream/60 md:text-3xl">{single.titleLatin}</p>
        </header>

        {single.keyLine && (
          <blockquote className="relative border-l-2 border-bulb pl-6">
            <p className="font-serif-kr text-2xl font-bold leading-snug text-bulb-hot text-glow-bulb md:text-4xl">
              “{single.keyLine}”
            </p>
          </blockquote>
        )}

        <div className="space-y-4 text-[15px] leading-[1.9] text-cream/75 md:text-base">
          {single.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {single.bpm && <BpmPulse bpm={single.bpm} />}

        {single.videoId ? (
          <VideoFacade single={single} />
        ) : (
          <div className="rounded-xl border border-teal/30 bg-teal/5 p-6">
            <Countdown target={single.releaseAt} label={`〈${single.title}〉 음원 공개까지`} doneLabel="음원 공개 — 각 스트리밍 플랫폼에서 감상하세요" compact />
            <p className="mt-4 text-xs text-cream/50">Melon · Spotify · Apple Music · YouTube Music · Bugs · Genie · FLO</p>
          </div>
        )}

        <Lyrics single={single} />
      </motion.div>
    </article>
  );
}

export default function SectionSingles() {
  const [zoom, setZoom] = useState<Single | null>(null);

  return (
    <section id="singles" className="relative bg-ink py-24 text-cream scroll-mt-16 md:py-36 md:scroll-mt-20">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-bulb/40 to-transparent" />
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionLabel
          eyebrow="Singles"
          title={
            <>
              두 개의 문, <span className="text-bulb">두 개의 노래</span>
            </>
          }
          description="정규 8집에 앞서 두 곡을 디지털 싱글로 먼저 공개합니다. 어둠 속에서 빛을 갈망하는 〈박쥐〉, 그리고 두려움과 함께 걸어가는 〈멜랑콜리아〉."
        />

        <div className="mt-20 space-y-32 md:mt-28 md:space-y-44">
          {singles.map((single, i) => (
            <SinglePanel key={single.id} single={single} flip={i % 2 === 1} onZoom={setZoom} />
          ))}
        </div>
      </div>

      {zoom && (
        <Lightbox src={zoom.cover} alt={`${zoom.title} 싱글 커버`} width={zoom.id === "melancholia" ? 3000 : 1000} height={zoom.id === "melancholia" ? 3000 : 1000} onClose={() => setZoom(null)} />
      )}
    </section>
  );
}
