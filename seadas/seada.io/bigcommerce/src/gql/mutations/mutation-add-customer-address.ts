import { gql } from '@apollo/client/core';
import { FRAGMENT_CUSTOMER_ADDRESS } from '@seada.io/bigcommerce/gql/fragments/fragment-customer-addresses';
import { FRAGMENT_ERROR } from '@seada.io/bigcommerce/gql/fragments/fragment-error';

export const MUTATION_ADD_CUSTOMER_ADDRESS = gql`
    ${FRAGMENT_CUSTOMER_ADDRESS}
    ${FRAGMENT_ERROR}
    mutation AddCustomerAddress($input: AddCustomerAddressInput!) {
        customer {
            addCustomerAddress(input: $input) {
                address {
                    ...FragmentCustomerAddress
                }
                errors {
                    ...FragmentError
                }
            }
        }
    }
`;
