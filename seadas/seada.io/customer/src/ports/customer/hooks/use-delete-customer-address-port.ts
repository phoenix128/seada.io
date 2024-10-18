import useAdapterHook, { IUseAdapterProxyHook } from '@seada.io/core/hooks/use-adapter-hook';
import { IAsyncActionCall } from '@seada.io/core/hooks/use-async-action';
import useAsyncActionCallStaticResponse from '@seada.io/core/hooks/use-async-action-call-static-response';
import customerPortClass from '@seada.io/customer/spi/customer-port-class';

export interface IUseDeleteCustomerAddressAdapter {
    (): IAsyncActionCall<(addressId: string) => Promise<void>>;
}

const useDeleteCustomerAddressPort: IUseAdapterProxyHook<IUseDeleteCustomerAddressAdapter> = () => {
    const fallbackHook = useAsyncActionCallStaticResponse<void>();
    return useAdapterHook<IUseDeleteCustomerAddressAdapter>(
        customerPortClass,
        'use-delete-customer-address',
        fallbackHook
    );
};

export default useDeleteCustomerAddressPort;
