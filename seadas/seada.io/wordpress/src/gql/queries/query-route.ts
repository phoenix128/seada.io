import { gql } from '@apollo/client/core';
import { FRAGMENT_PAGE } from '@seada.io/wordpress/gql/fragments/fragment-page';
import { FRAGMENT_POST } from '@seada.io/wordpress/gql/fragments/fragment-post';

export const QUERY_ROUTE = gql`
    ${FRAGMENT_PAGE}
    ${FRAGMENT_POST}

    query Route($path: ID!) {
        page(id: $path, idType: URI) {
            ...FragmentPage
        }
        post(id: $path, idType: URI) {
            ...FragmentPost
        }
    }
`;
