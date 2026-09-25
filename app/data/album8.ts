/**
 * 허클베리핀 정규 8집 〈모두가 아는 이야기〉 EPK 데이터
 * 출처: docs/8집/ (텀블벅 스토리, 멜랑콜리아 곡 설명, 가사)
 */

export const TUMBLBUG_URL = 'https://tumblbug.com/hbf8th';

export const album = {
  number: 8,
  title: '모두가 아는 이야기',
  titleLatin: 'Huckleberryfinn — 8th Studio Album',
  releaseAt: '2026-10-23T12:00:00+09:00',
  releaseLabel: '2026. 10. 23 (금) 12:00 KST',
  releaseShort: '10.23 (금) 낮 12시',
  trackCount: 9,
  format: 'Jewel Case CD · 8p 북클릿 (예정)',
  label: '샤 레이블 (Sha Label)',
  cover: '/images/8th_album/album-cover.jpg',
  cdMockup: '/images/8th_album/cd-mockup.jpg',
  ogImage: '/images/8th_album/og-album.jpg',
  tagline: '내 안에서 낯설어진 존재들을 다시 부르는 노래',
  notes: [
    '8집에는 총 9곡이 수록될 예정이며, 각 곡의 제목과 수록 순서는 확정되는 대로 안내됩니다.',
    '정규 앨범 발매 전 디지털 싱글 2곡을 선공개합니다. 8월 21일 〈박쥐〉, 9월 29일 〈멜랑콜리아〉.',
    '실물 CD 패키지의 세부 디자인은 제작 과정에서 달라질 수 있습니다.',
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
    videoId: null,
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

/** 앨범 소개 (텀블벅 스토리) */
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
  originalPrice: number;
  discountPrice: number;
  discount: string;
}

export const concert = {
  edition: 22,
  name: '2026 Yellow Concert',
  poster: '/images/yellowconcert/poster-2026.jpg',
  description:
    '정규 8집 발매 후 첫 단독 공연. 8집에 수록된 신곡들을 라이브로 처음 선보이는 무대인 동시에, 지난 1년 동안 성장하고 변화하며 쌓아올린 허클베리핀만의 에너지와 감성을 보여드리는 공연입니다.',
  filmingNotice:
    '본 공연은 영상 촬영이 진행되며, 촬영 동의 여부를 공연 당일 티켓 수령처에서 받습니다. 비동의 시 지급해드리는 마스크를 착용하고 관람해주시기 바라며, 이로 인한 환불은 불가합니다.',
  ticketNotice:
    '티켓은 배송되지 않으며 공연 당일 현장에서 수령합니다. 텀블벅 후원 번호로 본인 확인을 진행하니 미리 확인해 주세요.',
  shows: [
    {
      id: 'seoul',
      city: '서울',
      cityLatin: 'Seoul',
      date: '2026-10-31T19:00:00+09:00',
      dateLabel: '2026. 10. 31 (토)',
      time: '오후 7시',
      venue: 'KT&G 홍대 상상마당',
      address: '서울 마포구 어울마당로 65 상상마당 빌딩 지하 2층',
      seating: '스탠딩 + 일부 좌석제 (선착순 입장 후 선택)',
      originalPrice: 70000,
      discountPrice: 56000,
      discount: '20%',
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
      originalPrice: 50000,
      discountPrice: 40000,
      discount: '20%',
    },
  ] as ConcertShow[],
};

export interface Reward {
  id: number;
  name: string;
  price: number;
  discount?: string;
  recommended?: boolean;
  includes: string[];
}

export const funding = {
  url: TUMBLBUG_URL,
  startDate: '2026-09-17',
  endDate: '2026-10-11',
  paymentDate: '2026-10-12',
  deliveryStart: '2026-10-23',
  goal: 3000000,
  creditNote:
    '8집 앨범이 포함된 선물을 후원하신 모든 분의 성함 혹은 닉네임을 앨범 크레딧에 기명합니다.',
  rewards: [
    { id: 1, name: '선물 없이 후원하기', price: 1000, includes: ['선물 없음'] },
    {
      id: 2,
      name: '허클 정규 8집',
      price: 20000,
      includes: ['정규 8집 〈모두가 아는 이야기〉 CD', '8집 앨범 크레딧 기명', '배송비 무료'],
    },
    {
      id: 3,
      name: 'Yellow Concert 서울 티켓',
      price: 56000,
      discount: '20%',
      includes: ['2026 Yellow Concert 〈서울〉 티켓 1매'],
    },
    {
      id: 4,
      name: 'Yellow Concert 부산 티켓',
      price: 40000,
      discount: '20%',
      includes: ['2026 Yellow Concert 〈부산〉 티켓 1매'],
    },
    {
      id: 5,
      name: '8집 CD + 서울 콘서트',
      price: 67500,
      discount: '25%',
      recommended: true,
      includes: ['정규 8집 CD', '2026 Yellow Concert 〈서울〉 티켓 1매', '8집 앨범 크레딧 기명'],
    },
    {
      id: 6,
      name: '8집 CD + 부산 콘서트',
      price: 52500,
      discount: '25%',
      includes: ['정규 8집 CD', '2026 Yellow Concert 〈부산〉 티켓 1매', '8집 앨범 크레딧 기명'],
    },
    {
      id: 7,
      name: '8집 CD + 서울 & 부산',
      price: 98000,
      discount: '30%',
      includes: ['정규 8집 CD', '서울 티켓 1매 + 부산 티켓 1매', '8집 앨범 크레딧 기명'],
    },
    {
      id: 8,
      name: 'All In One Package',
      price: 300000,
      includes: [
        '정규 8집 CD',
        '서울 티켓 2매 + 부산 티켓 2매',
        '8집 발매 기념 한정판 티셔츠 · 맨투맨 각 1벌',
        '1~8집 앨범 자켓 마그네틱 세트',
        '무릎 담요 · 박쥐 쿠션 · 키캡 키링 각 1개',
        '8집 크레딧 Special Thanks To 기명',
      ],
    },
    {
      id: 9,
      name: 'Complete Works CD Package',
      price: 500000,
      includes: [
        '허클베리핀 정규 앨범 CD 패키지 (총 11장)',
        '서울 티켓 2매 + 부산 티켓 2매',
        '한정판 티셔츠 · 맨투맨 각 2벌',
        '마그네틱 세트 · 무릎 담요 · 박쥐 쿠션 · 키캡 키링 각 1개',
        '8집 커버 고급 인화 액자 (50×50cm) 1개',
        '8집 크레딧 Special Thanks To 기명',
      ],
    },
    {
      id: 10,
      name: 'Special Thanks Package',
      price: 1000000,
      includes: [
        '허클베리핀 멤버들과의 식사권',
        '허클베리핀 정규 앨범 CD 패키지 (총 11장)',
        '서울 티켓 2매 + 부산 티켓 2매',
        '한정판 티셔츠 · 맨투맨 각 2벌',
        '마그네틱 세트 · 무릎 담요 각 1개',
        '박쥐 쿠션 · 키캡 키링 각 2개',
        '8집 커버 고급 인화 액자 (50×50cm) 2개',
        '8집 크레딧 Special Thanks To 기명',
      ],
    },
  ] as Reward[],
};

export const band = {
  name: 'Huckleberryfinn',
  nameKr: '허클베리핀',
  since: 1997,
  photo: { src: '/images/profile/band-3.webp', width: 1920, height: 1280 },
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
  { title: '정규 8집 앨범 커버', spec: 'JPG · 1254×1254', href: '/images/8th_album/album-cover.jpg', preview: '/images/8th_album/album-cover.jpg' },
  { title: '〈멜랑콜리아〉 싱글 커버', spec: 'JPG · 3000×3000', href: '/images/8th_album/single-melancholia.jpg', preview: '/images/8th_album/single-melancholia.jpg' },
  { title: '〈박쥐〉 싱글 커버', spec: 'JPG · 1000×1000', href: '/images/8th_album/single-bat.jpg', preview: '/images/8th_album/single-bat.jpg' },
  { title: '2026 Yellow Concert 포스터', spec: 'JPG · 1061×1500', href: '/images/yellowconcert/poster-2026.jpg', preview: '/images/yellowconcert/poster-2026.jpg' },
  { title: '밴드 프로필 사진', spec: 'JPG · 6000×4000', href: '/images/profile/band-3.jpg', preview: '/images/profile/band-3.webp' },
  { title: '멤버 프로필 — 이기용', spec: 'JPG · 638×850', href: '/images/profile/lee-kiyong.jpg', preview: '/images/profile/lee-kiyong.webp' },
  { title: '멤버 프로필 — 이소영', spec: 'JPG · 638×850', href: '/images/profile/lee-soyoung.jpg', preview: '/images/profile/lee-soyoung.webp' },
  { title: '멤버 프로필 — 성장규', spec: 'JPG · 638×850', href: '/images/profile/sung-janggyu.jpg', preview: '/images/profile/sung-janggyu.webp' },
  { title: '공식 로고 (White)', spec: 'PNG · 1104×264', href: '/images/logo/white_logo.png', preview: '/images/logo/white_logo.png' },
];
