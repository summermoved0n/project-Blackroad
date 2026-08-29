import { NextResponse } from "next/server";

type RateLimitEntry = { count: number; resetAt: number };
type RateLimitOptions = { limit: number; windowMs: number };

const rateLimits = new Map<string, RateLimitEntry>();

const getClientIp = (request: Request) =>
  request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
  request.headers.get("x-real-ip") ||
  "unknown";

export const enforceRateLimit = (
  request: Request,
  scope: string,
  { limit, windowMs }: RateLimitOptions,
) => {
  const now = Date.now();

  if (rateLimits.size > 10_000) {
    for (const [storedKey, entry] of rateLimits) {
      if (entry.resetAt <= now) rateLimits.delete(storedKey);
    }

    if (rateLimits.size > 10_000) {
      const oldestKey = rateLimits.keys().next().value;
      if (oldestKey) rateLimits.delete(oldestKey);
    }
  }

  const key = `${scope}:${getClientIp(request)}`;
  const current = rateLimits.get(key);

  if (!current || current.resetAt <= now) {
    rateLimits.set(key, { count: 1, resetAt: now + windowMs });
    return null;
  }

  if (current.count >= limit) {
    return NextResponse.json(
      { message: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: {
          "Retry-After": Math.max(
            1,
            Math.ceil((current.resetAt - now) / 1000),
          ).toString(),
        },
      },
    );
  }

  current.count += 1;
  return null;
};
