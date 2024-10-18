import { gql } from '@apollo/client/core';
import { FRAGMENT_CART } from '@seada.io/bigcommerce/gql/fragments/fragment-cart';

export const MUTATION_ASSIGN_CART = gql`
    ${FRAGMENT_CART}
    mutation AssignCart($input: AssignCartToCustomerInput!) {
        cart {
            assignCartToCustomer(input: $input) {
                cart {
                    ...FragmentCart
                }
            }
        }
    }
`;
