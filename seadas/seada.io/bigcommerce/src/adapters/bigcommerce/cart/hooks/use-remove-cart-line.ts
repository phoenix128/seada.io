import { IRemoveCartLineRequest } from '@seada.io/cart/interface/cart';
import useAsyncAction from '@seada.io/core/hooks/use-async-action';
import useBigcommerceQueryContext from '@seada.io/bigcommerce/hooks/use-bigcommerce-query-context';
import { useMemo } from 'react';
import cartPortClass from '@seada.io/cart/spi/cart-port-class';
import removeCartLine from '@seada.io/bigcommerce/server-actions/remove-cart-line';
import { IUseRemoveCartLineAdapter } from '@seada.io/cart/ports/cart/hooks/use-remove-cart-line-port';

const useRemoveCartLink: IUseRemoveCartLineAdapter = () => {
    const queryContext = useBigcommerceQueryContext(cartPortClass);
    const fn = useMemo(
        () => (request: IRemoveCartLineRequest) => removeCartLine(queryContext, request),
        [queryContext]
    );

    return useAsyncAction(fn);
};

export default useRemoveCartLink;
