'use server';

import graphqlBigcommerceMutate from '@seada.io/bigcommerce/spi/graphql/graphql-bigcommerce-mutate';
import { IAddToCartRequest, ICartData } from '@seada.io/cart/interface//cart';
import { MUTATION_ADD_TO_CART } from '@seada.io/bigcommerce/gql/mutations/mutation-add-to-cart';
import {
    CartLineItemInput,
    CartMutationsAddCartLineItemsArgs,
    CartMutationsCreateCartArgs,
} from '@seada.io/bigcommerce/gql/schema/graphql';
import { MUTATION_CREATE_CART } from '@seada.io/bigcommerce/gql/mutations/mutation-create-cart';
import convertBigcommerceCart from '@seada.io/bigcommerce/service/converters/from-bigcommerce/convert-bigcommerce-cart';
import graphqlBigcommerceQuery from '@seada.io/bigcommerce/spi/graphql/graphql-bigcommerce-query';
import { QUERY_PRODUCT_DETAILS } from '@seada.io/bigcommerce/gql/queries/query-product';
import { IBigCommerceQueryContext } from '@seada.io/bigcommerce/spi/bigcommerce-query-context';
import assignCartCustomer from '@seada.io/bigcommerce/service/graphql/assign-cart-customer';

/**
 * Get variant key
 * @param context
 * @param request
 */
const getIds = async (
    context: IBigCommerceQueryContext,
    request: IAddToCartRequest
): Promise<{
    productEntityId: number;
    variantEntityId: number;
}> => {
    const { variantKey, productKey } = request;

    const q = await graphqlBigcommerceQuery(context, {
        query: QUERY_PRODUCT_DETAILS,
        variables: {
            sku: productKey,
        },
    });

    const productEntityId = q.data.site.product.entityId;
    const variantEntityId =
        q.data.site.product.variants.edges.find((v) => v.node.sku === variantKey)?.node.entityId || 0;

    return {
        productEntityId,
        variantEntityId,
    };
};

/**
 * Get line item
 * @param context
 * @param request
 */
const getLineItem = async (context: IBigCommerceQueryContext, request: IAddToCartRequest) => {
    const { variantEntityId, productEntityId } = await getIds(context, request);

    const lineItem: CartLineItemInput = {
        quantity: request.quantity,
        productEntityId,
    };
    if (variantEntityId) {
        lineItem.variantEntityId = variantEntityId;
    }

    return lineItem;
};

/**
 * Create cart in bigcommerce
 * @param context
 * @param request
 */
const createCart = async (context: IBigCommerceQueryContext, request: IAddToCartRequest): Promise<ICartData | null> => {
    const lineItem = await getLineItem(context, request);

    const createCartRes = await graphqlBigcommerceMutate<CartMutationsCreateCartArgs>(context, {
        mutation: MUTATION_CREATE_CART,
        variables: {
            input: {
                lineItems: [lineItem],
            },
        },
    });

    return convertBigcommerceCart(createCartRes.data?.cart.createCart.cart);
};

/**
 * Add line to cart in bigcommerce
 * @param context
 * @param request
 */
const addLineToCart = async (
    context: IBigCommerceQueryContext,
    request: IAddToCartRequest
): Promise<ICartData | null> => {
    const lineItem = await getLineItem(context, request);

    const addToCartRes = await graphqlBigcommerceMutate<CartMutationsAddCartLineItemsArgs>(context, {
        mutation: MUTATION_ADD_TO_CART,
        variables: {
            input: {
                cartEntityId: request.cartId,
                data: {
                    lineItems: [lineItem],
                },
            },
        },
    });

    return convertBigcommerceCart(addToCartRes.data?.cart.addCartLineItems.cart);
};

/**
 * Add to cart to bigcommerce
 * @param context
 * @param request
 */
const addToCart = async (context: IBigCommerceQueryContext, request: IAddToCartRequest): Promise<ICartData | null> => {
    if (request.cartId) {
        await assignCartCustomer(context, request.cartId);
        return await addLineToCart(context, request);
    }

    return await createCart(context, request);
};

export default addToCart;
