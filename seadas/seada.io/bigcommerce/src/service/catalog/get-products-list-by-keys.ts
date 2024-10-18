import getIdsBySkus from '@seada.io/bigcommerce/service/catalog/get-ids-by-skus';
import graphqlBigcommerceQuery from '@seada.io/bigcommerce/spi/graphql/graphql-bigcommerce-query';
import { QUERY_PRODUCTS_LIST } from '@seada.io/bigcommerce/gql/queries/query-product';
import convertBigcommerceProduct from '@seada.io/bigcommerce/service/converters/from-bigcommerce/convert-bigcommerce-product';
import { IBigCommerceQueryContext } from '@seada.io/bigcommerce/spi/bigcommerce-query-context';
import bigcommerceQueryCacheWrapper from '@seada.io/bigcommerce/service/cache/bigcommerce-query-cache-wrapper';

const getProductsListByKeys = async (context: IBigCommerceQueryContext, productKeys: string[]) => {
    if (!productKeys?.length) {
        return [];
    }

    const cacheKey = `products-list-by-keys:${productKeys.join(',')}`;

    try {
        return bigcommerceQueryCacheWrapper(context, cacheKey, async () => {
            const productIds = await getIdsBySkus(context, productKeys);

            const res = await graphqlBigcommerceQuery(context, {
                query: QUERY_PRODUCTS_LIST,
                variables: {
                    entityIds: Object.values(productIds),
                },
            });

            // We need to map the products to the original order and allowing duplicates
            const itemsList = res.data.site.products.edges.map((e) => convertBigcommerceProduct(e.node));
            const itemsByKey = itemsList.reduce((acc, item) => {
                acc[item.key] = item;
                return acc;
            }, {});

            return productKeys.map((id) => itemsByKey[id]).filter((item) => item);
        });
    } catch (e) {
        console.error(e);
        return [];
    }
};

export default getProductsListByKeys;
