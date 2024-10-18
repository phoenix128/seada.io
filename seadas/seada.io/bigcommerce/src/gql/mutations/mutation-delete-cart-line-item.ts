import { gql } from '@apollo/client/core';
import { FRAGMENT_CART } from '@seada.io/bigcommerce/gql/fragments/fragment-cart';

export const MUTATION_DELETE_CART_LINE_ITEM = gql`
    ${FRAGMENT_CART}
    mutation DeleteCartLineItem($input: DeleteCartLineItemInput!) {
        cart {
            deleteCartLineItem(input: $input) {
                cart {
                    ...FragmentCart
                }
            }
        }
    }
`;
