import useAdapterHook, { IUseAdapterProxyHook } from '@seada.io/core/hooks/use-adapter-hook';
import { IAddToCartRequest, ICartData } from '@seada.io/cart/interface/cart';
import { IAsyncActionCall } from '@seada.io/core/hooks/use-async-action';
import useAsyncActionCallStaticResponse from '@seada.io/core/hooks/use-async-action-call-static-response';
import cartPortClass from '@seada.io/cart/spi/cart-port-class';

export interface IUseAddToCartActionAdapter {
    (): IAsyncActionCall<(request: IAddToCartRequest) => Promise<ICartData>>;
}

const useAddToCartPort: IUseAdapterProxyHook<IUseAddToCartActionAdapter> = () => {
    const fallbackHook = useAsyncActionCallStaticResponse<ICartData>({} as ICartData);
    return useAdapterHook<IUseAddToCartActionAdapter>(cartPortClass, 'use-add-to-cart', fallbackHook);
};

export default useAddToCartPort;
