import compactLocaleValue from '@seada.io/core/spi/locale/compact-locale-value';

describe('compactLocaleValue', () => {
    it('should compact a simple string', () => {
        const locales = ['it_IT'];
        const data = 'test';
        const compacted = compactLocaleValue(data, locales);
        expect(compacted).toEqual(data);
    });

    it('should compact a simple array', () => {
        const locales = ['it_IT'];
        const data = ['test1', 'test2', 'test3'];
        const compacted = compactLocaleValue(data, locales);
        expect(compacted).toEqual(data);
    });

    it('should not compact a partially localized value', () => {
        const locales = ['it_IT', 'en_US', 'fr_FR'];
        const data = {
            it_IT: 'test1',
            en_US: 'test2',
        };
        const compacted = compactLocaleValue(data, locales);
        expect(compacted).toEqual({
            it_IT: 'test1',
            en_US: 'test2',
        });
    });

    it('should compact a fully localized value', () => {
        const locales = ['it_IT', 'en_US', 'fr_FR'];
        const data = {
            it_IT: 'test1',
            en_US: 'test2',
            fr_FR: 'test3',
        };
        const compacted = compactLocaleValue(data, locales);
        expect(compacted).toEqual({
            it_IT: 'test1',
            en_US: 'test2',
            fr_FR: 'test3',
        });
    });
});
