import { useCookies } from 'react-cookie';
import getCartCookieName from '@seada.io/cart/spi/get-cart-cookie-name';
import usePageData from '@seada.io/core/hooks/use-page-data';

const useCartId = (): string | undefined => {
    const pageData = usePageData();
    const cookies = useCookies()[0];
    const cookieCartName = getCartCookieName(pageData);
    return cookies?.[cookieCartName];
};

export default useCartId;
