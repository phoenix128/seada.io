import { IFacet } from '@seada.io/catalog/interface/facet';
import getQsParamFromFacet from '@seada.io/catalog/service/facets/get-qs-param-from-facet';

/**
 * Default interpretation of the facets query string
 * @param facets
 */
const buildQsFromFacets = (facets: IFacet[]): Record<string, string | string[] | undefined> => {
    return facets.reduce<Record<string, string | string[] | undefined>>((acc, facet) => {
        const res = getQsParamFromFacet(facet);
        if (res) {
            if (Array.isArray(res)) {
                acc[`${facet.code}[]`] = res;
            } else {
                acc[facet.code] = res;
            }
        }

        return acc;
    }, {});
};

export default buildQsFromFacets;
