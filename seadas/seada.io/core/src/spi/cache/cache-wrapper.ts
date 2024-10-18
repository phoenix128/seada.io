import getCache from '@seada.io/core/spi/cache/get-cache';

export interface ICacheWrapperOptions {
    ttl?: number;
    swr?: number;
}

export const TTL_1_MINUTE = 60 * 1000;
export const TTL_5_MINUTES = 300 * 1000;
export const TTL_10_MINUTES = 600 * 1000;
export const TTL_30_MINUTES = 1800 * 1000;
export const TTL_1_HOUR = 3600 * 1000;
export const TTL_1_DAY = 86400 * 1000;
export const TTL_1_WEEK = 604800 * 1000;
export const TTL_1_MONTH = 2592000 * 1000;

export interface ICachePayload<T> {
    data: T;
    fetchedAt: number;
}

/**
 * Run and store
 * @param key
 * @param fn
 * @param options
 */
const runAndStore = async <T = any>(key: string, fn: () => Promise<T>, options?: ICacheWrapperOptions): Promise<T> => {
    const cache = await getCache();

    try {
        const result = await fn();
        await cache.set(
            key,
            {
                data: result,
                fetchedAt: Date.now(),
            },
            options?.ttl
        );

        return result;
    } catch (e) {
        console.log(e.name);
        if (e.name === 'DontCacheError') {
            console.warn(`[cache] ${key}: ${e.message}`);
            return null;
        } else {
            throw e;
        }
    }
};

/**
 * Cache wrapper
 * @param fn
 * @param key
 * @param options
 */
const cacheWrapper = async <T = any>(key: string, fn: () => Promise<T>, options?: ICacheWrapperOptions): Promise<T> => {
    const cache = await getCache();

    if (!cache) {
        try {
            return await fn();
        } catch (e) {
            if (e.name !== 'DontCacheError') throw e;
            console.warn(`[cache] ${key}: Ignoring DontCacheError`);
            return null;
        }
    }

    const cacheKey = key;
    const cached = await cache.get<ICachePayload<T>>(cacheKey);
    if (cached?.data) {
        if (options?.swr && cached.fetchedAt + options.swr * 1000 < Date.now()) {
            runAndStore(cacheKey, fn, options).then();
        }

        return cached.data;
    }

    return await runAndStore(cacheKey, fn, options);
};

export default cacheWrapper;
