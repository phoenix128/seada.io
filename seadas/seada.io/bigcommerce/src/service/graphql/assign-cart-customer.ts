import graphqlBigcommerceMutate from '@seada.io/bigcommerce/spi/graphql/graphql-bigcommerce-mutate';
import { CartMutationsAssignCartToCustomerArgs } from '@seada.io/bigcommerce/gql/schema/graphql';
import { MUTATION_ASSIGN_CART } from '@seada.io/bigcommerce/gql/mutations/mutation-assign-cart';
import { IBigCommerceQueryContext } from '@seada.io/bigcommerce/spi/bigcommerce-query-context';
import decodeUserToken from '@seada.io/user/spi/decode-user-token';

const assignCartCustomer = async (context: IBigCommerceQueryContext, cartId: string, userId?: number) => {
    const reassignUserId = userId || parseInt(decodeUserToken(context.userToken)?.userId || '0', 10);

    try {
        if (!reassignUserId) return;

        await graphqlBigcommerceMutate<CartMutationsAssignCartToCustomerArgs>(context, {
            mutation: MUTATION_ASSIGN_CART,
            context: {
                userId: reassignUserId,
            },
            variables: {
                input: {
                    cartEntityId: cartId,
                },
            },
        });
    } catch (e) {
        console.error('Failed to assign cart to customer', e);
    }
};

export default assignCartCustomer;
