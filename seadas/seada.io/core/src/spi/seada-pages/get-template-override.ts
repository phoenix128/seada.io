import { IPageRouterRequest } from '@seada.io/core/spi/page-router/interface';
import {
    ESeadaObjectType,
    IOverridesMapDefinition,
    IPageOverrideDefinition,
} from '@seada.io/core/spi/seada-pages/interface';
import getSeadaFile from '@seada.io/core/spi/seada-pages/get-seada-file';

/**
 * Get template override
 * @param areaCode
 * @param pageType
 * @param request
 */
const getTemplateOverride = async (
    areaCode: string,
    pageType: string,
    request: IPageRouterRequest
): Promise<IPageOverrideDefinition> => {
    try {
        const path = '/' + request.path.join('/');
        const overridesFile = await getSeadaFile<IOverridesMapDefinition>(
            areaCode,
            ESeadaObjectType.OVERRIDES,
            'static'
        );

        return overridesFile?.overrides?.find((route) => route.path === path) || null;
    } catch (error) {
        return null;
    }
};

export default getTemplateOverride;
