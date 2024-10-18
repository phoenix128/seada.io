import { ILocalizableValue } from '@seada.io/core/spi/get-localizable-value';

/**
 * Expands a localizable value to include all locales
 * @param data
 * @param allLocales
 */
const expandLocaleValue = (data: ILocalizableValue, allLocales: string[]): ILocalizableValue => {
    if (data === undefined || data === null) {
        return {};
    }

    const mainLocale = allLocales[0];
    if (Array.isArray(data) || typeof data === 'string' || typeof data === 'number' || typeof data === 'boolean') {
        return {
            [mainLocale]: data,
        };
    }

    return data;
};

export default expandLocaleValue;
