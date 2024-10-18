import {
    IAdapterRouterHandler,
    ICorePageRouterAreaDefinition,
    IPageRouterRequest,
    IPageRouterResponse,
} from '@seada.io/core/spi/page-router/interface';
import { profilerWrapperAsync } from '@seada.io/core/libs/profile';
import getWordpressQueryContext from '@seada.io/wordpress/spi/get-wordpress-query-context';
import { IResourceRouterCollection, IRouteType } from '@seada.io/wordpress/service/page-router/interface';
import graphqlWordpressQuery from '@seada.io/wordpress/spi/graphql/graphql-wordpress-query';
import { QUERY_ROUTE } from '@seada.io/wordpress/gql/queries/query-route';

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
    const wordpressQueryContext = getWordpressQueryContext(sourceId, areaDefinition);
    const res = await graphqlWordpressQuery(wordpressQueryContext, {
        query: QUERY_ROUTE,
        variables: {
            path: areaDefinition.relativePath,
        },
    });

    return (res.data.page || res.data.post) as IRouteType;
};

const router: IAdapterRouterHandler = async (
    request: IPageRouterRequest,
    areaDefinition: ICorePageRouterAreaDefinition,
    sourceId: string,
    resourceRouters?: IResourceRouterCollection
): Promise<IPageRouterResponse | null> =>
    profilerWrapperAsync('wordpress:router', async () => {
        const route = await getRoute(request, areaDefinition, sourceId);

        if (resourceRouters.hasOwnProperty(route?.__typename)) {
            return resourceRouters[route.__typename](request, areaDefinition, route);
        }

        return null;
    });

export default router;
