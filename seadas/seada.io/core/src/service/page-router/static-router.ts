import {
    ICorePageRouterAreaDefinition,
    IPageRouterHandler,
    IPageRouterRequest,
    IPageRouterResponse,
} from '@seada.io/core/spi/page-router/interface';
import getPageTemplate from '@seada.io/core/spi/seada-pages/get-page-template';
import getStaticRoute from '@seada.io/core/spi/seada-pages/get-static-route';

const router: IPageRouterHandler = async (
    request: IPageRouterRequest,
    areaDefinition: ICorePageRouterAreaDefinition
): Promise<IPageRouterResponse | null> => {
    const staticRoute = await getStaticRoute(areaDefinition, request);

    if (staticRoute) {
        return {
            pageType: staticRoute.pageType,
            pageTemplate: await getPageTemplate(areaDefinition.areaCode, staticRoute.pageType, 'default', request),
        };
    }

    return null;
};

export default router;
