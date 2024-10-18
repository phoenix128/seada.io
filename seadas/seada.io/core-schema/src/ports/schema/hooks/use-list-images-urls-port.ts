import { IUseAdapterProxyHook, useContextUnawareAdapterHook } from '@seada.io/core/hooks/use-adapter-hook';
import { IAsyncActionCall } from '@seada.io/core/hooks/use-async-action';
import useAsyncActionCallStaticResponse from '@seada.io/core/hooks/use-async-action-call-static-response';
import schemaPortClass from '@seada.io/core-schema/spi/schema-port-class';

export interface IImage {
    name: string;
    url: string;
}

export interface IUseListImagesUrls {
    (): IAsyncActionCall<() => Promise<IImage[]>>;
}

const useListImagesUrlsPort: IUseAdapterProxyHook<IUseListImagesUrls> = () => {
    const fallbackHook = useAsyncActionCallStaticResponse<IImage[]>([]);

    return useContextUnawareAdapterHook<IUseListImagesUrls>(
        'core-schema',
        schemaPortClass,
        'use-list-images-urls',
        fallbackHook
    );
};

export default useListImagesUrlsPort;
