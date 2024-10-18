'use server';

import { ICartData, IRemoveCartLineRequest } from '@seada.io/cart/interface/cart';
import graphqlBigcommerceMutate from '@seada.io/bigcommerce/spi/graphql/graphql-bigcommerce-mutate';
import { CartMutationsDeleteCartLineItemArgs } from '@seada.io/bigcommerce/gql/schema/graphql';
import { MUTATION_DELETE_CART_LINE_ITEM } from '@seada.io/bigcommerce/gql/mutations/mutation-delete-cart-line-item';
import { IBigCommerceQueryContext } from '@seada.io/bigcommerce/spi/bigcommerce-query-context';
import convertBigcommerceCart from '@seada.io/bigcommerce/service/converters/from-bigcommerce/convert-bigcommerce-cart';

const removeCartLine = async (
    context: IBigCommerceQueryContext,
    request: IRemoveCartLineRequest
): Promise<ICartData | null> => {
    const removeCartLineRes = await graphqlBigcommerceMutate<CartMutationsDeleteCartLineItemArgs>(context, {
        mutation: MUTATION_DELETE_CART_LINE_ITEM,
        variables: {
            input: {
                cartEntityId: request.cartId,
                lineItemEntityId: request.lineId,
            },
        },
    });

    if (removeCartLineRes.errors?.length > 0) {
        throw new Error(removeCartLineRes.errors[0].message);
    }

    return convertBigcommerceCart(removeCartLineRes.data?.cart.deleteCartLineItem.cart);
};

export default removeCartLine;
