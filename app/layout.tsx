import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Header from '@/components/layout/Header';
import CursorGlow from '@/components/features/CursorGlow';

const pretendard = localFont({
  src: '../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  variable: '--font-pretendard',
  weight: '100 900',
});

const title = '허클베리핀 정규 8집 〈모두가 아는 이야기〉 | Official EPK';
const description =
  '허클베리핀 정규 8집 〈모두가 아는 이야기〉 2026년 10월 23일 발매. 2nd 싱글 〈멜랑콜리아〉 9월 29일 공개. 22th Yellow Concert 서울 10.31 · 부산 12.05. 텀블벅 펀딩 진행 중.';

export const metadata: Metadata = {
  metadataBase: new URL('https://huckleberryfinn.vercel.app'),
  title,
  description,
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
    type: 'website',
    locale: 'ko_KR',
    siteName: 'Huckleberryfinn EPK',
    images: [
      {
        url: '/images/8th_album/og-image.jpg',
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
    images: ['/images/8th_album/og-image.jpg'],
  },
};

export const viewport: Viewport = {
  themeColor: '#0A0D14',
  colorScheme: 'dark',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={`${pretendard.variable} bg-ink`}>
      <body className="grain bg-ink font-sans text-cream">
        <CursorGlow />
        <Header />
        {children}
      </body>
    </html>
  );
}
