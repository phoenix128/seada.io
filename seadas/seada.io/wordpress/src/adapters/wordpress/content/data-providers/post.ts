import { IDataProvider, IPageData, IVariables } from '@seada.io/core/spi/components/interface';
import { IPageComponentDefinition } from '@seada.io/core/spi/seada-pages/interface';
import { QUERY_PAGE } from '@seada.io/wordpress/gql/queries/query-page';
import getWordpressQueryContext from '@seada.io/wordpress/spi/get-wordpress-query-context';
import contentPortClass from '@seada.io/content/spi/content-port-class';
import graphqlWordpressQuery from '@seada.io/wordpress/spi/graphql/graphql-wordpress-query';
import { IPostDataProviderResult } from '@seada.io/content/ports/content/data-providers/post';
import { IContentPostData } from '@seada.io/content/interface/post';
import convertWordpressPost from '@seada.io/wordpress/service/converters/from-wordpress/convert-wordpress-post';
import getSourceIdByPortClass from '@seada.io/core/spi/get-source-id-by-port-class';

const post: IDataProvider<IPostDataProviderResult> = (
    component: IPageComponentDefinition,
    pageData: IPageData,
    variables: IVariables
) => {
    const postKey = (component.props?.postKey || (variables?.post as IContentPostData)?.key)?.toLowerCase();

    return {
        operationId: `wordpress-post:${postKey}`,
        propsDependencies: ['postKey'],
        loader: async () => {
            const sourceId = getSourceIdByPortClass(contentPortClass, pageData);
            const queryContext = getWordpressQueryContext(sourceId, pageData);
            const res = await graphqlWordpressQuery(queryContext, {
                query: QUERY_PAGE,
                variables: {
                    path: postKey,
                },
            });

            const post = convertWordpressPost(res.data.post);

            return {
                post,
            };
        },
    };
};

export default post;
