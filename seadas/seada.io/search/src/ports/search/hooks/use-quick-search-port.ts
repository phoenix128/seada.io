import useAdapterHook, { IUseAdapterProxyHook } from '@seada.io/core/hooks/use-adapter-hook';
import { IAsyncActionCall } from '@seada.io/core/hooks/use-async-action';
import useAsyncActionCallStaticResponse from '@seada.io/core/hooks/use-async-action-call-static-response';
import { IQuickSearchResult } from '@seada.io/search/interface/quick-search';
import searchPortClass from '@seada.io/search/spi/search-port-class';

export interface IUseQuickSearchAdapter {
    (): IAsyncActionCall<(search: string, maxResults: number) => Promise<IQuickSearchResult>>;
}

const useQuickSearchPort: IUseAdapterProxyHook<IUseQuickSearchAdapter> = () => {
    const fallbackHook = useAsyncActionCallStaticResponse<IQuickSearchResult>({ results: [] });
    return useAdapterHook<IUseQuickSearchAdapter>(searchPortClass, 'use-quick-search', fallbackHook);
};

export default useQuickSearchPort;
