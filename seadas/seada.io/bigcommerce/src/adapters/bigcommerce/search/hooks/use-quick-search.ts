import useAsyncAction from '@seada.io/core/hooks/use-async-action';
import useBigcommerceQueryContext from '@seada.io/bigcommerce/hooks/use-bigcommerce-query-context';
import { useMemo } from 'react';
import { IUseQuickSearchAdapter } from '@seada.io/search/ports/search/hooks/use-quick-search-port';
import quickSearch from '@seada.io/bigcommerce/server-actions/quick-search';
import catalogPortClass from '@seada.io/catalog/spi/catalog-port-class';

const useQuickSearch: IUseQuickSearchAdapter = () => {
    const queryContext = useBigcommerceQueryContext(catalogPortClass);
    const fn = useMemo(
        () => (searchString: string, maxResults: number) => quickSearch(queryContext, searchString, maxResults),
        [queryContext]
    );

    return useAsyncAction(fn);
};

export default useQuickSearch;
