export function isolationHints(trust) {
  return trust < 0.3 ? ["isolate-session"] : [];
}