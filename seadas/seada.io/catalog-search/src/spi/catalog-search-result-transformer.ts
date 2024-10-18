import getSourceConfigValue from '@seada.io/core/libs/get-source-config-value';
import { IProductsListData } from '@seada.io/catalog/interface/product';
import { IPageData } from '@seada.io/core/spi/components/interface';
import getSourceIdByPortClass from '@seada.io/core/spi/get-source-id-by-port-class';
import searchPortClass from '@seada.io/search/spi/search-port-class';
import getCatalogSearchResultTransformers from '@seada.io/catalog-search/spi/get-catalog-search-result-transformers';

export interface ICatalogSearchResultTransformersCollection {
    [key: string]: ICatalogSearchResultTransformer;
}

export interface ICatalogSearchResultTransformer<TResult = any> {
    (pageData: IPageData, result: TResult): IProductsListData;
}

/**
 * Transforms the search results to Seada.io catalog format depending on the transformer type
 * @param pageData
 * @param result
 */
const catalogSearchResultTransformer = <TResult = any>(pageData: IPageData, result: TResult): IProductsListData => {
    const transformers = getCatalogSearchResultTransformers();
    const sourceId = getSourceIdByPortClass(searchPortClass, pageData);
    const transformerCode = getSourceConfigValue(sourceId, 'transformer');
    const transformer = transformers?.[transformerCode];

    if (!transformer) {
        throw new Error(`No ${transformerCode} search result transformer found`);
    }

    return transformer(pageData, result);
};

export default catalogSearchResultTransformer;
