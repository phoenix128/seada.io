import compactDimensionedValue from '@seada.io/core-schema/service/compact-dimensioned-value';

describe('compactDimensionedValue', () => {
    it('should compact to a single value if all elements are equal', () => {
        const result = compactDimensionedValue([1, 1, 1, 1]);
        expect(result).toEqual(1);
    });

    it('should compact to a multiple if a recurring pattern is found', () => {
        const result = compactDimensionedValue([1, 2, 1, 2]);
        expect(result).toEqual([1, 2]);
    });

    it('should return the raw list if no pattern is matched', () => {
        const result = compactDimensionedValue([1, 2, 3, 4]);
        expect(result).toEqual([1, 2, 3, 4]);
    });

    it('should return the raw list if no pattern is matched, even if a value is the same', () => {
        const result = compactDimensionedValue([1, 2, 3, 1]);
        expect(result).toEqual([1, 2, 3, 1]);
    });
});
