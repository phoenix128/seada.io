import useAdapterHook, { IUseAdapterProxyHook } from '@seada.io/core/hooks/use-adapter-hook';
import { IAsyncActionCall } from '@seada.io/core/hooks/use-async-action';
import useAsyncActionCallStaticResponse from '@seada.io/core/hooks/use-async-action-call-static-response';
import { ICustomerAddress } from '@seada.io/customer/interface/customer-address';
import customerPortClass from '@seada.io/customer/spi/customer-port-class';

export interface IUseGetCustomerAddressesAdapter {
    (): IAsyncActionCall<() => Promise<ICustomerAddress[]>>;
}

const useGetCustomerAddressesPort: IUseAdapterProxyHook<IUseGetCustomerAddressesAdapter> = () => {
    const fallbackHook = useAsyncActionCallStaticResponse<ICustomerAddress[]>([]);
    return useAdapterHook<IUseGetCustomerAddressesAdapter>(
        customerPortClass,
        'use-get-customer-addresses',
        fallbackHook
    );
};

export default useGetCustomerAddressesPort;
