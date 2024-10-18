import { IFacet } from '@seada.io/catalog/interface/facet';
import useAdapterHook, { IUseAdapterProxyHook } from '@seada.io/core/hooks/use-adapter-hook';
import catalogPortClass from '@seada.io/catalog/spi/catalog-port-class';
import useDefaultUpdateFacetsQs from '@seada.io/catalog/hooks/facets/use-default-update-facets-qs';

export interface IUseUpdateFacetsQsAdapter {
    (): (facets: IFacet[]) => void;
}

const useUpdateFacetsQsPort: IUseAdapterProxyHook<IUseUpdateFacetsQsAdapter> = () => {
    return useAdapterHook<IUseUpdateFacetsQsAdapter>(
        catalogPortClass,
        'use-update-facets-qs',
        useDefaultUpdateFacetsQs
    );
};

export default useUpdateFacetsQsPort;
