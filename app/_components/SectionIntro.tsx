'use client';

import Image from 'next/image';
import { motion, Variants } from 'framer-motion';

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.4,
      delayChildren: 0.3,
    }
  }
};

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut'
    }
  }
};

export default function SectionIntro() {
  return (
    <section className="relative flex flex-col justify-center items-center min-h-screen overflow-hidden">
      {/* 앨범 아트 배경 */}
      <Image
        src="/images/2th_album/album_art.jpg"
        alt="나를 닮은 사내 앨범 아트"
        fill
        className="object-cover"
        priority
        sizes="100vw"
        quality={90}
      />

      {/* 텍스트 콘텐츠 */}
      <motion.div
        className="relative z-10 text-center px-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.p
          className="font-display text-4xl md:text-5xl lg:text-6xl text-hbf-charcoal mb-6"
          variants={item}
        >
          24년의 시간을 넘어,
        </motion.p>

        <motion.p
          className="font-headline text-2xl md:text-3xl lg:text-4xl text-hbf-charcoal mb-12"
          variants={item}
        >
          못다 한 이야기가 다시 시작됩니다.
        </motion.p>

        <motion.h1
          className="font-headline text-6xl md:text-7xl lg:text-8xl font-bold text-hbf-charcoal mb-8"
          variants={item}
        >
          Huckleberryfinn
        </motion.h1>

        <motion.p
          className="font-display text-3xl md:text-4xl lg:text-5xl text-hbf-charcoal-light"
          variants={item}
        >
          2025 Re-Recording: 나를 닮은 사내
        </motion.p>
      </motion.div>

      {/* 스크롤 힌트 */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1, repeat: Infinity, repeatType: "reverse" }}
      >
        <div className="w-6 h-10 border-2 border-hbf-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-hbf-white rounded-full mt-2"></div>
        </div>
      </motion.div>
    </section>
  );
}
