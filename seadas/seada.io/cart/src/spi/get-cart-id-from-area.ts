import { ICorePageRouterAreaDefinition } from '@seada.io/core/spi/page-router/interface';
import getCartCookieName from '@seada.io/cart/spi/get-cart-cookie-name';

/**
 * Get cart id from area definition information
 * @param areaDefinition
 */
const getCartIdFromArea = (areaDefinition: ICorePageRouterAreaDefinition): string | null => {
    const cartCookieName = getCartCookieName(areaDefinition);
    return areaDefinition.cookies?.[cartCookieName] || null;
};

export default getCartIdFromArea;
