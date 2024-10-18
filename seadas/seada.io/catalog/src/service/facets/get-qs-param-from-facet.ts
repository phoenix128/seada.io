import { EFacetType, IFacet, IFacetRange } from '@seada.io/catalog/interface/facet';

const getQsParamFromFacet = (facet: IFacet): string | string[] | undefined => {
    if (facet.type === EFacetType.Range) {
        const facetRange = facet as IFacetRange;

        const min = facetRange.selectedRange?.min?.toString() || '';
        const max = facetRange.selectedRange?.max?.toString() || '';

        if (min || max) {
            return `${min}-${max}`;
        }
    } else if (
        facet.type === EFacetType.Options ||
        facet.type === EFacetType.Swatches ||
        facet.type === EFacetType.Ratings
    ) {
        const selectedValues = facet.values.filter(({ checked }) => checked);

        if (selectedValues.length === 0) {
            return undefined; // Deselect
        } else {
            const res = [];
            for (const selectedValue of selectedValues) {
                res.push(selectedValue.code);
            }

            return res;
        }
    }

    return undefined;
};

export default getQsParamFromFacet;
