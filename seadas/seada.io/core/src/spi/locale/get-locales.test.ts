/* eslint turbo/no-undeclared-env-vars:0 */

import { clearCache } from '@seada.io/core/libs/get-env-path';
import getLocales from '@seada.io/core/spi/locale/get-locales';

describe('getEnvPath', () => {
    afterEach(() => {
        delete process.env.AREA__IT__LOCALE;
        delete process.env.AREA__EN__LOCALE;
        delete process.env.AREA__EN2__LOCALE;
        delete process.env.AREA__FR__LOCALE;

        clearCache();
    });

    beforeEach(() => {
        process.env.AREA__IT__LOCALE = 'it_IT';
        process.env.AREA__EN__LOCALE = 'en_US';
        process.env.AREA__EN2__LOCALE = 'en_US';
        process.env.AREA__FR__LOCALE = 'fr_FR';

        clearCache();
    });

    it('should fetch the correct locales', () => {
        const locales = getLocales();
        expect(locales).toEqual(['it_IT', 'en_US', 'fr_FR']);
    });
});
