import { gql } from '@apollo/client/core';
import { FRAGMENT_MONEY } from '@seada.io/bigcommerce/gql/fragments/fragment-money';

export const FRAGMENT_PRICES = gql`
    ${FRAGMENT_MONEY}
    fragment FragmentPrices on Prices {
        price {
            ...FragmentMoney
        }
        basePrice {
            ...FragmentMoney
        }
        salePrice {
            ...FragmentMoney
        }
        priceRange {
            min {
                ...FragmentMoney
            }
            max {
                ...FragmentMoney
            }
        }
    }
`;
