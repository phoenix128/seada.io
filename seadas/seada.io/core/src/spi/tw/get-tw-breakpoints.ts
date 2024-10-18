import getTwBreakpointWidths from '@seada.io/core/spi/tw/get-tw-breakpoint-widths';

let twBreakpoints: string[] = undefined;

export const resetTwBreakpoints = () => {
    twBreakpoints = undefined;
};

/**
 * Get Tailwind breakpoints
 */
const getTwBreakpoints = (): string[] => {
    if (twBreakpoints === undefined) {
        const breakpointsWidth = getTwBreakpointWidths();
        twBreakpoints = Object.keys(breakpointsWidth).sort((a, b) => breakpointsWidth[b] - breakpointsWidth[a]);
    }

    return twBreakpoints;
};

export default getTwBreakpoints;
