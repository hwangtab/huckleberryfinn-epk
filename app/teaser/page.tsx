import type { Metadata } from 'next';
import Teaser from './Teaser';

const title = '티저 | 허클베리핀 정규 8집 〈모두가 아는 이야기〉';
const description =
  '124 BPM에 맞춰 흐르는 43초 모션 티저. 전구의 불빛, 뒤에 남겨둔 자신들, 붉은 실, 그리고 2026년 10월 23일 발매되는 정규 8집 〈모두가 아는 이야기〉.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/teaser/' },
  openGraph: {
    title,
    description,
    url: '/teaser/',
    type: 'video.other',
    locale: 'ko_KR',
    siteName: 'Huckleberryfinn EPK',
    images: [{ url: '/images/8th_album/og-album.jpg', width: 1200, height: 630, alt: '허클베리핀 정규 8집 모두가 아는 이야기' }],
  },
};

export default function TeaserPage() {
  return <Teaser />;
}
