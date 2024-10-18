import { gql } from '@apollo/client/core';
import { FRAGMENT_CART } from '@seada.io/bigcommerce/gql/fragments/fragment-cart';

export const MUTATION_ADD_TO_CART = gql`
    ${FRAGMENT_CART}
    mutation AddToCartLineItems($input: AddCartLineItemsInput!) {
        cart {
            addCartLineItems(input: $input) {
                cart {
                    ...FragmentCart
                }
            }
        }
    }
`;
