'use client';

import { useSyncExternalStore } from 'react';
import { BUILD_TIME } from './timeline';

/**
 * Shared clock for date-dependent copy: one interval for the whole page.
 * Server render and hydration use the build time (identical on both sides, so markup always
 * matches); the live clock takes over right after hydration.
 */
const TICK_MS = 30_000;
let now = BUILD_TIME;
let timer: ReturnType<typeof setInterval> | null = null;
const listeners = new Set<() => void>();

function tick() {
  now = Date.now();
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (!timer) {
    // Switch to the real clock on the first client subscription (after hydration).
    queueMicrotask(tick);
    timer = setInterval(tick, TICK_MS);
  }
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0 && timer) {
      clearInterval(timer);
      timer = null;
    }
  };
}

export function useNow(): number {
  return useSyncExternalStore(subscribe, () => now, () => BUILD_TIME);
}
