import useAsyncAction from '@seada.io/core/hooks/use-async-action';
import { useMemo } from 'react';
import { IUseQuickSearchAdapter } from '@seada.io/search/ports/search/hooks/use-quick-search-port';
import quickSearch from '@seada.io/algolia/server-actions/quick-search';
import useAlgoliaQueryContext from '@seada.io/algolia/hooks/use-algolia-query-context';
import searchPortClass from '@seada.io/search/spi/search-port-class';

const useQuickSearch: IUseQuickSearchAdapter = () => {
    const queryContext = useAlgoliaQueryContext(searchPortClass);
    const fn = useMemo(
        () => (searchString: string, maxResults: number) => quickSearch(queryContext, searchString, maxResults),
        [queryContext]
    );

    return useAsyncAction(fn);
};

export default useQuickSearch;
