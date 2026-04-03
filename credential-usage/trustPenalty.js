// credential-usage/trustPenalty.js

export function applyUsagePenalty(currentTrust, anomalyScore) {
  const penalty = anomalyScore * 0.5;
  return Math.max(0, currentTrust - penalty);
}