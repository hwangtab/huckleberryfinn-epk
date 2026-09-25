'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import Image from 'next/image';
import { HiMenu, HiX } from 'react-icons/hi';
import { TUMBLBUG_URL } from '@/app/data/album8';

const navLinks = [
  { href: '#singles', label: 'Singles' },
  { href: '#story', label: 'Story' },
  { href: '#album', label: 'Album' },
  { href: '#concert', label: 'Concert' },
  { href: '#funding', label: 'Funding' },
  { href: '#band', label: 'Band' },
  { href: '#press', label: 'Press' },
];

export default function Header() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  // Show once the pinned hero has fully scrolled away (tied to the #hero-end sentinel).
  const syncVisibility = () => {
    const end = document.getElementById('hero-end');
    if (!end) {
      setIsVisible(window.scrollY > window.innerHeight * 0.8);
      return;
    }
    setIsVisible(end.getBoundingClientRect().top <= 80);
  };

  useMotionValueEvent(scrollY, 'change', syncVisibility);

  useEffect(() => {
    syncVisibility();
  }, []);

  const handleLinkClick = () => setIsMobileMenuOpen(false);

  // Lock vertical scroll while the mobile menu is open, without touching overflow-x.
  const originalOverflowY = useRef<string>('');
  useEffect(() => {
    if (typeof document === 'undefined') return undefined;

    if (isMobileMenuOpen) {
      if (originalOverflowY.current === '') {
        originalOverflowY.current = document.body.style.overflowY;
      }
      document.body.style.overflowY = 'hidden';
    } else if (originalOverflowY.current !== '') {
      document.body.style.overflowY = originalOverflowY.current;
      originalOverflowY.current = '';
    }

    return () => {
      if (originalOverflowY.current !== '') {
        document.body.style.overflowY = originalOverflowY.current;
        originalOverflowY.current = '';
      }
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.header
        className="fixed left-0 right-0 top-0 z-50"
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        aria-hidden={!isVisible}
      >
        <nav className="border-b border-cream/10 bg-ink/70 backdrop-blur-md">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between md:h-20">
              <a href="#top" className="flex shrink-0 items-center gap-3" onClick={handleLinkClick} tabIndex={isVisible ? 0 : -1}>
                <Image
                  src="/images/logo/white_logo.png"
                  alt="Huckleberryfinn"
                  width={150}
                  height={36}
                  className="h-7 w-auto md:h-9"
                  priority
                />
                <span className="hidden font-serif-kr text-sm font-bold text-cream/70 lg:inline">모두가 아는 이야기</span>
              </a>

              <div className="hidden md:flex md:items-center md:gap-7">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    tabIndex={isVisible ? 0 : -1}
                    className="group relative text-xs font-semibold uppercase tracking-[0.2em] text-cream/80 transition-colors hover:text-bulb focus-visible:outline-none focus-visible:text-bulb"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 h-px w-0 bg-bulb transition-all duration-300 group-hover:w-full" />
                  </a>
                ))}
                <a
                  href={TUMBLBUG_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={isVisible ? 0 : -1}
                  className="rounded-full bg-bulb px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-ink transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bulb focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                >
                  Support
                </a>
              </div>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                tabIndex={isVisible ? 0 : -1}
                className="p-2 text-cream transition-colors hover:text-bulb md:hidden"
                aria-label={isMobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="absolute inset-0 bg-ink/95 backdrop-blur-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            <motion.nav
              className="relative flex h-full flex-col items-center justify-center gap-7 px-6"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              aria-label="모바일 메뉴"
            >
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={handleLinkClick}
                  className="font-serif-kr text-3xl font-bold text-cream transition-colors hover:text-bulb"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.07, duration: 0.3 }}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href={TUMBLBUG_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 rounded-full bg-bulb px-6 py-3 text-sm font-bold uppercase tracking-[0.15em] text-ink"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.07, duration: 0.3 }}
              >
                텀블벅 후원하기
              </motion.a>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
