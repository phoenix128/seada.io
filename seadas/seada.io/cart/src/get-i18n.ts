import { ITranslationResourceProvider } from '@seada.io/core/interface';
import { Resource } from 'i18next/typescript/options';

const getI18n: ITranslationResourceProvider = (): Resource => {
    return {
        en: {
            translation: {
                commerceUi: {
                    facets: {
                        range: {
                            min: 'Min',
                            max: 'Max',
                            apply: 'Apply',
                        },
                    },
                    cart: {
                        checkout: 'Checkout',
                        quantityAmount: 'Quantity: {{amount}}',
                        addToCart: 'Add to cart',
                        subtotal: 'Subtotal',
                        grandTotal: 'Grand Total',
                        shipping: 'Shipping',
                        addToCartSuccess: 'Item ws added to cart successfully',
                        addToCartFailed: 'Unable to add item to cart: {{ error }}',
                        lineRemoveSuccess: 'Item was removed from cart successfully',
                        lineRemoveFailed: 'Unable to remove item from cart: {{ error }}',
                    },
                    order: {
                        number: 'Order Number',
                        date: 'Date',
                        status: 'Status',
                        total: 'Total',
                        dateFormat: '{{date, datetime}}',
                    },
                    address: {
                        firstName: 'First Name',
                        lastName: 'Last Name',
                        streetAddress1: 'Street address (line 1)',
                        streetAddress2: 'Street address (line 2)',
                        city: 'City',
                        state: 'State',
                        country: 'Country',
                        zip: 'Postal Code',
                        phone: 'Phone',
                        email: 'Email',
                        save: 'Save',
                        cancel: 'Cancel',
                        delete: 'Delete',
                        edit: 'Edit',
                        addNew: 'Add new address',
                        editForm: {
                            title: 'Edit Address',
                            close: 'Close',
                            save: 'Save',
                        },
                        deleteConfirm: {
                            title: 'Delete Address',
                            message: 'Are you sure you want to delete this address?',
                            confirm: 'Delete',
                            cancel: 'Cancel',
                        },
                        saveSuccess: 'Address saved successfully',
                        saveFailed: 'Failed to save address: {{error}}',
                        deleteSuccess: 'Address deleted successfully',
                        deleteFailed: 'Failed to delete address: {{error}}',
                    },
                },
                schema: {
                    commerceUi: {
                        groupTitle: 'Commerce',
                        productsBrowser: {
                            title: 'Products Browser',
                            close: 'Close',
                            ok: 'Confirm',
                            search: 'Search...',
                            loading: 'Fetching products...',
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
                            productsIds: 'Selected Products',
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
                            noProducts: 'No products',
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
                        modifyAddresses: {
                            componentTitle: 'Modify Addresses',
                            componentDescription: 'List of customer addresses with modify, delete and add new actions',
                        },
                        ordersTable: {
                            componentTitle: 'Orders Table',
                            componentDescription: 'Table with customer orders',
                        },
                        categoryNavBar: {
                            componentTitle: 'Category Nav Bar',
                            componentDescription: 'Navigation bar with commerce categories',
                        },
                        facetsSidebar: {
                            componentTitle: 'Facets Sidebar',
                            componentDescription: 'Facets sidebar with filters for Products List',
                        },
                        addToCart: {
                            componentTitle: 'Add To Cart',
                            componentDescription: 'Add to cart button with quantity input',
                        },
                        sideCart: {
                            componentTitle: 'Side Cart',
                            componentDescription: 'Side cart with cart content and checkout button',
                            behaviour: {
                                groupTitle: 'Behaviour',
                                autoOpen: 'Auto Open',
                                autoOpenGracePeriod: 'Auto Open Grace Period',
                                autoCloseTimeout: 'Auto Close Timeout',
                                autoCloseTimeoutOnMouseLeave: 'Auto Close Timeout On Mouse Leave',
                            },
                        },
                        cartIcon: {
                            componentTitle: 'Cart Icon',
                            componentDescription: 'Shopping cart icon with items count',
                            behaviour: {
                                groupTitle: 'Behaviour',
                                displayCount: 'Display Items count',
                                onClick: 'On Click',
                                onClickAction: {
                                    sidecart: 'Open Side Cart',
                                    cart: 'Go to Cart',
                                    sideCartWarning: 'Side Cart component is not found on the page',
                                },
                                onClickUrl: 'Destination URL',
                            },
                        },
                    },
                },
            },
        },
    };
};

export default getI18n;
