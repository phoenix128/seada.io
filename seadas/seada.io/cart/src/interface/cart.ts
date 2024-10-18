import { IPrice } from '@seada.io/catalog/interface/price';

export interface ICartData {
    cartId: string;
    lineItems: ICartLineItemData[];
    totals: ICartTotals;
}

export interface ICartTotals {
    subtotal?: IPrice;
    grandTotal?: IPrice;
    shipping?: IPrice;
}

export interface ICartLineItemData {
    lineId: string;
    productId: string;
    sku: string;
    quantity: number;
    price: IPrice;
    name: string;
    description: string;
    thumbnail: string;
}

export interface IAddToCartRequest {
    cartId: string;
    productKey: string;
    variantKey?: string;
    quantity: number;
}

export interface IRemoveCartLineRequest {
    cartId: string;
    lineId: string;
}
