import {
    ICorePageRouterAreaDefinition,
    IPageRouterRequest,
    IPageRouterResponse,
} from '@seada.io/core/spi/page-router/interface';
import getPageTemplate from '@seada.io/core/spi/seada-pages/get-page-template';

const searchRouter = async (
    request: IPageRouterRequest,
    areaDefinition: ICorePageRouterAreaDefinition
): Promise<IPageRouterResponse | null> => {
    if (areaDefinition.relativePath === '/search.php') {
        return {
            pageType: 'search',
            pageTemplate: await getPageTemplate(areaDefinition.areaCode, 'search', 'default', request),
        };
    }

    return null;
};

export default searchRouter;
