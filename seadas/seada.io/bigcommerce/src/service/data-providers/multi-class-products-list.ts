import { IPageData, IVariables } from '@seada.io/core/spi/components/interface';
import { IPageComponentDefinition } from '@seada.io/core/spi/seada-pages/interface';
import graphqlBigcommerceQuery from '@seada.io/bigcommerce/spi/graphql/graphql-bigcommerce-query';
import convertBigcommerceProduct from '@seada.io/bigcommerce/service/converters/from-bigcommerce/convert-bigcommerce-product';
import convertBigcommerceFacet from '@seada.io/bigcommerce/service/converters/from-bigcommerce/convert-bigcommerce-facet';
import {
    ProductAttributeSearchFilter,
    SearchProductFilter,
    SearchProductsFiltersInput,
    SearchProductsSortInput,
} from '@seada.io/bigcommerce/gql/schema/graphql';
import {
    QUERY_SEARCH_CURSOR_CRAWLER,
    QUERY_SEARCH_PRODUCTS_WITH_FACETS,
} from '@seada.io/bigcommerce/gql/queries/query-search-products';
import buildFiltersInputFromQs from '@seada.io/bigcommerce/service/facets/build-filters-input-from-qs';
import getBigcommerceQueryContext from '@seada.io/bigcommerce/spi/get-bigcommerce-query-context';
import catalogPortClass from '@seada.io/catalog/spi/catalog-port-class';
import { ICategoryData } from '@seada.io/catalog/interface/category';
import getProductsListByKeys from '@seada.io/bigcommerce/service/catalog/get-products-list-by-keys';
import getSourceIdByPortClass from '@seada.io/core/spi/get-source-id-by-port-class';

const MAX_PAGE_SIZE = 50;

const propsDependencies = ['productKeys', 'productsPerPage'];

/**
 * A special thanks to BigCommerce for not supporting pagination in products search ;)
 * We are joking, we love you BigC!
 * @param pageData
 * @param page
 * @param limit
 * @param filters
 * @param sort
 */
const fetchStartingCursorByPage = async (
    pageData: IPageData,
    page: number,
    limit: number,
    filters: SearchProductsFiltersInput,
    sort: SearchProductsSortInput
): Promise<string | null> => {
    // Run a minimal query to get the total items only
    if (page <= 1) {
        return null;
    }

    const sourceId = getSourceIdByPortClass(catalogPortClass, pageData);
    const queryContext = getBigcommerceQueryContext(sourceId, pageData);

    let cursor = null;
    for (let i = 1; i < page; i++) {
        const crawlerResponse = await graphqlBigcommerceQuery(queryContext, {
            query: QUERY_SEARCH_CURSOR_CRAWLER,
            variables: {
                filters,
                sort,
                after: cursor,
                first: limit,
            },
        });

        const { pageInfo } = crawlerResponse.data.site.search.searchProducts.products;

        cursor = pageInfo.endCursor;
        if (pageInfo.hasNextPage === false) {
            return null;
        }
    }

    return cursor;
};

/**
 * Explicit products list response
 * @param component
 * @param pageData
 * @param portClass
 * @param variables
 */
const explicitProductsList = (
    component: IPageComponentDefinition<IProductsListDataProviderInputProps>,
    pageData: IPageData,
    portClass: string,
    variables: IVariables
) => {
    const productKeys = component.props.productKeys?.filter((id: string | null) => id?.trim()) || [];
    const operationId = `bigcommerce:explicit-products-list:${JSON.stringify(productKeys)}`;
    const sourceId = getSourceIdByPortClass(portClass, pageData);

    return {
        operationId,
        propsDependencies,
        loader: async () => {
            const queryContext = getBigcommerceQueryContext(sourceId, pageData);
            const items = await getProductsListByKeys(queryContext, productKeys);

            return {
                productsList: {
                    products: items,
                    facets: [],
                    pagination: {
                        totalItems: items.length,
                        totalPages: 1,
                        currentPage: 1,
                        limit: items.length,
                    },
                },
            };
        },
    };
};

/**
 * Get allowed product attributes filters
 * @param pageData
 * @param variables
 */
const getAllowedProductAttributesFilters = async (pageData: IPageData, variables: IVariables): Promise<string[]> => {
    const sourceId = getSourceIdByPortClass(catalogPortClass, pageData);
    const queryContext = getBigcommerceQueryContext(sourceId, pageData);

    const categoryEntityId = parseInt((variables?.category as ICategoryData)?.id, 10);
    const searchTerm = pageData.searchParams['search_query'];

    const filters: SearchProductsFiltersInput = {};
    if (categoryEntityId) {
        filters.categoryEntityId = categoryEntityId;
    }
    if (searchTerm) {
        filters.searchTerm = searchTerm;
    }

    if (!Object.keys(filters).length) {
        return [];
    }

    // Seems like there is no other way to retrieve valid filters than sending a query before the real one
    const resWithoutFilters = await graphqlBigcommerceQuery(queryContext, {
        query: QUERY_SEARCH_PRODUCTS_WITH_FACETS,
        variables: {
            page: 1,
            limit: 1,
            filters,
        },
    });

    return resWithoutFilters.data.site.search.searchProducts.filters.edges.reduce<string[]>((acc, filterEdge) => {
        const filter = filterEdge.node;
        const { __typename: typename } = filter as SearchProductFilter & {
            __typename: string;
        };
        if (typename === 'ProductAttributeSearchFilter') {
            acc.push((filter as ProductAttributeSearchFilter).filterName);
        }
        return acc;
    }, []);
};

/**
 * Category products list response
 * @param component
 * @param pageData
 * @param portClass
 * @param variables
 */
const searchProductsList = (
    component: IPageComponentDefinition<IProductsListDataProviderInputProps>,
    pageData: IPageData,
    portClass: string,
    variables: IVariables
) => {
    const { searchParams } = pageData;
    const { props } = component;

    const page = parseInt(searchParams.page || '1', 10);
    const limit = parseInt(searchParams.limit || props.productsPerPage?.toString() || '10', 10);

    const fixedCategoryEntityId = parseInt((variables?.category as ICategoryData)?.id, 10);
    const operationId = `bigcommerce:products-list:${JSON.stringify([
        searchParams,
        page,
        limit,
        fixedCategoryEntityId,
    ])}`;

    return {
        operationId,
        propsDependencies,
        loader: async () => {
            const allowedProductAttributesFilters = await getAllowedProductAttributesFilters(pageData, variables);
            const facetFilters = buildFiltersInputFromQs(searchParams, allowedProductAttributesFilters);

            const filters: SearchProductsFiltersInput = {
                ...facetFilters,
            };

            if (fixedCategoryEntityId) {
                filters.categoryEntityId = fixedCategoryEntityId;
            }
            if (searchParams['search_query']) {
                filters.searchTerm = searchParams['search_query'];
            }

            if (!Object.keys(filters).length) {
                return {
                    productsList: {
                        products: [],
                        facets: [],
                        pagination: {
                            totalItems: 0,
                            totalPages: 0,
                            currentPage: 0,
                            limit: 0,
                        },
                    },
                };
            }

            const sort: SearchProductsSortInput = undefined;
            const cursor = await fetchStartingCursorByPage(pageData, page, limit, filters, null);

            const sourceId = getSourceIdByPortClass(portClass, pageData);
            const queryContext = getBigcommerceQueryContext(sourceId, pageData);
            const res = await graphqlBigcommerceQuery(queryContext, {
                query: QUERY_SEARCH_PRODUCTS_WITH_FACETS,
                variables: {
                    after: cursor,
                    first: limit,
                    filters,
                },
            });

            const { searchProducts } = res.data.site.search;

            const products = searchProducts.products.edges.map((e) => convertBigcommerceProduct(e.node));
            const facets = searchProducts.filters.edges.map((e) => convertBigcommerceFacet(e.node));

            const clampLimit = Math.min(limit, MAX_PAGE_SIZE);
            const clampPage = Math.max(1, page);
            const totalItems = searchProducts.products.collectionInfo.totalItems;
            const totalPages = Math.ceil(totalItems / clampLimit);
            const currentPage = Math.min(clampPage, totalPages);

            return {
                productsList: {
                    products,
                    facets,
                    pagination: {
                        totalItems,
                        currentPage,
                        totalPages,
                        limit: clampLimit,
                    },
                },
            };
        },
    };
};

export interface IProductsListDataProviderInputProps {
    productKeys?: string[];
    referenceComponent?: string;
    productsPerPage?: number;
}

const multiClassProductsList = (
    component: IPageComponentDefinition<IProductsListDataProviderInputProps>,
    pageData: IPageData,
    portClass: string,
    variables: IVariables
) => {
    // Explicit products list
    if (component.props?.productKeys && component.props.productKeys.length > 0) {
        return explicitProductsList(component, pageData, portClass, variables);
    }

    return searchProductsList(component, pageData, portClass, variables);
};

export default multiClassProductsList;
