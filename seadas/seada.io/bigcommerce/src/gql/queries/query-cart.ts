import { gql } from '@apollo/client/core';
import { FRAGMENT_CART } from '@seada.io/bigcommerce/gql/fragments/fragment-cart';

export const QUERY_CART = gql`
    ${FRAGMENT_CART}
    query Cart($cartId: String!) {
        site {
            cart(entityId: $cartId) {
                ...FragmentCart
            }
        }
    }
`;
