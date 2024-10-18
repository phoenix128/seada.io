import {
    ICorePageRouterAreaDefinition,
    IPageRouterRequest,
    IPageRouterResponse,
} from '@seada.io/core/spi/page-router/interface';
import getPageTemplate from '@seada.io/core/spi/seada-pages/get-page-template';
import { IResourceRouter } from '@seada.io/wordpress/service/page-router/interface';
import { profilerWrapperAsync } from '@seada.io/core/libs/profile';
import writeSourceGraphqlCache from '@seada.io/wordpress/service/graphql/write-source-graphql-cache';
import { QUERY_PAGE } from '@seada.io/wordpress/gql/queries/query-page';
import { Page } from '@seada.io/wordpress/gql/schema/graphql';
import convertWordpressPage from '@seada.io/wordpress/service/converters/from-wordpress/convert-wordpress-page';

const pageRouter: IResourceRouter = async (
    request: IPageRouterRequest,
    areaDefinition: ICorePageRouterAreaDefinition,
    page: Page
): Promise<IPageRouterResponse | null> =>
    profilerWrapperAsync<IPageRouterResponse>('wordpress:page-router', async () => {
        await writeSourceGraphqlCache(
            areaDefinition,
            {
                query: QUERY_PAGE,
                variables: {
                    path: page.uri,
                },
            },
            {
                data: {
                    page,
                },
            }
        );

        return {
            pageType: 'content-page',
            pageTemplate: await getPageTemplate(areaDefinition.areaCode, 'content-page', 'default', request),
            variables: {
                title: page.title,
                page: convertWordpressPage(page),
            },
        };
    });

export default pageRouter;
