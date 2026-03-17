import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Header from '@/components/layout/Header';

const pretendard = localFont({
  src: '../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  variable: '--font-pretendard',
  weight: '100 900',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://huckleberryfinn.vercel.app'),
  title: '허클베리핀 - 나를 닮은 사내 LP + 단독 콘서트 봄의 피로',
  description: '허클베리핀 2집 나를 닮은 사내 500매 한정 LP + 14년 만의 단독 콘서트 봄의 피로. 텀블벅 펀딩 진행 중.',
  keywords: ['허클베리핀', 'Huckleberryfinn', '나를 닮은 사내', '인디 록', 'Korean indie rock', 'LP', '바이닐', '봄의 피로', '텀블벅', '크라우드펀딩'],
  openGraph: {
    title: '허클베리핀 - 나를 닮은 사내 LP + 단독 콘서트 봄의 피로',
    description: '허클베리핀 2집 나를 닮은 사내 500매 한정 LP + 14년 만의 단독 콘서트 봄의 피로. 텀블벅 펀딩 진행 중.',
    type: 'website',
    locale: 'ko_KR',
    siteName: 'Huckleberryfinn EPK',
    images: [
      {
        url: '/images/2th_album/og-image.webp',
        width: 1200,
        height: 630,
        alt: '허클베리핀 - 나를 닮은 사내 LP',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '허클베리핀 - 나를 닮은 사내 LP + 단독 콘서트 봄의 피로',
    description: '허클베리핀 2집 나를 닮은 사내 500매 한정 LP + 14년 만의 단독 콘서트 봄의 피로. 텀블벅 펀딩 진행 중.',
    images: ['/images/2th_album/og-image.webp'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <body className="font-sans">
        <Header />
        {children}
      </body>
    </html>
  );
}
