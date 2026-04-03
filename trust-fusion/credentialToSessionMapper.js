// trust-fusion/credentialToSessionMapper.js

export function mapCredentialTrustToSessionBaseline(credentialTrust) {
  if (credentialTrust >= 0.8) return 0.9;
  if (credentialTrust >= 0.6) return 0.75;
  if (credentialTrust >= 0.4) return 0.6;
  return 0.45;
}