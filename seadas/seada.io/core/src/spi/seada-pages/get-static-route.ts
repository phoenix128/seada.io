import { ICorePageRouterAreaDefinition, IPageRouterRequest } from '@seada.io/core/spi/page-router/interface';
import getSeadaFile from '@seada.io/core/spi/seada-pages/get-seada-file';
import { ESeadaObjectType, IPageRouteDefinition, IRoutesMapDefinition } from '@seada.io/core/spi/seada-pages/interface';

/**
 * Get static route
 * @param areaDefinition
 * @param request
 */
const getStaticRoute = async (
    areaDefinition: ICorePageRouterAreaDefinition,
    request: IPageRouterRequest
): Promise<IPageRouteDefinition | null> => {
    const { areaCode, relativePath } = areaDefinition;
    const routeFile = await getSeadaFile<IRoutesMapDefinition>(areaCode, ESeadaObjectType.ROUTES, 'static');

    return routeFile?.routes?.find((route) => route.path === relativePath) || null;
};

export default getStaticRoute;
