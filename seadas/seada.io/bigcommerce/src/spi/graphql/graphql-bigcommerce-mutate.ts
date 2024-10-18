import { FetchResult, MutationOptions, OperationVariables } from '@apollo/client';
import getBigcommerceGraphqlClient from '@seada.io/bigcommerce/spi/graphql/get-bigcommerce-graphql-client';
import { Mutation } from '@seada.io/bigcommerce/gql/schema/graphql';
import injectContextHeaders from '@seada.io/bigcommerce/service/graphql/inject-context-headers';
import { IBigCommerceQueryContext } from '@seada.io/bigcommerce/spi/bigcommerce-query-context';

/**
 * Run direct graphql query to bigcommerce source
 * Intended for data loaders use only
 * @param queryContext
 * @param options
 */
const graphqlBigcommerceMutate = async <TVariables extends OperationVariables = OperationVariables>(
    queryContext: IBigCommerceQueryContext,
    options?: MutationOptions<Mutation, TVariables>
): Promise<FetchResult<Mutation>> => {
    const apolloClient = getBigcommerceGraphqlClient(queryContext);
    options.context = injectContextHeaders(queryContext, options.context);

    try {
        return await apolloClient.mutate(options);
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
};

export default graphqlBigcommerceMutate;
