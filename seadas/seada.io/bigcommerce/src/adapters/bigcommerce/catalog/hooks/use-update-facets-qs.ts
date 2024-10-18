import { IFacet } from '@seada.io/catalog/interface//facet';
import { useCallback } from 'react';
import buildQsFromFacets from '@seada.io/bigcommerce/service/facets/build-qs-from-facets';
import useModifySearchParams from '@seada.io/core/hooks/use-modify-search-params';
import { IUseUpdateFacetsQsAdapter } from '@seada.io/catalog/ports/catalog/hooks/use-update-facets-qs-port';

const useUpdateFacetsQs: IUseUpdateFacetsQsAdapter = () => {
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

export default useUpdateFacetsQs;
