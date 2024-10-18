import flatCache from 'flat-cache';
import path from 'node:path';

const cacheFile = path.join(process.cwd(), '.seada-cache');
const cacheId = 'bakery.json';

const cache = flatCache.load(cacheId, cacheFile);

/**
 * Cache wrapper for functions
 * @param cacheKey
 * @param fn
 */
export const cacheWrapper = <TFn extends () => any>(cacheKey: string, fn: TFn): ReturnType<TFn> => {
    const cachedData = getCacheEntry(cacheKey);
    if (cachedData) {
        return cachedData;
    }
    const data = fn();
    setCacheEntry(cacheKey, data);
    return data;
};

/**
 * Get a cache entry
 * @param cacheKey
 */
export const getCacheEntry = <TData = any>(cacheKey: string): TData => cache.getKey(cacheKey) as TData;

/**
 * Set a cache entry
 * @param cacheKey
 * @param data
 */
export const setCacheEntry = <TData = any>(cacheKey: string, data: TData): void => {
    cache.setKey(cacheKey, data);
    cache.save(true);
};
