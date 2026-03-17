export interface Reward {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  includes: string[];
  soldOut?: boolean;
}

export const fundingInfo = {
  tumblbugUrl: 'https://tumblbug.com/hbf2threlp',
  fundingEndDate: '2026-03-31',
  lp: {
    title: '나를 닮은 사내 (2025 Re-Recording) LP',
    limited: 500,
    originalPrice: 45000,
    discountPrice: 40500,
    deliveryStart: '2026-04-09',
    sideA: ['사막', 'Somebody to love', 'A', '길들여진 개', '훌라', 'Shaker'],
    sideB: ['Em', 'OZ', '길을 걷다', '고양이', 'Silver'],
  },
  concert: {
    name: '봄의 피로',
    date: '2026년 4월 18일 토요일, 19시',
    venue: '홍대 우무지',
    address: '서울 마포구 독막로8길 7 지하1층',
    originalPrice: 70000,
    discountPrice: 56000,
  },
  rewards: [
    {
      id: 1,
      name: '선물없이 후원하기',
      price: 1000,
      includes: ['텀블벅 후원자 크레딧'],
    },
    {
      id: 2,
      name: 'LP 10% 할인',
      price: 40500,
      originalPrice: 45000,
      discount: '10%',
      includes: ['나를 닮은 사내 (2025 Re-Recording) LP 1장'],
    },
    {
      id: 3,
      name: '콘서트 티켓 20% 할인',
      price: 56000,
      originalPrice: 70000,
      discount: '20%',
      includes: ['봄의 피로 콘서트 티켓 1매 (2026.4.18)'],
    },
    {
      id: 4,
      name: 'LP + 콘서트 세트',
      price: 92000,
      includes: ['나를 닮은 사내 (2025 Re-Recording) LP 1장', '봄의 피로 콘서트 티켓 1매'],
    },
    {
      id: 5,
      name: 'Test LP Package',
      price: 500000,
      includes: ['Test LP 1장 (마스터링 테스트용)', 'LP 1장', '콘서트 티켓 1매'],
      soldOut: true,
    },
    {
      id: 6,
      name: 'Special Thanks',
      price: 700000,
      includes: ['LP 1장', '콘서트 티켓 1매', '스페셜 땡스 크레딧'],
      soldOut: true,
    },
  ] as Reward[],
};
