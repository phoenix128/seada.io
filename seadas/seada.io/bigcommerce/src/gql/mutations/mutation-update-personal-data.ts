import { gql } from '@apollo/client/core';
import { FRAGMENT_CUSTOMER } from '@seada.io/bigcommerce/gql/fragments/fragment-customer';
import { FRAGMENT_ERROR } from '@seada.io/bigcommerce/gql/fragments/fragment-error';

export const MUTATION_UPDATE_PERSONAL_DATA = gql`
    ${FRAGMENT_CUSTOMER}
    ${FRAGMENT_ERROR}
    mutation UpdatePersonalData($input: UpdateCustomerInput!) {
        customer {
            updateCustomer(input: $input) {
                customer {
                    ...FragmentCustomer
                }
                errors {
                    ...FragmentError
                }
            }
        }
    }
`;
