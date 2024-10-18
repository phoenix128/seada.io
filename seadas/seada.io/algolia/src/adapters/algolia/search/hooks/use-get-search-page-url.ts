import { IUseGetSearchPageUrlAdapter } from '@seada.io/search/ports/search/hooks/use-get-search-page-url-port';
import useAreaPath from '@seada.io/core/hooks/use-area-path';

const useGetSearchPageUrl: IUseGetSearchPageUrlAdapter = () => {
    const url = useAreaPath('/search');
    return (searchTerm) => url + `?search=${encodeURIComponent(searchTerm)}`;
};

export default useGetSearchPageUrl;
