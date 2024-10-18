import { IPrice } from '@seada.io/catalog/interface/price';

export enum EProductOptionDisplayMode {
    RECTANGLE = 'rectangle',
    SWATCH = 'swatch',
    DROPDOWN = 'dropdown',
}

export interface IProductOptionValue {
    id: string;
    label: string;
    isDefault: boolean;
    value: string;
}

export interface IProductSwatchOptionValue extends IProductOptionValue {
    colors?: string[];
    imageUrl?: string;
}

export interface IProductStandardOption {
    id: string;
    key: string;
    label: string;
    displayMode: EProductOptionDisplayMode;
    values: IProductOptionValue[];
}

export interface IProductSwatchOption extends IProductStandardOption {
    displayMode: EProductOptionDisplayMode.SWATCH;
    values: IProductSwatchOptionValue[];
}

export type IProductOption = IProductStandardOption | IProductSwatchOption;

export interface IVariantData {
    id: string;
    key: string;
    sku: string;
    options: Record<string, string>;
    price: IPrice;
    referencePrice?: IPrice;
}

export interface IProductVariantsMatrix {
    [key: string]: IVariantData; // key is variantId
}
