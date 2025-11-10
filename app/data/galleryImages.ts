export type GalleryPhase = 'past' | 'present';

export interface GalleryMoment {
  id: string;
  src: string;
  year: string;
  phase: GalleryPhase;
}

export const galleryMoments: GalleryMoment[] = [
  {
    id: 'boo-studio-drum',
    src: '/images/2th_album/old/2집 녹음 the boo studio (1).gif',
    year: '2001',
    phase: 'past',
  },
  {
    id: 'boo-studio-vocal',
    src: '/images/2th_album/old/2집 녹음 the boo studio (6).gif',
    year: '2001',
    phase: 'past',
  },
  {
    id: 'unplugged-show',
    src: '/images/2th_album/old/2000.04.22 언플러그드 공연 (21).gif',
    year: '2000',
    phase: 'past',
  },
  {
    id: 'poster-shoot',
    src: '/images/2th_album/old/20001허클베리핀03.jpg',
    year: '2001',
    phase: 'past',
  },
  {
    id: 'practice-room',
    src: '/images/2th_album/old/2002.02.17 (13).jpg',
    year: '2002',
    phase: 'past',
  },
  {
    id: 'studio-2024',
    src: '/images/profile/허클베리핀 3.webp',
    year: '2024',
    phase: 'present',
  },
  {
    id: 'members-2024',
    src: '/images/profile/이기용.webp',
    year: '2024',
    phase: 'present',
  },
  {
    id: 'yellow-show',
    src: '/images/yellowconcert/포스터.webp',
    year: '2025',
    phase: 'present',
  },
];
