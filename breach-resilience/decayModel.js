export function applyBreachDecay(trust, severity) {
  return Math.max(0, trust - severity);
}