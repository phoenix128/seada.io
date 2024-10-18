import useAdapterHook, { IUseAdapterProxyHook } from '@seada.io/core/hooks/use-adapter-hook';
import { IAsyncActionCall } from '@seada.io/core/hooks/use-async-action';
import useAsyncActionCallStaticResponse from '@seada.io/core/hooks/use-async-action-call-static-response';
import cartPortClass from '@seada.io/cart/spi/cart-port-class';

export interface IUseGetCheckoutUrlAdapter {
    (): IAsyncActionCall<() => Promise<string>>;
}

const useGetCheckoutUrlPort: IUseAdapterProxyHook<IUseGetCheckoutUrlAdapter> = () => {
    const fallbackHook = useAsyncActionCallStaticResponse<string>('/checkout');
    return useAdapterHook<IUseGetCheckoutUrlAdapter>(cartPortClass, 'use-get-checkout-url', fallbackHook);
};

export default useGetCheckoutUrlPort;
