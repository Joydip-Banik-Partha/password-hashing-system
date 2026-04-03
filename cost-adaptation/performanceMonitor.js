export function measure(fn) {
  const s = performance.now();
  return fn().then(r => ({ r, ms: performance.now() - s }));
}