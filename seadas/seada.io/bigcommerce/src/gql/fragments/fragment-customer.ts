import { gql } from '@apollo/client/core';

export const FRAGMENT_CUSTOMER = gql`
    fragment FragmentCustomer on Customer {
        entityId
        customerGroupId
        email
        firstName
        lastName
    }
`;
