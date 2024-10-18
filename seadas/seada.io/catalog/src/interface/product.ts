import { IPrice } from '@seada.io/catalog/interface/price';
import { IProductOption, IProductVariantsMatrix } from '@seada.io/catalog/interface/product-options';
import { IFacet } from '@seada.io/catalog/interface/facet';
import React from 'react';

export interface IProductImage {
    url: string;
    title: string;
}

export interface IProductCardData extends IProductData {}

export interface IProductData {
    id: string;
    key: string;
    sku: string;
    name: string;
    price: IPrice;
    referencePrice?: IPrice;
    minPrice: IPrice;
    maxPrice: IPrice;
    url?: string;
    shortDescription: string;
    description: string;
    mainImage: IProductImage;
    imagesGallery: IProductImage[];
    hasVariants: boolean;

    variantOptions?: IProductOption[];
    variantsMatrix?: IProductVariantsMatrix; // [variantId][optionId] => optionValueId
}

export type IWithPaginatedProductList<TProps = any> = TProps & {
    productsPerPage?: number;
};

export interface IProductsListData {
    products: IProductData[];
    facets: IFacet[];
    pagination: {
        totalItems: number;
        totalPages: number;
        currentPage: number;
        limit: number;
    };
}

export interface IProductCardActionProps {
    product: IProductData;
}

export type IProductCardAction = React.FC<IProductCardActionProps>;
