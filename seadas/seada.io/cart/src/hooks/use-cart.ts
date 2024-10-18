import { useCallback, useContext, useEffect, useMemo } from 'react';
import { ICartData } from '@seada.io/cart/interface/cart';
import CartContext from '@seada.io/cart/contexts/CartContext';
import useLoadCartPort from '@seada.io/cart/ports/cart/hooks/use-load-cart-port';
import useAsyncActionResult from '@seada.io/core/hooks/use-async-action-result';
import { ECartStatus } from '@seada.io/cart/contexts/CartContext/CartContext';
import useCartId from '@seada.io/cart/hooks/use-cart-id';
import useCartSourceId from '@seada.io/cart/hooks/use-cart-source-id';
import useSetCart from '@seada.io/cart/hooks/use-set-cart';

/**
 * Returns the cart
 */
const useCart = (): ICartData => {
    const { carts, cartStatuses } = useContext(CartContext);
    const sourceId = useCartSourceId();
    const cartId = useCartId();
    const loadCartAction = useLoadCartPort();
    const { action: loadCart } = loadCartAction;
    const setCart = useSetCart();

    useEffect(() => {
        if (cartStatuses.current.hasOwnProperty(sourceId) || cartStatuses.current[sourceId] === ECartStatus.LOADING) {
            return;
        }

        cartStatuses.current[sourceId] = ECartStatus.LOADING;
        console.log('Loading cart for ' + sourceId);
        loadCart();
    }, [cartId, cartStatuses, loadCart, sourceId]);

    const onCartError = useCallback(
        (error: Error) => {
            setCart(undefined);
        },
        [setCart]
    );

    useAsyncActionResult(
        loadCartAction,
        (cart) => {
            if (!cart || !cart.cartId) {
                onCartError(undefined);
                return;
            }

            cartStatuses.current[sourceId] = ECartStatus.READY;
            setCart(cart);
        },
        onCartError
    );

    return useMemo(() => carts?.[sourceId], [carts, sourceId]);
};

export default useCart;
