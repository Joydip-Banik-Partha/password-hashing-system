export function calculateRiskMetrics(record) {
  return {
    trust: record.trustScore,
    exposureRisk: record.exposureRisk,
    algorithm: record.algorithm,
    cost: record.cost
  }
}