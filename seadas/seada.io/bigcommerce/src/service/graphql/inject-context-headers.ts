import { getSourceConfigValueOrThrow } from '@seada.io/core/libs/get-source-config-value';
import { Context } from '@apollo/client';
import { IBigCommerceQueryContext } from '@seada.io/bigcommerce/spi/bigcommerce-query-context';
import decodeUserToken from '@seada.io/user/spi/decode-user-token';

export interface IContextWithHeaders extends Context {
    headers?: Record<string, string>;
    userId?: number;
}

/**
 * Dynamically inject context headers for Bigcommerce
 * @param queryContext
 * @param context
 */
const injectContextHeaders = <TContext extends IContextWithHeaders = IContextWithHeaders>(
    queryContext: IBigCommerceQueryContext,
    context: TContext
): TContext => {
    const resContext: TContext = { ...(context || {}) } as TContext;

    const { sourceId, userToken } = queryContext;
    const userId = context?.userId || decodeUserToken(userToken)?.userId;
    const authToken = getSourceConfigValueOrThrow(sourceId, 'customerImpersonationToken');

    const authHeaders = userId
        ? {
              'X-Bc-Customer-Id': `${userId}`,
              Authorization: `Bearer ${authToken || ''}`,
          }
        : {
              Authorization: `Bearer ${authToken || ''}`,
          };

    resContext.headers = {
        ...(resContext.headers || {}),
        ...authHeaders,
    };

    return resContext;
};

export default injectContextHeaders;
