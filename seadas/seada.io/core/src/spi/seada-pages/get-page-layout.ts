import { ESeadaObjectType, IPageLayoutDefinition } from '@seada.io/core/spi/seada-pages/interface';
import getSeadaFile from '@seada.io/core/spi/seada-pages/get-seada-file';

/**
 * Get page layout components by template name
 * @param areaCode
 * @param templateName
 */
const getPageLayout = async (areaCode: string, templateName: string): Promise<IPageLayoutDefinition> => {
    const pageLayout = await getSeadaFile(areaCode, ESeadaObjectType.LAYOUTS, templateName);

    return {
        ...pageLayout,
        areaCode,
        templateName,
    };
};

export default getPageLayout;
