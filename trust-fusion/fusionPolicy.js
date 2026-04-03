// trust-fusion/fusionPolicy.js

export function fuseTrust({ sessionTrust, credentialTrust }) {
  return applyBoundaries(
    applyCredentialWeight(sessionTrust, credentialTrust)
  );
}

function applyBoundaries(value) {
  if (value > 0.95) return 0.95;
  if (value < 0.2) return 0.2;
  return value;
}