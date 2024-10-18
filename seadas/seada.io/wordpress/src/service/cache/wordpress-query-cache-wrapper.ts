import cacheWrapper, { TTL_1_DAY, TTL_1_MINUTE } from '@seada.io/core/spi/cache/cache-wrapper';
import { IWordpressQueryContext } from '@seada.io/wordpress/spi/wordpress-query-context';

/**
 * Bigcommerce query wrapper
 * @param context
 * @param key
 * @param fn
 */
const wordpressQueryCacheWrapper = async <T = any>(
    context: IWordpressQueryContext,
    key: string,
    fn: () => Promise<T>
): Promise<T> => {
    const cacheKey = `wordpress-query:${context.sourceId}:${key}`;

    return cacheWrapper(cacheKey, fn, { swr: TTL_1_MINUTE, ttl: TTL_1_DAY });
};

export default wordpressQueryCacheWrapper;
