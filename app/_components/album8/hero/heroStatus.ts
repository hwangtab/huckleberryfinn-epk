/**
 * Date-aware hero copy (see lib/timeline.ts for the dates).
 */
import { DATES, dday, isFundingOpen, isReleased } from '@/lib/timeline';

export interface HeroStatus {
  /** short visible line, e.g. "〈멜랑콜리아〉 D-4 · 09.29 12:00 KST" */
  line: string;
  /** one calm sentence for screen readers (no live region) */
  sr: string;
  fundingOpen: boolean;
  released: boolean;
}

export function getHeroStatus(now: number): HeroStatus {
  const fundingOpen = isFundingOpen(now);

  if (now < DATES.melancholia) {
    const d = dday(DATES.melancholia, now);
    return {
      line: d === 'D-DAY' ? '〈멜랑콜리아〉 오늘 12:00 KST 공개' : `〈멜랑콜리아〉 ${d} · 09.29 12:00 KST`,
      sr: '두 번째 싱글 〈멜랑콜리아〉는 9월 29일 낮 12시에 공개됩니다.',
      fundingOpen,
      released: false,
    };
  }

  if (!isReleased(now)) {
    const d = dday(DATES.release, now);
    return {
      line: d === 'D-DAY' ? '정규 8집 오늘 12:00 KST 발매' : `〈멜랑콜리아〉 Out now · 정규 8집 ${d}`,
      sr: '두 번째 싱글 〈멜랑콜리아〉가 공개되었습니다. 정규 8집은 10월 23일 낮 12시에 발매됩니다.',
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
