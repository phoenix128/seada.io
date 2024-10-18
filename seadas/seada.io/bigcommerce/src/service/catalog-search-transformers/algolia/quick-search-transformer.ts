import { stripHtml } from 'string-strip-html';
import { ICatalogQuickSearchTransformer } from '@seada.io/catalog-search/spi/catalog-quick-search-transformer';
import { SearchResponse } from '@algolia/client-search';
import { IQuickSearchResult } from '@seada.io/search/interface/quick-search';

const quickSearchTransformer: ICatalogQuickSearchTransformer<SearchResponse> = (response): IQuickSearchResult => {
    return {
        results: [
            {
                title: 'bigcommerce.quickSearch.products',
                items: response.hits.map((hit: any) => ({
                    id: hit.product_id.toString(),
                    key: hit.sku,
                    sku: hit.sku,
                    title: stripHtml(hit.name).result,
                    description: stripHtml(hit.description).result,
                    url: hit.url,
                    imageUrl: hit.image_url,
                })),
            },
        ],
    };
};

export default quickSearchTransformer;
