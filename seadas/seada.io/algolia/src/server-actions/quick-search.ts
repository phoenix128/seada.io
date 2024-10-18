'use server';

import { IQuickSearchResult } from '@seada.io/search/interface/quick-search';
import { IAlgoliaQueryContext } from '@seada.io/algolia/spi/algolia-query-context';
import getAlgoliaIndex from '@seada.io/algolia/spi/get-algolia-index';
import catalogQuickSearchTransformer from '@seada.io/catalog-search/spi/catalog-quick-search-transformer';

const quickSearch = async (
    queryContext: IAlgoliaQueryContext,
    search: string,
    limit: number
): Promise<IQuickSearchResult> => {
    const index = getAlgoliaIndex(queryContext);
    const res = await index.search(search, {
        hitsPerPage: limit,
    });

    if (!res.hits) return { results: [] };
    return catalogQuickSearchTransformer(queryContext.sourceId, res);
};

export default quickSearch;
