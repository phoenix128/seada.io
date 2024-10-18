'use server';

import { IBigCommerceQueryContext } from '@seada.io/bigcommerce/spi/bigcommerce-query-context';
import { IQuickSearchResult } from '@seada.io/search/interface/quick-search';
import graphqlBigcommerceQuery from '@seada.io/bigcommerce/spi/graphql/graphql-bigcommerce-query';
import { QUERY_SEARCH_PRODUCTS_WITH_FACETS } from '@seada.io/bigcommerce/gql/queries/query-search-products';
import { SearchProductsFiltersInput } from '@seada.io/bigcommerce/gql/schema/graphql';

const quickSearch = async (
    queryContext: IBigCommerceQueryContext,
    search: string,
    limit: number
): Promise<IQuickSearchResult> => {
    if (limit > 50) {
        throw new Error('Limit is too high');
    }

    const filters: SearchProductsFiltersInput = {
        searchTerm: search,
    };

    const res = await graphqlBigcommerceQuery(queryContext, {
        query: QUERY_SEARCH_PRODUCTS_WITH_FACETS,
        variables: {
            after: null,
            first: limit,
            filters,
        },
    });

    return {
        results: [
            {
                title: 'bigcommerce.quickSearch.products',
                items: res.data.site.search.searchProducts.products.edges.map((edge) => ({
                    id: edge.node.entityId.toString(),
                    key: edge.node.sku.toString(),
                    title: edge.node.name,
                    description: edge.node.plainTextDescription,
                    url: edge.node.path,
                    imageUrl: edge.node.defaultImage?.url,
                })),
            },
        ],
    };
};

export default quickSearch;
