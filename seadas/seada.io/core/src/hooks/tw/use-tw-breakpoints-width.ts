import { useMemo } from 'react';
import getTwBreakpointWidths from '@seada.io/core/spi/tw/get-tw-breakpoint-widths';

const useTwBreakpointsWidth = (): Record<string, number> => useMemo(getTwBreakpointWidths, []);

export default useTwBreakpointsWidth;
