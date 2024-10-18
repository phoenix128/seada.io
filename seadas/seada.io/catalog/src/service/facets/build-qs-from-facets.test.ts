import { EFacetRangeMode, EFacetType, IFacet } from '@seada.io/catalog/interface/facet';
import buildQsFromFacets from './build-qs-from-facets';

describe('buildQsFromFacets', () => {
    it('should build query string for Options and Swatches facet types', () => {
        const facets: IFacet[] = [
            {
                type: EFacetType.Options,
                label: 'Color',
                code: 'color',
                values: [
                    { label: 'Red', code: 'red', count: 10, checked: true },
                    { label: 'Blue', code: 'blue', count: 5 },
                    { label: 'Green', code: 'green', count: 7, checked: true },
                ],
                multiple: true,
            },
            {
                type: EFacetType.Swatches,
                label: 'Size',
                code: 'size',
                values: [
                    { label: 'Small', code: 'S', count: 15, checked: true },
                    { label: 'Large', code: 'L', count: 20 },
                ],
                multiple: false,
            },
            {
                type: EFacetType.Range,
                mode: EFacetRangeMode.Input,
                label: 'Price',
                code: 'price',
                allowedRange: { min: 0, max: 1000 },
                selectedRange: { min: 100, max: 500 },
            },
        ];

        expect(buildQsFromFacets(facets)).toEqual({
            'color[]': ['red', 'green'],
            max_price: '500',
            min_price: '100',
            size: ['S'],
        });
    });

    it('should return an undefined value when no facets are checked', () => {
        const facets: IFacet[] = [
            {
                type: EFacetType.Options,
                label: 'Color',
                code: 'color',
                values: [
                    { label: 'Red', code: 'red', count: 10 },
                    { label: 'Blue', code: 'blue', count: 5 },
                    { label: 'Green', code: 'green', count: 7 },
                ],
                multiple: true,
            },
        ];

        expect(buildQsFromFacets(facets)).toEqual({ 'color[]': undefined });
    });

    it('should not include the price range in the query string when no price range is selected', () => {
        const facets: IFacet[] = [
            {
                type: EFacetType.Options,
                label: 'Color',
                code: 'color',
                values: [
                    { label: 'Red', code: 'red', count: 10, checked: true },
                    { label: 'Blue', code: 'blue', count: 5 },
                    { label: 'Green', code: 'green', count: 7 },
                ],
                multiple: true,
            },
            {
                type: EFacetType.Range,
                mode: EFacetRangeMode.Input,
                label: 'Price',
                code: 'price',
                allowedRange: { min: 0, max: 1000 },
                selectedRange: { min: undefined, max: undefined },
            },
        ];

        expect(buildQsFromFacets(facets)).toEqual({ color: ['red'] });
    });

    it('should include a partial price range in the query string when only the min price is selected', () => {
        const facets: IFacet[] = [
            {
                type: EFacetType.Options,
                label: 'Color',
                code: 'color',
                values: [
                    { label: 'Red', code: 'red', count: 10, checked: true },
                    { label: 'Blue', code: 'blue', count: 5 },
                    { label: 'Green', code: 'green', count: 7 },
                ],
                multiple: true,
            },
            {
                type: EFacetType.Range,
                mode: EFacetRangeMode.Input,
                label: 'Price',
                code: 'price',
                allowedRange: { min: 0, max: 1000 },
                selectedRange: { min: 100, max: undefined },
            },
        ];

        expect(buildQsFromFacets(facets)).toEqual({
            color: ['red'],
            max_price: undefined,
            min_price: '100',
        });
    });

    it('should include a partial price range in the query string when only the max price is selected', () => {
        const facets: IFacet[] = [
            {
                type: EFacetType.Options,
                label: 'Color',
                code: 'color',
                values: [
                    { label: 'Red', code: 'red', count: 10, checked: true },
                    { label: 'Blue', code: 'blue', count: 5 },
                    { label: 'Green', code: 'green', count: 7 },
                ],
                multiple: true,
            },
            {
                type: EFacetType.Range,
                mode: EFacetRangeMode.Input,
                label: 'Price',
                code: 'price',
                allowedRange: { min: 0, max: 1000 },
                selectedRange: { min: undefined, max: 500 },
            },
        ];

        expect(buildQsFromFacets(facets)).toEqual({
            color: ['red'],
            max_price: '500',
            min_price: undefined,
        });
    });
});
