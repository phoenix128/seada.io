import { IAsyncActionCall } from '@seada.io/core/hooks/use-async-action';
import useAdapterHook, { IUseAdapterProxyHook } from '@seada.io/core/hooks/use-adapter-hook';
import useAsyncActionCallStaticResponse from '@seada.io/core/hooks/use-async-action-call-static-response';
import userPortClass from '@seada.io/user/spi/user-port-class';

export interface IUseLoginAdapter {
    (): IAsyncActionCall<(username: string, password: string) => Promise<string>>;
}

const useLoginPort: IUseAdapterProxyHook<IUseLoginAdapter> = () => {
    const fallbackHook = useAsyncActionCallStaticResponse<string>('');
    return useAdapterHook<IUseLoginAdapter>(userPortClass, 'use-login', fallbackHook);
};

export default useLoginPort;
