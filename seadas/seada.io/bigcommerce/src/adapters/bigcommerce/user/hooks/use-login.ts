import useAsyncAction from '@seada.io/core/hooks/use-async-action';
import login from '@seada.io/bigcommerce/server-actions/login';
import { IUseLoginAdapter } from '@seada.io/user/ports/user/hooks/use-login-port';
import useBigcommerceQueryContext from '@seada.io/bigcommerce/hooks/use-bigcommerce-query-context';
import useCartId from '@seada.io/cart/hooks/use-cart-id';
import { useMemo } from 'react';
import userPortClass from '@seada.io/user/spi/user-port-class';

const useLogin: IUseLoginAdapter = () => {
    const context = useBigcommerceQueryContext(userPortClass);
    const cartId = useCartId();
    const fn = useMemo(
        () => (username: string, password: string) => login(context, username, password, cartId),
        [context, cartId]
    );

    return useAsyncAction(fn);
};

export default useLogin;
