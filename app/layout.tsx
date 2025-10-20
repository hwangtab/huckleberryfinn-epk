import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const pretendard = localFont({
  src: '../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  variable: '--font-pretendard',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Huckleberryfinn - 나를 닮은 사내 (2025 Re-Recording)',
  description: '24년의 시간을 넘어, 못다 한 이야기가 다시 시작됩니다. 허클베리핀 2집 재녹음 프로젝트.',
  keywords: ['허클베리핀', 'Huckleberryfinn', '나를 닮은 사내', '인디 록', 'Korean indie rock', '옐로우 콘서트'],
  openGraph: {
    title: 'Huckleberryfinn - 나를 닮은 사내 (2025 Re-Recording)',
    description: '24년의 시간을 넘어, 못다 한 이야기가 다시 시작됩니다. 허클베리핀 2집 재녹음 프로젝트.',
    type: 'website',
    locale: 'ko_KR',
    siteName: 'Huckleberryfinn EPK',
    images: [
      {
        url: '/images/2th_album/album_art.jpg',
        width: 1200,
        height: 630,
        alt: 'Huckleberryfinn - 나를 닮은 사내',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Huckleberryfinn - 나를 닮은 사내 (2025 Re-Recording)',
    description: '24년의 시간을 넘어, 못다 한 이야기가 다시 시작됩니다.',
    images: ['/images/2th_album/album_art.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
