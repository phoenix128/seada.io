import { getSourceConfigValueOrThrow } from '@seada.io/core/libs/get-source-config-value';
import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client/core';
import cacheTypePolicies from '@seada.io/bigcommerce/service/graphql/cache-type-policies';
import { onError } from '@apollo/client/link/error';
import { profilerWrapperSync } from '@seada.io/core/libs/profile';

const createGraphqlClient = (sourceId: string): ApolloClient<NormalizedCacheObject> =>
    profilerWrapperSync('bigcommerce:create-graphql-client', () => {
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
                    cache: 'default',
                    ...options,
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

        // Do not use SSR cache/mode here
        // https://stackoverflow.com/questions/78097746/how-to-force-apollo-client-to-respect-network-only-fetchpolicy-when-ssrmode-is
        return new ApolloClient({
            cache: new InMemoryCache({
                typePolicies: cacheTypePolicies,
                addTypename: true,
            }),
            link,
            defaultOptions: {
                query: {
                    fetchPolicy: 'cache-first',
                },
            },
            credentials: 'include',
            queryDeduplication: true,
            assumeImmutableResults: true,
        });
    });

export default createGraphqlClient;
