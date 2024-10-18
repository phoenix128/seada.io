import {
    ICorePageRouterAreaDefinition,
    ICorePageRouterResponse,
    IPageRouterHandler,
    IPageRouterRequest,
} from '@seada.io/core/spi/page-router/interface';
import getAreaByRequest from '@seada.io/core/service/page-router/get-area-by-request';
import loadDataFromProviders from '@seada.io/core/spi/data-providers/load-data-from-providers';
import { profilerWrapperAsync } from '@seada.io/core/libs/profile';
import getPageLayout from '@seada.io/core/spi/seada-pages/get-page-layout';
import applyPageComponentPropsMiddlewares from '@seada.io/core/service/components/apply-page-component-props-middlewares';
import getEnvPath from '@seada.io/core/libs/get-env-path';
import getLocales from '@seada.io/core/spi/locale/get-locales';
import getAreaSourceIds from '@seada.io/core/spi/get-area-source-ids';

/**
 * Routers pool
 *
 * @param request
 * @param handlers
 */
const router = async (request: IPageRouterRequest, handlers?: IPageRouterHandler[]): Promise<ICorePageRouterResponse> =>
    profilerWrapperAsync('router', async () => {
        const { path = [], searchParams } = request;

        if (!handlers) {
            throw new Error('No router handler provided');
        }

        const area = getAreaByRequest(request);
        const pagePath = '/' + path.join('/');

        const relativePath = area.basePath === pagePath + '/' ? '/' : pagePath.replace(area.basePath, '/');

        const sourceIds = getAreaSourceIds(area.areaCode);
        const sourceAdaptersByIds = Object.values(sourceIds).reduce((acc, sourceId) => {
            acc[sourceId] = getEnvPath(`source.${sourceId}.adapter`, '');
            return acc;
        }, {});

        const areaDefinition: ICorePageRouterAreaDefinition = {
            sourceIds,
            sourceAdaptersByIds,
            areaCode: area.areaCode,
            areaPath: area.basePath,
            pagePath,
            relativePath,
            cookies: request.cookies,
            searchParams,
            locale: area.locale,
            allLocales: getLocales(),
        };

        for (const handler of handlers) {
            // Route the request to the handler
            const pageRouterResponse = await handler(request, areaDefinition);

            if (pageRouterResponse) {
                // Add area definition to the response (required for sourceId identification and data-fetching)
                const corePageRouterResponse: ICorePageRouterResponse = {
                    ...(areaDefinition as ICorePageRouterResponse),
                    ...pageRouterResponse,
                    variables: pageRouterResponse.variables || {},
                    pageLayout: await getPageLayout(areaDefinition.areaCode, pageRouterResponse.pageTemplate.layout),
                };

                const corePageRouterResponseAfterMiddlewares =
                    applyPageComponentPropsMiddlewares(corePageRouterResponse);

                // Fetch server-side data from providers and pass it to the page template components
                const providedCorePageRouterResponse = await loadDataFromProviders(
                    corePageRouterResponseAfterMiddlewares
                );

                return {
                    ...providedCorePageRouterResponse,
                };
            }
        }

        throw new Error(`No handler found for path ${path.join('/')}`);
    });

export default router;
