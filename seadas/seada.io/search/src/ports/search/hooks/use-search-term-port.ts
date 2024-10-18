import { useMemo } from 'react';
import useAdapterHook, { IUseAdapterProxyHook } from '@seada.io/core/hooks/use-adapter-hook';
import searchPortClass from '@seada.io/search/spi/search-port-class';

export interface IUseGetSearchTermAdapter {
    (): string;
}

const useSearchTermPort: IUseAdapterProxyHook<IUseGetSearchTermAdapter> = () => {
    const fallbackHook = useMemo(() => () => '', []);
    return useAdapterHook<IUseGetSearchTermAdapter>(searchPortClass, 'use-search-term', fallbackHook);
};

export default useSearchTermPort;
