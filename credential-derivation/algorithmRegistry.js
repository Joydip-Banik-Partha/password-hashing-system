export const algorithms = {
  bcrypt: {
    id: "bcrypt",
    defaultCost: 12,
    maxCost: 16
  }
};

export function getAlgorithm(id) {
  return algorithms[id];
}