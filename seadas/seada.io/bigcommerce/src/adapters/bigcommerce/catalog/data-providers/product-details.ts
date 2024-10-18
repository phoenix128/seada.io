import { IDataProvider, IPageData, IVariables } from '@seada.io/core/spi/components/interface';
import { IPageComponentDefinition } from '@seada.io/core/spi/seada-pages/interface';
import graphqlBigcommerceQuery from '@seada.io/bigcommerce/spi/graphql/graphql-bigcommerce-query';
import { QUERY_PRODUCT_DETAILS } from '@seada.io/bigcommerce/gql/queries/query-product';
import convertBigcommerceProduct from '@seada.io/bigcommerce/service/converters/from-bigcommerce/convert-bigcommerce-product';
import { IProductDetailsDataProviderResult } from '@seada.io/catalog/ports/catalog/data-providers/product-details';
import getBigcommerceQueryContext from '@seada.io/bigcommerce/spi/get-bigcommerce-query-context';
import catalogPortClass from '@seada.io/catalog/spi/catalog-port-class';
import { IProductData } from '@seada.io/catalog/interface/product';
import getSourceIdByPortClass from '@seada.io/core/spi/get-source-id-by-port-class';

export interface IProductDetailsDataProviderInputProps {
    productKey: string;
}

const productDetails: IDataProvider<IProductDetailsDataProviderResult> = (
    component: IPageComponentDefinition<IProductDetailsDataProviderInputProps>,
    pageData: IPageData,
    variables: IVariables
) => {
    const fromProps =
        component.props?.productKey &&
        (Array.isArray(component.props?.productKey) ? component.props?.productKey[0] : component.props?.productKey);
    const sku = fromProps || (variables?.product as IProductData)?.key;

    return {
        operationId: `bigcommerce-product-details:${sku}`,
        propsDependencies: ['productKey'],
        loader: async () => {
            if (!sku) {
                return {
                    product: null,
                };
            }

            const sourceId = getSourceIdByPortClass(catalogPortClass, pageData);
            const queryContext = getBigcommerceQueryContext(sourceId, pageData);

            const res = await graphqlBigcommerceQuery(queryContext, {
                query: QUERY_PRODUCT_DETAILS,
                variables: {
                    sku,
                },
            });

            const product = convertBigcommerceProduct(res.data.site.product);

            return {
                product,
            };
        },
    };
};

export default productDetails;
