import { IPageData } from '@seada.io/core/spi/components/interface';
import { IUseAdapterProxyHook, useContextUnawareAdapterHook } from '@seada.io/core/hooks/use-adapter-hook';
import schemaPortClass from '@seada.io/core-schema/spi/schema-port-class';

export interface IUsePageDataAdapter {
    (): IPageData;
}

const usePageDataPort: IUseAdapterProxyHook<IUsePageDataAdapter> = () => {
    const fallbackHook = () => undefined;
    return useContextUnawareAdapterHook<IUsePageDataAdapter>(
        'core-schema',
        schemaPortClass,
        'use-page-data',
        fallbackHook
    );
};

export default usePageDataPort;
