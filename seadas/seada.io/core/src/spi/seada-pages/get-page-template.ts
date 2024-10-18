import { ESeadaObjectType, IPageTemplateDefinition } from '@seada.io/core/spi/seada-pages/interface';
import getSeadaFile from '@seada.io/core/spi/seada-pages/get-seada-file';
import { IPageRouterRequest } from '@seada.io/core/spi/page-router/interface';
import getTemplateOverride from '@seada.io/core/spi/seada-pages/get-template-override';

/**
 * Get page components by template name
 * @param areaCode
 * @param pageType
 * @param pageVariant
 * @param request
 */
const getPageTemplate = async (
    areaCode: string,
    pageType: string,
    pageVariant: string,
    request: IPageRouterRequest
): Promise<IPageTemplateDefinition> => {
    const templateOverride = await getTemplateOverride(areaCode, pageType, request);
    if (templateOverride) {
        pageVariant = templateOverride.template;
    }

    const pageTemplate = await getSeadaFile(areaCode, ESeadaObjectType.TEMPLATES, `${pageType}/${pageVariant}`);

    return {
        ...pageTemplate,
        areaCode,
        pageType,
        pageVariant,
    };
};

export default getPageTemplate;
