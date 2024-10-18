import { gql } from '@apollo/client/core';

export const FRAGMENT_PAGE = gql`
    fragment FragmentPage on Page {
        id
        title
        featuredImage {
            node {
                mediaItemUrl
                altText
            }
        }
        uri
        slug
        content
    }
`;
