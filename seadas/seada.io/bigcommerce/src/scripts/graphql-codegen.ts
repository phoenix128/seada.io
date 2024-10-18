import getEnvPath from '@seada.io/core/libs/get-env-path';
import { generate } from '@graphql-codegen/cli';
import appEnvConfig from '@seada.io/core/service/app-env/app-env-config';

appEnvConfig();

interface ICodegenConfig {
    graphqlEndpoint: string;
    storefrontToken: string;
}

(async () => {
    const sources = getEnvPath<ICodegenConfig>('codegen');

    if (!sources?.graphqlEndpoint) {
        throw new Error('Missing CODEGEN__GRAPHQL_ENDPOINT environment variable');
    }

    if (!sources?.storefrontToken) {
        throw new Error('Missing CODEGEN__STOREFRONT_TOKEN environment variable');
    }

    await generate({
        // documents: ['./src/gql/queries/*.ts', './src/gql/mutations/*.ts', './src/gql/fragments/*.ts'],
        schema: {
            [sources.graphqlEndpoint]: {
                headers: {
                    Authorization: `Bearer ${sources.storefrontToken}`,
                },
            },
        },
        generates: {
            './src/gql/schema/': {
                preset: 'client-preset',
                plugins: [
                    {
                        add: {
                            content: '/* eslint-disable */',
                        },
                    },
                ],
            },
        },
        ignoreNoDocuments: true,
    });
})();
