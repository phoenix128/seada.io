import { gql } from '@apollo/client/core';
import { FRAGMENT_MONEY } from '@seada.io/bigcommerce/gql/fragments/fragment-money';

export const FRAGMENT_CART = gql`
    ${FRAGMENT_MONEY}
    fragment FragmentCart on Cart {
        entityId
        lineItems {
            physicalItems {
                entityId
                name
                quantity
                productEntityId
                sku
                salePrice {
                    ...FragmentMoney
                }
                imageUrl
            }
        }
        baseAmount {
            ...FragmentMoney
        }
        amount {
            ...FragmentMoney
        }
    }
`;
