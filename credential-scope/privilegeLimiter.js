export function limitPrivileges(trust) {
  if (trust < 0.4) return ["read-only"];
  return ["normal"];
}