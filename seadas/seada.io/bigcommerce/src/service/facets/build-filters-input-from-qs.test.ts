import buildFiltersInputFromQs from './build-filters-input-from-qs';

describe('buildFiltersInputFromQs', () => {
    it('should build filters input from query string', () => {
        const qs = {
            brand: '1',
            color: ['red', 'blue'],
            size: 'medium',
        };

        const allowedProductAttributesFilters = ['color', 'size'];

        const expectedOutput = {
            brandEntityIds: [1],
            productAttributes: [
                { attribute: 'color', values: ['red', 'blue'] },
                { attribute: 'size', values: ['medium'] },
            ],
        };

        expect(buildFiltersInputFromQs(qs, allowedProductAttributesFilters)).toEqual(expectedOutput);
    });

    it('should handle empty query string', () => {
        const qs = {};

        const allowedProductAttributesFilters = ['color', 'size'];

        const expectedOutput = {};

        expect(buildFiltersInputFromQs(qs, allowedProductAttributesFilters)).toEqual(expectedOutput);
    });

    it('should handle query string with unknown attributes', () => {
        const qs = {
            brand: '1',
            color: 'red',
            price: '100',
        };

        const allowedProductAttributesFilters = ['color', 'size'];

        const expectedOutput = {
            brandEntityIds: [1],
            productAttributes: [{ attribute: 'color', values: ['red'] }],
        };

        expect(buildFiltersInputFromQs(qs, allowedProductAttributesFilters)).toEqual(expectedOutput);
    });
});
