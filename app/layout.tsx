import type { Metadata, Viewport } from 'next';
import { Instrument_Serif, Nanum_Myeongjo } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import CursorGlow from '@/components/features/CursorGlow';
import MotionProvider from '@/components/motion/MotionProvider';
import AnchorScroll from '@/components/motion/AnchorScroll';

const SITE_URL = 'https://huckleberryfinn.vercel.app';

// Display serif: only the two heavy weights the design uses (each weight adds ~90 unicode-range faces).
const nanumMyeongjo = Nanum_Myeongjo({
  weight: ['700', '800'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-nanum-myeongjo',
  preload: false,
  fallback: ['AppleMyungjo', 'Batang', 'serif'],
});

const instrumentSerif = Instrument_Serif({
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-instrument-serif',
});

const title = '허클베리핀 정규 8집 〈모두가 아는 이야기〉 | Official EPK';
const description =
  '허클베리핀 정규 8집 〈모두가 아는 이야기〉 2026년 10월 23일(금) 낮 12시 발매. 두 번째 싱글 〈멜랑콜리아〉 9월 29일(화) 낮 12시 공개. 22nd Yellow Concert 서울 10.31 · 부산 12.05.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  alternates: { canonical: '/' },
  keywords: [
    '허클베리핀',
    'Huckleberryfinn',
    '모두가 아는 이야기',
    '멜랑콜리아',
    '박쥐',
    '정규 8집',
    '인디 록',
    'Korean indie rock',
    'Yellow Concert',
    '텀블벅',
  ],
  openGraph: {
    title,
    description,
    url: '/',
    type: 'website',
    locale: 'ko_KR',
    siteName: 'Huckleberryfinn EPK',
    images: [
      {
        url: '/images/8th_album/og-album.jpg',
        width: 1200,
        height: 630,
        alt: '허클베리핀 정규 8집 모두가 아는 이야기',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/images/8th_album/og-album.jpg'],
  },
};

export const viewport: Viewport = {
  themeColor: '#0A0D14',
  colorScheme: 'dark',
};

const band = { '@type': 'MusicGroup', name: 'Huckleberryfinn', alternateName: '허클베리핀', foundingDate: '1997' };

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'MusicAlbum',
      name: '모두가 아는 이야기',
      byArtist: band,
      datePublished: '2026-10-23',
      numTracks: 9,
      albumProductionType: 'https://schema.org/StudioAlbum',
      image: `${SITE_URL}/images/8th_album/album-cover.jpg`,
      url: SITE_URL,
    },
    {
      '@type': 'MusicEvent',
      name: '2026 Yellow Concert 〈서울〉',
      startDate: '2026-10-31T19:00:00+09:00',
      performer: band,
      location: { '@type': 'Place', name: 'KT&G 홍대 상상마당', address: '서울 마포구 어울마당로 65 상상마당 빌딩 지하 2층' },
    },
    {
      '@type': 'MusicEvent',
      name: '2026 Yellow Concert 〈부산〉',
      startDate: '2026-12-05T19:00:00+09:00',
      performer: band,
      location: { '@type': 'Place', name: '오방가르드', address: '부산 남구 용소로7번길 15-1 지하' },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={`${nanumMyeongjo.variable} ${instrumentSerif.variable} bg-ink`}>
      <head>
        {/* Without JavaScript, reveal-on-scroll content must not stay invisible. */}
        <noscript>
          <style>{`[style*="opacity:0"]{opacity:1!important;transform:none!important}.hero-lid-top,.hero-lid-bottom{display:none}`}</style>
        </noscript>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="grain bg-ink font-sans text-cream">
        <MotionProvider>
          <AnchorScroll />
          <CursorGlow />
          <Header />
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
