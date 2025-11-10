export type GalleryPhase = 'past' | 'present';

export interface GalleryMoment {
  id: string;
  src: string;
  year: string;
  location: string;
  title: string;
  description: string;
  phase: GalleryPhase;
}

export const galleryMoments: GalleryMoment[] = [
  {
    id: 'boo-studio-drum',
    src: '/images/2th_album/old/2집 녹음 the boo studio (1).gif',
    year: '2001',
    location: 'The Boo Studio, Seoul',
    title: '급하게 세운 드럼 마이킹',
    description: '두 번째 앨범을 데드라인에 맞추기 위해 하루 만에 세팅했던 드럼 룸. 룸 마이크 하나로 모든 공간감을 해결했습니다.',
    phase: 'past',
  },
  {
    id: 'boo-studio-vocal',
    src: '/images/2th_album/old/2집 녹음 the boo studio (6).gif',
    year: '2001',
    location: 'The Boo Studio, Seoul',
    title: '셀프 프로듀싱의 시작',
    description: '당시에는 예산 때문에 직접 엔지니어링까지 도맡았습니다. 한 트랙에 모든 악기를 겹쳐야 했던 시절이죠.',
    phase: 'past',
  },
  {
    id: 'unplugged-show',
    src: '/images/2th_album/old/2000.04.22 언플러그드 공연 (21).gif',
    year: '2000',
    location: '언플러그드 공연',
    title: '작은 무대, 큰 환호',
    description: '스피커가 모자라 객석 스탠드에서 바로 들려주던 시절. 이 무대의 긴장감이 지금의 리듬을 만들었습니다.',
    phase: 'past',
  },
  {
    id: 'poster-shoot',
    src: '/images/2th_album/old/20001허클베리핀03.jpg',
    year: '2001',
    location: '홍대 뒷골목',
    title: '두 번째 앨범 자켓 촬영',
    description: '도시의 공기를 담고 싶어 골목을 떠돌며 촬영했던 컷. 세월이 지나도 밴드의 표정은 그대로입니다.',
    phase: 'past',
  },
  {
    id: 'practice-room',
    src: '/images/2th_album/old/2002.02.17 (13).jpg',
    year: '2002',
    location: '합정 연습실',
    title: '밤새워 다듬은 편곡',
    description: '공연 전날까지 편곡을 수정하던 합정의 작은 연습실. 습기와 담배 냄새가 가득했지만, 곡은 그곳에서 자랐습니다.',
    phase: 'past',
  },
  {
    id: 'studio-2024',
    src: '/images/profile/허클베리핀 3.webp',
    year: '2024',
    location: 'Sha Label Studio',
    title: '새로운 호흡으로 다시 모이다',
    description: '리마스터링 작업을 위해 다시 모인 2024년의 허클베리핀. 오랜 시간 함께한 팀의 여유가 느껴집니다.',
    phase: 'present',
  },
  {
    id: 'members-2024',
    src: '/images/profile/이기용.webp',
    year: '2024',
    location: 'Portrait Session',
    title: '지금의 얼굴을 기록하다',
    description: '2025년 프로모션을 위해 새롭게 촬영한 멤버 프로필. 세월이 켜켜이 쌓인 표정이 곡의 깊이를 보여줍니다.',
    phase: 'present',
  },
  {
    id: 'yellow-show',
    src: '/images/yellowconcert/포스터.webp',
    year: '2025',
    location: 'Yellow Concert',
    title: '12월 옐로우 공연을 향해',
    description: '새로운 사운드를 무대에서 증명할 시간. 리마스터링과 라이브 밸런스를 맞추기 위해 하루도 쉬지 않고 있습니다.',
    phase: 'present',
  },
];
