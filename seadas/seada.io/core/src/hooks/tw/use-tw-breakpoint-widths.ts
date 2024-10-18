import { useMemo } from 'react';
import getTwBreakpointWidths from '@seada.io/core/spi/tw/get-tw-breakpoint-widths';

const useTwBreakpointWidths = () => {
    return useMemo(() => getTwBreakpointWidths(), []);
};

export default useTwBreakpointWidths;
