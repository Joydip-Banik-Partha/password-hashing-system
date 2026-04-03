export function createCredentialTimeline() {
  return [];
}

export function recordCredentialEvent(timeline, event) {
  timeline.push({
    ...event,
    timestamp: new Date().toISOString()
  })
}