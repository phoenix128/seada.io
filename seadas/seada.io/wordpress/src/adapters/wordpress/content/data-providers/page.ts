import { IDataProvider, IPageData, IVariables } from '@seada.io/core/spi/components/interface';
import { IPageComponentDefinition } from '@seada.io/core/spi/seada-pages/interface';
import { IPageDataProviderResult } from '@seada.io/content/ports/content/data-providers/page';
import { QUERY_PAGE } from '@seada.io/wordpress/gql/queries/query-page';
import { IContentPageData } from '@seada.io/content/interface/page';
import getWordpressQueryContext from '@seada.io/wordpress/spi/get-wordpress-query-context';
import contentPortClass from '@seada.io/content/spi/content-port-class';
import graphqlWordpressQuery from '@seada.io/wordpress/spi/graphql/graphql-wordpress-query';
import convertWordpressPage from '@seada.io/wordpress/service/converters/from-wordpress/convert-wordpress-page';
import getSourceIdByPortClass from '@seada.io/core/spi/get-source-id-by-port-class';

const page: IDataProvider<IPageDataProviderResult> = (
    component: IPageComponentDefinition,
    pageData: IPageData,
    variables: IVariables
) => {
    const pageKey = (component.props?.pageKey || (variables?.page as IContentPageData)?.key)?.toLowerCase();

    return {
        operationId: `wordpress-page:${pageKey}`,
        propsDependencies: ['pageKey'],
        loader: async () => {
            const sourceId = getSourceIdByPortClass(contentPortClass, pageData);
            const queryContext = getWordpressQueryContext(sourceId, pageData);
            const res = await graphqlWordpressQuery(queryContext, {
                query: QUERY_PAGE,
                variables: {
                    path: pageKey,
                },
            });

            const page = convertWordpressPage(res.data.page);

            return {
                page,
            };
        },
    };
};

export default page;
