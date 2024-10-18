import useAsyncAction from '@seada.io/core/hooks/use-async-action';
import { useMemo } from 'react';
import { IUseDeleteCustomerAddressAdapter } from '@seada.io/customer/ports/customer/hooks/use-delete-customer-address-port';
import deleteCustomerAddress from '@seada.io/bigcommerce/server-actions/delete-customer-address';
import useBigcommerceQueryContext from '@seada.io/bigcommerce/hooks/use-bigcommerce-query-context';
import customerPortClass from '@seada.io/customer/spi/customer-port-class';

const useDeleteCustomerAddress: IUseDeleteCustomerAddressAdapter = (): ReturnType<IUseDeleteCustomerAddressAdapter> => {
    const queryContext = useBigcommerceQueryContext(customerPortClass);
    const fn = useMemo(() => (addressId: string) => deleteCustomerAddress(queryContext, addressId), [queryContext]);

    return useAsyncAction(fn);
};

export default useDeleteCustomerAddress;
