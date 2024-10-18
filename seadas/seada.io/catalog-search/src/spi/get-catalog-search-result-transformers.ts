import { ICatalogSearchResultTransformersCollection } from '@seada.io/catalog-search/spi/catalog-search-result-transformer';

const getCatalogSearchResultTransformers = (
    transformers?: ICatalogSearchResultTransformersCollection
): ICatalogSearchResultTransformersCollection => {
    return transformers || {};
};

export default getCatalogSearchResultTransformers;
