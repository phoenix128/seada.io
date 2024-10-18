import { IResponsiveValueWithBreakpoints } from '@seada.io/core/spi/tw/get-tw-responsive-style';
import { IValueType } from '@seada.io/core/spi/tw/get-tw-classes';

/**
 * Normalizes the data to always be an object with a default key
 * @param data
 */
const expandResponsiveValue = (
    data: IResponsiveValueWithBreakpoints | IValueType | IValueType[]
): IResponsiveValueWithBreakpoints => {
    if (data === undefined || data === null) {
        return {};
    }

    if (Array.isArray(data) || typeof data === 'string' || typeof data === 'number' || typeof data === 'boolean') {
        return {
            default: data,
        };
    }

    return data as IResponsiveValueWithBreakpoints;
};

export default expandResponsiveValue;
