export interface MusicVideo {
  title: string;
  videoId: string | null; // null if not yet available
}

export const musicVideos: MusicVideo[] = [
  {
    title: '사막',
    videoId: 'IU50se1zi9A',
  },
  {
    title: 'Em',
    videoId: 'nrN261--NoA',
  },
  {
    title: 'Somebody To Love',
    videoId: 'N2mwjLu15o0',
  },
];
