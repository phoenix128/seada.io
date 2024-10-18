import { useMemo } from 'react';
import useAdapterHook, { IUseAdapterProxyHook } from '@seada.io/core/hooks/use-adapter-hook';
import searchPortClass from '@seada.io/search/spi/search-port-class';

export interface IUseGetSearchPageUrlAdapter {
    (): (searchTerm: string) => string;
}

const useGetSearchPageUrlPort: IUseAdapterProxyHook<IUseGetSearchPageUrlAdapter> = () => {
    const fallbackHook = useMemo(() => () => (searchTerm: string) => '', []);
    return useAdapterHook<IUseGetSearchPageUrlAdapter>(searchPortClass, 'use-get-search-page-url', fallbackHook);
};

export default useGetSearchPageUrlPort;
