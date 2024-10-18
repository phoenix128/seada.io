import { ICartData, IRemoveCartLineRequest } from '@seada.io/cart/interface/cart';
import { useCallback } from 'react';
import useRemoveCartLinePort from '@seada.io/cart/ports/cart/hooks/use-remove-cart-line-port';
import useCartId from '@seada.io/cart/hooks/use-cart-id';
import useAsyncActionResult from '@seada.io/core/hooks/use-async-action-result';
import toast from '@seada.io/core/components/Toast';
import { useTranslation } from 'react-i18next';
import useSetCart from '@seada.io/cart/hooks/use-set-cart';

type IUseRemoveCartLineWithOptionalCartId = Omit<IRemoveCartLineRequest, 'cartId'> & { cartId?: string };

export interface IUseRemoveCartLine {
    removeCartLine: (removeRequest: IUseRemoveCartLineWithOptionalCartId) => void;
    loading: boolean;
    cart: ICartData | null;
    error: any;
}

const useRemoveCartLine = (): IUseRemoveCartLine => {
    const setCart = useSetCart();
    const removeCartLineActions = useRemoveCartLinePort();
    const { action, data, loading, error } = removeCartLineActions;
    const cartId = useCartId();
    const { t } = useTranslation();

    const removeCartLine = useCallback(
        (cartRequest: IUseRemoveCartLineWithOptionalCartId) => {
            action({
                ...cartRequest,
                cartId: cartRequest?.cartId ?? cartId,
            });
        },
        [action, cartId]
    );

    useAsyncActionResult(
        removeCartLineActions,
        (cart: ICartData) => {
            toast(t('commerceUi.cart.lineRemoveSuccess'), { type: 'success' });
            setCart(cart);
        },
        'commerceUi.cart.lineRemoveFailed'
    );

    return { removeCartLine, loading, cart: data, error };
};

export default useRemoveCartLine;
