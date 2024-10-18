import useAsyncAction from '@seada.io/core/hooks/use-async-action';
import { useMemo } from 'react';
import getCustomerAddresses from '@seada.io/bigcommerce/server-actions/get-customer-addresses';
import { IUseGetCustomerAddressesAdapter } from '@seada.io/customer/ports/customer/hooks/use-get-customer-addresses-port';
import useBigcommerceQueryContext from '@seada.io/bigcommerce/hooks/use-bigcommerce-query-context';
import customerPortClass from '@seada.io/customer/spi/customer-port-class';

const useGetCustomerAddresses: IUseGetCustomerAddressesAdapter = (): ReturnType<IUseGetCustomerAddressesAdapter> => {
    const queryContext = useBigcommerceQueryContext(customerPortClass);
    const fn = useMemo(() => () => getCustomerAddresses(queryContext), [queryContext]);

    return useAsyncAction(fn);
};

export default useGetCustomerAddresses;
