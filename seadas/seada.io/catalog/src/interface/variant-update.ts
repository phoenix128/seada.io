import { IVariantData } from '@seada.io/catalog/interface/product-options';

export interface IVariantUpdateEvent {
    productKey: string;
    variant: IVariantData;
}
