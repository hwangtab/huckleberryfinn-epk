'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { FaDownload, FaCheck, FaCopy, FaFileAlt } from 'react-icons/fa';
import SectionLabel from '@/components/ui/SectionLabel';
import { pressAssets, TUMBLBUG_URL } from '@/app/data/album8';
import { pressRelease, pressReleasePlainText } from '@/app/data/pressRelease';
import { contactInfo } from '@/app/data/contact';

export default function SectionPress() {
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(pressReleasePlainText());
      setCopied(true);
      setCopyFailed(false);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
      setCopyFailed(true);
    }
  };

  const downloadText = () => {
    const blob = new Blob([`\uFEFF${pressReleasePlainText()}`], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = '허클베리핀_멜랑콜리아_보도자료.txt';
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <section id="press" aria-labelledby="press-title" className="relative bg-ink py-24 text-cream scroll-mt-16 md:py-36 md:scroll-mt-20">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionLabel
          id="press-title"
          eyebrow="Media & Press Kit"
          title={
            <>
              보도를 위한 <span className="text-bulb">공식 자료</span>
            </>
          }
          description="아래 이미지는 클릭 즉시 원본 파일로 다운로드됩니다. 보도자료 텍스트는 복사해서 바로 사용하실 수 있습니다."
        />

        {/* Asset grid */}
        <RevealGroup as="ul" stagger={0.05} className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {pressAssets.map((a) => (
            <RevealItem as="li" key={a.href}>
              <a
                href={a.href}
                download
                className="group block overflow-hidden rounded-xl border border-cream/10 bg-cream/[0.03] transition-colors hover:border-bulb/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bulb"
              >
                <div className="relative aspect-square overflow-hidden bg-ink-3">
                  {a.preview && (
                    <Image
                      src={a.preview}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                      className={`transition-transform duration-700 group-hover:scale-105 ${
                        a.preview.endsWith('.png') ? 'object-contain p-6' : 'object-cover'
                      }`}
                    />
                  )}
                  <span className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-ink/70 text-cream/80 opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
                    <FaDownload size={12} aria-hidden="true" />
                  </span>
                </div>
                <div className="p-3">
                  <p className="text-sm font-semibold leading-snug text-cream">{a.title}</p>
                  <p className="mt-0.5 text-xs text-cream/70">{a.spec}</p>
                </div>
              </a>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* Press release text + contact */}
        <div className="mt-16 grid gap-10 lg:grid-cols-12">
          <Reveal
            className="rounded-2xl border border-cream/10 bg-cream/[0.03] p-6 md:p-8 lg:col-span-8"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-bulb/80">Press Release</p>
                <h3 className="mt-1 font-serif-kr text-xl font-bold text-cream md:text-2xl">〈멜랑콜리아〉 싱글 공개 보도자료</h3>
              </div>
              <div className="flex shrink-0 flex-wrap gap-2">
                <button
                  type="button"
                  onClick={copyText}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-cream/30 px-4 py-2 text-xs font-semibold text-cream transition-colors hover:border-bulb hover:text-bulb focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bulb"
                  aria-live="polite"
                >
                  {copied ? <FaCheck size={11} aria-hidden="true" /> : <FaCopy size={11} aria-hidden="true" />}
                  {copied ? '복사됨' : copyFailed ? '복사 실패 — 직접 선택해 주세요' : '전문 복사'}
                </button>
                <button
                  type="button"
                  onClick={downloadText}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-cream/30 px-4 py-2 text-xs font-semibold text-cream transition-colors hover:border-bulb hover:text-bulb focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bulb"
                >
                  <FaFileAlt size={11} aria-hidden="true" />
                  TXT 다운로드
                </button>
              </div>
            </div>

            <article
              tabIndex={0}
              aria-label="보도자료 전문"
              className="mt-6 max-h-[34rem] overflow-y-auto rounded-xl border border-cream/10 bg-ink/60 p-5 text-sm leading-[1.9] text-cream/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bulb md:p-7"
            >
              <p className="text-xs font-semibold text-bulb">
                [{pressRelease.kicker}] <span className="font-medium text-cream/70">{pressRelease.release}</span>
              </p>
              <h4 className="mt-4 font-serif-kr text-lg font-extrabold leading-snug text-cream md:text-xl">{pressRelease.headline}</h4>
              <ul className="mt-3 space-y-1">
                {pressRelease.subheadlines.map((sub) => (
                  <li key={sub} className="font-semibold text-cream/85">
                    - {sub}
                  </li>
                ))}
              </ul>
              <div className="mt-6 space-y-4 border-t border-cream/10 pt-6">
                {pressRelease.sections.map((sec, i) => (
                  <div key={sec.heading ?? i} className="space-y-4">
                    {sec.heading && <h5 className="pt-2 font-bold text-cream">■ {sec.heading}</h5>}
                    {sec.paragraphs.map((para) => (
                      <p key={para.slice(0, 24)}>{para}</p>
                    ))}
                  </div>
                ))}
              </div>
              <p className="my-6 text-center text-cream/60">###</p>
              <div className="space-y-4">
                <h5 className="font-bold text-cream">■ {pressRelease.boilerplateHeading}</h5>
                {pressRelease.boilerplate.map((para) => (
                  <p key={para.slice(0, 24)}>{para}</p>
                ))}
                <p className="text-cream/70">{pressRelease.assetsNote}</p>
              </div>
              <div className="mt-6 space-y-1 border-t border-cream/10 pt-6">
                <h5 className="mb-2 font-bold text-cream">■ 문의</h5>
                {pressRelease.contact.map((c) => (
                  <p key={c.label}>
                    <span className="text-cream/60">{c.label}: </span>
                    {c.value}
                  </p>
                ))}
              </div>
            </article>
          </Reveal>

          <Reveal
            className="flex flex-col justify-between rounded-2xl border border-bulb/30 bg-gradient-to-b from-bulb/10 to-transparent p-6 md:p-8 lg:col-span-4"
            delay={0.1}
          >
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-bulb/80">Contact</p>
              <h3 className="mt-1 font-serif-kr text-xl font-bold text-cream md:text-2xl">취재 · 인터뷰 · 자료 문의</h3>
              <dl className="mt-6 space-y-3 text-sm">
                <div>
                  <dt className="text-cream/60">Label</dt>
                  <dd className="text-cream">{contactInfo.label}</dd>
                </div>
                <div>
                  <dt className="text-cream/60">Email</dt>
                  <dd>
                    <a href={`mailto:${contactInfo.email}`} className="text-bulb underline-offset-4 hover:underline">
                      {contactInfo.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-cream/60">Funding</dt>
                  <dd>
                    <a href={TUMBLBUG_URL} target="_blank" rel="noopener noreferrer" className="text-bulb underline-offset-4 hover:underline">
                      tumblbug.com/hbf8th
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
            <a
              href={`mailto:${contactInfo.email}?subject=${encodeURIComponent('[허클베리핀 8집] 취재 문의')}`}
              className="mt-8 inline-flex items-center justify-center rounded-full bg-bulb px-6 py-3 text-sm font-semibold text-ink transition-transform hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bulb focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              이메일 보내기
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
