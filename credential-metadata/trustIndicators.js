export function computeTrustScore(record) {
  const agePenalty = Math.min(0.4, (Date.now() - record.createdAt) / 3.15e10);
  return Math.max(0, 1 - agePenalty - record.exposureRisk);
}