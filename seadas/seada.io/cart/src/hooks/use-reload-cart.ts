import useLoadCartPort from '@seada.io/cart/ports/cart/hooks/use-load-cart-port';
import { useCallback } from 'react';
import useSetCart from '@seada.io/cart/hooks/use-set-cart';
import useAsyncActionResult from '@seada.io/core/hooks/use-async-action-result';

const useReloadCart = () => {
    const loadCartAction = useLoadCartPort();
    const { action: loadCart } = loadCartAction || {};
    const setCart = useSetCart();

    useAsyncActionResult(loadCartAction, (cart) => {
        setCart(cart);
    });

    return useCallback(() => {
        if (!loadCart) return;
        loadCart();
    }, [loadCart]);
};

export default useReloadCart;
