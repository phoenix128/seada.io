import { IQuickSearchResult } from '@seada.io/search/interface/quick-search';
import getSourceConfigValue from '@seada.io/core/libs/get-source-config-value';
import getCatalogQuickSearchTransformers from '@seada.io/catalog-search/spi/get-catalog-quick-search-transformers';

export interface ICatalogQuickSearchTransformersCollection {
    [key: string]: ICatalogQuickSearchTransformer;
}

export interface ICatalogQuickSearchTransformer<TResult = any> {
    (items: TResult): IQuickSearchResult;
}

/**
 * Transforms the search results to Seada.io catalog format depending on the transformer type
 * @param sourceId
 * @param result
 */
const catalogQuickSearchTransformer = <TResult = any>(sourceId: string, result: TResult): IQuickSearchResult => {
    const transformers = getCatalogQuickSearchTransformers();
    const transformerCode = getSourceConfigValue(sourceId, 'transformer');
    const transformer = transformers?.[transformerCode];

    if (!transformer) {
        throw new Error(`No ${transformerCode} quick search transformer found`);
    }

    return transformer(result);
};

export default catalogQuickSearchTransformer;
