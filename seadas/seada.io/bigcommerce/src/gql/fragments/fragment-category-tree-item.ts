import { gql } from '@apollo/client/core';

export const FRAGMENT_CATEGORY_TREE_ITEM = gql`
    fragment FragmentCategoryTreeItem on CategoryTreeItem {
        id: entityId
        name
        path
        entityId
    }
`;
