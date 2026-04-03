export function simulateExposure({ hashLeaked, algorithmWeak }) {
  if (hashLeaked && algorithmWeak) return 0.6;
  if (hashLeaked) return 0.4;
  return 0;
}