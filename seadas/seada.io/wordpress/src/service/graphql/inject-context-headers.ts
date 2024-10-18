import { Context } from '@apollo/client';
import { IWordpressQueryContext } from '@seada.io/wordpress/spi/wordpress-query-context';

export interface IContextWithHeaders extends Context {
    headers?: Record<string, string>;
}

/**
 * Dynamically inject context headers for Bigcommerce
 * @param queryContext
 * @param context
 */
const injectContextHeaders = <TContext extends IContextWithHeaders = IContextWithHeaders>(
    queryContext: IWordpressQueryContext,
    context: TContext
): TContext => {
    const resContext: TContext = { ...(context || {}) } as TContext;

    resContext.headers = {
        ...(resContext.headers || {}),
    };

    return resContext;
};

export default injectContextHeaders;
