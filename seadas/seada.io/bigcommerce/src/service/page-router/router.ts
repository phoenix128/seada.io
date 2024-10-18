import {
    IAdapterRouterHandler,
    ICorePageRouterAreaDefinition,
    IPageRouterHandler,
    IPageRouterRequest,
    IPageRouterResponse,
} from '@seada.io/core/spi/page-router/interface';
import graphqlBigcommerceQuery from '@seada.io/bigcommerce/spi/graphql/graphql-bigcommerce-query';
import { QUERY_ROUTE } from '@seada.io/bigcommerce/gql/queries/query-route';
import { IResourceRouterCollection, IRouteType } from '@seada.io/bigcommerce/service/page-router/interface';
import { profilerWrapperAsync } from '@seada.io/core/libs/profile';
import getBigcommerceQueryContext from '@seada.io/bigcommerce/spi/get-bigcommerce-query-context';

/**
 * Get route from bigcommerce and resource information
 * @param request
 * @param areaDefinition
 * @param sourceId
 */
const getRoute = async (
    request: IPageRouterRequest,
    areaDefinition: ICorePageRouterAreaDefinition,
    sourceId: string
): Promise<IRouteType> => {
    const bigcommerceQueryContext = getBigcommerceQueryContext(sourceId, areaDefinition);

    const res = await graphqlBigcommerceQuery(bigcommerceQueryContext, {
        query: QUERY_ROUTE,
        variables: {
            path: areaDefinition.relativePath,
        },
    });

    return res.data.site.route.node as IRouteType;
};

const router: IAdapterRouterHandler = async (
    request: IPageRouterRequest,
    areaDefinition: ICorePageRouterAreaDefinition,
    sourceId: string,
    staticRouters?: IPageRouterHandler[],
    resourceRouters?: IResourceRouterCollection
): Promise<IPageRouterResponse | null> =>
    profilerWrapperAsync('bigcommerce:router', async () => {
        const route = await getRoute(request, areaDefinition, sourceId);

        for (const staticRouter of staticRouters || []) {
            const res = await staticRouter(request, areaDefinition);

            if (res) {
                return res;
            }
        }

        if (resourceRouters.hasOwnProperty(route?.__typename)) {
            return resourceRouters[route.__typename](request, areaDefinition, route);
        }

        return null;
    });

export default router;
