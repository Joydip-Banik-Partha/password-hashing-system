export function advise(trust) {
  return trust < 0.5 ? "RECOMMEND_STEP_UP" : "NO_ACTION";
}