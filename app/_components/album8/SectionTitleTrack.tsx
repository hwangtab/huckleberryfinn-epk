'use client';

import Image from 'next/image';
import { FaYoutube } from 'react-icons/fa';
import SectionLabel from '@/components/ui/SectionLabel';
import Countdown from '@/components/features/Countdown';
import VideoFacade from '@/components/features/VideoFacade';
import { Reveal } from '@/components/motion/Reveal';
import { album, titleTrack } from '@/app/data/album8';
import { useNow } from '@/lib/useNow';

function Credits({ heading, rows }: { heading: string; rows: { role: string; names: string[] }[] }) {
  return (
    <div>
      <h3 className="text-[11px] font-semibold uppercase tracking-[0.3em] text-bulb/80">{heading}</h3>
      <dl className="mt-4 space-y-2.5 text-sm">
        {rows.map((r) => (
          <div key={r.role} className="flex gap-4">
            <dt className="w-24 shrink-0 text-cream/60">{r.role}</dt>
            <dd className="text-cream/90">{r.names.join(', ')}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default function SectionTitleTrack() {
  const out = useNow() >= Date.parse(titleTrack.releaseAt);

  return (
    <section id="title-track" aria-labelledby="title-track-title" className="relative bg-ink py-24 text-cream scroll-mt-16 md:py-36 md:scroll-mt-20">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionLabel
          id="title-track-title"
          eyebrow={`Title Track · ${titleTrack.releaseLabel}`}
          title={
            <>
              동명 타이틀곡 <span className="text-bulb">〈{titleTrack.title}〉</span>
            </>
          }
          description={`허클베리핀의 여덟 번째 정규 앨범 〈${album.title}〉의 동명 타이틀곡 뮤직비디오가 ${album.releaseShort}에 공개됩니다.`}
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-8">
            {out ? (
              <VideoFacade
                videoId={titleTrack.videoId}
                title={titleTrack.title}
                thumb={titleTrack.videoThumb}
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
            ) : (
              <div className="relative flex aspect-video w-full flex-col justify-center overflow-hidden rounded-lg border border-bulb/30 bg-ink-2 p-6 md:p-10">
                <Image src={titleTrack.videoThumb} alt="" fill sizes="(max-width: 1024px) 100vw, 66vw" className="object-cover opacity-30" />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-transparent" />
                <Countdown
                  className="relative"
                  target={titleTrack.releaseAt}
                  label="뮤직비디오 · 정규 8집 공개까지"
                  doneLabel="공개 — YouTube에서 감상하세요"
                  compact
                />
              </div>
            )}
            <a
              href={titleTrack.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-cream/80 transition-colors hover:text-bulb focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bulb"
            >
              <FaYoutube aria-hidden="true" className="text-lg" />
              YouTube에서 보기
            </a>
          </Reveal>

          <Reveal delay={0.1} className="space-y-10 lg:col-span-4">
            <p className="font-serif-kr text-lg font-bold leading-relaxed text-cream/85 md:text-xl">{titleTrack.summary}</p>
            <Credits heading="Credits" rows={titleTrack.credits} />
            <Credits heading="Music Video" rows={titleTrack.mvCredits} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
