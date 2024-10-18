import { FetchResult, MutationOptions, OperationVariables } from '@apollo/client';
import { RootMutation } from '@seada.io/wordpress/gql/schema/graphql';
import injectContextHeaders from '@seada.io/wordpress/service/graphql/inject-context-headers';
import { IWordpressQueryContext } from '@seada.io/wordpress/spi/wordpress-query-context';
import getWordpressGraphqlClient from '@seada.io/wordpress/spi/graphql/get-wordpress-graphql-client';

/**
 * Run direct graphql query to wordpress source
 * Intended for data loaders use only
 * @param queryContext
 * @param options
 */
const graphqlWordpressMutate = async <TVariables extends OperationVariables = OperationVariables>(
    queryContext: IWordpressQueryContext,
    options?: MutationOptions<RootMutation, TVariables>
): Promise<FetchResult<RootMutation>> => {
    const apolloClient = getWordpressGraphqlClient(queryContext);
    options.context = injectContextHeaders(queryContext, options.context);

    try {
        return await apolloClient.mutate(options);
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
};

export default graphqlWordpressMutate;
