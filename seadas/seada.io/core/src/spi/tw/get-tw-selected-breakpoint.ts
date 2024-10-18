import { IResponsiveValue } from '@seada.io/core/spi/tw/get-tw-responsive-style';
import getTwBreakpoints from '@seada.io/core/spi/tw/get-tw-breakpoints';

/**
 * Get the closest defined breakpoint to the current width
 * @param data
 * @param breakpoint
 */
const getTwSelectedBreakpoint = (data: IResponsiveValue, breakpoint: string): string => {
    if (typeof data === 'string' || typeof data === 'number' || Array.isArray(data)) {
        return 'default';
    }

    if (
        data?.hasOwnProperty(breakpoint) &&
        data[breakpoint] !== undefined &&
        data[breakpoint] !== null &&
        data[breakpoint] !== ''
    ) {
        return breakpoint;
    }

    const allBreakpoints = getTwBreakpoints();
    const breakpointIndex = allBreakpoints.findIndex((breakpointPrefix) => breakpointPrefix === breakpoint);
    if (breakpointIndex === -1) {
        return 'default';
    }

    for (let i = breakpointIndex - 1; i >= 0; i--) {
        const breakpointPrefix = allBreakpoints[i];
        if (data?.hasOwnProperty(breakpointPrefix)) {
            return breakpointPrefix;
        }
    }

    return 'default';
};

export default getTwSelectedBreakpoint;
