export type GalleryPhase = 'past' | 'present';

export interface GalleryMoment {
  id: string;
  src: string;
  year: string;
  phase: GalleryPhase;
}

export const galleryMoments: GalleryMoment[] = [
  { id: '02-gif', src: '/images/2th_album/old/02.gif', year: '2000', phase: 'past' },
  { id: '03-gif', src: '/images/2th_album/old/03.gif', year: '2000', phase: 'past' },
  { id: '09-gif', src: '/images/2th_album/old/09.gif', year: '2000', phase: 'past' },
  { id: '11-gif', src: '/images/2th_album/old/11.gif', year: '2000', phase: 'past' },
  { id: '12-gif', src: '/images/2th_album/old/12.gif', year: '2000', phase: 'past' },
  { id: 'unplugged-3', src: '/images/2th_album/old/2000.04.22 언플러그드 공연 (3).gif', year: '2000', phase: 'past' },
  { id: 'unplugged-14', src: '/images/2th_album/old/2000.04.22 언플러그드 공연 (14).gif', year: '2000', phase: 'past' },
  { id: 'unplugged-15', src: '/images/2th_album/old/2000.04.22 언플러그드 공연 (15).gif', year: '2000', phase: 'past' },
  { id: 'unplugged-16', src: '/images/2th_album/old/2000.04.22 언플러그드 공연 (16).gif', year: '2000', phase: 'past' },
  { id: 'unplugged-21', src: '/images/2th_album/old/2000.04.22 언플러그드 공연 (21).gif', year: '2000', phase: 'past' },
  { id: 'unplugged-23', src: '/images/2th_album/old/2000.04.22 언플러그드 공연 (23).gif', year: '2000', phase: 'past' },
  { id: 'unplugged-27', src: '/images/2th_album/old/2000.04.22 언플러그드 공연 (27).gif', year: '2000', phase: 'past' },
  { id: 'poster-20001', src: '/images/2th_album/old/20001허클베리핀03.jpg', year: '2000', phase: 'past' },
  { id: 'band-2001', src: '/images/2th_album/old/2001허클베리핀02.jpg', year: '2001', phase: 'past' },
  { id: 'samsung-6', src: '/images/2th_album/old/2001.11.10 쌈지스페이스 (6).gif', year: '2001', phase: 'past' },
  { id: 'samsung-7', src: '/images/2th_album/old/2001.11.10 쌈지스페이스 (7).gif', year: '2001', phase: 'past' },
  { id: 'samsung-10', src: '/images/2th_album/old/2001.11.10 쌈지스페이스 (10).gif', year: '2001', phase: 'past' },
  { id: 'heavy-14', src: '/images/2th_album/old/2002.02.03 헤비 공연 (14).jpg', year: '2002', phase: 'past' },
  { id: 'heavy-19', src: '/images/2th_album/old/2002.02.03 헤비 공연 (19).jpg', year: '2002', phase: 'past' },
  { id: 'heavy-22', src: '/images/2th_album/old/2002.02.03 헤비 공연 (22).jpg', year: '2002', phase: 'past' },
  { id: 'heavy-24', src: '/images/2th_album/old/2002.02.03 헤비 공연 (24).jpg', year: '2002', phase: 'past' },
  { id: 'heavy-26', src: '/images/2th_album/old/2002.02.03 헤비 공연 (26).jpg', year: '2002', phase: 'past' },
  { id: 'practice-13', src: '/images/2th_album/old/2002.02.17 (13).jpg', year: '2002', phase: 'past' },
  { id: 'boo-1', src: '/images/2th_album/old/2집 녹음 the boo studio (1).gif', year: '2001', phase: 'past' },
  { id: 'boo-2', src: '/images/2th_album/old/2집 녹음 the boo studio (2).gif', year: '2001', phase: 'past' },
  { id: 'boo-6', src: '/images/2th_album/old/2집 녹음 the boo studio (6).gif', year: '2001', phase: 'past' },
  { id: 'boo-7', src: '/images/2th_album/old/2집 녹음 the boo studio (7).gif', year: '2001', phase: 'past' },
  { id: 'boo-15', src: '/images/2th_album/old/2집 녹음 the boo studio (15).gif', year: '2001', phase: 'past' },
  { id: 'boo-26', src: '/images/2th_album/old/2집 녹음 the boo studio (26).gif', year: '2001', phase: 'past' },
  { id: 'album-art-jpg', src: '/images/2th_album/old/album_art.jpg', year: '2001', phase: 'past' },
  { id: 'album-art-webp', src: '/images/2th_album/old/album_art.webp', year: '2001', phase: 'past' },
  { id: 'pds-1', src: '/images/2th_album/old/pds_down_hdn.jpg', year: '2000', phase: 'past' },
  { id: 'pds-2', src: '/images/2th_album/old/pds_down_hdn (2).jpg', year: '2000', phase: 'past' },
  { id: 'band-gif', src: '/images/2th_album/old/허클베리핀.gif', year: '2000', phase: 'past' },
  { id: 'lee-portrait', src: '/images/2th_album/old/이기용_1.gif', year: '2000', phase: 'past' },
];
