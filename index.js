import crypto from "crypto";

import { deriveHash, verifyHash } from "./credential-derivation/hashEngine.js";
import { createCredentialRecord } from "./credential-metadata/credentialRecord.js";
import { computeExposureRisk } from "./credential-metadata/exposureScoring.js";
import { evaluateTrust } from "./verification-engine/trustEvaluator.js";
import { verifyCredential } from "./verification-engine/verifier.js";

import { measure } from "./cost-adaptation/performanceMonitor.js";
import { tuneCost } from "./cost-adaptation/costTuner.js";
import { selectTarget } from "./migration-engine/algorithmRotation.js";
import { needsUpgrade } from "./migration-engine/multiHashHandler.js";
import { silentRehash } from "./migration-engine/silentRehash.js";

import { advise } from "./policy-response/stepUpAdvisor.js";

import {
  createUsageProfile,
  recordUsage
} from "./credential-usage/usageTracker.js";
import { detectVelocityAnomaly } from "./credential-usage/anomalyDetector.js";
import { applyUsagePenalty } from "./credential-usage/trustPenalty.js";

// -----------------------------
// SIMULATED USER REGISTRATION
// -----------------------------
async function registerUser(password) {
  const initialCost = 10; // intentionally weak (legacy system)

  const hash = await deriveHash(password, "bcrypt", initialCost);

  const record = createCredentialRecord({
    hash,
    algorithm: "bcrypt",
    cost: initialCost
  });

  // ✅ initialize usage profile correctly
  record.usageProfile = createUsageProfile();

  console.log("\n[REGISTER]");
  console.log("Stored hash with cost:", record.cost);

  return record;
}

// -----------------------------
// SIMULATED LOGIN FLOW
// -----------------------------
async function login(password, record) {
  console.log("\n[LOGIN ATTEMPT]");

  const result = await verifyCredential(password, record);

  if (result === "FAIL") {
    console.log("Authentication failed.");
    return record;
  }

  record.lastVerifiedAt = Date.now();

  // -----------------------------
  // Exposure risk (global pressure)
  // -----------------------------
  record.exposureRisk = computeExposureRisk({
    algorithmAgeScore: 0.6,
    hardwarePressure: 0.5
  });

  // -----------------------------
  // Base credential trust
  // -----------------------------
  let trust = evaluateTrust(record);

  // -----------------------------
  // ADVANCED LAYER 1 — Usage Monitoring
  // -----------------------------
  record.usageProfile = recordUsage(record.usageProfile);
  const anomalyScore = detectVelocityAnomaly(record.usageProfile);
  trust = applyUsagePenalty(trust, anomalyScore);

  console.log("Credential trust score:", trust.toFixed(2));

  // -----------------------------
  // Cost auto‑tuning
  // -----------------------------
  const measurement = await measure(() =>
    verifyHash(password, record.primary_hash)
  );

  const tunedCost = tuneCost(record.cost, measurement.ms);
  const target = selectTarget("bcrypt", tunedCost);

  // -----------------------------
  // Silent migration
  // -----------------------------
  if (needsUpgrade(record, target.algoId, target.cost)) {
    console.log("Silent hash upgrade triggered.");
    record = await silentRehash(
      password,
      record,
      target.algoId,
      target.cost
    );
    console.log("New hash cost:", record.cost);
  }

  // -----------------------------
  // Policy recommendation (no force)
  // -----------------------------
  const recommendation = advise(trust);
  console.log("Policy recommendation:", recommendation);

  return record;
}

// -----------------------------
// DEMO EXECUTION
// -----------------------------
(async function demo() {
  const password = "CorrectHorseBatteryStaple";

  let credential = await registerUser(password);

  // Simulate future login
  credential = await login(password, credential);
})()