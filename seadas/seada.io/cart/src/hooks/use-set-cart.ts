import { ICartData } from '@seada.io/cart/interface/cart';
import getCartCookieName from '@seada.io/cart/spi/get-cart-cookie-name';
import usePageData from '@seada.io/core/hooks/use-page-data';
import { useCookies } from 'react-cookie';
import { useCallback, useContext } from 'react';
import CartContext from '@seada.io/cart/contexts/CartContext';
import useCartSourceId from '@seada.io/cart/hooks/use-cart-source-id';

const CART_DURATION = 1000 * 60 * 60 * 24 * 30;

const useSetCart = (): ((cart: ICartData) => void) => {
    const { setCarts } = useContext(CartContext);
    const pageData = usePageData();
    const cookieCartName = getCartCookieName(pageData);
    const [cookies, setCookie, removeCookie] = useCookies();
    const sourceId = useCartSourceId();

    return useCallback(
        (cart: ICartData) => {
            if (!cart?.cartId) {
                removeCookie(cookieCartName);
            } else {
                setCookie(cookieCartName, cart.cartId, {
                    expires: new Date(Date.now() + CART_DURATION),
                    httpOnly: false,
                });
            }

            setCarts((prevCarts) => ({
                ...prevCarts,
                [sourceId]: cart,
            }));
        },
        [cookieCartName, removeCookie, setCarts, setCookie, sourceId]
    );
};

export default useSetCart;
