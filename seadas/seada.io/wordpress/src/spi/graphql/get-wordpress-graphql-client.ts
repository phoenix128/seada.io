import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import createGraphqlClient from '@seada.io/wordpress/service/graphql/create-graphql-client';
import { IWordpressQueryContext } from '@seada.io/wordpress/spi/wordpress-query-context';

const clients: Record<string, ApolloClient<NormalizedCacheObject>> = {};

/**
 * Get Wordpress graphql client
 * @param context
 */
const getWordpressGraphqlClient = (context: IWordpressQueryContext) => {
    const { sourceId } = context;

    const clientKey = `${sourceId}`;

    if (!clients[clientKey]) {
        clients[clientKey] = createGraphqlClient(sourceId);
    }

    return clients[clientKey];
};

export default getWordpressGraphqlClient;
