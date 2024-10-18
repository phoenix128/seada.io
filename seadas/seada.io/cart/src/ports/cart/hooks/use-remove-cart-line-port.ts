import useAdapterHook, { IUseAdapterProxyHook } from '@seada.io/core/hooks/use-adapter-hook';
import { ICartData, IRemoveCartLineRequest } from '@seada.io/cart/interface/cart';
import { IAsyncActionCall } from '@seada.io/core/hooks/use-async-action';
import useAsyncActionCallStaticResponse from '@seada.io/core/hooks/use-async-action-call-static-response';
import cartPortClass from '@seada.io/cart/spi/cart-port-class';

export interface IUseRemoveCartLineAdapter {
    (): IAsyncActionCall<(request: IRemoveCartLineRequest) => Promise<ICartData>>;
}

const useRemoveCartLine: IUseAdapterProxyHook<IUseRemoveCartLineAdapter> = () => {
    const fallbackHook = useAsyncActionCallStaticResponse<ICartData>({} as ICartData);
    return useAdapterHook<IUseRemoveCartLineAdapter>(cartPortClass, 'use-remove-cart-line', fallbackHook);
};

export default useRemoveCartLine;
