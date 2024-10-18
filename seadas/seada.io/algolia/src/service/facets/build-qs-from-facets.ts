import { EFacetType, IFacet, IFacetOptions, IFacetRange } from '@seada.io/catalog/interface/facet';
import getQsParamFromFacet from '@seada.io/catalog/service/facets/get-qs-param-from-facet';

/**
 * Builds the facets query string
 * @param facets
 */
const buildQsFromFacets = (facets: IFacet[]): Record<string, string | string[] | undefined> => {
    return facets.reduce<Record<string, string | string[] | undefined>>((acc, facet) => {
        if (facet.code === 'price') {
            const facetRange = facet as IFacetRange;

            acc['min_price'] = facetRange.selectedRange?.min?.toString();
            acc['max_price'] = facetRange.selectedRange?.max?.toString();
        } else if (facet.code === 'other') {
            const facetOptions = facet as IFacetOptions;

            for (const facetOptionValue of facetOptions.values) {
                if (facetOptionValue.checked) {
                    acc[facetOptionValue.code] = '1';
                } else {
                    acc[facetOptionValue.code] = undefined;
                }
            }
        } else if (
            facet.type === EFacetType.Options ||
            facet.type === EFacetType.Swatches ||
            facet.type === EFacetType.Ratings
        ) {
            // const facetOptions = facet as IFacetOptions;
            // const selectedValues = facet.values.filter(({ checked }) => checked);
            //
            // const key = selectedValues.length === 1 ? facetOptions.code : facetOptions.code + '[]';
            //
            // if (selectedValues.length === 0) {
            //     acc[key] = undefined; // Deselect
            // } else {
            //     for (const selectedValue of selectedValues) {
            //         acc[key] = acc[key] || [];
            //         (acc[key] as string[]).push(selectedValue.code);
            //     }
            // }

            const res = getQsParamFromFacet(facet);
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
