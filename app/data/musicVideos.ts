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
    title: 'em',
    videoId: null, // To be added later
  },
];
