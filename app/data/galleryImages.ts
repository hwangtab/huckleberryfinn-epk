export type GalleryPhase = 'past' | 'present';

export interface GalleryMoment {
  id: string;
  src: string;
  year: string;
  phase: GalleryPhase;
}

export const galleryMoments: GalleryMoment[] = [
  { id: '02-gif', src: '/images/2th_album/old/2000-01.gif', year: '2000', phase: 'past' },
  { id: '03-gif', src: '/images/2th_album/old/2000-02.gif', year: '2000', phase: 'past' },
  { id: '09-gif', src: '/images/2th_album/old/2000-03.gif', year: '2000', phase: 'past' },
  { id: '11-gif', src: '/images/2th_album/old/2000-04.gif', year: '2000', phase: 'past' },
  { id: '12-gif', src: '/images/2th_album/old/2000-05.gif', year: '2000', phase: 'past' },
  { id: 'unplugged-3', src: '/images/2th_album/old/2000-06.gif', year: '2000', phase: 'past' },
  { id: 'unplugged-14', src: '/images/2th_album/old/2000-07.gif', year: '2000', phase: 'past' },
  { id: 'unplugged-15', src: '/images/2th_album/old/2000-08.gif', year: '2000', phase: 'past' },
  { id: 'unplugged-16', src: '/images/2th_album/old/2000-09.gif', year: '2000', phase: 'past' },
  { id: 'unplugged-21', src: '/images/2th_album/old/2000-10.gif', year: '2000', phase: 'past' },
  { id: 'unplugged-23', src: '/images/2th_album/old/2000-11.gif', year: '2000', phase: 'past' },
  { id: 'unplugged-27', src: '/images/2th_album/old/2000-12.gif', year: '2000', phase: 'past' },
  { id: 'poster-20001', src: '/images/2th_album/old/2000-13.jpg', year: '2000', phase: 'past' },
  { id: 'band-2001', src: '/images/2th_album/old/2001-01.jpg', year: '2001', phase: 'past' },
  { id: 'samsung-6', src: '/images/2th_album/old/2001-02.gif', year: '2001', phase: 'past' },
  { id: 'samsung-7', src: '/images/2th_album/old/2001-03.gif', year: '2001', phase: 'past' },
  { id: 'samsung-10', src: '/images/2th_album/old/2001-04.gif', year: '2001', phase: 'past' },
  { id: 'heavy-14', src: '/images/2th_album/old/2002-01.jpg', year: '2002', phase: 'past' },
  { id: 'heavy-19', src: '/images/2th_album/old/2002-02.jpg', year: '2002', phase: 'past' },
  { id: 'heavy-22', src: '/images/2th_album/old/2002-03.jpg', year: '2002', phase: 'past' },
  { id: 'heavy-24', src: '/images/2th_album/old/2002-04.jpg', year: '2002', phase: 'past' },
  { id: 'heavy-26', src: '/images/2th_album/old/2002-05.jpg', year: '2002', phase: 'past' },
  { id: 'practice-13', src: '/images/2th_album/old/2002-06.jpg', year: '2002', phase: 'past' },
  { id: 'boo-1', src: '/images/2th_album/old/2001-05.gif', year: '2001', phase: 'past' },
  { id: 'boo-2', src: '/images/2th_album/old/2001-06.gif', year: '2001', phase: 'past' },
  { id: 'boo-6', src: '/images/2th_album/old/2001-07.gif', year: '2001', phase: 'past' },
  { id: 'boo-7', src: '/images/2th_album/old/2001-08.gif', year: '2001', phase: 'past' },
  { id: 'boo-15', src: '/images/2th_album/old/2001-09.gif', year: '2001', phase: 'past' },
  { id: 'boo-26', src: '/images/2th_album/old/2001-10.gif', year: '2001', phase: 'past' },
  { id: 'album-art-jpg', src: '/images/2th_album/old/2001-11.jpg', year: '2001', phase: 'past' },
  { id: 'album-art-webp', src: '/images/2th_album/old/2001-12.webp', year: '2001', phase: 'past' },
  { id: 'pds-1', src: '/images/2th_album/old/2000-14.jpg', year: '2000', phase: 'past' },
  { id: 'pds-2', src: '/images/2th_album/old/2000-15.jpg', year: '2000', phase: 'past' },
  { id: 'band-gif', src: '/images/2th_album/old/2000-16.gif', year: '2000', phase: 'past' },
  { id: 'lee-portrait', src: '/images/2th_album/old/2000-17.gif', year: '2000', phase: 'past' },
];
