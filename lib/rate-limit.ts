const WINDOW_MS = 10 * 60 * 1000
const LIMIT = 5

const buckets = new Map<string, number[]>()

export function resetRateLimitForTests() {
  buckets.clear()
}

function redisConfigured() {
  return Boolean(
    process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN,
  )
}

export async function consumeRateLimit(ip: string, now = Date.now()) {
  if (redisConfigured()) {
    const { Redis } = await import("@upstash/redis")
    const client = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    })
    const key = `tidewatch:rl:${ip}`
    const count = await client.incr(key)
    if (count === 1) {
      await client.expire(key, Math.ceil(WINDOW_MS / 1000))
    }
    return { allowed: count <= LIMIT }
  }

  const recent = (buckets.get(ip) ?? []).filter((stamp) => now - stamp < WINDOW_MS)
  if (recent.length >= LIMIT) {
    buckets.set(ip, recent)
    return { allowed: false }
  }
  recent.push(now)
  buckets.set(ip, recent)
  return { allowed: true }
}
