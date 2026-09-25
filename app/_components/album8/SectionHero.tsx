'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { useRef } from 'react';
import TiltCard from '@/components/features/TiltCard';
import Countdown from '@/components/features/Countdown';
import { album, singles, TUMBLBUG_URL } from '@/app/data/album8';

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
};

const charVariant: Variants = {
  hidden: { opacity: 0, y: 40, rotateX: -40, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const fade: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

export default function SectionHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const artY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const fadeOut = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const melancholia = singles[1];
  const titleWords = album.title.split(' ');

  return (
    <section
      ref={ref}
      id="top"
      className="relative isolate min-h-[100svh] overflow-hidden bg-ink text-cream"
      aria-label="정규 8집 모두가 아는 이야기"
    >
      {/* Ambient album-art wash */}
      <div className="absolute inset-0 -z-20">
        <Image
          src={album.cover}
          alt=""
          fill
          priority
          sizes="100vw"
          quality={40}
          className="object-cover blur-3xl scale-125 opacity-50 saturate-150"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/70 to-ink" />
      </div>

      {/* Colour fields from the cover: cobalt / teal / coral */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute -left-[20%] top-[-10%] h-[70vh] w-[70vh] rounded-full bg-cobalt/40 blur-[120px]"
          animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute right-[-15%] top-[10%] h-[60vh] w-[60vh] rounded-full bg-coral/30 blur-[120px]"
          animate={{ x: [0, -50, 0], y: [0, 40, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute left-[35%] bottom-[-20%] h-[50vh] w-[50vh] rounded-full bg-teal/30 blur-[120px]"
          animate={{ x: [0, 30, 0], y: [0, -30, 0] }}
          transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-between px-6 pb-10 pt-24 md:px-10 lg:pt-28">
        <div className="grid flex-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Copy */}
          <motion.div
            className="order-2 lg:order-1 lg:col-span-7"
            style={{ y: textY, opacity: fadeOut }}
            variants={stagger}
            initial="hidden"
            animate="show"
          >
            <motion.p
              variants={fade}
              className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.34em] text-bulb md:text-xs"
            >
              <span>Huckleberryfinn</span>
              <span className="h-px w-6 bg-bulb/60" aria-hidden="true" />
              <span>8th Studio Album</span>
            </motion.p>

            <h1
              className="font-serif-kr text-[2.6rem] font-extrabold leading-[1.1] sm:text-6xl md:text-7xl lg:text-[5.4rem] xl:text-[6.2rem] break-keep"
              style={{ perspective: 800 }}
            >
              <span className="sr-only">{album.title}</span>
              <span aria-hidden="true">
                {titleWords.map((word, w) => {
                  const isLast = w === titleWords.length - 1;
                  return (
                    <span key={`${word}-${w}`} className="inline-block whitespace-nowrap">
                      {w > 0 && <span className="inline-block w-[0.28em]" aria-hidden="true" />}
                      {word.split('').map((ch, c) => {
                        return (
                          <motion.span
                            key={`${ch}-${w}-${c}`}
                            variants={charVariant}
                            className={`inline-block ${isLast ? 'text-glow-bulb text-bulb-hot' : ''}`}
                            style={{ transformOrigin: 'bottom center' }}
                          >
                            {ch}
                          </motion.span>
                        );
                      })}
                    </span>
                  );
                })}
              </span>
            </h1>

            <motion.p variants={fade} className="mt-6 font-serif-latin text-2xl italic text-cream/70 md:text-3xl">
              {album.tagline}
            </motion.p>

            <motion.div variants={fade} className="mt-10 flex flex-wrap items-center gap-4">
              <div className="rounded-full border border-cream/15 bg-cream/5 px-5 py-2.5 text-sm backdrop-blur-sm md:text-base">
                <span className="text-cream/50">정규 8집 발매</span>
                <span className="ml-3 font-serif-latin text-lg text-bulb md:text-xl">{album.releaseLabel}</span>
              </div>
              <div className="rounded-full border border-cream/15 bg-cream/5 px-5 py-2.5 text-sm backdrop-blur-sm md:text-base">
                <span className="text-cream/50">2nd Single 〈멜랑콜리아〉</span>
                <span className="ml-3 font-serif-latin text-lg text-teal md:text-xl">09. 29 TUE 12PM</span>
              </div>
            </motion.div>

            <motion.div variants={fade} className="mt-8 flex flex-wrap gap-3">
              <a
                href="#singles"
                className="group inline-flex items-center gap-2 rounded-full bg-bulb px-6 py-3 text-sm font-semibold text-ink transition-transform hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bulb focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
              >
                싱글 먼저 듣기
                <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">
                  →
                </span>
              </a>
              <a
                href={TUMBLBUG_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-cream/25 px-6 py-3 text-sm font-semibold text-cream transition-colors hover:border-bulb hover:text-bulb focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bulb focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
              >
                텀블벅 후원하기
              </a>
            </motion.div>
          </motion.div>

          {/* Album art */}
          <motion.div
            className="order-1 flex justify-center lg:order-2 lg:col-span-5 lg:justify-end"
            style={{ y: artY }}
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <div className="relative w-[min(72vw,340px)] sm:w-[min(60vw,400px)] lg:w-[min(38vw,460px)]">
              {/* bulb glow behind the sleeve */}
              <div
                aria-hidden="true"
                className="animate-flicker absolute left-1/2 top-1/2 -z-10 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-bulb/25 blur-3xl"
              />
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              >
                <TiltCard className="aspect-square w-full" maxTilt={9}>
                  <div className="relative aspect-square w-full overflow-hidden rounded-sm shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)] ring-1 ring-cream/10">
                    <Image
                      src={album.cover}
                      alt="허클베리핀 정규 8집 모두가 아는 이야기 앨범 커버"
                      fill
                      priority
                      sizes="(max-width: 640px) 72vw, (max-width: 1024px) 60vw, 38vw"
                      className="object-cover"
                    />
                  </div>
                </TiltCard>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Countdown strip */}
        <motion.div
          className="mt-12 grid gap-8 border-t border-cream/10 pt-8 md:grid-cols-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          style={{ opacity: fadeOut }}
        >
          <Countdown target={melancholia.releaseAt} label="〈멜랑콜리아〉 공개까지" doneLabel="〈멜랑콜리아〉 공개" compact />
          <Countdown target={album.releaseAt} label="정규 8집 발매까지" doneLabel="정규 8집 발매" compact />
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        aria-hidden="true"
        className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.2, 0.8, 0.2] }}
        transition={{ delay: 2, duration: 2.4, repeat: Infinity }}
      >
        <div className="h-10 w-px bg-gradient-to-b from-transparent via-cream/60 to-transparent" />
      </motion.div>
    </section>
  );
}
