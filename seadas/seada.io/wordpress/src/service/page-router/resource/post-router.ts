import {
    ICorePageRouterAreaDefinition,
    IPageRouterRequest,
    IPageRouterResponse,
} from '@seada.io/core/spi/page-router/interface';
import getPageTemplate from '@seada.io/core/spi/seada-pages/get-page-template';
import { IResourceRouter } from '@seada.io/wordpress/service/page-router/interface';
import { profilerWrapperAsync } from '@seada.io/core/libs/profile';
import writeSourceGraphqlCache from '@seada.io/wordpress/service/graphql/write-source-graphql-cache';
import { Post } from '@seada.io/wordpress/gql/schema/graphql';
import { QUERY_POST } from '@seada.io/wordpress/gql/queries/query-post';
import convertWordpressPost from '@seada.io/wordpress/service/converters/from-wordpress/convert-wordpress-post';

const postRouter: IResourceRouter = async (
    request: IPageRouterRequest,
    areaDefinition: ICorePageRouterAreaDefinition,
    post: Post
): Promise<IPageRouterResponse | null> =>
    profilerWrapperAsync<IPageRouterResponse>('wordpress:page-router', async () => {
        await writeSourceGraphqlCache(
            areaDefinition,
            {
                query: QUERY_POST,
                variables: {
                    path: post.uri,
                },
            },
            {
                data: {
                    post,
                },
            }
        );

        return {
            pageType: 'post-page',
            pageTemplate: await getPageTemplate(areaDefinition.areaCode, 'post-page', 'default', request),
            variables: {
                title: post.title,
                post: convertWordpressPost(post),
            },
        };
    });

export default postRouter;
