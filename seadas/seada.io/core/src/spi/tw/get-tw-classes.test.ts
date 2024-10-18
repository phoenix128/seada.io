import getTwClasses from './get-tw-classes';

describe('getTwClasses', () => {
    it('should return a simple tailwind class', () => {
        const classPrefix = 'w-$';

        const value = 1;
        const result = getTwClasses(value, classPrefix, undefined);

        expect(Array.isArray(result)).toBe(true);

        expect(result).toEqual(['w-1']);
    });

    it('should return an array of tailwind classes with multiple values provided', () => {
        const classPrefix = ['w-$', 'h-$'];

        const value = [1, 2];
        const result = getTwClasses(value, classPrefix, undefined);

        expect(Array.isArray(result)).toBe(true);

        expect(result).toEqual(['w-1', 'h-2']);
    });

    it('should allow a larger class prefix than value length replicating through values', () => {
        const classPrefix = ['mt-$', 'mr-$', 'mb-$', 'ml-$'];

        const value = [1, 2];
        const result = getTwClasses(value, classPrefix, undefined);

        expect(Array.isArray(result)).toBe(true);

        expect(result).toEqual(['mt-1', 'mr-2', 'mb-1', 'ml-2']);
    });

    it('should return an empty array if no value is provided', () => {
        const classPrefix = 'w-$';

        const result = getTwClasses(undefined, classPrefix, undefined);

        expect(Array.isArray(result)).toBe(true);

        expect(result).toEqual([]);
    });

    it('should throw an error if the class prefix length is less than the value length', () => {
        const classPrefix = 'w-$';

        const value = [1, 2];
        expect(() => {
            getTwClasses(value, classPrefix, undefined);
        }).toThrowError('Class prefixes length for given values must be greater than or equal to the value length');
    });

    it('should allow a transform function to be applied to the value', () => {
        const classPrefix = 'w-$';

        const value = '1';
        const result = getTwClasses(value, classPrefix, {
            transform: (v: string) => `${v}-transformed`,
        });

        expect(Array.isArray(result)).toBe(true);

        expect(result).toEqual(['w-1-transformed']);
    });

    it('should allow a default value to be provided', () => {
        const classPrefix = 'w-$';

        const value = [undefined];
        const result = getTwClasses(value, classPrefix, { defaultValue: 1 });

        expect(Array.isArray(result)).toBe(true);

        expect(result).toEqual(['w-1']);
    });

    it('should apply dynamic class prefixes', () => {
        const classPrefix = [['m-$'], ['my-$', 'mx-$'], ['mt-$', 'mr-$', 'mb-$', 'ml-$']];

        const value = 1;
        const result = getTwClasses(value, classPrefix, undefined);

        expect(Array.isArray(result)).toBe(true);
        expect(result).toEqual(['m-1']);

        const value2 = [1, 2];
        const result2 = getTwClasses(value2, classPrefix, undefined);

        expect(Array.isArray(result2)).toBe(true);
        expect(result2).toEqual(['my-1', 'mx-2']);

        const value3 = [1, 2, 3, 4];
        const result3 = getTwClasses(value3, classPrefix, undefined);

        expect(Array.isArray(result3)).toBe(true);
        expect(result3).toEqual(['mt-1', 'mr-2', 'mb-3', 'ml-4']);
    });

    it('should match dynamic configuration even if the exact elements number does not match', () => {
        const classPrefix = [['m-$'], ['my-$', 'mx-$'], ['mt-$', 'mr-$', 'mb-$', 'ml-$']];

        const value = [1, 2, 3];
        const result = getTwClasses(value, classPrefix, undefined);

        expect(Array.isArray(result)).toBe(true);
        expect(result).toEqual(['mt-1', 'mr-2', 'mb-3', 'ml-1']);
    });
});
