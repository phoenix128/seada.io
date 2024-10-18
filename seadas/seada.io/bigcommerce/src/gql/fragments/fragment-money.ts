import { gql } from '@apollo/client/core';

export const FRAGMENT_MONEY = gql`
    fragment FragmentMoney on Money {
        currencyCode
        value
    }
`;
