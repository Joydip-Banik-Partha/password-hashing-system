export function needsUpgrade(record, targetAlgo, targetCost) {
  return record.algorithm !== targetAlgo || record.cost < targetCost;
}