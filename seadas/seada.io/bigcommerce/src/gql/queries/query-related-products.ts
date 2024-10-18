import { gql } from '@apollo/client/core';
import { FRAGMENT_PRODUCT } from '@seada.io/bigcommerce/gql/fragments/fragment-product';

export const QUERY_RELATED_PRODUCTS = gql`
    ${FRAGMENT_PRODUCT}
    query RelatedProducts($entityId: Int!) {
        site {
            product(entityId: $entityId) {
                entityId
                sku
                relatedProducts {
                    edges {
                        node {
                            ...FragmentProduct
                        }
                    }
                }
            }
        }
    }
`;
