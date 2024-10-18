import { gql } from '@apollo/client/core';
import { FRAGMENT_CUSTOMER_ADDRESS } from '@seada.io/bigcommerce/gql/fragments/fragment-customer-addresses';

export const QUERY_CUSTOMER_ADDRESSES = gql`
    ${FRAGMENT_CUSTOMER_ADDRESS}

    query CustomerAddresses {
        customer {
            email
            addresses {
                edges {
                    node {
                        ...FragmentCustomerAddress
                    }
                }
            }
        }
    }
`;
