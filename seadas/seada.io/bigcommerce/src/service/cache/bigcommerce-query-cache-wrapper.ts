import cacheWrapper, { TTL_1_DAY, TTL_1_MINUTE } from '@seada.io/core/spi/cache/cache-wrapper';
import { IBigCommerceQueryContext } from '@seada.io/bigcommerce/spi/bigcommerce-query-context';
import decodeUserToken from '@seada.io/user/spi/decode-user-token';

/**
 * Bigcommerce query wrapper
 * @param context
 * @param key
 * @param fn
 */
const bigcommerceQueryCacheWrapper = async <T = any>(
    context: IBigCommerceQueryContext,
    key: string,
    fn: () => Promise<T>
): Promise<T> => {
    const groupId = decodeUserToken(context.userToken)?.groupId;
    const cacheKey = `bigcommerce-query:${context.sourceId}:${groupId || '0'}:${key}`;

    return cacheWrapper(cacheKey, fn, { swr: TTL_1_MINUTE, ttl: TTL_1_DAY });
};

export default bigcommerceQueryCacheWrapper;
