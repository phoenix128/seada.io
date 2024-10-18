import { gql } from '@apollo/client/core';
import { FRAGMENT_CART } from '@seada.io/bigcommerce/gql/fragments/fragment-cart';

export const MUTATION_CREATE_CART = gql`
    ${FRAGMENT_CART}
    mutation CreateCart($input: CreateCartInput!) {
        cart {
            createCart(input: $input) {
                cart {
                    ...FragmentCart
                }
            }
        }
    }
`;
