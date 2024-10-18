import { gql } from '@apollo/client/core';
import { FRAGMENT_ERROR } from '@seada.io/bigcommerce/gql/fragments/fragment-error';

export const MUTATION_DELETE_CUSTOMER_ADDRESS = gql`
    ${FRAGMENT_ERROR}

    mutation DeleteCustomerAddress($input: DeleteCustomerAddressInput!) {
        customer {
            deleteCustomerAddress(input: $input) {
                errors {
                    ...FragmentError
                }
            }
        }
    }
`;
