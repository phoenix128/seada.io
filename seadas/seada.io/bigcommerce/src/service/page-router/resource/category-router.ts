import {
    ICorePageRouterAreaDefinition,
    IPageRouterRequest,
    IPageRouterResponse,
} from '@seada.io/core/spi/page-router/interface';
import getPageTemplate from '@seada.io/core/spi/seada-pages/get-page-template';
import { IResourceRouter } from '@seada.io/bigcommerce/service/page-router/interface';
import { QUERY_CATEGORY } from '@seada.io/bigcommerce/gql/queries/query-category';
import writeSourceGraphqlCache from '@seada.io/bigcommerce/service/graphql/write-source-graphql-cache';
import { CategoryTreeItem } from '@seada.io/bigcommerce/gql/schema/graphql';
import convertBigcommerceCategory from '@seada.io/bigcommerce/service/converters/from-bigcommerce/convert-bigcommerce-category';

const categoryRouter: IResourceRouter = async (
    request: IPageRouterRequest,
    areaDefinition: ICorePageRouterAreaDefinition,
    category: CategoryTreeItem
): Promise<IPageRouterResponse | null> => {
    await writeSourceGraphqlCache(
        areaDefinition,
        {
            query: QUERY_CATEGORY,
            variables: {
                entityId: category.entityId,
            },
        },
        {
            data: {
                site: {
                    category,
                },
            },
        }
    );

    return {
        pageType: 'category',
        pageTemplate: await getPageTemplate(areaDefinition.areaCode, 'category', 'default', request),
        variables: {
            title: category.name,
            category: convertBigcommerceCategory(category),
        },
    };
};

export default categoryRouter;
