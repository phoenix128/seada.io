import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import createGraphqlClient from '@seada.io/bigcommerce/service/graphql/create-graphql-client';
import decodeUserToken from '@seada.io/user/spi/decode-user-token';
import { IBigCommerceQueryContext } from '@seada.io/bigcommerce/spi/bigcommerce-query-context';

const clients: Record<string, ApolloClient<NormalizedCacheObject>> = {};

/**
 * Get Bigcommerce graphql client
 * @param context
 */
const getBigcommerceGraphqlClient = (context: IBigCommerceQueryContext) => {
    const { userToken, sourceId } = context;

    const userData = decodeUserToken(userToken);
    const groupId = parseInt(userData?.groupId || '0', 10);

    const clientKey = `${sourceId}:${groupId}`;

    if (!clients[clientKey]) {
        clients[clientKey] = createGraphqlClient(sourceId);
    }

    return clients[clientKey];
};

export default getBigcommerceGraphqlClient;
