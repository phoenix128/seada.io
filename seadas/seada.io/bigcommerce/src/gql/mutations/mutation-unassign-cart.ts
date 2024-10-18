import { gql } from '@apollo/client/core';
import { FRAGMENT_CART } from '@seada.io/bigcommerce/gql/fragments/fragment-cart';

export const MUTATION_UNASSIGN_CART = gql`
    ${FRAGMENT_CART}
    mutation UnassignCart($input: UnassignCartFromCustomerInput!) {
        cart {
            unassignCartFromCustomer(input: $input) {
                cart {
                    ...FragmentCart
                }
            }
        }
    }
`;
