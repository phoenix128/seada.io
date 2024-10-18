import { IFacet } from '@seada.io/catalog/interface/facet';
import { useCallback } from 'react';
import useModifySearchParams from '@seada.io/core/hooks/use-modify-search-params';
import { IUseUpdateFacetsQsAdapter } from '@seada.io/catalog/ports/catalog/hooks/use-update-facets-qs-port';
import buildQsFromFacets from '@seada.io/catalog/service/facets/build-qs-from-facets';

const useDefaultUpdateFacetsQs: IUseUpdateFacetsQsAdapter = () => {
    const modifyQs = useModifySearchParams({
        phpArrays: true,
        scroll: false,
    });

    return useCallback(
        (facets: IFacet[]) => {
            modifyQs(buildQsFromFacets(facets));
        },
        [modifyQs]
    );
};

export default useDefaultUpdateFacetsQs;
