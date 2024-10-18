import useAsyncAction from '@seada.io/core/hooks/use-async-action';
import { useMemo } from 'react';
import { IUseSaveCustomerAddressAdapter } from '@seada.io/customer/ports/customer/hooks/use-save-customer-address-port';
import { ICustomerAddress } from '@seada.io/customer/interface/customer-address';
import saveCustomerAddress from '@seada.io/bigcommerce/server-actions/save-customer-address';
import useBigcommerceQueryContext from '@seada.io/bigcommerce/hooks/use-bigcommerce-query-context';
import customerPortClass from '@seada.io/customer/spi/customer-port-class';

const useSaveCustomerAddress: IUseSaveCustomerAddressAdapter = (): ReturnType<IUseSaveCustomerAddressAdapter> => {
    const queryContext = useBigcommerceQueryContext(customerPortClass);
    const fn = useMemo(() => (address: ICustomerAddress) => saveCustomerAddress(queryContext, address), [queryContext]);

    return useAsyncAction(fn);
};

export default useSaveCustomerAddress;
