'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Heading from '@/components/ui/Heading';
import Lightbox from '@/components/ui/Lightbox';
import { galleryYears } from '@/app/data/galleryImages';

export default function SectionGallery() {
  const [lightbox, setLightbox] = useState<{ src: string; year: string } | null>(null);
  const flatPhotos = useMemo(
    () => galleryYears.flatMap(({ year, photos }) => photos.map((src) => ({ year, src }))),
    []
  );
  const totalPhotos = flatPhotos.length;
  const firstYear = galleryYears[0]?.year ?? '';
  const lastYear = galleryYears[galleryYears.length - 1]?.year ?? firstYear;

  return (
    <section id="gallery" className="bg-hbf-white py-16 md:py-24 px-6 scroll-mt-16 md:scroll-mt-20">
      <div className="max-w-6xl mx-auto space-y-12">
        <motion.div
          className="text-center space-y-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          <Heading level="h2" className="text-hbf-charcoal">
            과거와 현재를 잇는 아카이브
          </Heading>
          <p className="text-base text-hbf-charcoal-light max-w-3xl mx-auto leading-relaxed">
            2000년대 초반의 작업실과 2025년 리마스터링 현장을 한 자리에서 넘겨보세요. 모바일에서는 초대장처럼 스와이프하고, 데스크톱에서는 큰 이미지와
            썸네일을 통해 한눈에 비교할 수 있습니다.
          </p>
        </motion.div>

        {/* Full gallery */}
        <div className="space-y-10">
          <div className="text-center text-sm uppercase tracking-[0.4em] text-hbf-charcoal-light">
            {firstYear} — {lastYear} · 총 {totalPhotos}컷
          </div>
          {galleryYears.map(({ year, photos }) => (
            <div key={year} className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-xl font-semibold text-hbf-charcoal">{year}</span>
                <span className="text-xs uppercase tracking-[0.3em] text-hbf-charcoal/50">{photos.length} Photos</span>
                <span className="hidden md:block flex-1 h-px bg-hbf-charcoal/10" />
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                {photos.map((src, index) => (
                  <button
                    key={`${year}-${src}`}
                    type="button"
                    onClick={() => setLightbox({ src, year })}
                    className="relative aspect-square rounded-2xl overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-hbf-yellow/70 border border-hbf-charcoal/5 hover:border-hbf-yellow/40 transition"
                    aria-label={`${year}년 사진 ${index + 1}`}
                  >
                    <Image
                      src={src}
                      alt={`${year}년 아카이브 ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 33vw, (max-width: 1024px) 20vw, 12vw"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {lightbox && (
        <Lightbox
          src={lightbox.src}
          alt={`${lightbox.year}년 아카이브 확대 이미지`}
          onClose={() => setLightbox(null)}
        />
      )}
    </section>
  );
}
