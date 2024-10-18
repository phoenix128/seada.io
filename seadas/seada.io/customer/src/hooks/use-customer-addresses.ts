import useGetCustomerAddressesPort from '@seada.io/customer/ports/customer/hooks/use-get-customer-addresses-port';
import { useEffect } from 'react';
import { ICustomerAddress } from '@seada.io/customer/interface/customer-address';

export interface IUseCustomerAddresses {
    reload: () => void;
    addresses: ICustomerAddress[];
    loading: boolean;
    error: Error;
}

const useCustomerAddresses = (): IUseCustomerAddresses => {
    const { action, loading, data, error } = useGetCustomerAddressesPort();

    useEffect(() => {
        action?.();
    }, [action]);

    return {
        reload: action,
        addresses: data || [],
        loading,
        error,
    };
};

export default useCustomerAddresses;
