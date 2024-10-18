import { gql } from '@apollo/client/core';

export const FRAGMENT_CUSTOMER_ADDRESS = gql`
    fragment FragmentCustomerAddress on CustomerAddress {
        entityId
        address1
        address2
        city
        company
        countryCode
        firstName
        lastName
        phone
        postalCode
        stateOrProvince
    }
`;
