'use server';

import { MUTATION_LOGIN } from '@seada.io/bigcommerce/gql/mutations/mutation-login';
import { MutationLoginArgs } from '@seada.io/bigcommerce/gql/schema/graphql';
import convertBigcommerceUser from '@seada.io/bigcommerce/service/converters/from-bigcommerce/convert-bigcommerce-user';
import graphqlBigcommerceMutate from '@seada.io/bigcommerce/spi/graphql/graphql-bigcommerce-mutate';
import encodeUserData from '@seada.io/user/spi/encode-user-data';
import { IBigCommerceQueryContext } from '@seada.io/bigcommerce/spi/bigcommerce-query-context';
import assignCartCustomer from '@seada.io/bigcommerce/service/graphql/assign-cart-customer';

/**
 * Login to bigcommerce
 * @param context
 * @param username
 * @param password
 * @param cartId
 */
const login = async (
    context: IBigCommerceQueryContext,
    username: string,
    password: string,
    cartId: string
): Promise<string | null> => {
    const loginRes = await graphqlBigcommerceMutate<MutationLoginArgs>(context, {
        mutation: MUTATION_LOGIN,
        variables: {
            email: username,
            password,
        },
    });

    const customer = loginRes.data.login?.customer;
    if (cartId && customer) {
        await assignCartCustomer(context, cartId, customer.entityId);
    }

    return customer ? encodeUserData(convertBigcommerceUser(customer)) : null;
};

export default login;
