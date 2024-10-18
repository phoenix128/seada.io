import { gql } from '@apollo/client/core';
import { FRAGMENT_CUSTOMER } from '@seada.io/bigcommerce/gql/fragments/fragment-customer';

export const QUERY_CUSTOMER = gql`
    ${FRAGMENT_CUSTOMER}

    query Customer {
        customer {
            ...FragmentCustomer
        }
    }
`;
