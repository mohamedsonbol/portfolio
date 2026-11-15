type RateLimitEntry = {
  count: number
  resetAt: number
}

const rateLimitStore = new Map<string, RateLimitEntry>()

export function getClientAddress(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for")
  return forwardedFor?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown"
}

export function checkRateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now()
  const current = rateLimitStore.get(key)

  if (!current || current.resetAt <= now) {
    rateLimitStore.set(key, { count: 1, resetAt: now + windowMs })
    pruneRateLimitStore(now)
    return { allowed: true, retryAfterSeconds: Math.ceil(windowMs / 1000) }
  }

  if (current.count >= limit) {
    return { allowed: false, retryAfterSeconds: Math.max(1, Math.ceil((current.resetAt - now) / 1000)) }
  }

  current.count += 1
  return { allowed: true, retryAfterSeconds: Math.ceil((current.resetAt - now) / 1000) }
}

export async function readJsonBody<T>(request: Request, maxBytes: number): Promise<T> {
  const contentLength = Number(request.headers.get("content-length"))
  if (Number.isFinite(contentLength) && contentLength > maxBytes) {
    throw new RequestBodyTooLargeError()
  }

  const body = await request.arrayBuffer()
  if (body.byteLength > maxBytes) {
    throw new RequestBodyTooLargeError()
  }

  return JSON.parse(new TextDecoder().decode(body)) as T
}

export class RequestBodyTooLargeError extends Error {
  constructor() {
    super("Request body is too large")
    this.name = "RequestBodyTooLargeError"
  }
}

export function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    }
    return entities[character]
  })
}

function pruneRateLimitStore(now: number) {
  if (rateLimitStore.size < 1000) return

  for (const [key, entry] of rateLimitStore) {
    if (entry.resetAt <= now) rateLimitStore.delete(key)
  }
}
