import getCache from '@seada.io/core/spi/cache/get-cache';
import { revalidateTag } from 'next/cache';

/**
 * Invalidate cache keys and tags
 * @param keys
 */
const invalidateCacheKey = async (keys: string | string[]): Promise<void> => {
    const cache = await getCache();

    const aKeys = Array.isArray(keys) ? keys : [keys];
    for (const key of aKeys) {
        console.log(`Invalidating cache key/tag: ${key}`);
        revalidateTag(key);
        if (cache) {
            await cache.del(key);
        }
    }
};

export default invalidateCacheKey;
