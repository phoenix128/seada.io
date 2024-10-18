import useAdapterHook, { IUseAdapterProxyHook } from '@seada.io/core/hooks/use-adapter-hook';
import { IAsyncActionCall } from '@seada.io/core/hooks/use-async-action';
import { ICartData } from '@seada.io/cart/interface/cart';
import useAsyncActionCallStaticResponse from '@seada.io/core/hooks/use-async-action-call-static-response';
import cartPortClass from '@seada.io/cart/spi/cart-port-class';

export interface IUseLoadCartAdapter {
    (): IAsyncActionCall<() => Promise<ICartData>>;
}

const useLoadCartPort: IUseAdapterProxyHook<IUseLoadCartAdapter> = () => {
    const fallbackHook = useAsyncActionCallStaticResponse<ICartData>({} as ICartData);
    return useAdapterHook<IUseLoadCartAdapter>(cartPortClass, 'use-load-cart', fallbackHook);
};

export default useLoadCartPort;
