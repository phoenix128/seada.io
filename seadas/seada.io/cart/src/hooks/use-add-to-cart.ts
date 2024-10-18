import { IAddToCartRequest, ICartData } from '@seada.io/cart/interface/cart';
import { useCallback } from 'react';
import useAddToCartPort from '@seada.io/cart/ports/cart/hooks/use-add-to-cart-port';
import useSetCart from '@seada.io/cart/hooks/use-set-cart';
import useCartId from '@seada.io/cart/hooks/use-cart-id';
import useAsyncActionResult from '@seada.io/core/hooks/use-async-action-result';
import useToast from '@seada.io/core/hooks/use-toast';
import { useTranslation } from 'react-i18next';

type ICartRequestWithOptionalCartId = Omit<IAddToCartRequest, 'cartId'> & { cartId?: string };

export interface IUseAddToCart {
    addToCart: (cartRequest: ICartRequestWithOptionalCartId) => void;
    loading: boolean;
    cart: ICartData | null;
    error: any;
}

const useAddToCart = (): IUseAddToCart => {
    const setCart = useSetCart();
    const addToCartActions = useAddToCartPort();
    const { action, data, loading, error } = addToCartActions;
    const cartId = useCartId();

    const toast = useToast();
    const { t } = useTranslation();

    const addToCart = useCallback(
        (cartRequest: IAddToCartRequest) => {
            action({
                ...cartRequest,
                cartId: cartRequest?.cartId ?? cartId,
            });
        },
        [action, cartId]
    );

    useAsyncActionResult(
        addToCartActions,
        (cart: ICartData) => {
            toast(t('commerceUi.cart.addToCartSuccess'), { type: 'success' });
            setCart(cart);
        },
        'commerceUi.cart.addToCartFailed'
    );

    return { addToCart, loading, cart: data, error };
};

export default useAddToCart;
