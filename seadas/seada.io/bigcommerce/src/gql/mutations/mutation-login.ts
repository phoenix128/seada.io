import { gql } from '@apollo/client/core';
import { FRAGMENT_CUSTOMER } from '@seada.io/bigcommerce/gql/fragments/fragment-customer';

export const MUTATION_LOGIN = gql`
    ${FRAGMENT_CUSTOMER}
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            customer {
                ...FragmentCustomer
            }
        }
    }
`;
