import {
    ICorePageRouterAreaDefinition,
    IPageRouterRequest,
    IPageRouterResponse,
} from '@seada.io/core/spi/page-router/interface';
import getPageTemplate from '@seada.io/core/spi/seada-pages/get-page-template';

const accountRouter = async (
    request: IPageRouterRequest,
    areaDefinition: ICorePageRouterAreaDefinition
): Promise<IPageRouterResponse | null> => {
    switch (areaDefinition.relativePath) {
        case '/login.php': {
            return {
                pageType: 'login',
                pageTemplate: await getPageTemplate(areaDefinition.areaCode, 'login', 'default', request),
            };
        }

        case '/account.php': {
            return {
                pageType: 'personal-area',
                pageTemplate: await getPageTemplate(areaDefinition.areaCode, 'personal-area', 'default', request),
            };
        }
    }
};

export default accountRouter;
