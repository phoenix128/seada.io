import { ICorePageRouterAreaDefinition } from '@seada.io/core/spi/page-router/interface';
import cartPortClass from '@seada.io/cart/spi/cart-port-class';

const getCartCookieName = (areaDefinition: ICorePageRouterAreaDefinition) => {
    const sourceId = areaDefinition.sourceIds[cartPortClass];
    return `${sourceId}:cart`;
};

export default getCartCookieName;
