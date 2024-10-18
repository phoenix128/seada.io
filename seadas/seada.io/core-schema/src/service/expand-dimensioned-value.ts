import { IValueType } from '@seada.io/core/spi/tw/get-tw-classes';

const expandDimensionedValue = (v: IValueType | IValueType[], size: number, defaultValue: IValueType): IValueType[] => {
    if (v === undefined) {
        return Array(size).fill(defaultValue);
    }

    const normalizedValue = Array.isArray(v) ? v : [v];
    const result = [];

    for (let i = 0; i < size; i++) {
        result.push(normalizedValue[i % normalizedValue.length]);
    }

    return result;
};

export default expandDimensionedValue;
