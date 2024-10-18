'use server';

import graphqlBigcommerceMutate from '@seada.io/bigcommerce/spi/graphql/graphql-bigcommerce-mutate';
import { IUserData } from '@seada.io/user/interface/user';
import convertBigcommerceUser from '@seada.io/bigcommerce/service/converters/from-bigcommerce/convert-bigcommerce-user';
import { MUTATION_UPDATE_PERSONAL_DATA } from '@seada.io/bigcommerce/gql/mutations/mutation-update-personal-data';
import encodeUserData from '@seada.io/user/spi/encode-user-data';
import convertSeadaPersonalData from '@seada.io/bigcommerce/service/converters/to-bigcommerce/convert-seada-personal-data';
import { IBigCommerceQueryContext } from '@seada.io/bigcommerce/spi/bigcommerce-query-context';

/**
 * Update user data in bigcommerce
 * @param context
 * @param userData
 */
const updatePersonalData = async (context: IBigCommerceQueryContext, userData: IUserData): Promise<string> => {
    const updateRes = await graphqlBigcommerceMutate(context, {
        mutation: MUTATION_UPDATE_PERSONAL_DATA,
        variables: {
            input: convertSeadaPersonalData(userData),
        },
    });

    if (updateRes.data.customer.updateCustomer.errors?.length > 0) {
        throw new Error(updateRes.data.customer.updateCustomer.errors[0].message);
    }

    const customer = updateRes.data?.customer?.updateCustomer?.customer;
    return customer ? encodeUserData(convertBigcommerceUser(customer)) : null;
};

export default updatePersonalData;
