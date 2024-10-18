import { IResponsiveValue } from '@seada.io/core/spi/tw/get-tw-responsive-style';
import useTwBreakpoint from '@seada.io/core/hooks/tw/use-tw-breakpoint';
import { useMemo } from 'react';
import expandResponsiveValue from '@seada.io/core/spi/tw/expand-responsive-value';
import useTwSelectedBreakpoint from '@seada.io/core/hooks/tw/use-tw-selected-breakpoint';

const useTwResponsiveValue = <TData = string>(inData: IResponsiveValue): TData => {
    const data = useMemo(() => expandResponsiveValue(inData), [inData]);

    const breakpoint = useTwBreakpoint();
    const usingBreakpoint = useTwSelectedBreakpoint(data, breakpoint);

    return useMemo(() => data?.[breakpoint] || data?.[usingBreakpoint] || null, [data, breakpoint, usingBreakpoint]);
};

export default useTwResponsiveValue;
