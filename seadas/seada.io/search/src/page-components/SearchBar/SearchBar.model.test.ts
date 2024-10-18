import { act, renderHook } from '@testing-library/react';
import useQuickSearchPort from '@seada.io/search/ports/search/hooks/use-quick-search-port';
import useGoToUrl from '@seada.io/core/hooks/use-go-to-url';
import useGetSearchPageUrlPort from '@seada.io/search/ports/search/hooks/use-get-search-page-url-port';
import useSearchTermPort from '@seada.io/search/ports/search/hooks/use-search-term-port';
import useSearchBarModel from '@seada.io/search/page-components/SearchBar/SearchBar.model';
import { ISearchBarSchema } from '@seada.io/search/page-components/SearchBar/schema';
import { IPageComponentSchemaProps } from '@seada.io/core-schema/spi/components/interface';

jest.mock('@seada.io/search/ports/search/hooks/use-quick-search-port');
jest.mock('@seada.io/core/hooks/use-go-to-url');
jest.mock('@seada.io/search/ports/search/hooks/use-get-search-page-url-port');
jest.mock('@seada.io/search/ports/search/hooks/use-search-term-port');

describe('useSearchBarModel', () => {
    const mockInitialSearchTerm = 'initial term';
    const mockSearchResults = [
        { id: 1, name: 'result 1' },
        { id: 2, name: 'result 2' },
    ];
    const mockSearch = jest.fn();
    const mockGotoUrl = jest.fn();
    const mockGetSearchUrl = jest.fn(() => 'http://test.com/search');

    beforeEach(() => {
        jest.clearAllMocks();
        (useSearchTermPort as jest.Mock).mockReturnValue(mockInitialSearchTerm);
        (useQuickSearchPort as jest.Mock).mockReturnValue({
            data: mockSearchResults,
            action: mockSearch,
            error: null,
            loading: false,
        });
        (useGoToUrl as jest.Mock).mockReturnValue(mockGotoUrl);
        (useGetSearchPageUrlPort as jest.Mock).mockReturnValue(mockGetSearchUrl);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should initialize with correct data', () => {
        const props = { maxResults: 10, minChars: 2 } as IPageComponentSchemaProps<ISearchBarSchema>;
        const { result } = renderHook(() => useSearchBarModel(props));

        expect(result.current.data.searchString).toBe(mockInitialSearchTerm);
        expect(result.current.data.searchResults).toBe(mockSearchResults);
        expect(result.current.data.error).toBe(null);
        expect(result.current.data.loading).toBe(false);
    });

    it('should handle search string change correctly', () => {
        const props = { maxResults: 10, minChars: 2 } as IPageComponentSchemaProps<ISearchBarSchema>;
        const { result } = renderHook(() => useSearchBarModel(props));

        act(() => {
            result.current.handlers.handleSearchChange('new term');
        });

        expect(result.current.data.searchString).toBe('new term');
    });

    it('should call search action when search string is long enough', () => {
        const props = { maxResults: 10, minChars: 2 } as IPageComponentSchemaProps<ISearchBarSchema>;
        const { result } = renderHook(() => useSearchBarModel(props));

        mockSearch.mockClear();

        act(() => {
            result.current.handlers.handleSearchChange('search term');
        });

        expect(mockSearch).toHaveBeenCalledWith('search term', 10);
    });

    it('should not call search action when search string is too short', () => {
        const props = { maxResults: 10, minChars: 2 } as IPageComponentSchemaProps<ISearchBarSchema>;
        const { result } = renderHook(() => useSearchBarModel(props));

        mockSearch.mockClear();

        act(() => {
            result.current.handlers.handleSearchChange('a');
        });

        expect(mockSearch).not.toHaveBeenCalled();
    });

    it('should handle go to search result correctly', () => {
        const props = { maxResults: 10, minChars: 2 } as IPageComponentSchemaProps<ISearchBarSchema>;
        const { result } = renderHook(() => useSearchBarModel(props));

        act(() => {
            result.current.handlers.handleSearchChange('search term');
        });

        act(() => {
            result.current.handlers.handleGoToSearchResult();
        });

        expect(mockGetSearchUrl).toHaveBeenCalledWith('search term');
        expect(mockGotoUrl).toHaveBeenCalledWith('http://test.com/search');
    });
});
