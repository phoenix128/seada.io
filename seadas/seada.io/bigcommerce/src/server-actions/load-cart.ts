'use server';

import { ICartData } from '@seada.io/cart/interface/cart';
import convertBigcommerceCart from '@seada.io/bigcommerce/service/converters/from-bigcommerce/convert-bigcommerce-cart';
import graphqlBigcommerceQuery from '@seada.io/bigcommerce/spi/graphql/graphql-bigcommerce-query';
import { QUERY_CART } from '@seada.io/bigcommerce/gql/queries/query-cart';
import { IBigCommerceQueryContext } from '@seada.io/bigcommerce/spi/bigcommerce-query-context';
import assignCartCustomer from '@seada.io/bigcommerce/service/graphql/assign-cart-customer';

/**
 * Add to cart to bigcommerce
 * @param context
 * @param cartId
 */
const loadCart = async (context: IBigCommerceQueryContext, cartId: string): Promise<ICartData | null> => {
    if (!cartId) {
        return null;
    }

    await assignCartCustomer(context, cartId);
    const cartRes = await graphqlBigcommerceQuery(context, {
        fetchPolicy: 'network-only',
        query: QUERY_CART,
        variables: {
            cartId,
        },
    });

    return convertBigcommerceCart(cartRes.data?.site.cart);
};

export default loadCart;
