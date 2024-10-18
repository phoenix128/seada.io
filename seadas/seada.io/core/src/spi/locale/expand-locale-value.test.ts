import expandLocaleValue from '@seada.io/core/spi/locale/expand-locale-value';

describe('expandLocaleValue', () => {
    it('should expand a single value to main locale', () => {
        const locales = ['it_IT', 'en_US', 'fr_FR'];
        const data = 'test';
        const expanded = expandLocaleValue(data, locales);
        expect(expanded).toEqual({
            it_IT: 'test',
        });
    });

    it('should expand an array value to all locales', () => {
        const locales = ['it_IT', 'en_US', 'fr_FR'];
        const data = ['test1', 'test2', 'test3'];
        const expanded = expandLocaleValue(data, locales);
        expect(expanded).toEqual({
            it_IT: ['test1', 'test2', 'test3'],
        });
    });

    it('should expand a partially localized value to all locales, considering the first locale as default', () => {
        const locales = ['it_IT', 'en_US', 'fr_FR'];
        const data = {
            it_IT: 'test',
            en_US: 'test2',
        };
        const expanded = expandLocaleValue(data, locales);
        expect(expanded).toEqual({
            it_IT: 'test',
            en_US: 'test2',
        });
    });

    it('should expand a fully localized value to all locales', () => {
        const locales = ['it_IT', 'en_US', 'fr_FR'];
        const data = {
            it_IT: 'test',
            en_US: 'test2',
            fr_FR: 'test3',
        };
        const expanded = expandLocaleValue(data, locales);
        expect(expanded).toEqual({
            it_IT: 'test',
            en_US: 'test2',
            fr_FR: 'test3',
        });
    });

    it('should not fail if data is null', () => {
        const locales = ['it_IT', 'en_US', 'fr_FR'];
        const data = null;
        const expanded = expandLocaleValue(data, locales);
        expect(expanded).toEqual({});
    });

    it('should not fail if data is undefined', () => {
        const locales = ['it_IT', 'en_US', 'fr_FR'];
        const data = undefined;
        const expanded = expandLocaleValue(data, locales);
        expect(expanded).toEqual({});
    });
});
