/**
 * Past photos from Huckleberryfinn's 2001 album era
 * Excluding album_art.jpg which is used as hero background
 */

const basePath = '/images/2th_album/old/';

export const narrativeImages = [
  '2000-13.jpg',
  '2001-01.jpg',
  '2000-01.gif',
  '2000-02.gif',
  '2000-03.gif',
  '2000-07.gif',
  '2000-10.gif',
  '2000-11.gif',
  '2000-12.gif',
  '2001-03.gif',
  '2001-02.gif',
  '2002-06.jpg',
  '2001-05.gif',
  '2001-06.gif',
  '2001-07.gif',
  '2001-08.gif',
  '2001-09.gif',
  '2001-10.gif',
  '2000-17.gif',
  '2000-16.gif',
].map(filename => `${basePath}${filename}`);
