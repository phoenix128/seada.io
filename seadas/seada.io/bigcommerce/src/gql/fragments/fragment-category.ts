import { gql } from '@apollo/client/core';

export const FRAGMENT_CATEGORY = gql`
    fragment FragmentCategory on Category {
        id
        entityId
        path
        name
    }
`;
