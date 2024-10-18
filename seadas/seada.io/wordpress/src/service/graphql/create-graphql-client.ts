import { getSourceConfigValueOrThrow } from '@seada.io/core/libs/get-source-config-value';
import { ApolloClient, ApolloLink, createHttpLink, NormalizedCacheObject } from '@apollo/client/core';
import cacheTypePolicies from '@seada.io/wordpress/service/graphql/cache-type-policies';
import { NextSSRInMemoryCache } from '@apollo/experimental-nextjs-app-support/ssr';
import { onError } from '@apollo/client/link/error';

const createGraphqlClient = (sourceId: string): ApolloClient<NormalizedCacheObject> => {
    const graphqlEndpoint = getSourceConfigValueOrThrow(sourceId, 'graphqlEndpoint');

    const errorLink = onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors)
            graphQLErrors.forEach(({ message, locations, path }) => console.log(`[GraphQL]: Message: ${message}`));

        if (networkError) {
            console.error(`[Network]: ${networkError}`);
        }
    });

    const httpLink = createHttpLink({
        uri: graphqlEndpoint,
        preserveHeaderCase: true,
        fetch: async (url: string, options: RequestInit) => {
            return fetch(url, {
                ...options,
                cache: 'force-cache',
                headers: options.headers,
                keepalive: true,
            });
        },
    });

    // Allow passing headers from context
    const headersMiddleware = new ApolloLink((operation, forward) => {
        const context = operation.getContext();

        if (context.headers) {
            operation.setContext(({ headers = {} }) => ({
                headers: {
                    ...headers,
                    headers: context.headers,
                },
            }));
        }

        return forward(operation);
    });

    const link = ApolloLink.from([headersMiddleware, errorLink, httpLink]);

    return new ApolloClient({
        cache: new NextSSRInMemoryCache({
            typePolicies: cacheTypePolicies,
            addTypename: true,
        }),
        link,
        defaultOptions: {
            query: {
                fetchPolicy: 'cache-first',
            },
        },
        ssrMode: true,
        credentials: 'include',
        queryDeduplication: true,
        assumeImmutableResults: true,
    });
};

export default createGraphqlClient;
