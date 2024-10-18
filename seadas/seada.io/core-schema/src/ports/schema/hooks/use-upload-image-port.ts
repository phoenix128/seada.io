import { IUseAdapterProxyHook, useContextUnawareAdapterHook } from '@seada.io/core/hooks/use-adapter-hook';
import { IAsyncActionCall } from '@seada.io/core/hooks/use-async-action';
import useAsyncActionCallStaticResponse from '@seada.io/core/hooks/use-async-action-call-static-response';
import schemaPortClass from '@seada.io/core-schema/spi/schema-port-class';

export interface IUseUploadImageAdapter {
    (): IAsyncActionCall<(files: File[]) => Promise<void>>;
}

const useUploadImagePort: IUseAdapterProxyHook<IUseUploadImageAdapter> = () => {
    const fallbackHook = useAsyncActionCallStaticResponse();
    return useContextUnawareAdapterHook<IUseUploadImageAdapter>(
        'core-schema',
        schemaPortClass,
        'use-upload-image',
        fallbackHook
    );
};

export default useUploadImagePort;
