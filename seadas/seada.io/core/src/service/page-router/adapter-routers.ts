import {
    IAdapterRouterHandler,
    ICorePageRouterAreaDefinition,
    IPageRouterRequest,
    IPageRouterResponse,
} from '@seada.io/core/spi/page-router/interface';
import getEnvPath from '@seada.io/core/libs/get-env-path';

/**
 * Adapter routers
 * @param request
 * @param areaDefinition
 * @param adapterHandlers
 */
const adapterRouters = async (
    request: IPageRouterRequest,
    areaDefinition: ICorePageRouterAreaDefinition,
    adapterHandlers?: Record<string, IAdapterRouterHandler>
): Promise<IPageRouterResponse | null> => {
    const { areaCode } = areaDefinition;
    const routerSources = getEnvPath(`area.${areaCode}.routers`, '').split(/\s*,\s*/);

    const routerHandlers = routerSources.map((sourceId) => {
        const adapterCode = getEnvPath(`source.${sourceId}.adapter`, '');
        if (!adapterCode) {
            throw new Error(`Adapter code not found for source id: ${sourceId}`);
        }

        const routerHandler = adapterHandlers?.[adapterCode];
        if (!routerHandler) {
            throw new Error(`Router handler not found for source id: ${sourceId}`);
        }

        return adapterHandlers[adapterCode];
    });

    for (let i = 0; i < routerHandlers.length; i++) {
        const routerHandler = routerHandlers[i];
        const sourceId = routerSources[i];

        const pageRouterResponse = await routerHandler(request, areaDefinition, sourceId);

        if (pageRouterResponse) {
            return pageRouterResponse;
        }
    }

    return null;
};

export default adapterRouters;
