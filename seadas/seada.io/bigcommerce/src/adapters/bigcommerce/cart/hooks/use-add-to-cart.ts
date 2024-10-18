import { IUseAddToCartActionAdapter } from '@seada.io/cart/ports/cart/hooks/use-add-to-cart-port';
import addToCart from '@seada.io/bigcommerce/server-actions/add-to-cart';
import { IAddToCartRequest } from '@seada.io/cart/interface/cart';
import useAsyncAction from '@seada.io/core/hooks/use-async-action';
import useBigcommerceQueryContext from '@seada.io/bigcommerce/hooks/use-bigcommerce-query-context';
import { useMemo } from 'react';
import cartPortClass from '@seada.io/cart/spi/cart-port-class';

const useAddToCart: IUseAddToCartActionAdapter = () => {
    const queryContext = useBigcommerceQueryContext(cartPortClass);
    const fn = useMemo(() => (request: IAddToCartRequest) => addToCart(queryContext, request), [queryContext]);

    return useAsyncAction(fn);
};

export default useAddToCart;
