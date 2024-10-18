import getTwBreakpointWidths from '@seada.io/core/spi/tw/get-tw-breakpoint-widths';

const getTwBreakpointByWidth = (width: number): string => {
    const breakpointsWidth = getTwBreakpointWidths();

    const sortedBreakpoints = Object.keys(breakpointsWidth).sort((a, b) => breakpointsWidth[a] - breakpointsWidth[b]);
    const res = sortedBreakpoints.find((breakpoint) => breakpointsWidth[breakpoint] >= width);
    return res || sortedBreakpoints[sortedBreakpoints.length];
};

export default getTwBreakpointByWidth;
