import { useMemo } from 'react';
import useAdapterHook from '@seada.io/core/hooks/use-adapter-hook';
import userPortClass from '@seada.io/user/spi/user-port-class';

export interface IUseGetPersonalAreaUrlAdapter {
    (): () => string;
}

const useGetPersonalAreaUrlPort = () => {
    const fallbackHook = useMemo<IUseGetPersonalAreaUrlAdapter>(() => () => () => '/account', []);
    return useAdapterHook<IUseGetPersonalAreaUrlAdapter>(userPortClass, 'use-get-personal-area-url', fallbackHook);
};

export default useGetPersonalAreaUrlPort;
