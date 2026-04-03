export function computeExposureRisk({ algorithmAgeScore, hardwarePressure }) {
  return Math.min(1, algorithmAgeScore * 0.6 + hardwarePressure * 0.4);
}