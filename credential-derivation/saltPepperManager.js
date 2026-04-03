export function generateSalt() {
  return crypto.randomUUID();
}

// Pepper should be injected from env in real systems
export function applyPepper(password) {
  return `${password}::PEPPER`;
}