import { gql } from '@apollo/client/core';
import { FRAGMENT_POST } from '@seada.io/wordpress/gql/fragments/fragment-post';

export const QUERY_POST = gql`
    ${FRAGMENT_POST}

    query Post($path: ID!) {
        page(id: $path, idType: URI) {
            ...FragmentPost
        }
    }
`;
