// trust-fusion/trustWeighting.js

export function applyCredentialWeight(sessionTrust, credentialTrust) {
  const weight = 0.3; // credential influence (bounded)
  return Math.max(
    0,
    Math.min(1, sessionTrust * (1 - weight) + credentialTrust * weight)
  )
}