import { IQuickSearchResult } from '@seada.io/search/interface/quick-search';
import { IAlgoliaQueryContext } from '@seada.io/algolia/spi/algolia-query-context';
import getSourceConfigValue from '@seada.io/core/libs/get-source-config-value';
import { IProductData } from '@seada.io/catalog/interface/product';
import { Hit } from '@algolia/client-search';

export interface ISearchTransformer {
    [ETransformerType.QUICK_SEARCH]: (hits: Hit<any>[]) => IQuickSearchResult;
    [ETransformerType.PRODUCTS_LIST]: (hits: Hit<any>[]) => IProductData[];
}

export interface ISearchTransformersCollection {
    [key: string]: ISearchTransformer;
}

export enum ETransformerType {
    QUICK_SEARCH = 'quickSearch',
    PRODUCTS_LIST = 'productsList',
}

/**
 * Transforms the search results depending on the transformer type
 * @param algoliaQueryContext
 * @param transformerType
 * @param searchResults
 * @param transformers
 */
const searchTransformer = (
    algoliaQueryContext: IAlgoliaQueryContext,
    transformerType: ETransformerType,
    searchResults: any,
    transformers?: ISearchTransformersCollection
): IQuickSearchResult | IProductData[] => {
    const { sourceId } = algoliaQueryContext;
    const transformerAdapterCode = getSourceConfigValue(sourceId, 'transformer');
    const transformer = transformers?.[transformerAdapterCode];

    if (!transformer) {
        throw new Error(`No valid Algolia search transformer found for sourceId: ${sourceId}`);
    }

    return transformer[transformerType](searchResults);
};

export default searchTransformer;
