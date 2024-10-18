import { IUseGetCartUrlAdapter } from '@seada.io/cart/ports/cart/hooks/use-get-cart-url-port';
import useAreaPath from '@seada.io/core/hooks/use-area-path';
import useAsyncAction from '@seada.io/core/hooks/use-async-action';
import { useMemo } from 'react';

const useGetCartUrl: IUseGetCartUrlAdapter = () => {
    const path = useAreaPath('/cart');
    const res = useMemo(() => () => Promise.resolve(path), [path]);

    return useAsyncAction(res);
};

export default useGetCartUrl;
