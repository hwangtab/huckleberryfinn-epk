'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import SectionLabel from '@/components/ui/SectionLabel';
import TiltCard from '@/components/features/TiltCard';
import Lightbox from '@/components/ui/Lightbox';
import { concert, ConcertShow, TUMBLBUG_URL } from '@/app/data/album8';

const won = (n: number) => `${n.toLocaleString('ko-KR')}원`;

function ShowCard({ show, index }: { show: ConcertShow; index: number }) {
  const accent = show.id === 'seoul' ? 'from-cobalt/40 to-teal/20' : 'from-coral/40 to-bulb/10';
  return (
    <motion.article
      className={`group relative overflow-hidden rounded-2xl border border-cream/10 bg-gradient-to-br ${accent} p-6 backdrop-blur-sm md:p-8`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      aria-labelledby={`show-${show.id}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-bulb/20 blur-3xl transition-transform duration-700 group-hover:scale-150"
      />
      <div className="relative">
        <p className="font-serif-latin text-5xl italic leading-none text-cream/90 md:text-6xl">{show.cityLatin}</p>
        <h3 id={`show-${show.id}`} className="mt-2 font-serif-kr text-2xl font-bold text-cream md:text-3xl">
          {show.venue}
        </h3>

        <dl className="mt-6 space-y-3 text-sm md:text-base">
          <div className="flex gap-4">
            <dt className="w-14 shrink-0 text-[11px] font-semibold uppercase tracking-[0.25em] text-bulb/80 pt-1">Date</dt>
            <dd className="text-cream/90">
              {show.dateLabel} <span className="text-cream/60">{show.time}</span>
            </dd>
          </div>
          <div className="flex gap-4">
            <dt className="w-14 shrink-0 text-[11px] font-semibold uppercase tracking-[0.25em] text-bulb/80 pt-1">Venue</dt>
            <dd className="text-cream/60">{show.address}</dd>
          </div>
          <div className="flex gap-4">
            <dt className="w-14 shrink-0 text-[11px] font-semibold uppercase tracking-[0.25em] text-bulb/80 pt-1">Seat</dt>
            <dd className="text-cream/60">{show.seating}</dd>
          </div>
        </dl>

        <div className="mt-6 flex items-end justify-between border-t border-cream/10 pt-5">
          <div>
            <p className="text-xs text-cream/40 line-through">정가 {won(show.originalPrice)}</p>
            <p className="font-serif-latin text-3xl text-bulb">
              {won(show.discountPrice)}
              <span className="ml-2 font-sans text-xs font-semibold text-cream/60">텀블벅 한정 {show.discount} 할인</span>
            </p>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function SectionConcert() {
  const [open, setOpen] = useState(false);

  return (
    <section id="concert" className="relative bg-ink-2 py-24 text-cream scroll-mt-16 md:py-36 md:scroll-mt-20">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Poster */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="lg:sticky lg:top-28">
              <TiltCard maxTilt={6} className="mx-auto w-full max-w-md lg:max-w-none">
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  className="relative block aspect-[1061/1500] w-full cursor-zoom-in overflow-hidden rounded-lg shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)] ring-1 ring-cream/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bulb"
                  aria-label="2026 Yellow Concert 포스터 확대"
                >
                  <Image
                    src={concert.poster}
                    alt="2026 Yellow Concert 포스터 — 서울 상상마당 10월 31일, 부산 오방가르드 12월 5일"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                </button>
              </TiltCard>
            </div>
          </motion.div>

          {/* Info */}
          <div className="lg:col-span-7">
            <SectionLabel
              eyebrow={`${concert.edition}th Yellow Concert`}
              title={
                <>
                  8집의 노래가 처음으로
                  <br />
                  <span className="text-bulb">무대 위에서 켜지는 밤</span>
                </>
              }
              description={concert.description}
            />

            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {concert.shows.map((show, i) => (
                <ShowCard key={show.id} show={show} index={i} />
              ))}
            </div>

            <motion.div
              className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <a
                href={TUMBLBUG_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-bulb px-7 py-3.5 text-sm font-semibold text-ink transition-transform hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bulb focus-visible:ring-offset-2 focus-visible:ring-offset-ink-2"
              >
                텀블벅에서 티켓 예매하기
              </a>
              <p className="text-xs leading-relaxed text-cream/40 sm:max-w-sm">{concert.filmingNotice}</p>
            </motion.div>
          </div>
        </div>
      </div>

      {open && (
        <Lightbox src={concert.poster} alt="2026 Yellow Concert 포스터" width={1061} height={1500} onClose={() => setOpen(false)} />
      )}
    </section>
  );
}
