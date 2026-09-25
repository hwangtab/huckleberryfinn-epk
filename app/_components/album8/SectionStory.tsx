'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import SectionLabel from '@/components/ui/SectionLabel';
import RevealText from '@/components/features/RevealText';
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { useMotionPrefs } from '@/lib/motionPrefs';
import { useMediaQuery } from '@/lib/useMediaQuery';
import { story } from '@/app/data/album8';

/**
 * Two photos that crossfade as the story text scrolls by.
 * - Desktop: the photo column is sticky, so the crossfade follows the whole text column.
 * - Mobile: the photo is not sticky, so the crossfade follows the photo's own trip through the
 *   viewport — otherwise the switch would happen after it had already scrolled away.
 * - Reduced motion: no scale drift (the crossfade is opacity only and stays).
 */
function StoryPhotos({ textRef }: { textRef: React.RefObject<HTMLDivElement | null> }) {
  const photoRef = useRef<HTMLDivElement>(null);
  const desktop = useMediaQuery('(min-width: 1024px)');
  const { scrollFx } = useMotionPrefs();
  const column = useScroll({ target: textRef, offset: ['start end', 'end start'] }).scrollYProgress;
  const own = useScroll({ target: photoRef, offset: ['start 0.85', 'end 0.15'] }).scrollYProgress;
  const progress = useTransform(() => (desktop ? column.get() : own.get()));

  const first = useTransform(progress, [0.45, 0.55], [1, 0]);
  const second = useTransform(progress, [0.45, 0.55], [0, 1]);
  const captionOne = useTransform(progress, [0.42, 0.5], [1, 0]);
  const captionTwo = useTransform(progress, [0.5, 0.58], [0, 1]);
  const drift = useTransform(progress, [0, 1], [1.05, 1.15]);
  const scale = scrollFx ? drift : 1.08;

  return (
    <div ref={photoRef} className="relative aspect-[4/5] overflow-hidden rounded-sm lg:sticky lg:top-28">
      {story.images.map((img, i) => (
        <motion.div key={img.src} className="absolute inset-0" style={{ opacity: i === 0 ? first : second, scale }}>
          <Image src={img.src} alt={img.alt} fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" />
        </motion.div>
      ))}
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
  );
}

export default function SectionStory() {
  const textRef = useRef<HTMLDivElement>(null);

  return (
    <section id="story" aria-labelledby="story-title" className="relative bg-ink-2 py-24 text-cream scroll-mt-16 md:py-36 md:scroll-mt-20">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionLabel id="story-title" eyebrow="Album Story" title={story.heading} description={story.opening} />

        {/* Four figures — staggered lines */}
        <RevealGroup as="ul" stagger={0.14} className="mt-14 space-y-3 md:mt-20 md:space-y-4">
          {story.figures.map((line, i) => (
            <RevealItem
              as="li"
              key={line}
              className="flex items-baseline gap-5 font-serif-kr text-2xl font-bold leading-snug text-cream/90 sm:text-3xl md:text-5xl"
            >
              <span className="font-serif-latin text-base italic text-bulb/70 md:text-xl" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span>{line}</span>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal as="p" className="mt-12 max-w-3xl font-serif-kr text-xl font-bold text-cream/75 md:mt-16 md:text-2xl">
          {story.question}
        </Reveal>

        {/* Photo column + scroll-revealed text */}
        <div ref={textRef} className="mt-24 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <StoryPhotos textRef={textRef} />
          </div>

          <div className="space-y-16 lg:col-span-7 lg:space-y-24 lg:py-10">
            <RevealText text={story.thesis} className="font-serif-kr text-2xl font-bold leading-snug text-cream md:text-4xl" />
            {story.body.map((p) => (
              <RevealText key={p.slice(0, 20)} text={p} className="text-lg leading-[1.9] text-cream md:text-xl" />
            ))}
            <div className="border-l-2 border-coral pl-6">
              <RevealText text={story.closingHeading} className="font-serif-kr text-2xl font-bold leading-snug text-coral md:text-4xl" />
              <RevealText text={story.closing} className="mt-6 text-lg leading-[1.9] text-cream md:text-xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
