'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import SectionLabel from '@/components/ui/SectionLabel';
import ScrambleText from '@/components/features/ScrambleText';
import TiltCard from '@/components/features/TiltCard';
import { album, singles } from '@/app/data/album8';

const specs = [
  { k: 'Release', v: album.releaseLabel },
  { k: 'Format', v: album.format },
  { k: 'Tracks', v: `${album.trackCount} Tracks` },
  { k: 'Label', v: album.label },
];

export default function SectionAlbum() {
  // 9 slots: two disclosed singles, order not yet announced.
  const slots = Array.from({ length: album.trackCount }, (_, i) => i + 1);

  return (
    <section id="album" className="relative overflow-hidden bg-ink py-24 text-cream scroll-mt-16 md:py-36 md:scroll-mt-20">
      {/* subtle color bands echoing the cover */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-[10%] top-[10%] h-[70%] w-[45%] rounded-full bg-cobalt/25 blur-[140px]" />
        <div className="absolute left-[35%] top-[30%] h-[60%] w-[35%] rounded-full bg-teal/20 blur-[140px]" />
        <div className="absolute -right-[10%] top-[5%] h-[70%] w-[45%] rounded-full bg-coral/20 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <SectionLabel
          eyebrow="The Album"
          title={
            <>
              정규 8집 <span className="text-bulb">〈{album.title}〉</span>
            </>
          }
          description="아홉 개의 이야기가 한 장의 CD에 담깁니다. 수록곡의 제목과 순서는 발매와 함께 공개됩니다."
        />

        <div className="mt-16 grid gap-14 lg:grid-cols-12 lg:gap-12">
          {/* CD mock-up */}
          <motion.div
            className="lg:col-span-6"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Jewel case + disc built from the official cover */}
            <div className="relative mx-auto aspect-[10/9] w-full max-w-xl">
              {/* Disc sliding out of the case */}
              <motion.div
                aria-hidden="true"
                className="absolute left-[6.5%] top-[9.2%] aspect-square w-[72%]"
                initial={{ x: '0%' }}
                whileInView={{ x: '30%' }}
                viewport={{ once: true, margin: '-120px' }}
                transition={{ duration: 1.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="relative h-full w-full animate-[spin_14s_linear_infinite] rounded-full shadow-[0_20px_50px_-10px_rgba(0,0,0,0.8)] motion-reduce:animate-none">
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background:
                        'conic-gradient(from 0deg, #cfd6de, #f4ead6, #9fb4c9, #e7d2b0, #b9c6d4, #f1e8d6, #aebccb, #cfd6de)',
                    }}
                  />
                  <div className="absolute inset-[6%] overflow-hidden rounded-full">
                    <Image src={album.cover} alt="" fill sizes="400px" className="object-cover opacity-90" />
                  </div>
                  <div className="absolute inset-[38%] rounded-full bg-ink/80 ring-1 ring-cream/30" />
                  <div className="absolute inset-[45%] rounded-full bg-ink ring-1 ring-cream/20" />
                </div>
              </motion.div>

              {/* Case */}
              <TiltCard maxTilt={6} className="absolute left-0 top-[2%] aspect-square w-[85%]">
                <div className="relative h-full w-full overflow-hidden rounded-[6px] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)] ring-1 ring-cream/20">
                  <Image
                    src={album.cover}
                    alt="허클베리핀 정규 8집 모두가 아는 이야기 앨범 커버"
                    fill
                    sizes="(max-width: 1024px) 85vw, 42vw"
                    className="object-cover"
                  />
                  {/* spine + plastic sheen */}
                  <div className="absolute inset-y-0 left-0 w-[5%] bg-gradient-to-r from-black/50 via-cream/10 to-transparent" />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent" />
                </div>
              </TiltCard>
            </div>
            <p className="mt-3 text-xs text-cream/40">* 실물 패키지(Jewel Case · 8p 북클릿)의 세부 디자인은 이미지와 다를 수 있습니다.</p>

            <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-cream/10 pt-8">
              {specs.map((s) => (
                <div key={s.k}>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.3em] text-bulb/80">{s.k}</dt>
                  <dd className="mt-1.5 font-serif-latin text-xl text-cream md:text-2xl">{s.v}</dd>
                </div>
              ))}
            </dl>
          </motion.div>

          {/* Tracklist */}
          <motion.div
            className="lg:col-span-6"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
          >
            <div className="mb-5 flex items-end justify-between">
              <h3 className="font-serif-latin text-3xl italic text-cream/80">Tracklist</h3>
              <span className="text-xs uppercase tracking-[0.25em] text-cream/40">Order TBA</span>
            </div>
            <ol className="divide-y divide-cream/10 border-y border-cream/10">
              {slots.map((n) => {
                const disclosed = n <= singles.length ? singles[n - 1] : null;
                return (
                  <motion.li
                    key={n}
                    variants={{
                      hidden: { opacity: 0, x: 24 },
                      show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
                    }}
                    className="group flex items-center gap-5 py-4 md:py-5"
                  >
                    <span className="w-8 font-serif-latin text-lg text-cream/35" aria-hidden="true">
                      {String(n).padStart(2, '0')}
                    </span>
                    {disclosed ? (
                      <a
                        href={`#single-${disclosed.id}`}
                        className="flex flex-1 items-center justify-between gap-4 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bulb"
                      >
                        <span>
                          <span className="font-serif-kr text-xl font-bold text-cream transition-colors group-hover:text-bulb md:text-2xl">
                            {disclosed.title}
                          </span>
                          <span className="ml-3 font-serif-latin text-base italic text-cream/50">{disclosed.titleLatin}</span>
                        </span>
                        <span className="shrink-0 rounded-full border border-bulb/40 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-bulb">
                          {disclosed.orderLabel}
                        </span>
                      </a>
                    ) : (
                      <span className="flex flex-1 items-center justify-between gap-4">
                        <ScrambleText
                          text="제목 미정"
                          loop
                          intervalMs={140 + n * 9}
                          className="font-serif-kr text-xl font-bold text-cream/25 md:text-2xl"
                        />
                        <span className="shrink-0 text-[10px] uppercase tracking-[0.2em] text-cream/30">TBA</span>
                      </span>
                    )}
                  </motion.li>
                );
              })}
            </ol>
            <p className="mt-4 text-xs leading-relaxed text-cream/40">
              트랙 번호는 자리표시이며 실제 수록 순서와 다를 수 있습니다. 선공개 싱글 두 곡 외 나머지 일곱 곡의 제목은 발매 시 공개됩니다.
            </p>

            <ul className="mt-10 space-y-3">
              {album.notes.map((n) => (
                <li key={n} className="flex gap-3 text-sm leading-relaxed text-cream/60">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-bulb" aria-hidden="true" />
                  {n}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
