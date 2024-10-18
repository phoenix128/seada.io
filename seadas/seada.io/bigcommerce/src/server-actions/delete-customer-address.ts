'use server';

import graphqlBigcommerceMutate from '@seada.io/bigcommerce/spi/graphql/graphql-bigcommerce-mutate';
import { MUTATION_DELETE_CUSTOMER_ADDRESS } from '@seada.io/bigcommerce/gql/mutations/mutation-delete-customer-address';
import { CustomerMutationsDeleteCustomerAddressArgs } from '@seada.io/bigcommerce/gql/schema/graphql';
import { IBigCommerceQueryContext } from '@seada.io/bigcommerce/spi/bigcommerce-query-context';

const deleteCustomerAddress = async (context: IBigCommerceQueryContext, addressId: string): Promise<void> => {
    const res = await graphqlBigcommerceMutate<CustomerMutationsDeleteCustomerAddressArgs>(context, {
        mutation: MUTATION_DELETE_CUSTOMER_ADDRESS,
        variables: {
            input: {
                addressEntityId: parseInt(addressId || '0'),
            },
        },
    });

    if (res.data.customer.deleteCustomerAddress.errors?.length > 0) {
        throw new Error(res.data.customer.deleteCustomerAddress.errors[0].message);
    }
};

export default deleteCustomerAddress;
