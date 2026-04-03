import { deriveHash } from "../credential-derivation/hashEngine.js";

export async function silentRehash(password, record, targetAlgo, targetCost) {
  const newHash = await deriveHash(password, targetAlgo, targetCost);
  record.legacy_hash = record.primary_hash;
  record.primary_hash = newHash;
  record.algorithm = targetAlgo;
  record.cost = targetCost;
  record.createdAt = Date.now();
  return record;
}