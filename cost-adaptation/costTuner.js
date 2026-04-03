import { TARGET_HASH_MS } from "./targetBudget.js";

export function tuneCost(currentCost, measuredMs) {
  if (measuredMs < TARGET_HASH_MS * 0.7) return currentCost + 1;
  if (measuredMs > TARGET_HASH_MS * 1.3) return Math.max(10, currentCost - 1);
  return currentCost;
}