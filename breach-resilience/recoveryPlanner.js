export function recoveryPlan(trust) {
  if (trust < 0.3) return "REHASH_AND_STEP_UP";
  if (trust < 0.5) return "RECOMMEND_STEP_UP";
  return "NO_ACTION";
}