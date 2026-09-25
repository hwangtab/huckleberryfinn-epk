'use client';

import { useEffect, useRef } from 'react';

/**
 * Pauses every `.motion-loop` CSS animation inside the nearest section while that section is
 * out of view. Render it once anywhere inside the section. Browsers keep ticking off-screen CSS
 * animations; a paused one costs nothing.
 */
export default function LoopScope() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const scope = ref.current?.closest('section, [data-loop-scope]') as HTMLElement | null;
    if (!scope) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) delete scope.dataset.loops;
      else scope.dataset.loops = 'offscreen';
    });
    io.observe(scope);
    return () => {
      io.disconnect();
      delete scope.dataset.loops;
    };
  }, []);

  return <span ref={ref} hidden aria-hidden="true" />;
}
