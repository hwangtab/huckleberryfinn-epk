/**
 * Teaser soundtrack. Put the licensed master excerpt at `public/audio/teaser.mp3`.
 * Without the file the teaser simply plays silent and the sound button stays hidden.
 *
 * - bpm:    the tempo the whole score (score.ts, authored in beats) is stretched to.
 *           124 = 〈멜랑콜리아〉. Change it if another song is used.
 * - offset: seconds into the audio file where beat 0 (the bulb starts drawing) falls.
 *           The chorus hit ("나의 노래는") lands on beat 44 → offset + 44 × 60 / bpm seconds.
 */
export const SOUNDTRACK = {
  src: '/audio/teaser.mp3',
  bpm: 124,
  offset: 0,
} as const;
