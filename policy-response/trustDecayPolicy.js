export function shouldRecommendStepUp(trust) {
  return trust < 0.5;
}