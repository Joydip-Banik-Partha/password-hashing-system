import { verifyHash } from "../credential-derivation/hashEngine.js";

export async function verifyCredential(password, record) {
  if (await verifyHash(password, record.primary_hash)) return "PRIMARY";
  if (record.legacy_hash && await verifyHash(password, record.legacy_hash))
    return "LEGACY";
  return "FAIL";
}