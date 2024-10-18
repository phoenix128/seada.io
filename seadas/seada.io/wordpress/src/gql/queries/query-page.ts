import { gql } from '@apollo/client/core';
import { FRAGMENT_PAGE } from '@seada.io/wordpress/gql/fragments/fragment-page';

export const QUERY_PAGE = gql`
    ${FRAGMENT_PAGE}

    query Page($path: ID!) {
        page(id: $path, idType: URI) {
            ...FragmentPage
        }
    }
`;
