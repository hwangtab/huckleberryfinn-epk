'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { HiMenu, HiX } from 'react-icons/hi';
import { FaPause, FaPlay } from 'react-icons/fa';
import { TUMBLBUG_URL } from '@/app/data/album8';
import { DURATION, EASE_OUT, STAGGER } from '@/lib/motion';
import { lockScroll } from '@/lib/scrollLock';
import { setMotionPaused, useMotionPrefs } from '@/lib/motionPrefs';
import { useNow } from '@/lib/useNow';
import { isFundingOpen } from '@/lib/timeline';

const navLinks = [
  { href: '#singles', label: 'Singles' },
  { href: '#story', label: 'Story' },
  { href: '#album', label: 'Album' },
  { href: '#concert', label: 'Concert' },
  { href: '#funding', label: 'Funding' },
  { href: '#band', label: 'Band' },
  { href: '#press', label: 'Press' },
];

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bulb focus-visible:ring-offset-2 focus-visible:ring-offset-ink';

export default function Header() {
  const [pastHero, setPastHero] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { paused } = useMotionPrefs();
  const fundingOpen = isFundingOpen(useNow());
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLElement>(null);

  // Show once the pinned hero has fully scrolled above the header line. The whole hero section is
  // observed (not a 1px sentinel), so instant jumps in either direction always produce a crossing.
  // IntersectionObserver fires only on crossings — no layout reads during scroll.
  useEffect(() => {
    const hero = document.getElementById('top');
    if (!hero) {
      setPastHero(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => setPastHero(!entry.isIntersecting && entry.boundingClientRect.top < 0),
      { rootMargin: '-80px 0px 0px 0px' }
    );
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  // Keep the header (and its close button) on screen while the menu is open.
  const visible = pastHero || menuOpen;

  const closeMenu = useCallback((restoreFocus = true) => {
    setMenuOpen(false);
    if (restoreFocus) requestAnimationFrame(() => toggleRef.current?.focus());
  }, []);

  // Scroll lock, Esc to close, focus into the menu and a simple focus trap.
  useEffect(() => {
    if (!menuOpen) return;
    const unlock = lockScroll();
    const first = menuRef.current?.querySelector<HTMLElement>('a');
    requestAnimationFrame(() => first?.focus());

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeMenu();
        return;
      }
      if (e.key !== 'Tab') return;
      const nodes = [
        toggleRef.current,
        ...Array.from(menuRef.current?.querySelectorAll<HTMLElement>('a, button') ?? []),
      ].filter(Boolean) as HTMLElement[];
      if (nodes.length === 0) return;
      const idx = nodes.indexOf(document.activeElement as HTMLElement);
      if (e.shiftKey && (idx <= 0)) {
        e.preventDefault();
        nodes[nodes.length - 1].focus();
      } else if (!e.shiftKey && idx === nodes.length - 1) {
        e.preventDefault();
        nodes[0].focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      unlock();
    };
  }, [menuOpen, closeMenu]);

  // Close the menu if the viewport grows into the desktop layout.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const onChange = () => mq.matches && setMenuOpen(false);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const tab = visible ? 0 : -1;

  return (
    <>
      <motion.header
        className="fixed left-0 right-0 top-0 z-50"
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -100 }}
        transition={{ duration: DURATION.fast, ease: EASE_OUT }}
        aria-hidden={!visible}
      >
        <nav className="border-b border-cream/10 bg-ink/80 backdrop-blur-md" aria-label="주요 메뉴">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between gap-4 md:h-20">
              <a href="#top" className={`flex shrink-0 items-center gap-3 rounded ${focusRing}`} onClick={() => closeMenu(false)} tabIndex={tab}>
                <Image
                  src="/images/logo/white_logo.png"
                  alt="Huckleberryfinn — 맨 위로"
                  width={150}
                  height={36}
                  className="h-7 w-auto md:h-9"
                  style={{ width: 'auto' }}
                  priority
                />
                <span className="hidden font-serif-kr text-sm font-bold text-cream/80 xl:inline">모두가 아는 이야기</span>
              </a>

              <div className="hidden lg:flex lg:items-center lg:gap-6">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    tabIndex={tab}
                    className={`group relative rounded px-1 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-cream/85 transition-colors hover:text-bulb ${focusRing}`}
                  >
                    {link.label}
                    <span className="absolute inset-x-1 bottom-1 h-px origin-left scale-x-0 bg-bulb transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100" />
                  </a>
                ))}
                <button
                  type="button"
                  onClick={() => setMotionPaused(!paused)}
                  aria-pressed={paused}
                  aria-label={paused ? '배경 애니메이션 재생' : '배경 애니메이션 일시정지'}
                  tabIndex={tab}
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-full text-cream/80 hover:text-cream ${focusRing}`}
                >
                  {paused ? <FaPlay size={10} /> : <FaPause size={10} />}
                </button>
                {fundingOpen && (
                  <a
                    href={TUMBLBUG_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={tab}
                    className={`rounded-full bg-bulb px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-ink transition-transform hover:scale-105 ${focusRing}`}
                  >
                    Support
                  </a>
                )}
              </div>

              <button
                ref={toggleRef}
                onClick={() => (menuOpen ? closeMenu() : setMenuOpen(true))}
                tabIndex={tab}
                className={`rounded p-2 text-cream transition-colors hover:text-bulb lg:hidden ${focusRing}`}
                aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
              >
                {menuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DURATION.fast, ease: EASE_OUT }}
          >
            <div className="absolute inset-0 bg-ink/95 backdrop-blur-lg" onClick={() => closeMenu()} aria-hidden="true" />

            <motion.nav
              ref={menuRef}
              id="mobile-menu"
              className="pointer-events-none relative flex h-full flex-col items-center justify-center gap-6 px-6"
              initial={{ scale: 0.97, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.97, opacity: 0 }}
              transition={{ duration: DURATION.fast, ease: EASE_OUT }}
              aria-label="모바일 메뉴"
            >
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => closeMenu(false)}
                  className={`pointer-events-auto rounded px-3 py-1 font-serif-kr text-3xl font-bold text-cream transition-colors hover:text-bulb ${focusRing}`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * (STAGGER / 2), duration: DURATION.fast, ease: EASE_OUT }}
                >
                  {link.label}
                </motion.a>
              ))}
              <div className="pointer-events-auto mt-4 flex items-center gap-3">
                {fundingOpen && (
                  <a
                    href={TUMBLBUG_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`rounded-full bg-bulb px-6 py-3 text-sm font-bold text-ink ${focusRing}`}
                  >
                    텀블벅 후원하기
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => setMotionPaused(!paused)}
                  aria-pressed={paused}
                  className={`inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold text-cream ring-1 ring-cream/40 ${focusRing}`}
                >
                  {paused ? <FaPlay size={10} aria-hidden="true" /> : <FaPause size={10} aria-hidden="true" />}
                  {paused ? '애니메이션 재생' : '애니메이션 정지'}
                </button>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
