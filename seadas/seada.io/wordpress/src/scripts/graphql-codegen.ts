import getEnvPath from '@seada.io/core/libs/get-env-path';
import * as dotenv from 'dotenv';
import { generate } from '@graphql-codegen/cli';

dotenv.config();
dotenv.config({ path: '.env.local' });

interface ICodegenConfig {
    graphqlEndpoint: string;
    storefrontToken: string;
}

(async () => {
    const sources = getEnvPath<ICodegenConfig>('codegen');

    if (!sources?.graphqlEndpoint) {
        throw new Error('Missing CODEGEN__GRAPHQL_ENDPOINT environment variable');
    }

    await generate({
        schema: {
            [sources.graphqlEndpoint]: {},
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
