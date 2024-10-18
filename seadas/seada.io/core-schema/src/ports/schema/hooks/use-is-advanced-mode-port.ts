import { IUseAdapterProxyHook, useContextUnawareAdapterHook } from '@seada.io/core/hooks/use-adapter-hook';
import { useMemo } from 'react';
import schemaPortClass from '@seada.io/core-schema/spi/schema-port-class';

export interface IUseIsAdvancedMode {
    (): boolean;
}

/**
 * This hook is intended to be only used in schema components
 */
const useIsAdvancedModePort: IUseAdapterProxyHook<IUseIsAdvancedMode> = () => {
    const fallbackHook = useMemo(() => () => true, []);
    return useContextUnawareAdapterHook<IUseIsAdvancedMode>(
        'core-schema',
        schemaPortClass,
        'use-is-advanced-mode',
        fallbackHook
    );
};

export default useIsAdvancedModePort;
