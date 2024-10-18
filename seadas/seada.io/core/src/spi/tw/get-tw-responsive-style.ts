import getTwClasses, { IOptions, IValueType } from '@seada.io/core/spi/tw/get-tw-classes';
import getTwBreakpoints from '@seada.io/core/spi/tw/get-tw-breakpoints';
import { twMerge } from 'tailwind-merge';

export type IResponsiveValueWithBreakpoints<TData = IValueType | IValueType[]> = {
    default?: TData;
    sm?: TData;
    md?: TData;
    lg?: TData;
    xl?: TData;
    ['2xl']?: TData;
};

export type IResponsiveValue<TData = IValueType | IValueType[]> = IResponsiveValueWithBreakpoints<TData> | TData;

/**
 * Generate tailwind properties
 * @param sourceValue
 * @param classTemplates
 * @param options
 */
const getTwResponsiveStyle = (
    sourceValue: IResponsiveValue | IValueType,
    classTemplates: string | string[] | string[][],
    options?: IOptions
): string => {
    const breakpoints = getTwBreakpoints();

    if (sourceValue == undefined || classTemplates == undefined) return null;

    if (typeof sourceValue === 'string' || typeof sourceValue === 'number' || Array.isArray(sourceValue)) {
        return twMerge(getTwClasses(sourceValue, classTemplates, options));
    }

    // Breakpoint are sorted by sorting policy
    const firstBreakpoint = breakpoints.find((breakpointPrefix) => sourceValue.hasOwnProperty(breakpointPrefix));

    if (!firstBreakpoint) {
        return null;
    }

    return twMerge(
        breakpoints.reduce<string[]>((acc, key) => {
            if (sourceValue.hasOwnProperty(key)) {
                return acc.concat(
                    getTwClasses(sourceValue[key], classTemplates, options).map((twClass) =>
                        key == firstBreakpoint ? twClass : `${key}:${twClass}`
                    )
                );
            }

            return acc;
        }, [])
    );
};

export default getTwResponsiveStyle;
