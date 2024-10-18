import expandDimensionedValue from '@seada.io/core-schema/service/expand-dimensioned-value';

describe('expandDimensionedValue', () => {
    it('should return default values if value is undefined', () => {
        const result = expandDimensionedValue(undefined, 4, 'default');
        expect(result).toEqual(['default', 'default', 'default', 'default']);
    });

    it('should return a full list of items if value dimension is single', () => {
        const result = expandDimensionedValue(1, 4, 'default');
        expect(result).toEqual([1, 1, 1, 1]);
    });

    it('should return a full list of items if value dimension is a single element array', () => {
        const result = expandDimensionedValue([1], 4, 'default');
        expect(result).toEqual([1, 1, 1, 1]);
    });

    it('should return a full list of items if value dimension is double', () => {
        const result = expandDimensionedValue([1, 2], 4, 'default');
        expect(result).toEqual([1, 2, 1, 2]);
    });

    it('should return a full list of items if value dimension is not a multiple', () => {
        const result = expandDimensionedValue([1, 2, 3], 4, 'default');
        expect(result).toEqual([1, 2, 3, 1]);
    });
});
