export function scopeTrust(trust, scope) {
  if (scope === "admin") return trust * 0.7;
  if (scope === "sensitive") return trust * 0.85;
  return trust;
}