import { IBigCommerceQueryContext } from '@seada.io/bigcommerce/spi/bigcommerce-query-context';
import getUserTokenCookieName from '@seada.io/user/spi/get-user-token-cookie';
import { ICorePageRouterAreaDefinition } from '@seada.io/core/spi/page-router/interface';

/**
 * Get the BigCommerce query context.
 * @param sourceId
 * @param pageData
 */
const getBigcommerceQueryContext = (
    sourceId: string,
    pageData: ICorePageRouterAreaDefinition
): IBigCommerceQueryContext => {
    const userTokenCookieName = getUserTokenCookieName(pageData);
    const userToken = pageData.cookies?.[userTokenCookieName];

    return {
        sourceId,
        userToken,
    };
};

export default getBigcommerceQueryContext;
