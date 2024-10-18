import { IAsyncActionCall } from '@seada.io/core/hooks/use-async-action';
import useAdapterHook, { IUseAdapterProxyHook } from '@seada.io/core/hooks/use-adapter-hook';
import useAsyncActionCallStaticResponse from '@seada.io/core/hooks/use-async-action-call-static-response';
import { IUserData } from '@seada.io/user/interface/user';
import userPortClass from '@seada.io/user/spi/user-port-class';

export interface IUseUpdatePersonalDataAdapter {
    (): IAsyncActionCall<(userData: Partial<IUserData>) => Promise<string>>;
}

const useUpdatePersonalDataPort: IUseAdapterProxyHook<IUseUpdatePersonalDataAdapter> = () => {
    const fallbackHook = useAsyncActionCallStaticResponse<string>('');
    return useAdapterHook<IUseUpdatePersonalDataAdapter>(userPortClass, 'use-update-personal-data', fallbackHook);
};

export default useUpdatePersonalDataPort;
