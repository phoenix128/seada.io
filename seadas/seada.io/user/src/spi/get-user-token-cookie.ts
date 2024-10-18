import { ICorePageRouterAreaDefinition } from '@seada.io/core/spi/page-router/interface';
import userPortClass from '@seada.io/user/spi/user-port-class';

/**
 * Get user token cookie name
 * @param areaDefinition
 */
const getUserTokenCookieName = (areaDefinition: ICorePageRouterAreaDefinition) => {
    const sourceId = areaDefinition.sourceIds[userPortClass];
    return `${sourceId}:user-token`;
};

export default getUserTokenCookieName;
