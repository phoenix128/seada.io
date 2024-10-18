import { createCache, MultiCache } from 'cache-manager';
import getEnvPath from '@seada.io/core/libs/get-env-path';
import { ICacheStoreFactory } from '@seada.io/core/interface/cache';
import { TTL_1_MINUTE } from '@seada.io/core/spi/cache/cache-wrapper';
import layeredCaching from '@seada.io/core/spi/cache/layered-cache-manager';

let cache: MultiCache = undefined;

/**
 * Get cache
 * @param cacheStoreFactories
 */
const getCache = async (cacheStoreFactories?: Record<string, ICacheStoreFactory>): Promise<MultiCache> => {
    if (cache === undefined) {
        const cacheStoreCodes = getEnvPath<string>('cache.adapters', '')
            .split(/\s*,\s*/)
            .filter(Boolean);

        if (cacheStoreCodes.length === 0) {
            console.warn('No cache adapters configured');
            cache = null;
            return null;
        }

        const cacheEngines = cacheStoreCodes.map((code) => {
            const factory = cacheStoreFactories[code];
            if (!factory) {
                throw new Error(`Cache store factory for code ${code} not found`);
            }

            console.log(`Creating cache engine for code ${code}`);
            return createCache(cacheStoreFactories[code](), {
                refreshThreshold: TTL_1_MINUTE,
            });
        });

        cache = layeredCaching(cacheEngines);
        cache.on('error', (error) => {
            console.error('Cache error:', error);
        });
    }

    return cache;
};

export default getCache;
