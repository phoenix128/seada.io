import localizeProps from '@seada.io/core/spi/locale/localize-props';

describe('localizeProps', () => {
    it('should localize properties based on the given locale', () => {
        const props = {
            title: {
                en_US: 'Title in English',
                it_IT: 'Titolo in Italiano',
            },
            description: {
                en_US: 'Description in English',
                it_IT: 'Descrizione in Italiano',
            },
            count: 5,
        };
        const locale = 'it_IT';
        const allLocales = ['en_US', 'it_IT'];

        const localizedProps = localizeProps(props, locale, allLocales);

        expect(localizedProps).toEqual({
            title: 'Titolo in Italiano',
            description: 'Descrizione in Italiano',
            count: 5,
        });
    });

    it('should fall back to the first locale if the current locale is not found', () => {
        const props = {
            title: {
                en_US: 'Title in English',
                it_IT: 'Titolo in Italiano',
            },
            description: {
                en_US: 'Description in English',
                it_IT: 'Descrizione in Italiano',
            },
            count: 5,
        };
        const locale = 'fr_FR';
        const allLocales = ['en_US', 'it_IT'];

        const localizedProps = localizeProps(props, locale, allLocales);

        expect(localizedProps).toEqual({
            title: 'Title in English',
            description: 'Description in English',
            count: 5,
        });
    });

    it('should not conflict with responsive values', () => {
        const props = {
            someProperty: {
                xs: '1',
                sm: '2',
            },
        };
        const locale = 'it_IT';
        const allLocales = ['en_US', 'it_IT'];

        const localizedProps = localizeProps(props, locale, allLocales);

        expect(localizedProps).toEqual(props);
    });

    it('should handle the scenario where the locale and default one is not found', () => {
        const props = {
            title: {
                en_US: 'Title in English',
                it_IT: 'Titolo in Italiano',
            },
            description: {
                en_US: 'Description in English',
                it_IT: 'Descrizione in Italiano',
            },
            count: 5,
        };
        const locale = 'de_DE';
        const allLocales = ['fr_FR', 'en_US', 'it_IT'];

        const localizedProps = localizeProps(props, locale, allLocales);

        expect(localizedProps).toEqual({
            title: 'Title in English',
            description: 'Description in English',
            count: 5,
        });
    });

    it('should handle properties that are not objects', () => {
        const props = {
            title: 'Static Title',
            description: 'Static Description',
            count: 5,
        };
        const locale = 'it_IT';
        const allLocales = ['en_US', 'it_IT'];

        const localizedProps = localizeProps(props, locale, allLocales);

        expect(localizedProps).toEqual({
            title: 'Static Title',
            description: 'Static Description',
            count: 5,
        });
    });

    it('should handle null or undefined values within properties', () => {
        const props = {
            title: {
                en_US: 'Title in English',
                it_IT: null,
            },
            description: {
                en_US: null,
                it_IT: 'Descrizione in Italiano',
            },
            count: 5,
        };
        const locale = 'it_IT';
        const allLocales = ['en_US', 'it_IT'];

        const localizedProps = localizeProps(props, locale, allLocales);

        expect(localizedProps).toEqual({
            title: 'Title in English',
            description: 'Descrizione in Italiano',
            count: 5,
        });
    });
});
