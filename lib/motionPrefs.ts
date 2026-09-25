'use client';

import { useSyncExternalStore } from 'react';

/**
 * One store for every motion-related preference:
 * - reduced: OS "reduce motion" (live — follows changes while the page is open)
 * - paused:  the site-wide pause switch (WCAG 2.2.2), mirrored to html[data-motion="paused"] for CSS
 * - fine:    a precise hovering pointer (mouse / trackpad) — gates cursor-driven effects
 *
 * Derived flags used by components:
 * - ambient: looping / auto-playing motion may run          (!reduced && !paused)
 * - scrollFx: decorative scroll-linked motion may run       (!reduced)
 * - pointerFx: cursor-driven effects may run                (fine && !reduced && !paused)
 */

export interface MotionPrefs {
  reduced: boolean;
  paused: boolean;
  fine: boolean;
  ambient: boolean;
  scrollFx: boolean;
  pointerFx: boolean;
}

const SERVER: MotionPrefs = { reduced: false, paused: false, fine: false, ambient: false, scrollFx: true, pointerFx: false };

let snapshot: MotionPrefs = SERVER;
let initialised = false;
const listeners = new Set<() => void>();

function compute(): MotionPrefs {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = window.matchMedia('(pointer: fine) and (hover: hover)').matches;
  const paused = document.documentElement.dataset.motion === 'paused';
  return { reduced, paused, fine, ambient: !reduced && !paused, scrollFx: !reduced, pointerFx: fine && !reduced && !paused };
}

function emit() {
  const next = compute();
  const changed = (Object.keys(next) as (keyof MotionPrefs)[]).some((k) => next[k] !== snapshot[k]);
  if (changed) {
    snapshot = next;
    listeners.forEach((l) => l());
  }
}

function init() {
  if (initialised || typeof window === 'undefined') return;
  initialised = true;
  snapshot = compute();
  for (const q of ['(prefers-reduced-motion: reduce)', '(pointer: fine) and (hover: hover)']) {
    window.matchMedia(q).addEventListener('change', emit);
  }
}

function subscribe(listener: () => void) {
  init();
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  init();
  return snapshot;
}

export function useMotionPrefs(): MotionPrefs {
  return useSyncExternalStore(subscribe, getSnapshot, () => SERVER);
}

export function setMotionPaused(paused: boolean) {
  const root = document.documentElement;
  if (paused) root.dataset.motion = 'paused';
  else delete root.dataset.motion;
  emit();
}
