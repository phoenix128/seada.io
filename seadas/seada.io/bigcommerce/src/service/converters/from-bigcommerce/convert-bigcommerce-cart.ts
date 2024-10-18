import { ICartData, ICartLineItemData } from '@seada.io/cart/interface/cart';
import { Cart, CartPhysicalItem } from '@seada.io/bigcommerce/gql/schema/graphql';

const convertPhysicalLineItems = (lineItem: CartPhysicalItem): ICartLineItemData => {
    return {
        lineId: lineItem.entityId.toString(),
        name: lineItem.name,
        quantity: lineItem.quantity,
        productId: lineItem.productEntityId.toString(),
        sku: lineItem.sku,
        price: {
            amount: lineItem.salePrice.value,
            currency: lineItem.salePrice.currencyCode,
        },
        description: '',
        thumbnail: lineItem.imageUrl,
    };
};

const convertBigcommerceCart = (cart: Cart): ICartData | null => {
    if (!cart) return null;

    return {
        cartId: cart.entityId,
        lineItems: cart.lineItems?.physicalItems.map(convertPhysicalLineItems),
        totals: {
            subtotal: {
                amount: cart.baseAmount.value,
                currency: cart.baseAmount.currencyCode,
            },
            grandTotal: {
                amount: cart.amount.value,
                currency: cart.amount.currencyCode,
            },
        },
    };
};

export default convertBigcommerceCart;
