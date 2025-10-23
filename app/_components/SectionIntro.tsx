'use client';

import Image from 'next/image';
import { motion, Variants } from 'framer-motion';

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.5,
    }
  }
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  }
};

const albumVariant: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: 'easeOut'
    }
  }
};

export default function SectionIntro() {
  return (
    <section className="relative flex flex-col justify-center items-center min-h-screen overflow-hidden">
      {/* Blurred background */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/images/2th_album/album_art.webp"
          alt="나를 닮은 사내 앨범 아트 배경"
          fill
          className="object-cover blur-2xl scale-110"
          priority
          sizes="100vw"
          quality={60}
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center px-6 py-12">
        {/* Album art card */}
        <motion.div
          className="mb-8 sm:mb-12 md:mb-16"
          variants={albumVariant}
          initial="hidden"
          animate="show"
        >
          <div className="rounded-lg overflow-hidden shadow-2xl">
            <Image
              src="/images/2th_album/album_art.webp"
              alt="나를 닮은 사내 앨범 아트"
              width={300}
              height={300}
              className="w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 xl:w-112 xl:h-112 object-cover"
              priority
              quality={85}
            />
          </div>
        </motion.div>

        {/* Text content */}
        <motion.div
          className="text-center max-w-2xl"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.p
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-hbf-white mb-4 sm:mb-6 font-watermelon"
            variants={item}
          >
            24년의 시간을 넘어,
          </motion.p>

          <motion.p
            className="text-base sm:text-lg md:text-2xl lg:text-3xl text-hbf-white/90 mb-8 sm:mb-12 font-watermelon"
            variants={item}
          >
            못다 한 이야기가 다시 시작됩니다.
          </motion.p>

          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-hbf-white mb-6 sm:mb-8 font-cucumber-salad tracking-wide"
            variants={item}
          >
            Huckleberryfinn
          </motion.h1>

          <motion.p
            className="text-sm sm:text-base md:text-lg lg:text-xl text-hbf-yellow font-watermelon font-semibold"
            variants={item}
          >
            2025 Re-Recording: 나를 닮은 사내
          </motion.p>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 1, repeat: Infinity, repeatType: "reverse" }}
      >
        <div className="w-6 h-10 border-2 border-hbf-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-hbf-white rounded-full mt-2"></div>
        </div>
      </motion.div>
    </section>
  );
}
