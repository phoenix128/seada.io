import expandResponsiveValue from '@seada.io/core/spi/tw/expand-responsive-value';
import { IValueType } from '@seada.io/core/spi/tw/get-tw-classes';
import { IResponsiveValueWithBreakpoints } from '@seada.io/core/spi/tw/get-tw-responsive-style';

describe('expandResponsiveValue', () => {
    it('should return an empty object when data is undefined', () => {
        expect(expandResponsiveValue(undefined)).toEqual({});
    });

    it('should return an empty object when data is null', () => {
        expect(expandResponsiveValue(null)).toEqual({});
    });

    it('should return an object with default key when data is an array', () => {
        const data: IValueType[] = ['value1', 'value2'];
        expect(expandResponsiveValue(data)).toEqual({
            default: data,
        });
    });

    it('should return an object with default key when data is a string', () => {
        const data: IValueType = 'value';
        expect(expandResponsiveValue(data)).toEqual({
            default: data,
        });
    });

    it('should return an object with default key when data is a number', () => {
        const data: IValueType = 123;
        expect(expandResponsiveValue(data)).toEqual({
            default: data,
        });
    });

    it('should return the original data when data is already an object with breakpoints', () => {
        const data: IResponsiveValueWithBreakpoints = {
            default: 'value',
            sm: 'smallValue',
            md: 'mediumValue',
        };
        expect(expandResponsiveValue(data)).toEqual(data);
    });
});
