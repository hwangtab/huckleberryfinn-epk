/**
 * Single source of truth for every date-dependent piece of copy.
 * All timestamps are absolute (KST offsets written out), so results do not depend on the visitor's timezone.
 */

export const DAY = 86_400_000;
const KST_OFFSET = 9 * 3_600_000;

export const DATES = {
  melancholia: Date.parse('2026-09-29T12:00:00+09:00'),
  fundingEnd: Date.parse('2026-10-11T23:59:59+09:00'),
  release: Date.parse('2026-10-23T12:00:00+09:00'),
} as const;

/** Value baked in at build time (next.config.js) — identical on server and client for hydration. */
export const BUILD_TIME = Number(process.env.NEXT_PUBLIC_BUILD_TIME) || DATES.melancholia - DAY * 4;

export const isFundingOpen = (now: number) => now <= DATES.fundingEnd;
export const isMelancholiaOut = (now: number) => now >= DATES.melancholia;
export const isReleased = (now: number) => now >= DATES.release;

/** Calendar day number in Korea. */
const kstDay = (t: number) => Math.floor((t + KST_OFFSET) / DAY);

/** Korean D-day convention: counts calendar days in KST. Returns null once the moment has passed. */
export function dday(target: number, now: number): string | null {
  if (now >= target) return null;
  const d = kstDay(target) - kstDay(now);
  return d <= 0 ? 'D-DAY' : `D-${d}`;
}
