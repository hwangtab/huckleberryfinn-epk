export interface Member {
  name: string;
  role: string;
  image: string;
}

export const members: Member[] = [
  {
    name: '이기용',
    role: '보컬, 기타',
    image: '/images/profile/이기용.jpg'
  },
  {
    name: '성장규',
    role: '기타, 신스',
    image: '/images/profile/성장규.jpg'
  },
  {
    name: '이소영',
    role: '보컬, 신스',
    image: '/images/profile/이소영.jpg'
  }
];
