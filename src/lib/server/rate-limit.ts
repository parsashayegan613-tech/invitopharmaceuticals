type RateLimitBucket = {
    count: number;
    resetAt: number;
};

declare global {
    var __invitvoRateLimitStore: Map<string, RateLimitBucket> | undefined;
}

const getRateLimitStore = () => {
    globalThis.__invitvoRateLimitStore ??= new Map<string, RateLimitBucket>();
    return globalThis.__invitvoRateLimitStore;
};

export const checkMemoryRateLimit = (
    key: string,
    { windowMs, max }: { windowMs: number; max: number }
) => {
    const store = getRateLimitStore();
    const now = Date.now();
    const current = store.get(key);

    if (!current || current.resetAt <= now) {
        store.set(key, { count: 1, resetAt: now + windowMs });
        return true;
    }

    current.count += 1;
    return current.count <= max;
};

export const rateLimitWindowStart = (windowMs: number) =>
    new Date(Date.now() - windowMs).toISOString();
