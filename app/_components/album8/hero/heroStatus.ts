/**
 * Date-aware hero copy. Everything is computed in KST-absolute timestamps so the
 * status is correct regardless of the visitor's timezone.
 */

const DAY = 86_400_000;

export const DATES = {
  melancholia: Date.parse('2026-09-29T12:00:00+09:00'),
  fundingEnd: Date.parse('2026-10-11T23:59:59+09:00'),
  release: Date.parse('2026-10-23T12:00:00+09:00'),
} as const;

export interface HeroStatus {
  /** short visible line, e.g. "〈멜랑콜리아〉 D-4 · 09.29 12:00 KST" */
  line: string;
  /** one calm sentence for screen readers (no live region) */
  sr: string;
  fundingOpen: boolean;
  released: boolean;
}

function dday(target: number, now: number) {
  const diff = target - now;
  if (diff <= 0) return 'D-DAY';
  const days = Math.floor(diff / DAY);
  if (days === 0) {
    const hours = Math.max(1, Math.ceil(diff / 3_600_000));
    return `${hours}시간 전`;
  }
  return `D-${days}`;
}

export function getHeroStatus(now: number): HeroStatus {
  const fundingOpen = now <= DATES.fundingEnd;

  if (now < DATES.melancholia) {
    return {
      line: `〈멜랑콜리아〉 ${dday(DATES.melancholia, now)} · 09.29 12:00 KST`,
      sr: `두 번째 싱글 〈멜랑콜리아〉는 9월 29일 낮 12시에 공개됩니다.`,
      fundingOpen,
      released: false,
    };
  }

  if (now < DATES.release) {
    return {
      line: `〈멜랑콜리아〉 Out now · 정규 8집 ${dday(DATES.release, now)}`,
      sr: `두 번째 싱글 〈멜랑콜리아〉가 공개되었습니다. 정규 8집은 10월 23일 낮 12시에 발매됩니다.`,
      fundingOpen,
      released: false,
    };
  }

  return {
    line: '정규 8집 〈모두가 아는 이야기〉 Out now',
    sr: '정규 8집 〈모두가 아는 이야기〉가 발매되었습니다.',
    fundingOpen,
    released: true,
  };
}
