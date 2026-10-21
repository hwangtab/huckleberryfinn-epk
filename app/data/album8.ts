/**
 * 허클베리핀 정규 8집 〈모두가 아는 이야기〉 EPK 데이터
 * 출처: docs/8집/ (앨범 소개, 멜랑콜리아 곡 설명, 가사, 정규 8집 보도자료)
 */

export const album = {
  number: 8,
  title: '모두가 아는 이야기',
  titleLatin: 'Huckleberryfinn — 8th Studio Album',
  releaseAt: '2026-10-23T12:00:00+09:00',
  releaseLabel: '2026. 10. 23 (금) 12:00 KST',
  releaseShort: '10.23 (금) 낮 12시',
  trackCount: 9,
  format: 'Jewel Case CD · 8p 북클릿',
  label: '샤 레이블 (Sha Label)',
  distributor: '미러볼뮤직',
  producer: '이기용',
  cover: '/images/8th_album/album-cover.jpg',
  cdMockup: '/images/8th_album/cd-mockup.jpg',
  ogImage: '/images/8th_album/og-album.jpg',
  tagline: '내 안에서 낯설어진 존재들을 다시 부르는 노래',
  notes: [
    '2022년 정규 7집 〈The Light Of Rain(비의 빛)〉 이후 4년 만의 정규 앨범입니다.',
    '타이틀곡은 〈멜랑콜리아〉, 〈모두가 아는 이야기〉, 〈나선의 밤〉, 〈황혼의 기수와 말〉, 〈세계 끝〉 다섯 곡입니다.',
    '앞서 8월 21일 〈박쥐〉, 9월 29일 〈멜랑콜리아〉를 디지털 싱글로 선공개했습니다.',
    '10월 23일(금) 낮 12시, 미러볼뮤직을 통해 각종 온라인 음원 사이트에서 공개됩니다.',
  ],
};

export interface Track {
  no: number;
  title: string;
  /** 타이틀곡 */
  isTitle?: boolean;
  /** 선공개 싱글 id (singles[].id) */
  singleId?: string;
}

export const tracklist: Track[] = [
  { no: 1, title: '멜랑콜리아', isTitle: true, singleId: 'melancholia' },
  { no: 2, title: '모두가 아는 이야기', isTitle: true },
  { no: 3, title: '나선의 밤', isTitle: true },
  { no: 4, title: 'Live To Tell' },
  { no: 5, title: '구름을 밀어낼게' },
  { no: 6, title: '박쥐', singleId: 'bat' },
  { no: 7, title: '바라본다' },
  { no: 8, title: '황혼의 기수와 말', isTitle: true },
  { no: 9, title: '세계 끝', isTitle: true },
];

/** 동명 타이틀곡 〈모두가 아는 이야기〉 뮤직비디오 + 크레딧 */
export const titleTrack = {
  title: '모두가 아는 이야기',
  releaseAt: '2026-10-23T12:00:00+09:00',
  releaseLabel: '2026. 10. 23 (금) 12:00 KST',
  videoId: 'jZOUn4nINMI',
  videoUrl: 'https://www.youtube.com/watch?v=jZOUn4nINMI',
  videoThumb: '/images/8th_album/album-cover.jpg',
  summary:
    '거울 속 자신을 바라보며, 마지막에 자신을 구해줄 사람은 결국 자기 자신이라는 사실을 깨닫는 장면. 오래된 세계가 무너지고 새로운 얼굴로 다시 태어나더라도 이전의 이름과 상처, 사랑은 사라지지 않는다.',
  credits: [
    { role: '보컬', names: ['이소영'] },
    { role: '기타', names: ['이기용', '장웅'] },
    { role: '드럼', names: ['성장규', '장웅', '이설'] },
    { role: '베이스', names: ['장웅'] },
    { role: '작사 · 작곡', names: ['이기용'] },
    { role: '편곡', names: ['이기용', '이소영', '성장규', '장웅'] },
    { role: '믹스', names: ['성장규', '장웅'] },
    { role: '마스터링', names: ['성장규'] },
  ],
  mvCredits: [
    { role: '뮤직비디오', names: ['전용현'] },
    { role: '주연', names: ['정지현'] },
  ],
};

export interface Single {
  id: string;
  order: number;
  orderLabel: string;
  title: string;
  titleLatin: string;
  releaseAt: string;
  releaseLabel: string;
  cover: string;
  videoId: string | null;
  videoThumb?: string;
  /** 영상 종류. 없으면 뮤직비디오. */
  videoKind?: 'mv' | 'audio';
  bpm?: number;
  summary: string;
  paragraphs: string[];
  keyLine?: string;
  lyrics?: string[][];
}

export const singles: Single[] = [
  {
    id: 'bat',
    order: 1,
    orderLabel: '1st Single',
    title: '박쥐',
    titleLatin: 'A Bat In The Sun',
    releaseAt: '2026-08-21T12:00:00+09:00',
    releaseLabel: '2026. 08. 21 (금)',
    cover: '/images/8th_album/single-bat.jpg',
    videoId: 'E9INqyPgvEs',
    videoThumb: '/images/8th_album/bat-mv-thumb.jpg',
    summary: '어둠 속의 박쥐는 빛을 갈망한다. 그러나 빛을 원한다고 해서 어둠 속에서 살아온 몸을 버릴 수는 없다.',
    paragraphs: [
      '〈박쥐〉에 등장하는 어둠 속의 ‘박쥐’는 빛을 갈망합니다. 그러나 빛을 원한다고 해서 어둠 속에서 살아온 몸을 버릴 수는 없습니다.',
      '이것은 과거의 자신을 품은 사람이 새로운 이름으로 태어나는 이야기입니다. 두려움을 지닌 사람이 자신의 선택권을 되찾는 이야기이기도 합니다.',
      '낮게 읊조리는 목소리는 어느 순간 거대한 밴드 사운드와 함께 폭발합니다. 억눌려 있던 기타와 드럼은 한꺼번에 밀려 나옵니다.',
    ],
  },
  {
    id: 'melancholia',
    order: 2,
    orderLabel: '2nd Single',
    title: '멜랑콜리아',
    titleLatin: 'Melancholia',
    releaseAt: '2026-09-29T12:00:00+09:00',
    releaseLabel: '2026. 09. 29 (화) 12:00 KST',
    cover: '/images/8th_album/single-melancholia.jpg',
    // 유튜브 공식 오디오. releaseAt에 공개되므로 그 전까지는 카운트다운을 보인다.
    videoId: 'J_d4iGPy3Pw',
    videoThumb: '/images/8th_album/single-melancholia.jpg',
    videoKind: 'audio',
    bpm: 124,
    summary: '음악을 만들며 살아가는 한 사람이 오랫동안 곁에 머물러온 두려움과 우울을 바라보며, 그 속에서도 노래를 놓지 않는 이야기.',
    keyLine: '나의 노래는 나의 부적',
    paragraphs: [
      '이 곡은 음악을 만들며 살아가는 한 사람이 오랫동안 자신의 곁에 머물러온 두려움과 우울을 바라보며, 그 속에서도 노래를 놓지 않는 이야기다. 제목 ‘멜랑콜리아(Melancholia)’는 단순한 슬픔이 아닌, 쉽게 사라지지 않는 쓸쓸함과 고독 안에서 자신과 세계를 오래 바라보는 상태를 가리킨다.',
      '곡에서 어둠은 물리쳐야 할 대상이 아니다. 화자는 두려움이 사라지기를 기다리는 대신 그것과 함께 걸어간다. 그리고 그 시간을 견디게 한 것은 거창한 희망이나 확신이 아니라 계속해서 만들고 불러온 자신의 노래다.',
      '음악은 기타를 중심으로 한 얼터너티브 인디 록으로, 서정적인 정서와 묵직하고 강렬한 밴드 사운드가 교차한다. 124 bpm의 리듬은 긴 밤길을 조금 빠른 걸음으로 걷는 듯한 긴장감을 만들고, 절제된 벌스에서 쌓인 감정은 후렴에 이르러 기타와 리듬, 보컬이 한꺼번에 확장되며 터져 나온다.',
      '반복되는 후렴은 록 음악 특유의 주문 같은 감각을 만든다. 특히 “나의 노래는 나의 부적”이라는 문장은 이 곡의 중심에 있다. 여기서 노래는 불안과 두려움을 없애주는 것이 아니라, 불안과 두려움 속에서도 한 사람이 계속 살아가도록 붙들어주는 작은 힘이다.',
      '〈멜랑콜리아〉는 우울을 극복한 사람의 이야기가 아니다. 두려움과 불안이 여전히 남아 있는 자리에서 노래를 부르고, 다시 걸어가는 사람의 이야기다. 오랜 시간 음악에 기대어 수많은 밤을 건너온 음악가의 내밀한 고백이자, 멜랑콜리아를 삶에서 지워내는 대신 하나의 노래로 바꾸어낸 곡이다.',
    ],
    lyrics: [
      ['두려웠던 건 밤이 아니라 기나긴 침묵과 적막이었어', '출구 없는 밤 어김없이 또 떠오르는 내 오랜 그림자들'],
      [
        '거울 보면 내 얼굴보다도 나의 두려움이 먼저 보여',
        '내 안엔 빛보다 빨리 다가오는 저 어둠 있어',
        '그것은 내게 속삭여 줬어 빈 의자를 내게 남겨뒀다고',
        '그만해도 돼 나에게로 와 이곳에서 넌 아프지 않아',
      ],
      [
        '나의 노래는 나의 부적 끝없이 나를 숨 쉬게 해',
        '나의 노래는 나의 부적 끝없는 어둠을 건너게 해',
        '나의 노래는 나의 부적 끝없이 나를 숨 쉬게 해',
        '나의 노래는 나의 부적 길 잃은 나를 건너게 해',
      ],
      [
        '두려웠던 건 밤이 아니라 기나긴 침묵과 절망이었어',
        '거울을 보면 내 얼굴보다도 나의 두려움이 먼저 보였어',
        '그것은 내게 속삭여 줬어 빈 의자를 내게 남겨뒀다고',
        '그것은 내게 속삭여 줬어 그만해도 돼 눈을 감아',
      ],
      [
        '나의 노래는 나의 부적 끝없이 나를 숨 쉬게 해',
        '나의 노래는 나의 부적 끝없는 어둠을 건너게 해',
        '나의 노래는 나의 부적 끝없이 나를 숨 쉬게 해',
        '나의 노래는 나의 부적 길 잃은 나를 건너게 해',
      ],
    ],
  },
];

/** 앨범 소개 */
export const story = {
  heading: '내 안에서 낯설어진 존재들을 다시 부르는 노래',
  opening: '오랫동안 살아오면서 우리는 수많은 자신을 뒤에 남겨둡니다.',
  figures: [
    '끝내 하지 못한 말을 삼킨 사람.',
    '돌아가고 싶지만 돌아가지 못한 사람.',
    '빛을 원하면서도 어둠 속에 숨은 사람.',
    '자신이 선택하지 않은 삶을 오래 살아온 사람.',
  ],
  question: '사라졌다고 생각했던 그들은 정말 사라진 것일까요.',
  thesis:
    '허클베리핀의 여덟 번째 정규앨범 〈모두가 아는 이야기〉는 앞으로 나아가는 이야기보다, 먼저 뒤에 남겨둔 자신들을 다시 만나는 데서 시작합니다.',
  body: [
    '이번 앨범의 노래에는 박쥐와 거울 속의 얼굴, 뒷자리에 앉은 불안, 오래 헤어진 사람들, 그리고 자신을 지켜온 노래가 등장합니다. 서로 다른 존재처럼 보이지만, 이들은 모두 한 사람의 일부입니다.',
    '그래서 이번 앨범에서 변화한다는 것은 과거의 자신을 잘라내고 전혀 다른 사람이 되는 일이 아닙니다. 살지 못한 삶과 외면했던 욕망, 두려워서 내어주었던 선택을 다시 자신의 것으로 받아들이는 일입니다. 서로 모순되는 존재들이 한 사람 안에서 함께 살아갈 자리를 만드는 일입니다.',
    '거울 앞에 선 사람은 자신을 구해줄 누군가를 기다리다가, 마지막에 남은 사람이 자기 자신임을 발견합니다. 오래된 세계가 무너진 뒤 태어난 새로운 얼굴에도 이전의 이름과 상처와 사랑은 사라지지 않고 남아 있습니다.',
    '허클베리핀은 1997년부터 수많은 밤과 어둠을 노래해왔습니다. 하지만 이번 앨범에서 어둠은 벗어나야 할 장소로만 존재하지 않습니다. 그곳에는 우리가 숨겨두었던 얼굴과 아직 사용하지 못한 힘, 살아보지 못한 삶이 함께 있습니다.',
  ],
  closingHeading: '이것은 상처를 모두 극복한 사람들의 음악이 아닙니다.',
  closing:
    '자기 안의 어둠과 모순을 더는 없었던 일로 만들지 않으려는 사람들의 음악입니다. 과거의 자신을 버리는 대신 데리고 가는 사람들, 두려움을 침묵시키는 대신 그 목소리보다 조금 더 크게 자신의 노래를 부르는 사람들의 음악입니다.',
  images: [
    { src: '/images/8th_album/story-silhouette.jpg', alt: '창가에 앉아 노트북 앞에 있는 실루엣', width: 1240, height: 992 },
    { src: '/images/8th_album/story-hand.jpg', alt: '무대 위 마이크 앞에서 펼친 손', width: 1000, height: 1000 },
  ],
};

export interface ConcertShow {
  id: 'seoul' | 'busan';
  city: string;
  cityLatin: string;
  date: string;
  dateLabel: string;
  time: string;
  venue: string;
  address: string;
  seating: string;
  price: number;
}

export const concert = {
  edition: 22,
  name: '22nd Yellow Concert',
  poster: { src: '/images/yellowconcert/poster-2026.jpg', width: 1500, height: 2000 },
  description:
    '2004년 시작해 매년 이어온 허클베리핀의 단독 공연 브랜드 ‘옐로우 콘서트’가 올해 22번째 무대를 맞습니다. 정규 8집 발매 후 첫 단독 공연으로, 새 앨범의 수록곡과 오랜 시간 축적해 온 밴드의 음악을 라이브로 만나는 자리입니다.',
  filmingNotice:
    '본 공연은 영상 촬영이 진행되며, 촬영 동의 여부를 공연 당일 티켓 수령처에서 받습니다. 비동의 시 지급해드리는 마스크를 착용하고 관람해주시기 바라며, 이로 인한 환불은 불가합니다.',
  shows: [
    {
      id: 'seoul',
      city: '서울',
      cityLatin: 'Seoul',
      date: '2026-10-31T19:00:00+09:00',
      dateLabel: '2026. 10. 31 (토)',
      time: '오후 7시',
      venue: 'KT&G 상상마당 홍대 라이브홀',
      address: '서울 마포구 어울마당로 65 상상마당 빌딩 지하 2층',
      seating: '스탠딩 + 일부 좌석제 (선착순 입장 후 선택)',
      price: 70000,
    },
    {
      id: 'busan',
      city: '부산',
      cityLatin: 'Busan',
      date: '2026-12-05T19:00:00+09:00',
      dateLabel: '2026. 12. 05 (토)',
      time: '오후 7시',
      venue: '오방가르드',
      address: '부산 남구 용소로7번길 15-1 지하',
      seating: '전석 비지정 좌석제 (선착순 입장 후 좌석 선택)',
      price: 50000,
    },
  ] as ConcertShow[],
};

export const band = {
  name: 'Huckleberryfinn',
  nameKr: '허클베리핀',
  since: 1997,
  photo: { src: '/images/profile/band-6.webp', width: 2000, height: 1333 },
  bio: [
    '1997년 결성된 허클베리핀은 대한민국 1세대 인디 록 밴드다. 1998년 발표한 1집 〈18일의 수요일〉과 2004년 3집 〈올랭피오의 별〉이 ‘한국 대중음악 100대 명반’에 선정되는 등 평단의 극찬을 받으며 독보적인 음악 세계를 구축해왔다.',
    '거친 그런지 록부터 서정적이고 몽환적인 사운드까지 끊임없이 진화하며, 한국대중음악상 최우수 모던록 음반상을 수상하는 등 결성 30년에 가까운 지금까지도 한국 인디 씬에 가장 큰 영향력을 미치는 밴드 중 하나로 평가받는다.',
  ],
  members: [
    { name: '이기용', role: '기타 · 보컬 · 베이스 · 신스', image: '/images/profile/lee-kiyong.webp' },
    { name: '이소영', role: '보컬 · 신스', image: '/images/profile/lee-soyoung.webp' },
    { name: '성장규', role: '기타 · 신스 · 드럼 · 프로그래밍', image: '/images/profile/sung-janggyu.webp' },
  ],
};

export interface PressAsset {
  title: string;
  spec: string;
  href: string;
  preview?: string;
}

export const pressAssets: PressAsset[] = [
  { title: '정규 8집 앨범 커버', spec: 'JPG · 1417×1417', href: '/images/8th_album/album-cover.jpg', preview: '/images/8th_album/album-cover.jpg' },
  { title: '〈멜랑콜리아〉 싱글 커버', spec: 'JPG · 3000×3000', href: '/images/8th_album/single-melancholia.jpg', preview: '/images/8th_album/single-melancholia.jpg' },
  { title: '〈박쥐〉 싱글 커버', spec: 'JPG · 3000×3000', href: '/images/8th_album/single-bat.jpg', preview: '/images/8th_album/single-bat.jpg' },
  { title: '22nd Yellow Concert 포스터', spec: 'JPG · 1500×2000', href: '/images/yellowconcert/poster-2026.jpg', preview: '/images/yellowconcert/poster-2026.jpg' },
  { title: '밴드 프로필 사진', spec: 'JPG · 2000×1333', href: '/images/profile/band-6.jpg', preview: '/images/profile/band-6.webp' },
  { title: '밴드 프로필 사진 2', spec: 'JPG · 1999×1999', href: '/images/profile/band-4.jpg', preview: '/images/profile/band-4.webp' },
  { title: '멤버 프로필 — 이기용', spec: 'JPG · 638×850', href: '/images/profile/lee-kiyong.jpg', preview: '/images/profile/lee-kiyong.webp' },
  { title: '멤버 프로필 — 이소영', spec: 'JPG · 638×850', href: '/images/profile/lee-soyoung.jpg', preview: '/images/profile/lee-soyoung.webp' },
  { title: '멤버 프로필 — 성장규', spec: 'JPG · 638×850', href: '/images/profile/sung-janggyu.jpg', preview: '/images/profile/sung-janggyu.webp' },
  { title: '공식 로고 (White)', spec: 'PNG · 1104×264', href: '/images/logo/white_logo.png', preview: '/images/logo/white_logo.png' },
];
