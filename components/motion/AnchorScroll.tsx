'use client';

import { useEffect } from 'react';

/**
 * Site-wide handler for in-page links (href="#…").
 *
 * The hero is a 200–250svh pinned scroll sequence. A plain smooth scroll from the top to,
 * say, #singles would drive the hero camera through every beat in half a second — lyric
 * lines flash past. This handler:
 *  - jumps instantly across the pinned hero, then smooth-scrolls the rest of the way;
 *  - jumps instantly to #top (scrolling up through the hero has the same problem);
 *  - uses instant scrolling everywhere under "reduce motion";
 *  - waits a frame so a closing menu can release its scroll lock first;
 *  - keeps the URL hash in sync and moves focus to the target for keyboard/screen-reader users.
 */
export default function AnchorScroll() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element | null)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!link) return;
      const id = decodeURIComponent(link.hash.slice(1));
      const target = id ? document.getElementById(id) : null;
      if (!target) return;

      e.preventDefault();
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // Two frames: let React commit (e.g. mobile menu closes and releases its scroll lock).
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          const hero = document.getElementById('top');
          const heroEnd = hero ? hero.offsetTop + hero.offsetHeight - window.innerHeight : 0;
          const targetTop = target.getBoundingClientRect().top + window.scrollY;
          const insideHero = hero?.contains(target) ?? false;

          if (insideHero) {
            window.scrollTo({ top: 0, behavior: 'instant' });
          } else {
            const crossesHero = hero && window.scrollY < heroEnd && targetTop > heroEnd;
            if (crossesHero) window.scrollTo({ top: heroEnd + 1, behavior: 'instant' });
            target.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth', block: 'start' });
          }

          if (location.hash !== `#${id}`) history.pushState(null, '', `#${id}`);
          if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
          target.focus({ preventScroll: true });
        })
      );
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return null;
}
