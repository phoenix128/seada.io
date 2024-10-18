import { ITranslationResourceProvider } from '@seada.io/core/interface';
import { Resource } from 'i18next/typescript/options';

const getI18n: ITranslationResourceProvider = (): Resource => {
    return {
        en: {
            translation: {
                bigcommerce: {
                    facets: {
                        freeShipping: 'Free Shipping',
                        isInStock: 'In Stock',
                        isFeatured: 'Featured',
                    },
                    quickSearch: {
                        products: 'Products',
                    },
                    searchResult: {
                        categories: 'Categories',
                        price: 'Price',
                    },
                },
            },
        },
    };
};

export default getI18n;
