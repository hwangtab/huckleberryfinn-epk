'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import SectionLabel from '@/components/ui/SectionLabel';
import Lightbox from '@/components/ui/Lightbox';
import { band } from '@/app/data/album8';

type Zoom = { src: string; alt: string; width: number; height: number };

export default function SectionBand() {
  const photoRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: photoRef, offset: ['start end', 'center center'] });
  const grayscale = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const filter = useTransform(grayscale, (g) => `grayscale(${g}) contrast(${1 + g * 0.15})`);
  const scale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);
  const [zoom, setZoom] = useState<Zoom | null>(null);

  const years = new Date().getFullYear() - band.since;

  return (
    <section id="band" className="relative bg-ink-2 py-24 text-cream scroll-mt-16 md:py-36 md:scroll-mt-20">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionLabel
          eyebrow="The Band"
          title={
            <>
              {band.since}년부터, <span className="text-bulb">{years}년째</span> 밤을 노래하는 밴드
            </>
          }
        />

        {/* Wide photo: B&W → colour as it enters */}
        <div ref={photoRef} className="mt-12 md:mt-16">
          <button
            type="button"
            onClick={() => setZoom({ alt: '허클베리핀 밴드 사진', ...band.photo })}
            className="relative block aspect-[3/2] w-full cursor-zoom-in overflow-hidden rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bulb"
            aria-label="밴드 사진 확대"
          >
            <motion.div className="absolute inset-0" style={{ filter, scale }}>
              <Image
                src={band.photo.src}
                alt="허클베리핀 밴드 사진 — 이기용, 이소영, 성장규"
                fill
                sizes="(max-width: 1280px) 100vw, 1200px"
                className="object-cover"
              />
            </motion.div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-2/70 via-transparent to-transparent" />
            <div className="pointer-events-none absolute bottom-6 left-6">
              <Image src="/images/logo/white_logo.png" alt="" width={220} height={53} className="h-auto w-40 opacity-90 md:w-56" />
            </div>
          </button>
        </div>

        <div className="mt-14 grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Bio */}
          <motion.div
            className="space-y-5 text-[15px] leading-[1.9] text-cream/75 md:text-base lg:col-span-5"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8 }}
          >
            {band.bio.map((p) => (
              <p key={p.slice(0, 16)}>{p}</p>
            ))}
            <div className="grid grid-cols-3 gap-4 border-t border-cream/10 pt-6">
              {[
                { k: '결성', v: `${band.since}` },
                { k: '정규 앨범', v: '8장' },
                { k: 'Yellow Concert', v: '22회' },
              ].map((s) => (
                <div key={s.k}>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-bulb/80">{s.k}</p>
                  <p className="mt-1 font-serif-latin text-2xl text-cream md:text-3xl">{s.v}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Members */}
          <motion.ul
            className="grid grid-cols-3 gap-3 sm:gap-5 lg:col-span-7"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
          >
            {band.members.map((m) => (
              <motion.li
                key={m.name}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
                }}
              >
                <button
                  type="button"
                  onClick={() => setZoom({ src: m.image, alt: `${m.name} 프로필 사진`, width: 638, height: 850 })}
                  className="group relative block aspect-[3/4] w-full cursor-zoom-in overflow-hidden rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bulb"
                  aria-label={`${m.name} 프로필 확대`}
                >
                  <Image
                    src={m.image}
                    alt={`${m.name} 프로필 사진`}
                    fill
                    sizes="(max-width: 640px) 33vw, 22vw"
                    className="object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-left sm:bottom-4 sm:left-4">
                    <p className="font-serif-kr text-lg font-bold text-cream sm:text-2xl">{m.name}</p>
                    <p className="mt-0.5 text-[10px] leading-snug text-bulb sm:text-xs">{m.role}</p>
                  </div>
                </button>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>

      {zoom && <Lightbox src={zoom.src} alt={zoom.alt} width={zoom.width} height={zoom.height} onClose={() => setZoom(null)} />}
    </section>
  );
}
