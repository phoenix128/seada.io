import { IUseLoadCartAdapter } from '@seada.io/cart/ports/cart/hooks/use-load-cart-port';
import useAsyncAction from '@seada.io/core/hooks/use-async-action';
import loadCart from '@seada.io/bigcommerce/server-actions/load-cart';
import { useMemo } from 'react';
import useBigcommerceQueryContext from '@seada.io/bigcommerce/hooks/use-bigcommerce-query-context';
import useCartId from '@seada.io/cart/hooks/use-cart-id';
import cartPortClass from '@seada.io/cart/spi/cart-port-class';

const useLoadCart: IUseLoadCartAdapter = (): ReturnType<IUseLoadCartAdapter> => {
    const context = useBigcommerceQueryContext(cartPortClass);
    const cartId = useCartId();

    const fn = useMemo(
        () => () => {
            return loadCart(context, cartId);
        },
        [cartId, context]
    );

    return useAsyncAction(fn);
};

export default useLoadCart;
