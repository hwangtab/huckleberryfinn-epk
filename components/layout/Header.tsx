'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import Image from 'next/image';
import { HiMenu, HiX } from 'react-icons/hi';

const navLinks = [
  { href: '#narrative', label: 'Narrative' },
  { href: '#profile', label: 'Profile' },
  { href: '#music', label: 'Music' },
  { href: '#video', label: 'Video' },
  { href: '#producer-note', label: 'Producer' },
  { href: '#concert', label: 'Concert' },
  { href: '#presskit', label: 'Press Kit' },
];

export default function Header() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  // Detect scroll position to show/hide header
  useMotionValueEvent(scrollY, "change", (latest) => {
    const heroHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
    setIsVisible(latest > heroHeight * 0.8);
  });

  // Close mobile menu when clicking a link
  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ opacity: 0, y: -100 }}
        animate={{
          opacity: isVisible ? 1 : 0,
          y: isVisible ? 0 : -100,
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <nav className="bg-hbf-charcoal/80 backdrop-blur-md border-b border-hbf-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 md:h-20">
              {/* Logo */}
              <a href="#" className="flex-shrink-0" onClick={handleLinkClick}>
                <Image
                  src="/images/logo/white_logo.png"
                  alt="Huckleberryfinn"
                  width={150}
                  height={36}
                  className="h-8 md:h-10 w-auto"
                  priority
                />
              </a>

              {/* Desktop Navigation */}
              <div className="hidden md:flex md:items-center md:space-x-8">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-hbf-white hover:text-hbf-yellow transition-colors duration-200 text-sm lg:text-base font-medium relative group"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-hbf-yellow transition-all duration-300 group-hover:w-full" />
                  </a>
                ))}
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden text-hbf-white hover:text-hbf-yellow transition-colors duration-200 p-2"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-hbf-charcoal/95 backdrop-blur-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Content */}
            <motion.div
              className="relative h-full flex flex-col items-center justify-center space-y-8 px-6"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={handleLinkClick}
                  className="text-hbf-white hover:text-hbf-yellow transition-colors duration-200 text-3xl font-watermelon relative group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-1 bg-hbf-yellow transition-all duration-300 group-hover:w-full" />
                </motion.a>
              ))}

              {/* Logo in mobile menu */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.3 }}
                className="mt-12"
              >
                <Image
                  src="/images/logo/white_logo.png"
                  alt="Huckleberryfinn"
                  width={240}
                  height={60}
                  className="w-60 h-auto opacity-50"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
