import { IUseGetCheckoutUrlAdapter } from '@seada.io/cart/ports/cart/hooks/use-get-checkout-url-port';
import useAsyncAction from '@seada.io/core/hooks/use-async-action';
import getCheckoutUrl from '@seada.io/bigcommerce/server-actions/get-checkout-url';
import useCartId from '@seada.io/cart/hooks/use-cart-id';
import useBigcommerceQueryContext from '@seada.io/bigcommerce/hooks/use-bigcommerce-query-context';
import { useMemo } from 'react';
import cartPortClass from '@seada.io/cart/spi/cart-port-class';

const useGetCheckoutUrl: IUseGetCheckoutUrlAdapter = () => {
    const queryContext = useBigcommerceQueryContext(cartPortClass);
    const cartId = useCartId();
    const fn = useMemo(() => () => getCheckoutUrl(queryContext, cartId), [cartId, queryContext]);

    return useAsyncAction(fn);
};

export default useGetCheckoutUrl;
