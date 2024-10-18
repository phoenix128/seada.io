import React, { useCallback } from 'react';
import { IModifyAddressesSchema } from '@seada.io/customer/page-components/ModifyAddresses/schema';
import AddressCard from '@seada.io/customer/page-components/ModifyAddresses/AddressCard';
import GridLayout from '@seada.io/basic-ui/page-components/GridLayout';
import useCustomerAddresses from '@seada.io/customer/hooks/use-customer-addresses';
import LoadingCard from '@seada.io/customer/page-components/ModifyAddresses/LoadingCard';
import { IPageComponentSchemaProps } from '@seada.io/core-schema/spi/components/interface';

const ModifyAddresses: React.FC<IPageComponentSchemaProps<IModifyAddressesSchema>> = (props) => {
    const { addresses, reload } = useCustomerAddresses();

    const reloadAddresses = useCallback(() => {
        reload();
    }, [reload]);

    return (
        <GridLayout {...props}>
            {addresses?.length > 0 &&
                addresses.map((address) => (
                    <AddressCard key={address.id} address={address} onAddressDeleted={reloadAddresses} />
                ))}
            {!addresses?.length && [...Array(addresses?.length || 2)].map((e) => <LoadingCard key={e} />)}
            {addresses?.length > 0 && <AddressCard address={null} onAddressCreated={reloadAddresses} />}
        </GridLayout>
    );
};

export default ModifyAddresses;
