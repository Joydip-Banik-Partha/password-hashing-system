// credential-usage/anomalyDetector.js

export function detectVelocityAnomaly(profile) {
  const events = profile.verificationTimestamps;

  if (events.length < 3) return 0;

  const now = Date.now();
  const recent = events.filter(ts => now - ts < 60_000); // last 60s

  if (recent.length >= 5) {
    return 0.4; // suspicious rapid reuse
  }

  if (recent.length >= 3) {
    return 0.2; // mild anomaly
  }

  return 0;
}