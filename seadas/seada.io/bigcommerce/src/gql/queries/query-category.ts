import { gql } from '@apollo/client/core';
import { FRAGMENT_CATEGORY } from '@seada.io/bigcommerce/gql/fragments/fragment-category';

export const QUERY_CATEGORY = gql`
    ${FRAGMENT_CATEGORY}
    query Category($entityId: Int!) {
        site {
            category(entityId: $entityId) {
                ...FragmentCategory
            }
        }
    }
`;
