import useAdapterHook, { IUseAdapterProxyHook } from '@seada.io/core/hooks/use-adapter-hook';
import { IAsyncActionCall } from '@seada.io/core/hooks/use-async-action';
import { ICustomerAddress } from '@seada.io/customer/interface/customer-address';
import useAsyncActionCallStaticResponse from '@seada.io/core/hooks/use-async-action-call-static-response';
import customerPortClass from '@seada.io/customer/spi/customer-port-class';

export interface IUseSaveCustomerAddressAdapter {
    (): IAsyncActionCall<(address: ICustomerAddress) => Promise<ICustomerAddress>>;
}

const useSaveCustomerAddressPort: IUseAdapterProxyHook<IUseSaveCustomerAddressAdapter> = () => {
    const fallbackHook = useAsyncActionCallStaticResponse<ICustomerAddress>({} as ICustomerAddress);
    return useAdapterHook<IUseSaveCustomerAddressAdapter>(customerPortClass, 'use-save-customer-address', fallbackHook);
};

export default useSaveCustomerAddressPort;
