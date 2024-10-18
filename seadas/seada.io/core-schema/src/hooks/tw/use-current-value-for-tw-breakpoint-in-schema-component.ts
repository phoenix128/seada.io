import { IResponsiveValueWithBreakpoints } from '@seada.io/core/spi/tw/get-tw-responsive-style';
import { IValueType } from '@seada.io/core/spi/tw/get-tw-classes';
import { useMemo } from 'react';
import useCurrentTwBreakpointPort from '@seada.io/core-schema/ports/schema/hooks/use-current-tw-breakpoint-port';
import useTwSelectedBreakpoint from '@seada.io/core/hooks/tw/use-tw-selected-breakpoint';
import expandResponsiveValue from '@seada.io/core/spi/tw/expand-responsive-value';

/**
 * This hook is intended to be only used in schema components
 */
const useCurrentValueForTwBreakpointInSchemaComponent = <TData = string>(
    inData: IResponsiveValueWithBreakpoints | IValueType | IValueType[]
): TData => {
    const data = useMemo(() => expandResponsiveValue(inData), [inData]);

    const breakpoint = useCurrentTwBreakpointPort();
    const usingBreakpoint = useTwSelectedBreakpoint(data, breakpoint);

    return JSON.parse(JSON.stringify(data?.[breakpoint] ?? data?.[usingBreakpoint] ?? null));
};

export default useCurrentValueForTwBreakpointInSchemaComponent;
