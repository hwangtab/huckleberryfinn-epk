export interface Member {
  name: string;
  role: string;
  image: string;
}

export const members: Member[] = [
  {
    name: '이기용',
    role: '기타, 보컬, 베이스, 신스',
    image: '/images/profile/이기용.jpg'
  },
  {
    name: '성장규',
    role: '기타, 신스, 드럼, 프로그래밍',
    image: '/images/profile/성장규.jpg'
  },
  {
    name: '이소영',
    role: '보컬, 신스',
    image: '/images/profile/이소영.jpg'
  }
];
