import useAdapterHook, { IUseAdapterProxyHook } from '@seada.io/core/hooks/use-adapter-hook';
import { IAsyncActionCall } from '@seada.io/core/hooks/use-async-action';
import useAsyncActionCallStaticResponse from '@seada.io/core/hooks/use-async-action-call-static-response';
import cartPortClass from '@seada.io/cart/spi/cart-port-class';

export interface IUseGetCartUrlAdapter {
    (): IAsyncActionCall<() => Promise<string>>;
}

const useGetCartUrlPort: IUseAdapterProxyHook<IUseGetCartUrlAdapter> = () => {
    const fallbackHook = useAsyncActionCallStaticResponse<string>('/cart');
    return useAdapterHook<IUseGetCartUrlAdapter>(cartPortClass, 'use-get-cart-url', fallbackHook);
};

export default useGetCartUrlPort;
