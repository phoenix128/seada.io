import { IResponsiveValue } from '@seada.io/core/spi/tw/get-tw-responsive-style';
import { useMemo } from 'react';
import getTwSelectedBreakpoint from '@seada.io/core/spi/tw/get-tw-selected-breakpoint';

const useTwSelectedBreakpoint = (data: IResponsiveValue, breakpoint: string): string => {
    return useMemo(() => getTwSelectedBreakpoint(data, breakpoint), [data, breakpoint]);
};

export default useTwSelectedBreakpoint;
