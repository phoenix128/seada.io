import { ICatalogQuickSearchTransformersCollection } from '@seada.io/catalog-search/spi/catalog-quick-search-transformer';

const getCatalogQuickSearchTransformers = (
    transformers?: ICatalogQuickSearchTransformersCollection
): ICatalogQuickSearchTransformersCollection => {
    return transformers || {};
};

export default getCatalogQuickSearchTransformers;
