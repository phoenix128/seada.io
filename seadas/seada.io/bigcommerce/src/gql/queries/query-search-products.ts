import { gql } from '@apollo/client/core';
import { FRAGMENT_PRODUCT } from '@seada.io/bigcommerce/gql/fragments/fragment-product';

export const QUERY_SEARCH_CURSOR_CRAWLER = gql`
    query PagesCursorCrawler(
        $filters: SearchProductsFiltersInput!
        $sort: SearchProductsSortInput
        $after: String
        $first: Int
    ) {
        site {
            search {
                searchProducts(filters: $filters, sort: $sort) {
                    products(after: $after, first: $first) {
                        collectionInfo {
                            totalItems
                        }
                        pageInfo {
                            endCursor
                            hasNextPage
                        }
                    }
                }
            }
        }
    }
`;

export const QUERY_SEARCH_PRODUCTS_WITH_FACETS = gql`
    ${FRAGMENT_PRODUCT}
    query Search($after: String, $first: Int, $filters: SearchProductsFiltersInput!, $sort: SearchProductsSortInput) {
        site {
            search {
                searchProducts(filters: $filters, sort: $sort) {
                    filters {
                        edges {
                            node {
                                __typename
                                name
                                isCollapsedByDefault
                                ... on RatingSearchFilter {
                                    name
                                    ratings {
                                        edges {
                                            node {
                                                isSelected
                                                productCount
                                                value
                                            }
                                        }
                                    }
                                }

                                ... on PriceSearchFilter {
                                    name
                                    selected {
                                        maxPrice
                                        minPrice
                                    }
                                }
                                ... on OtherSearchFilter {
                                    name
                                    freeShipping {
                                        isSelected
                                        productCount
                                    }
                                    isFeatured {
                                        isSelected
                                        productCount
                                    }
                                    isInStock {
                                        isSelected
                                        productCount
                                    }
                                }
                                ... on BrandSearchFilter {
                                    name
                                    brands {
                                        edges {
                                            node {
                                                isSelected
                                                entityId
                                                name
                                                productCount
                                            }
                                        }
                                    }
                                }
                                ... on ProductAttributeSearchFilter {
                                    filterName
                                    name
                                    attributes {
                                        edges {
                                            node {
                                                isSelected
                                                productCount
                                                value
                                            }
                                        }
                                    }
                                }
                                ... on CategorySearchFilter {
                                    name
                                    categories {
                                        edges {
                                            node {
                                                entityId
                                                isSelected
                                                name
                                                productCount
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    products(after: $after, first: $first) {
                        collectionInfo {
                            totalItems
                        }
                        edges {
                            node {
                                ...FragmentProduct
                            }
                        }
                    }
                }
            }
        }
    }
`;
