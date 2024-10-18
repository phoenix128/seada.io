import { gql } from '@apollo/client/core';
import { FRAGMENT_PRICES } from '@seada.io/bigcommerce/gql/fragments/fragment-prices';

const {
    imagesSizes: { max, swatches },
    prices: { includeTax },
} = {
    imagesSizes: {
        max: {
            width: 2048,
            height: 2048,
        },
        swatches: {
            width: 100,
            height: 100,
        },
    },
    prices: {
        includeTax: true,
    },
};

export const FRAGMENT_PRODUCT = gql`
    ${FRAGMENT_PRICES}
    fragment FragmentProduct on Product {
        id
        entityId
        name
        sku
        plainTextDescription
        path
        defaultImage {
            url(width: ${max.width}, height: ${max.height})
            altText
        }
        images {
            edges {
                node {
                    url(width: ${max.width}, height: ${max.height})
                    altText
                }
            }
        }
        prices(includeTax: ${includeTax}) {
            ...FragmentPrices
        }
        variants {
            edges {
                node {
                    entityId
                }
            }  
        }
    }
`;

export const FRAGMENT_PRODUCT_DETAILS = gql`
    ${FRAGMENT_PRICES}
    fragment FragmentProductDetails on Product {
        id
        entityId
        name
        sku
        path
        plainTextDescription
        description
        defaultImage {
            url(width: ${max.width}, height: ${max.height})
            altText
        }
        images {
            edges {
                node {
                    url(width: ${max.width}, height: ${max.height})
                    altText
                }
            }
        }
        brand {
            name
        }
        inventory {
            hasVariantInventory
            isInStock
        }
        prices(includeTax: ${includeTax}) {
            ...FragmentPrices
        }
        productOptions {
            edges {
                node {
                    displayName
                    entityId
                    isVariantOption
                    isRequired
                    ... on TextFieldOption {
                        defaultValue
                        minLength
                        maxLength
                    }
                    ... on MultiLineTextFieldOption {
                        defaultValue
                        minLength
                        maxLength
                        maxLines
                    }
                    ... on MultipleChoiceOption
                    {
                        displayStyle
                        values {
                            edges {
                                node {
                                    entityId
                                    isDefault
                                    label
                                    ... on SwatchOptionValue {
                                        hexColors
                                        imageUrl(width:200, height: 200)
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        variants(first: 250) {
            edges {
                node {
                    sku
                    entityId
                    isPurchasable
                    inventory {
                        isInStock
                    }
                    prices(includeTax: ${includeTax}) {
                        ...FragmentPrices
                    }
                    options {
                        edges {
                            node {
                                entityId
                                values {
                                    edges {
                                        node {
                                            entityId
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;
