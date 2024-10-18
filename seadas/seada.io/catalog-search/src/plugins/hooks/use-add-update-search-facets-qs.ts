import { IPlugin } from '@seada.io/core/interface';
import useUpdateFacetsQsPort, {
    IUseUpdateFacetsQsAdapter,
} from '@seada.io.source/catalog/ports/catalog/hooks/use-update-facets-qs-port';
import usePageData from '@seada.io/core/hooks/use-page-data';
import useAdapterHook from '@seada.io/core/hooks/use-adapter-hook';
import searchPortClass from '@seada.io/search/spi/search-port-class';
import useDefaultUpdateFacetsQs from '@seada.io/catalog/hooks/facets/use-default-update-facets-qs';

/**
 * Add update search facets qs for search port class depending on page type
 * @param callback
 */
const useAddUpdateSearchFacetsQs: IPlugin<typeof useUpdateFacetsQsPort, 100> = (callback) => {
    const { pageType } = usePageData();

    const searchAdapterHook = useAdapterHook<IUseUpdateFacetsQsAdapter>(
        searchPortClass,
        'use-update-facets-qs',
        useDefaultUpdateFacetsQs
    );

    if (pageType === 'search') {
        return searchAdapterHook;
    }

    return callback();
};

export default useAddUpdateSearchFacetsQs;
