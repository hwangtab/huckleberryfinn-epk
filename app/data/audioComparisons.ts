export type AudioComparisonPhase = 'past' | 'present';

export interface AudioComparisonVariant {
  id: string;
  yearLabel: string;
  versionLabel: string;
  description: string;
  audioSrc: string;
  accent?: 'remaster';
  badge?: string;
}

export interface AudioComparisonTrack {
  id: string;
  title: string;
  titleEn?: string;
  comparisonPoint: string;
  detail: string;
  tags: string[];
  variants: AudioComparisonVariant[];
}

export const audioComparisonTracks: AudioComparisonTrack[] = [
  {
    id: 'a',
    title: 'A',
    titleEn: 'Re-recording Cut',
    comparisonPoint: '보컬 다이내믹과 기타 하모닉스를 얼마나 넓게 펼쳤는가',
    detail: '초기 16bit DAT에 남아있던 숨소리와 호흡을 최신 컨버터 체인으로 다시 정리했습니다.',
    tags: ['드라이브 기타', '보컬 호흡', 'Lo-Fi to Hi-Fi'],
    variants: [
      {
        id: 'a-original',
        yearLabel: '2001',
        versionLabel: 'Original Session',
        description: '홍대 지하 합주실에서 한 번에 받아낸 테이크. 공간감은 좁지만, 당시의 거친 에너지 그대로입니다.',
        audioSrc: '/audio/old/A/A-OLD.mp3',
        badge: 'DAT 16bit',
      },
      {
        id: 'a-remaster',
        yearLabel: '2025',
        versionLabel: 'Re-recorded & Remastered',
        description: '신형 콘솔로 다시 녹음한 버전. 보컬의 미세한 호흡과 기타의 하모닉스가 분리돼 명료하게 들립니다.',
        audioSrc: '/audio/old/A/A-NEW.mp3',
        accent: 'remaster',
        badge: '96kHz / 32bit float',
      },
    ],
  },
  {
    id: 'em',
    title: 'Em',
    comparisonPoint: '신시사이저 패드와 딜레이가 만드는 공간감을 얼마나 깊게 제어했는가',
    detail: '탐탁지 않았던 로우엔드를 다시 디자인해, 심야 시간에 울려 퍼지는 듯한 입체감을 만들었습니다.',
    tags: ['Ambient Layer', '딜레이 테일', 'Low-end'],
    variants: [
      {
        id: 'em-original',
        yearLabel: '2001',
        versionLabel: 'Original Session',
        description: '아웃보드가 부족했던 시절의 믹스. 신스의 고역이 한 덩어리로 들리고 공간감이 얕습니다.',
        audioSrc: '/audio/old/Em/Em-OLD.mp3',
        badge: '4-Track Bounce',
      },
      {
        id: 'em-remaster',
        yearLabel: '2025',
        versionLabel: 'Remastered Version',
        description: '자동화와 모듈러 FX를 더해 음의 꼬리까지 제어. 베이스 딜레이가 빈 공간을 채우며 몰입도를 높입니다.',
        audioSrc: '/audio/old/Em/Em-NEW.mp3',
        accent: 'remaster',
        badge: 'Spatial Mix',
      },
    ],
  },
  {
    id: 'cat',
    title: '고양이',
    comparisonPoint: '기타 아르페지오와 리듬 섹션의 분리도',
    detail: '2001년에는 한 트랙에 몰아넣었던 기타와 보컬을 이번엔 각각의 질감으로 살렸습니다.',
    tags: ['Arpeggio', 'Vocal Texture', 'Room Mic'],
    variants: [
      {
        id: 'cat-original',
        yearLabel: '2001',
        versionLabel: 'Original Session',
        description: '단일 마이크로 받아서 기타와 보컬이 뒤엉켜 들립니다. 룸 노이즈도 그대로 남아있습니다.',
        audioSrc: '/audio/old/고양이/고양이-OLD.mp3',
        badge: 'Single Mic',
      },
      {
        id: 'cat-remaster',
        yearLabel: '2025',
        versionLabel: 'Re-recorded & Remastered',
        description: '스테레오 마이킹과 리본 마이크 조합으로 입체감을 확보. 브러시 드럼까지 또렷하게 들립니다.',
        audioSrc: '/audio/old/고양이/고양이-NEW.mp3',
        accent: 'remaster',
        badge: 'Stereo Stage',
      },
    ],
  },
  {
    id: 'walk',
    title: '길을 걷다',
    comparisonPoint: '어쿠스틱 기타 스트로크의 해상도와 리듬 섹션의 타이트함',
    detail: '템포는 그대로 두고, 연주자의 강약과 EQ로 24년의 시간을 채워 넣었습니다.',
    tags: ['Acoustic Strum', 'Transients', 'Tape Saturation'],
    variants: [
      {
        id: 'walk-original',
        yearLabel: '2001',
        versionLabel: 'Original Session',
        description: '테이프에 바로 박은 스트로크라 트랜지언트가 잘려 있습니다. 킥과 스네어도 한 덩어리로 뭉쳐 있죠.',
        audioSrc: '/audio/old/길을 걷다/길을 걷다-OLD.mp3',
        badge: 'Tape Print',
      },
      {
        id: 'walk-remaster',
        yearLabel: '2025',
        versionLabel: 'Remastered Version',
        description: '멀티 마이크로 다시 녹음해 스트로크의 결이 살아났고, 리듬 섹션의 타이트함이 강조됐습니다.',
        audioSrc: '/audio/old/길을 걷다/길을 걷다-NEW.mp3',
        accent: 'remaster',
        badge: 'Phase-aligned',
      },
    ],
  },
];
