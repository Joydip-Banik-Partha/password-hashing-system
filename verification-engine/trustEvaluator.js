import { computeTrustScore } from "../credential-metadata/trustIndicators.js";

export function evaluateTrust(record) {
  return computeTrustScore(record);
}