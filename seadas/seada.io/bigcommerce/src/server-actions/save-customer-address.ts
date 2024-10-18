'use server';

import convertBigcommerceCustomerAddress from '@seada.io/bigcommerce/service/converters/from-bigcommerce/convert-bigcommerce-customer-address';
import { ICustomerAddress } from '@seada.io/customer/interface/customer-address';
import graphqlBigcommerceMutate from '@seada.io/bigcommerce/spi/graphql/graphql-bigcommerce-mutate';
import { MUTATION_UPDATE_CUSTOMER_ADDRESS } from '@seada.io/bigcommerce/gql/mutations/mutation-update-customer-address';
import convertSeadaCustomerAddress from '@seada.io/bigcommerce/service/converters/to-bigcommerce/convert-seada-customer-address';
import { MUTATION_ADD_CUSTOMER_ADDRESS } from '@seada.io/bigcommerce/gql/mutations/mutation-add-customer-address';
import {
    AddCustomerAddressInput,
    CustomerMutationsAddCustomerAddressArgs,
    CustomerMutationsUpdateCustomerAddressArgs,
    UpdateCustomerAddressDataInput,
} from '@seada.io/bigcommerce/gql/schema/graphql';
import { IBigCommerceQueryContext } from '@seada.io/bigcommerce/spi/bigcommerce-query-context';

const updateCustomerAddress = async (
    context: IBigCommerceQueryContext,
    address: ICustomerAddress
): Promise<ICustomerAddress> => {
    const res = await graphqlBigcommerceMutate<CustomerMutationsUpdateCustomerAddressArgs>(context, {
        mutation: MUTATION_UPDATE_CUSTOMER_ADDRESS,
        variables: {
            input: {
                addressEntityId: parseInt(address.id || '0'),
                data: convertSeadaCustomerAddress(address) as UpdateCustomerAddressDataInput,
            },
        },
    });

    if (res.data.customer.updateCustomerAddress.errors?.length > 0) {
        throw new Error(res.data.customer.updateCustomerAddress.errors[0].message);
    }

    return convertBigcommerceCustomerAddress(res.data.customer.updateCustomerAddress.address);
};

const addCustomerAddress = async (context: IBigCommerceQueryContext, address: ICustomerAddress) => {
    const res = await graphqlBigcommerceMutate<CustomerMutationsAddCustomerAddressArgs>(context, {
        mutation: MUTATION_ADD_CUSTOMER_ADDRESS,
        variables: {
            input: convertSeadaCustomerAddress(address) as AddCustomerAddressInput,
        },
    });

    if (res.data.customer.addCustomerAddress.errors?.length > 0) {
        throw new Error(res.data.customer.addCustomerAddress.errors[0].message);
    }

    return convertBigcommerceCustomerAddress(res.data.customer.addCustomerAddress.address);
};

const saveCustomerAddress = async (
    context: IBigCommerceQueryContext,
    address: ICustomerAddress
): Promise<ICustomerAddress> => {
    if (address.id) {
        return await updateCustomerAddress(context, address);
    }

    return await addCustomerAddress(context, address);
};

export default saveCustomerAddress;
