import getTwBreakpointByWidth from '@seada.io/core/spi/tw/get-tw-breakpoint-by-width';
import { useMemo } from 'react';

const useTwBreakpointByWidth = (width: number): string => useMemo(() => getTwBreakpointByWidth(width), [width]);

export default useTwBreakpointByWidth;
