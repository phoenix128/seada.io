import { IUseAdapterProxyHook, useContextUnawareAdapterHook } from '@seada.io/core/hooks/use-adapter-hook';
import { useMemo } from 'react';
import schemaPortClass from '@seada.io/core-schema/spi/schema-port-class';

export interface IUseCurrentTwBreakpoint {
    (): string;
}

/**
 * This hook is intended to be only used in schema components
 */
const useCurrentTwBreakpointPort: IUseAdapterProxyHook<IUseCurrentTwBreakpoint> = () => {
    const fallbackHook = useMemo(() => () => 'default', []);
    const res = useContextUnawareAdapterHook<IUseCurrentTwBreakpoint>(
        'core-schema',
        schemaPortClass,
        'use-current-tw-breakpoint',
        fallbackHook
    );

    if (typeof res !== 'string' && res !== null) {
        return 'default';
    }

    return res;
};

export default useCurrentTwBreakpointPort;
