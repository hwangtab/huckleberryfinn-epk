export interface AudioComparisonVariant {
  id: string;
  yearLabel: string;
  versionLabel: string;
  audioSrc: string;
  accent?: 'remaster';
}

export interface AudioComparisonTrack {
  id: string;
  title: string;
  variants: AudioComparisonVariant[];
}

export const audioComparisonTracks: AudioComparisonTrack[] = [
  {
    id: 'em',
    title: 'Em',
    variants: [
      {
        id: 'em-original',
        yearLabel: '2001',
        versionLabel: 'Original Session',
        audioSrc: '/audio/old/Em/Em-OLD.mp3',
      },
      {
        id: 'em-remaster',
        yearLabel: '2025',
        versionLabel: 'Remastered Version',
        audioSrc: '/audio/old/Em/Em-NEW.mp3',
        accent: 'remaster',
      },
    ],
  },
  {
    id: 'a',
    title: 'A',
    variants: [
      {
        id: 'a-original',
        yearLabel: '2001',
        versionLabel: 'Original Session',
        audioSrc: '/audio/old/A/A-OLD.mp3',
      },
      {
        id: 'a-remaster',
        yearLabel: '2025',
        versionLabel: 'Re-recorded & Remastered',
        audioSrc: '/audio/old/A/A-NEW.mp3',
        accent: 'remaster',
      },
    ],
  },
  {
    id: 'cat',
    title: '고양이',
    variants: [
      {
        id: 'cat-original',
        yearLabel: '2001',
        versionLabel: 'Original Session',
        audioSrc: '/audio/old/cat/cat-OLD.mp3',
      },
      {
        id: 'cat-remaster',
        yearLabel: '2025',
        versionLabel: 'Re-recorded & Remastered',
        audioSrc: '/audio/old/cat/cat-NEW.mp3',
        accent: 'remaster',
      },
    ],
  },
  {
    id: 'walk',
    title: '길을 걷다',
    variants: [
      {
        id: 'walk-original',
        yearLabel: '2001',
        versionLabel: 'Original Session',
        audioSrc: '/audio/old/walk/walk-OLD.mp3',
      },
      {
        id: 'walk-remaster',
        yearLabel: '2025',
        versionLabel: 'Remastered Version',
        audioSrc: '/audio/old/walk/walk-NEW.mp3',
        accent: 'remaster',
      },
    ],
  },
];
