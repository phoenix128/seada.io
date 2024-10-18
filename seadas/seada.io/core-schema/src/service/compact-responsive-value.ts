import { IResponsiveValueWithBreakpoints } from '@seada.io/core/spi/tw/get-tw-responsive-style';
import { IValueType } from '@seada.io/core/spi/tw/get-tw-classes';

/**
 * Compacts the data
 * @param data
 */
const compactResponsiveValue = (
    data: IResponsiveValueWithBreakpoints
): IResponsiveValueWithBreakpoints | IValueType | IValueType[] => {
    if (data === undefined || data === null) {
        return {};
    }

    if (Object.keys(data).length === 1 && data.default !== undefined) {
        return data.default;
    }

    return data;
};

export default compactResponsiveValue;
