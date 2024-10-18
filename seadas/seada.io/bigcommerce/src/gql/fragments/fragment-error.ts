import { gql } from '@apollo/client/core';

export const FRAGMENT_ERROR = gql`
    fragment FragmentError on Error {
        __typename
        message
    }
`;
