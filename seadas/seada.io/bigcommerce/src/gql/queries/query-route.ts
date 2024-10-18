import { gql } from '@apollo/client/core';
import { FRAGMENT_PRODUCT_DETAILS } from '@seada.io/bigcommerce/gql/fragments/fragment-product';
import { FRAGMENT_CATEGORY } from '@seada.io/bigcommerce/gql/fragments/fragment-category';

export const QUERY_ROUTE = gql`
    ${FRAGMENT_PRODUCT_DETAILS}
    ${FRAGMENT_CATEGORY}

    query Route($path: String!) {
        site {
            route(path: $path) {
                node {
                    id
                    ... on Product {
                        ...FragmentProductDetails
                    }

                    ... on Category {
                        ...FragmentCategory
                    }
                }
            }
        }
    }
`;
