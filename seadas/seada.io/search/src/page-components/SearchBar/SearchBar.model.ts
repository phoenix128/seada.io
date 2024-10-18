import { ISearchBarSchema } from '@seada.io/search/page-components/SearchBar/schema';
import useQuickSearchPort from '@seada.io/search/ports/search/hooks/use-quick-search-port';
import { useCallback, useDeferredValue, useEffect, useState } from 'react';
import useGoToUrl from '@seada.io/core/hooks/use-go-to-url';
import useGetSearchPageUrlPort from '@seada.io/search/ports/search/hooks/use-get-search-page-url-port';
import useSearchTermPort from '@seada.io/search/ports/search/hooks/use-search-term-port';
import { IPageComponentSchemaProps } from '@seada.io/core-schema/spi/components/interface';

const useSearchBarModel = (props: IPageComponentSchemaProps<ISearchBarSchema>) => {
    const initialSearchTerm = useSearchTermPort();
    const gotoUrl = useGoToUrl();
    const { data: searchResults, action: search, error, loading } = useQuickSearchPort();
    const [searchString, setSearchString] = useState(initialSearchTerm);
    const { maxResults = 10, minChars = 2 } = props;
    const getSearchUrl = useGetSearchPageUrlPort();

    const handleSelectResult = useCallback(
        (key: string) => {
            if (!key || !searchResults?.results) {
                return;
            }

            for (const result of searchResults.results) {
                const item = result.items.find((result) => result.key === key);
                if (item) {
                    gotoUrl(item.url);
                    return;
                }
            }
        },
        [gotoUrl, searchResults?.results]
    );

    const handleSearchChange = useCallback((newSearchString: string) => {
        setSearchString(newSearchString);
    }, []);

    const handleGoToSearchResult = useCallback(() => {
        const url = getSearchUrl(searchString);
        if (url) {
            gotoUrl(url);
        }
    }, [getSearchUrl, gotoUrl, searchString]);

    const deferredSearchString = useDeferredValue(searchString);
    useEffect(() => {
        if (deferredSearchString.length < minChars || searchString.length < minChars) {
            return;
        }

        search(deferredSearchString, maxResults);
    }, [deferredSearchString, maxResults, minChars, search, searchString.length]);

    return {
        data: {
            searchString,
            searchResults,
            error,
            loading,
        },
        handlers: {
            handleSearchChange,
            handleGoToSearchResult,
            handleSelectResult,
        },
    };
};

export default useSearchBarModel;
