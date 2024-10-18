'use server';

import graphqlBigcommerceQuery from '@seada.io/bigcommerce/spi/graphql/graphql-bigcommerce-query';
import { QUERY_SEARCH_PRODUCTS_WITH_FACETS } from '@seada.io/bigcommerce/gql/queries/query-search-products';
import { IProductData } from '@seada.io/catalog/interface/product';
import convertBigcommerceProduct from '@seada.io/bigcommerce/service/converters/from-bigcommerce/convert-bigcommerce-product';
import { IBigCommerceQueryContext } from '@seada.io/bigcommerce/spi/bigcommerce-query-context';

const searchProducts = async (context: IBigCommerceQueryContext, searchTerm: string): Promise<IProductData[]> => {
    const res = await graphqlBigcommerceQuery(context, {
        query: QUERY_SEARCH_PRODUCTS_WITH_FACETS,
        variables: {
            after: null,
            first: 50,
            filters: {
                searchTerm,
            },
        },
    });

    const { searchProducts } = res.data.site.search;

    return searchProducts.products.edges.map((edge) => {
        return convertBigcommerceProduct(edge.node);
    });
};

export default searchProducts;
