import { useMemo } from 'react';
import useAdapterHook from '@seada.io/core/hooks/use-adapter-hook';
import userPortClass from '@seada.io/user/spi/user-port-class';

export interface IUseGetLoginUrlAdapter {
    (): () => string;
}

const useGetLoginUrlPort = () => {
    const fallbackHook = useMemo<IUseGetLoginUrlAdapter>(() => () => () => '/login', []);
    return useAdapterHook<IUseGetLoginUrlAdapter>(userPortClass, 'use-get-login-url', fallbackHook);
};

export default useGetLoginUrlPort;
