export function hints(trust) {
  return trust < 0.3 ? ["monitor"] : [];
}