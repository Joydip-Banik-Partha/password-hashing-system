import bcrypt from "bcryptjs";
import { getAlgorithm } from "./algorithmRegistry.js";
import { applyPepper } from "./saltPepperManager.js";

export async function deriveHash(password, algoId, cost) {
  const algo = getAlgorithm(algoId);
  const peppered = applyPepper(password);
  const hash = await bcrypt.hash(peppered, cost ?? algo.defaultCost);
  return hash;
}

export async function verifyHash(password, hash) {
  const peppered = applyPepper(password);
  return bcrypt.compare(peppered, hash);
}