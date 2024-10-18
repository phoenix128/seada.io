import graphqlBigcommerceMutate from '@seada.io/bigcommerce/spi/graphql/graphql-bigcommerce-mutate';
import { CartMutationsUnassignCartFromCustomerArgs } from '@seada.io/bigcommerce/gql/schema/graphql';
import { IBigCommerceQueryContext } from '@seada.io/bigcommerce/spi/bigcommerce-query-context';
import { MUTATION_UNASSIGN_CART } from '@seada.io/bigcommerce/gql/mutations/mutation-unassign-cart';

const unassignCartCustomer = async (context: IBigCommerceQueryContext, cartId: string) => {
    await graphqlBigcommerceMutate<CartMutationsUnassignCartFromCustomerArgs>(context, {
        mutation: MUTATION_UNASSIGN_CART,
        variables: {
            input: {
                cartEntityId: cartId,
            },
        },
    });
};

export default unassignCartCustomer;
