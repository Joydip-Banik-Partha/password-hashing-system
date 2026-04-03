// credential-usage/usageTracker.js

export function createUsageProfile() {
  return {
    verificationTimestamps: []
  };
}

export function recordUsage(profile) {
  profile.verificationTimestamps.push(Date.now());

  // Keep last 20 events only (rolling window)
  if (profile.verificationTimestamps.length > 20) {
    profile.verificationTimestamps.shift();
  }

  return profile;
}