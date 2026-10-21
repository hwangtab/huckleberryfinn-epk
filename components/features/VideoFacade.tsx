'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { FaPlay } from 'react-icons/fa';

interface VideoFacadeProps {
  videoId: string;
  title: string;
  thumb?: string;
  kind?: 'mv' | 'audio';
  sizes?: string;
}

/** YouTube facade: a thumbnail button that swaps in the iframe only when clicked. */
export default function VideoFacade({ videoId, title, thumb, kind = 'mv', sizes = '(max-width: 1024px) 100vw, 50vw' }: VideoFacadeProps) {
  const [playing, setPlaying] = useState(false);
  const frameRef = useRef<HTMLIFrameElement>(null);
  useEffect(() => {
    if (playing) frameRef.current?.focus();
  }, [playing]);
  const kindLabel = kind === 'audio' ? '오디오' : '뮤직비디오';

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black ring-1 ring-cream/10">
      {playing ? (
        <iframe
          ref={frameRef}
          className="h-full w-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          title={`${title} ${kindLabel}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group relative h-full w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bulb"
          aria-label={`${title} ${kindLabel} 재생`}
        >
          {thumb && (
            <Image
              src={thumb}
              alt=""
              fill
              sizes={sizes}
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
          <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-bulb text-ink shadow-[0_0_40px_rgba(245,197,106,0.6)] transition-transform group-hover:scale-110">
            <FaPlay className="ml-1" />
          </span>
          <span className="absolute bottom-4 left-4 text-xs font-semibold uppercase tracking-[0.3em] text-cream/80">
            {kind === 'audio' ? 'Official Audio' : 'Official Music Video'}
          </span>
        </button>
      )}
    </div>
  );
}
