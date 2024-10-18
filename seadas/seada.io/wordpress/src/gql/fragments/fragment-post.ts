import { gql } from '@apollo/client/core';

export const FRAGMENT_POST = gql`
    fragment FragmentPost on Post {
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
