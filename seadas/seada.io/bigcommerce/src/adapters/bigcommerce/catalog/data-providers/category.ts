import { IDataProvider, IPageData, IVariables } from '@seada.io/core/spi/components/interface';
import { IPageComponentDefinition } from '@seada.io/core/spi/seada-pages/interface';
import graphqlBigcommerceQuery from '@seada.io/bigcommerce/spi/graphql/graphql-bigcommerce-query';
import { QUERY_CATEGORY } from '@seada.io/bigcommerce/gql/queries/query-category';
import convertBigcommerceCategory from '@seada.io/bigcommerce/service/converters/from-bigcommerce/convert-bigcommerce-category';
import { ICategoryDataProviderResult } from '@seada.io/catalog/ports/catalog/data-providers/category';
import getBigcommerceQueryContext from '@seada.io/bigcommerce/spi/get-bigcommerce-query-context';
import catalogPortClass from '@seada.io/catalog/spi/catalog-port-class';
import { ICategoryData } from '@seada.io/catalog/interface/category';
import getSourceIdByPortClass from '@seada.io/core/spi/get-source-id-by-port-class';

export interface ICategoryDataProviderInputProps {
    categoryKey: string;
}

const category: IDataProvider<ICategoryDataProviderResult> = (
    component: IPageComponentDefinition<ICategoryDataProviderInputProps>,
    pageData: IPageData,
    variables: IVariables
) => {
    const categoryKey = parseInt(
        component.props?.categoryKey || (variables?.category as ICategoryData)?.key || '0',
        10
    );

    return {
        operationId: `bigcommerce-category:${categoryKey}`,
        propsDependencies: ['categoryKey'],
        loader: async () => {
            if (!categoryKey) {
                return {
                    category: null,
                };
            }

            const sourceId = getSourceIdByPortClass(catalogPortClass, pageData);
            const queryContext = getBigcommerceQueryContext(sourceId, pageData);

            const res = await graphqlBigcommerceQuery(queryContext, {
                query: QUERY_CATEGORY,
                variables: {
                    entityId: categoryKey,
                    page: 1,
                    limit: 20,
                },
            });

            const category = convertBigcommerceCategory(res.data.site.category);

            return {
                category,
            };
        },
    };
};

export default category;
