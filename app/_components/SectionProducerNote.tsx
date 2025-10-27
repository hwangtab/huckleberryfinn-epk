'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import Heading from '@/components/ui/Heading';
import Lightbox from '@/components/ui/Lightbox';
import { producerNotes } from '@/app/data/producerNotes';

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    }
  }
};

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  }
};

type LightboxState = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

export default function SectionProducerNote() {
  const [lightboxImage, setLightboxImage] = useState<LightboxState | null>(null);

  return (
    <section id="producer-note" className="bg-hbf-white py-16 md:py-24 px-6 scroll-mt-16 md:scroll-mt-20">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <Heading level="h2" className="text-hbf-charcoal mb-4">
            Producer&apos;s Note
          </Heading>
          <p className="text-lg text-hbf-charcoal-light">
            24년 만의 재녹음, 그 여정의 기록
          </p>
        </motion.div>

        {/* Producer Notes */}
        <motion.div
          className="space-y-12"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {producerNotes.map((note, index) => {
            const portrait = note.image;

            return (
              <motion.article
                key={note.author}
                variants={item}
                className={`p-6 md:p-8 border-l-4 rounded-r-lg ${
                  index === 0
                    ? 'border-hbf-yellow bg-hbf-yellow/5'
                    : 'border-hbf-charcoal bg-hbf-charcoal/5'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-start md:gap-6">
                  {portrait && (
                    <div className="flex-shrink-0 mb-6 md:mb-0">
                      <button
                        type="button"
                      onClick={() =>
                        setLightboxImage({
                          src: portrait.src,
                          alt: portrait.alt,
                          width: 638,
                          height: 850,
                        })
                      }
                        className="relative h-28 w-28 rounded-full overflow-hidden border-4 border-white/70 shadow-md cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-hbf-yellow/40 focus:ring-offset-2 focus:ring-offset-hbf-white"
                        aria-label={`${note.author} 이미지 확대`}
                      >
                        <Image
                          src={portrait.src}
                          alt={portrait.alt}
                          fill
                          sizes="120px"
                          className="object-cover"
                        />
                      </button>
                    </div>
                  )}

                  <div className="flex-1">
                    {/* Author Header */}
                    <header className="mb-6">
                      <h3 className="text-2xl md:text-3xl font-bold text-hbf-charcoal mb-2">
                        {note.author}
                      </h3>
                      <p className="text-sm text-hbf-charcoal-light">
                        {note.role}
                      </p>
                    </header>

                    {/* Content */}
                    <div className="space-y-4">
                      {note.content.map((paragraph, pIndex) => (
                        <p
                          key={pIndex}
                          className="text-base leading-relaxed text-hbf-charcoal-light"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>

      {lightboxImage && (
        <Lightbox
          src={lightboxImage.src}
          alt={lightboxImage.alt}
          width={lightboxImage.width}
          height={lightboxImage.height}
          onClose={() => setLightboxImage(null)}
        />
      )}
    </section>
  );
}
