'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import SectionLabel from '@/components/ui/SectionLabel';
import RevealText from '@/components/features/RevealText';
import { story } from '@/app/data/album8';

export default function SectionStory() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const firstOpacity = useTransform(scrollYProgress, [0.15, 0.45, 0.55], [1, 1, 0]);
  const secondOpacity = useTransform(scrollYProgress, [0.45, 0.55, 0.9], [0, 1, 1]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.15]);
  const captionOne = useTransform(scrollYProgress, [0.15, 0.42, 0.5], [1, 1, 0]);
  const captionTwo = useTransform(scrollYProgress, [0.5, 0.58, 0.9], [0, 1, 1]);

  return (
    <section id="story" className="relative bg-ink-2 py-24 text-cream scroll-mt-16 md:py-36 md:scroll-mt-20">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionLabel
          eyebrow="Album Story"
          title={story.heading}
          description={story.opening}
        />

        {/* Four figures — staggered lines */}
        <motion.ul
          className="mt-14 space-y-3 md:mt-20 md:space-y-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-120px' }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.18 } } }}
        >
          {story.figures.map((line, i) => (
            <motion.li
              key={line}
              variants={{
                hidden: { opacity: 0, x: -30, filter: 'blur(6px)' },
                show: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
              }}
              className="flex items-baseline gap-5 font-serif-kr text-2xl font-bold leading-snug text-cream/90 sm:text-3xl md:text-5xl"
            >
              <span className="font-serif-latin text-base italic text-bulb/70 md:text-xl" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span>{line}</span>
            </motion.li>
          ))}
        </motion.ul>

        <motion.p
          className="mt-12 max-w-3xl font-serif-kr text-xl italic text-cream/60 md:mt-16 md:text-2xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {story.question}
        </motion.p>

        {/* Sticky image + scrolling text */}
        <div ref={ref} className="mt-24 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm lg:sticky lg:top-28">
              <motion.div className="absolute inset-0" style={{ opacity: firstOpacity, scale: imgScale }}>
                <Image
                  src={story.images[0].src}
                  alt={story.images[0].alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </motion.div>
              <motion.div className="absolute inset-0" style={{ opacity: secondOpacity, scale: imgScale }}>
                <Image
                  src={story.images[1].src}
                  alt={story.images[1].alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink-2/90 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 font-serif-latin text-lg italic text-cream/80">
                <motion.p style={{ opacity: captionOne }} className="absolute bottom-0 left-0">
                  I. 뒤에 남겨둔 자신들
                </motion.p>
                <motion.p style={{ opacity: captionTwo }} className="absolute bottom-0 left-0">
                  II. 조금 더 크게 부르는 노래
                </motion.p>
              </div>
            </div>
          </div>

          <div className="space-y-16 lg:col-span-7 lg:space-y-24 lg:py-10">
            <RevealText
              text={story.thesis}
              className="font-serif-kr text-2xl font-bold leading-snug text-cream md:text-4xl"
            />
            {story.body.map((p) => (
              <RevealText key={p.slice(0, 20)} text={p} className="text-lg leading-[1.9] text-cream md:text-xl" />
            ))}
            <div className="border-l-2 border-coral pl-6">
              <RevealText
                text={story.closingHeading}
                className="font-serif-kr text-2xl font-bold leading-snug text-coral md:text-4xl"
              />
              <RevealText text={story.closing} className="mt-6 text-lg leading-[1.9] text-cream md:text-xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
