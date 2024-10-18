import compactResponsiveValue from '@seada.io/core-schema/service/compact-responsive-value';

describe('compactResponsiveValue', () => {
    it('returns an empty object if input is undefined', () => {
        expect(compactResponsiveValue(undefined)).toEqual({});
    });

    it('returns an empty object if input is null', () => {
        expect(compactResponsiveValue(null)).toEqual({});
    });

    it('returns the value of the default key if it is the only key present', () => {
        const input = { default: 'baseValue' };
        expect(compactResponsiveValue(input)).toBe('baseValue');
    });

    it('returns the original object if multiple keys are present', () => {
        const input = { default: 'baseValue', sm: 'smallValue' };
        expect(compactResponsiveValue(input)).toEqual(input);
    });

    it('returns the original object if default key is not present', () => {
        const input = { sm: 'smallValue', md: 'mediumValue' };
        expect(compactResponsiveValue(input)).toEqual(input);
    });

    it('handles cases where the only key other than default is another breakpoint', () => {
        const input = { default: 'baseValue', lg: 'largeValue' };
        expect(compactResponsiveValue(input)).toEqual(input);
    });

    it('returns the original object even when default is undefined and multiple other keys are present', () => {
        const input = { default: undefined, sm: 'smallValue', md: 'mediumValue' };
        expect(compactResponsiveValue(input)).toEqual(input);
    });
});
