/**
 * Reference-counted page scroll lock.
 * html/body use `overflow-x: clip`, so body overflow no longer propagates to the viewport:
 * the lock must be applied to <html> itself.
 */
let count = 0;
let previous = '';

export function lockScroll(): () => void {
  if (typeof document === 'undefined') return () => {};
  const root = document.documentElement;
  if (count === 0) {
    previous = root.style.overflow;
    root.style.overflow = 'hidden';
  }
  count += 1;
  let released = false;
  return () => {
    if (released) return;
    released = true;
    count = Math.max(0, count - 1);
    if (count === 0) root.style.overflow = previous;
  };
}
