import { ApolloQueryResult, OperationVariables, QueryOptions } from '@apollo/client';
import { RootQuery } from '@seada.io/wordpress/gql/schema/graphql';
import injectContextHeaders from '@seada.io/wordpress/service/graphql/inject-context-headers';
import { IWordpressQueryContext } from '@seada.io/wordpress/spi/wordpress-query-context';
import getWordpressGraphqlClient from '@seada.io/wordpress/spi/graphql/get-wordpress-graphql-client';
import md5 from 'md5';
import wordpressQueryCacheWrapper from '@seada.io/wordpress/service/cache/wordpress-query-cache-wrapper';

/**
 * Run direct graphql query to wordpress source
 * Intended for data loaders use only
 * @param queryContext
 * @param options
 */
const graphqlWordpressQuery = async <TVariables extends OperationVariables = OperationVariables>(
    queryContext: IWordpressQueryContext,
    options?: QueryOptions<TVariables, RootQuery>
): Promise<ApolloQueryResult<RootQuery>> => {
    const cacheKey = md5(JSON.stringify(options));

    return wordpressQueryCacheWrapper(queryContext, cacheKey, async () => {
        const apolloClient = getWordpressGraphqlClient(queryContext);
        options.context = injectContextHeaders(queryContext, options.context);

        try {
            const res = await apolloClient.query(options);

            // Apply a no-cache fetch policy to refresh the cache asynchronously
            apolloClient
                .query({ ...options, fetchPolicy: 'no-cache' })
                .then((res) => {
                    apolloClient.cache.writeQuery({ ...options, ...res });
                })
                .catch((error) => {
                    console.error(`Error running refresh query to wordpress: ${error}`);
                });

            return res;
        } catch (error) {
            throw new Error(`Error running graphql query to wordpress: ${error}`);
        }
    });
};

export default graphqlWordpressQuery;
