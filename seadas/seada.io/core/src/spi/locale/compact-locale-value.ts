import { ILocalizableValue } from '@seada.io/core/spi/get-localizable-value';
import { IValueType } from '@seada.io/core/spi/tw/get-tw-classes';

const compactResponsiveValue = (
    data: ILocalizableValue,
    allLocales: string[]
): ILocalizableValue | IValueType | IValueType[] => {
    if (data === undefined || data === null) {
        return {};
    }

    const mainLocale = allLocales[0];

    if (Object.keys(data).length === 1 && data[mainLocale] !== undefined) {
        return data[mainLocale];
    }

    return data;
};

export default compactResponsiveValue;
