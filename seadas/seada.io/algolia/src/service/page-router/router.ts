import {
    IAdapterRouterHandler,
    ICorePageRouterAreaDefinition,
    IPageRouterRequest,
    IPageRouterResponse,
} from '@seada.io/core/spi/page-router/interface';
import { profilerWrapperAsync } from '@seada.io/core/libs/profile';
import getPageTemplate from '@seada.io/core/spi/seada-pages/get-page-template';

const router: IAdapterRouterHandler = async (
    request: IPageRouterRequest,
    areaDefinition: ICorePageRouterAreaDefinition,
    sourceId: string
): Promise<IPageRouterResponse | null> =>
    profilerWrapperAsync('algolia:router', async () => {
        if (areaDefinition.relativePath === '/search') {
            return {
                pageType: 'search',
                pageTemplate: await getPageTemplate(areaDefinition.areaCode, 'search', 'default', request),
            };
        }

        return null;
    });

export default router;
