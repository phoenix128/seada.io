import { IDataProvider, IPageData, IVariables } from '@seada.io/core/spi/components/interface';
import { IPageComponentDefinition } from '@seada.io/core/spi/seada-pages/interface';
import { IProductsListDataProviderResult } from '@seada.io/catalog/ports/catalog/data-providers/products-list';
import catalogPortClass from '@seada.io/catalog/spi/catalog-port-class';
import { ICategoryData } from '@seada.io/catalog/interface/category';
import getSourceIdByPortClass from '@seada.io/core/spi/get-source-id-by-port-class';
import getAlgoliaQueryContext from '@seada.io/algolia/spi/get-algolia-query-context';
import searchPortClass from '@seada.io/search/spi/search-port-class';
import getAlgoliaIndex from '@seada.io/algolia/spi/get-algolia-index';
import catalogSearchResultTransformer from '@seada.io/catalog-search/spi/catalog-search-result-transformer';
import buildFiltersInputFromQs from '@seada.io/algolia/service/facets/build-filters-input-from-qs';

const MAX_PAGE_SIZE = 50;

const propsDependencies = ['productKeys', 'productsPerPage'];

/**
 * Explicit products list response
 * @param component
 * @param pageData
 * @param variables
 */
const explicitProductsList: IDataProvider<IProductsListDataProviderResult> = (
    component: IPageComponentDefinition<IProductsListDataProviderInputProps>,
    pageData: IPageData,
    variables: IVariables
) => {
    const productKeys = component.props.productKeys?.filter((id: string | null) => id?.trim()) || [];
    const operationId = `algolia:explicit-products-list:${JSON.stringify(productKeys)}`;
    const sourceId = getSourceIdByPortClass(catalogPortClass, pageData);

    return {
        operationId,
        propsDependencies,
        loader: async () => {
            const queryContext = getAlgoliaQueryContext(sourceId, pageData);
            const items = [];

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
 * Category products list response
 * @param component
 * @param pageData
 * @param variables
 */
const searchProductsList: IDataProvider<IProductsListDataProviderResult> = (
    component: IPageComponentDefinition<IProductsListDataProviderInputProps>,
    pageData: IPageData,
    variables: IVariables
) => {
    const { searchParams } = pageData;

    const { props } = component;

    const page = parseInt(searchParams.page || '1', 10) - 1;
    const limit = parseInt(searchParams.limit || props.productsPerPage?.toString() || '10', 10);

    const fixedCategoryEntityId = parseInt((variables?.category as ICategoryData)?.id, 10);
    const operationId = `algolia:products-list:${JSON.stringify([searchParams, page, limit, fixedCategoryEntityId])}`;

    return {
        operationId,
        propsDependencies,
        loader: async () => {
            const searchTerm = searchParams['search'];

            if (!searchTerm) {
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

            const sourceId = getSourceIdByPortClass(searchPortClass, pageData);
            const queryContext = getAlgoliaQueryContext(sourceId, pageData);
            const index = getAlgoliaIndex(queryContext);
            const filters = buildFiltersInputFromQs(searchParams);

            const clampLimit = Math.min(limit, MAX_PAGE_SIZE);

            const result = await index.search(searchTerm, {
                facets: ['*'],
                page,
                hitsPerPage: clampLimit,
                facetFilters: filters,
            });

            return {
                productsList: catalogSearchResultTransformer(pageData, result),
            };
        },
    };
};

export interface IProductsListDataProviderInputProps {
    productKeys?: string[];
    referenceComponent?: string;
    productsPerPage?: number;
}

const productsList: IDataProvider<IProductsListDataProviderResult> = (
    component: IPageComponentDefinition<IProductsListDataProviderInputProps>,
    pageData: IPageData,
    variables: IVariables
) => {
    // Explicit products list
    if (component.props?.productKeys && component.props.productKeys.length > 0) {
        return explicitProductsList(component, pageData, variables);
    }

    return searchProductsList(component, pageData, variables);
};

export default productsList;
