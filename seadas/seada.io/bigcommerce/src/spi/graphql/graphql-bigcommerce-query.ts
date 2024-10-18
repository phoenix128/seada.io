import { ApolloQueryResult, OperationVariables, QueryOptions } from '@apollo/client';
import getBigcommerceGraphqlClient from '@seada.io/bigcommerce/spi/graphql/get-bigcommerce-graphql-client';
import { Query } from '@seada.io/bigcommerce/gql/schema/graphql';
import injectContextHeaders from '@seada.io/bigcommerce/service/graphql/inject-context-headers';
import { IBigCommerceQueryContext } from '@seada.io/bigcommerce/spi/bigcommerce-query-context';
import { profilerWrapperAsync } from '@seada.io/core/libs/profile';
import { OperationDefinitionNode } from 'graphql/language';
import bigcommerceQueryCacheWrapper from '@seada.io/bigcommerce/service/cache/bigcommerce-query-cache-wrapper';
import md5 from 'md5';

/**
 * Run direct graphql query to bigcommerce source
 * Intended for data loaders use only
 * @param queryContext
 * @param options
 */
const graphqlBigcommerceQuery = async <TVariables extends OperationVariables = OperationVariables>(
    queryContext: IBigCommerceQueryContext,
    options?: QueryOptions<TVariables, Query>
): Promise<ApolloQueryResult<Query>> => {
    const cacheKey = md5(JSON.stringify(options));

    const fn = async () => {
        const queryNames = options?.query?.definitions
            .filter((def) => def.kind === 'OperationDefinition')
            .map((def: OperationDefinitionNode) => def.name?.value)
            .join(', ');

        return profilerWrapperAsync(`bigcommerce:graphql-query[${queryNames}]`, async () => {
            const apolloClient = getBigcommerceGraphqlClient(queryContext);
            options.context = injectContextHeaders(queryContext, options.context);

            try {
                return await apolloClient.query(options);
            } catch (error) {
                throw new Error(`Error running graphql query to bigcommerce: ${error}`);
            }
        });
    };

    if (options?.fetchPolicy === 'no-cache' || options?.fetchPolicy === 'network-only') {
        return fn();
    }

    return bigcommerceQueryCacheWrapper(queryContext, cacheKey, fn);
};

export default graphqlBigcommerceQuery;
