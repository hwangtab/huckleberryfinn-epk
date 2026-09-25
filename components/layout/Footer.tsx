import Image from 'next/image';
import { FaYoutube, FaInstagram, FaFacebook, FaExternalLinkAlt } from 'react-icons/fa';
import { contactInfo } from '@/app/data/contact';
import { album } from '@/app/data/album8';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-cream/10 bg-ink px-6 py-16 text-cream md:px-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-40%] left-1/2 h-[60vh] w-[60vh] -translate-x-1/2 rounded-full bg-bulb/10 blur-[120px]"
      />
      <div className="relative mx-auto max-w-7xl">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <Image src="/images/logo/white_logo.png" alt="Huckleberryfinn" width={260} height={62} className="h-auto w-52 md:w-64" />
            <p className="mt-5 font-serif-kr text-2xl font-bold text-cream/90 md:text-3xl">
              정규 8집 〈{album.title}〉
            </p>
            <p className="mt-1 font-serif-latin text-lg italic text-bulb">{album.releaseLabel}</p>
          </div>

          <div className="flex flex-col gap-4 md:items-end">
            <div className="-mx-2.5 flex gap-1 text-2xl">
              <a href={contactInfo.youtube} target="_blank" rel="noopener noreferrer" className="rounded-full p-2.5 transition-colors hover:text-bulb focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bulb" aria-label="YouTube">
                <FaYoutube />
              </a>
              <a href={contactInfo.instagram} target="_blank" rel="noopener noreferrer" className="rounded-full p-2.5 transition-colors hover:text-bulb focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bulb" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href={contactInfo.facebook} target="_blank" rel="noopener noreferrer" className="rounded-full p-2.5 transition-colors hover:text-bulb focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bulb" aria-label="Facebook">
                <FaFacebook />
              </a>
            </div>
            <a
              href={contactInfo.tumblbug}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-bulb transition-colors hover:text-bulb-hot"
            >
              <FaExternalLinkAlt size={11} aria-hidden="true" />
              텀블벅 펀딩 페이지
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-cream/10 pt-6 text-xs text-cream/70 md:flex-row md:items-center md:justify-between">
          <p>
            {contactInfo.label} ·{' '}
            <a href={`mailto:${contactInfo.email}`} className="inline-block py-2 hover:text-bulb">
              {contactInfo.email}
            </a>
          </p>
          <p>© 2026 Huckleberryfinn. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
