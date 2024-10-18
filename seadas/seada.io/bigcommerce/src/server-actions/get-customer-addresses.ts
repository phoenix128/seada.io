'use server';

import graphqlBigcommerceQuery from '@seada.io/bigcommerce/spi/graphql/graphql-bigcommerce-query';
import { QUERY_CUSTOMER_ADDRESSES } from '@seada.io/bigcommerce/gql/queries/query-customer-addresses';
import convertBigcommerceCustomerAddress from '@seada.io/bigcommerce/service/converters/from-bigcommerce/convert-bigcommerce-customer-address';
import { ICustomerAddress } from '@seada.io/customer/interface/customer-address';
import { IBigCommerceQueryContext } from '@seada.io/bigcommerce/spi/bigcommerce-query-context';

const getCustomerAddresses = async (context: IBigCommerceQueryContext): Promise<ICustomerAddress[]> => {
    try {
        const res = await graphqlBigcommerceQuery(context, {
            fetchPolicy: 'no-cache',
            query: QUERY_CUSTOMER_ADDRESSES,
        });

        return res.data.customer.addresses.edges.map((e) => convertBigcommerceCustomerAddress(e.node));
    } catch (e) {
        console.error(e);
        return [];
    }
};

export default getCustomerAddresses;
