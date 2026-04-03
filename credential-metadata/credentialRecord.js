export function createCredentialRecord({
  hash,
  algorithm,
  cost,
  createdAt = Date.now()
}) {
  return {
    primary_hash: hash,
    legacy_hash: null,
    algorithm,
    cost,
    createdAt,
    lastVerifiedAt: null,
    exposureRisk: 0.0
  };
}