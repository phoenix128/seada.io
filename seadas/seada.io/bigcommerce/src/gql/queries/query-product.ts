import { gql } from '@apollo/client/core';
import { FRAGMENT_PRODUCT, FRAGMENT_PRODUCT_DETAILS } from '@seada.io/bigcommerce/gql/fragments/fragment-product';

export const QUERY_PRODUCT = gql`
    ${FRAGMENT_PRODUCT}
    query Product($sku: String!) {
        site {
            product(sku: $sku) {
                ...FragmentProduct
            }
        }
    }
`;

export const QUERY_PRODUCTS_LIST = gql`
    ${FRAGMENT_PRODUCT}
    query ProductsList($entityIds: [Int!]) {
        site {
            products(entityIds: $entityIds) {
                edges {
                    node {
                        ...FragmentProduct
                    }
                }
            }
        }
    }
`;

export const QUERY_PRODUCT_DETAILS = gql`
    ${FRAGMENT_PRODUCT_DETAILS}
    query ProductDetails($sku: String!) {
        site {
            product(sku: $sku) {
                ...FragmentProductDetails
            }
        }
    }
`;
