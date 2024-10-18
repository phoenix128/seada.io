import { useMemo } from 'react';
import useSourceIdByPortClass from '@seada.io/core/hooks/use-source-id-by-port-class';
import useUserToken from '@seada.io/user/hooks/use-user-token';
import { IBigCommerceQueryContext } from '@seada.io/bigcommerce/spi/bigcommerce-query-context';

const useBigcommerceQueryContext = (portClass: string): IBigCommerceQueryContext => {
    const userToken = useUserToken();
    const sourceId = useSourceIdByPortClass(portClass);

    return useMemo(
        () => ({
            sourceId,
            userToken,
        }),
        [sourceId, userToken]
    );
};

export default useBigcommerceQueryContext;
