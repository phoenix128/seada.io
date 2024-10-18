import { ITranslationResourceProvider } from '@seada.io/core/interface';
import { Resource } from 'i18next/typescript/options';

const getI18n: ITranslationResourceProvider = (): Resource => {
    return {
        en: {
            translation: {
                commerce: {
                    facets: {
                        title: 'Filters',
                        range: {
                            min: 'Min',
                            max: 'Max',
                            apply: 'Apply',
                        },
                    },
                },
                schema: {
                    commerce: {
                        groupTitle: 'Commerce',
                        productContext: {
                            componentTitle: 'Product Data Context',
                            componentDescription: 'Product context for product data',
                            source: {
                                groupTitle: 'Data Source',
                                productKey: 'Context Product',
                            },
                        },
                        categoryContext: {
                            componentTitle: 'Category Data Context',
                            componentDescription: 'Category context for category data',
                            source: {
                                groupTitle: 'Data Source',
                                categoryKey: 'Context Category',
                            },
                        },
                        productsBrowser: {
                            title: 'Products Browser',
                            close: 'Close',
                            ok: 'Confirm',
                            search: 'Search...',
                            loading: 'Fetching products...',
                        },
                        categoryPicker: {
                            selectCategory: 'Select Category',
                            noCategory: 'No category',
                        },
                        productDetails: {
                            groupTitle: 'Product Details',
                        },
                        productsList: {
                            groupTitle: 'Products Grid',
                        },
                        productsCarousel: {
                            componentTitle: 'Products Carousel',
                            componentDescription: 'Carousel with products information',
                            productKeys: 'Selected Products',
                            products: {
                                groupTitle: 'Products',
                            },
                        },
                        relatedProductsCarousel: {
                            componentTitle: 'Related Products Carousel',
                            componentDescription: 'Carousel with related products list',
                            product: {
                                groupTitle: 'Product',
                                productId: 'Product',
                            },
                        },
                        productsPicker: {
                            selectProducts: 'Select Products',
                            selectProduct: 'Select Product',
                            noProducts: 'No products',
                            noProduct: 'No product',
                        },
                        productsGrid: {
                            componentTitle: 'Products Grid',
                            componentDescription: 'Products grid with images, names and prices for products lists',
                            productsList: {
                                groupTitle: 'Products List',
                                productsPerPage: 'Products Per Page',
                            },
                        },
                        productPrice: {
                            componentTitle: 'Product Price',
                            componentDescription: 'Product sale price with currency symbol',
                        },
                        productReferencePrice: {
                            componentTitle: 'Reference Price',
                            componentDescription: 'Product reference price with currency symbol and strikethrough',
                        },
                        productOptions: {
                            componentTitle: 'Product Options',
                            componentDescription: 'Product options like size, color, etc.',
                        },
                        productName: {
                            componentTitle: 'Product Name',
                            componentDescription: 'Product name text',
                        },
                        categoryName: {
                            componentTitle: 'Category Name',
                            componentDescription: 'Category name text',
                        },
                        productCard: {
                            componentTitle: 'Product Card',
                            componentDescription: 'Product card with image, name, price and add to cart button',
                        },
                        productDescription: {
                            componentTitle: 'Product Description',
                            componentDescription: 'Product long description text',
                        },
                        productsPagination: {
                            componentTitle: 'Products Pagination',
                            componentDescription: 'Pagination for products lists',
                            productsList: {
                                groupTitle: 'Products List',
                                reference: 'Reference Component',
                            },
                        },
                        productGallery: {
                            componentTitle: 'Product Images Gallery',
                            componentDescription: 'Product images gallery with thumbnails',
                        },
                        categoryNavBar: {
                            componentTitle: 'Category Nav Bar',
                            componentDescription: 'Navigation bar with commerce categories',
                        },
                        facetsSidebar: {
                            componentTitle: 'Facets Sidebar',
                            componentDescription: 'Facets sidebar with filters for Products List',
                            appearance: {
                                groupTitle: 'Appearance',
                                mobileMode: 'Mobile Mode',
                            },
                        },
                    },
                },
            },
        },
    };
};

export default getI18n;
