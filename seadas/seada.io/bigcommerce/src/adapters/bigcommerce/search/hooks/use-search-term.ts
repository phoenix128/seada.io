import UsePageData from '@seada.io/core/hooks/use-page-data';
import { IUseGetSearchTermAdapter } from '@seada.io/search/ports/search/hooks/use-search-term-port';

const useSearchTerm: IUseGetSearchTermAdapter = () => {
    const { searchParams } = UsePageData();
    return searchParams['search_query'] || '';
};

export default useSearchTerm;
