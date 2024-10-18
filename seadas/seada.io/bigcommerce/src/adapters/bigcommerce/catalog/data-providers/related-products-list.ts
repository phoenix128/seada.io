import { IDataProvider, IPageData, IVariables } from '@seada.io/core/spi/components/interface';
import { IPageComponentDefinition } from '@seada.io/core/spi/seada-pages/interface';
import graphqlBigcommerceQuery from '@seada.io/bigcommerce/spi/graphql/graphql-bigcommerce-query';
import { QUERY_RELATED_PRODUCTS } from '@seada.io/bigcommerce/gql/queries/query-related-products';
import { IRelatedProductsListDataProviderResult } from '@seada.io/catalog/ports/catalog/data-providers/related-products-list';
import convertBigcommerceProduct from '@seada.io/bigcommerce/service/converters/from-bigcommerce/convert-bigcommerce-product';
import getBigcommerceQueryContext from '@seada.io/bigcommerce/spi/get-bigcommerce-query-context';
import catalogPortClass from '@seada.io/catalog/spi/catalog-port-class';
import { IProductData } from '@seada.io/catalog/interface/product';
import getSourceIdByPortClass from '@seada.io/core/spi/get-source-id-by-port-class';

export interface IRelatedProductsListDataProviderInputProps {
    productId?: string;
}

const relatedProductsList: IDataProvider<IRelatedProductsListDataProviderResult> = (
    component: IPageComponentDefinition<IRelatedProductsListDataProviderInputProps>,
    pageData: IPageData,
    variables: IVariables
) => {
    const entityId = parseInt(component.props?.productId || (variables?.product as IProductData)?.id, 10);

    return {
        operationId: `bigcommerce-related-products-list:${entityId}`,
        propsDependencies: ['entityId'],
        loader: async () => {
            if (!entityId) {
                return {
                    products: [],
                };
            }

            const sourceId = getSourceIdByPortClass(catalogPortClass, pageData);
            const queryContext = getBigcommerceQueryContext(sourceId, pageData);

            const res = await graphqlBigcommerceQuery(queryContext, {
                query: QUERY_RELATED_PRODUCTS,
                variables: {
                    entityId,
                },
            });

            const products = res.data.site.product.relatedProducts.edges.map((e) => convertBigcommerceProduct(e.node));

            return {
                products,
            };
        },
    };
};

export default relatedProductsList;
