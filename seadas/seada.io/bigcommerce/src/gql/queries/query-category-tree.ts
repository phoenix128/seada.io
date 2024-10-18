import { gql } from '@apollo/client/core';
import { FRAGMENT_CATEGORY_TREE_ITEM } from '@seada.io/bigcommerce/gql/fragments/fragment-category-tree-item';

export const QUERY_CATEGORY_TREE = gql`
    ${FRAGMENT_CATEGORY_TREE_ITEM}
    query CategoryTree {
        site {
            categoryTree {
                ...FragmentCategoryTreeItem
            }
        }
    }
`;

export const QUERY_CATEGORY_TREE_DEEP = gql`
    ${FRAGMENT_CATEGORY_TREE_ITEM}
    query CategoryTreeDeep {
        site {
            categoryTree {
                ...FragmentCategoryTreeItem
                children {
                    ...FragmentCategoryTreeItem
                    children {
                        ...FragmentCategoryTreeItem
                        children {
                            ...FragmentCategoryTreeItem
                        }
                    }
                }
            }
        }
    }
`;
