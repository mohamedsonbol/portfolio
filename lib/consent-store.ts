import {
  readStoredConsent,
  writeStoredConsent,
  type StoredConsent,
} from "@/lib/consent"

type Listener = () => void

let snapshot: StoredConsent | null = null
let initialized = false
const listeners = new Set<Listener>()

function ensureSnapshot(): void {
  if (!initialized) {
    snapshot = readStoredConsent()
    initialized = true
  }
}

function notify(): void {
  for (const listener of [...listeners]) listener()
}

export function getConsentSnapshot(): StoredConsent | null {
  ensureSnapshot()
  return snapshot
}

export function getServerConsentSnapshot(): null {
  return null
}

export function subscribeConsent(listener: Listener): () => void {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export function setConsentInStore(consent: StoredConsent): void {
  ensureSnapshot()
  snapshot = consent
  writeStoredConsent(consent)
  notify()
}

export function refreshConsentSnapshot(): void {
  initialized = true
  snapshot = readStoredConsent()
  notify()
}
