export function logDecision(log, decision) {
  log.push({
    decision,
    time: new Date().toISOString()
  })
}