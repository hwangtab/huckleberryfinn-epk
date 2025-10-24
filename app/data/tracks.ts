export interface Track {
  number: number;
  title: string;
  titleEn?: string;
  src: string;
  producersNote?: string;
  lyrics?: string;
}

export const tracks: Track[] = [
  {
    number: 1,
    title: '사막',
    titleEn: 'Desert',
    src: '/audio/01.사막-나를 닮은 사내 (2024 Re-Recording Version).mp3',
    producersNote: '20대 특유의 날카로운 에너지를 현재의 깊이로 담아내려 했습니다. 원곡의 거친 질감은 살리되, 더욱 견고하고 입체적인 사운드를 구현했습니다.',
  },
  {
    number: 2,
    title: 'Somebody To Love',
    src: '/audio/02.Somebody To Love.mp3',
  },
  {
    number: 3,
    title: 'A',
    src: '/audio/03.A.mp3',
  },
  {
    number: 4,
    title: '길들여진 개',
    src: '/audio/04.길들여진 개.mp3',
  },
  {
    number: 5,
    title: '훌라',
    src: '/audio/05.훌라.mp3',
  },
  {
    number: 6,
    title: 'Shaker',
    src: '/audio/06.Shaker.mp3',
  },
  {
    number: 7,
    title: 'Em',
    src: '/audio/07.Em-나를 닮은 사내 (2024 Re-Recording Version).mp3',
    producersNote: '원곡의 몽환적인 분위기를 극대화하는 데 중점을 두었습니다. 아날로그 신디사이저와 공간계 이펙터를 적극적으로 활용해, 듣는 이를 감싸는 듯한 사운드 스케이프를 완성했습니다.',
  },
  {
    number: 8,
    title: 'Oz',
    src: '/audio/08.Oz.mp3',
  },
  {
    number: 9,
    title: '길을 걷다',
    src: '/audio/09.길을 걷다.mp3',
  },
  {
    number: 10,
    title: '고양이',
    src: '/audio/10.고양이.mp3',
  },
  {
    number: 11,
    title: 'Silver',
    src: '/audio/11.Silver.mp3',
  },
];
