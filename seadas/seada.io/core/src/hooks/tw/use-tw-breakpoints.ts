import { useMemo } from 'react';
import getTwBreakpoints from '@seada.io/core/spi/tw/get-tw-breakpoints';

const useTwBreakpoints = (): string[] => useMemo(getTwBreakpoints, []);

export default useTwBreakpoints;
