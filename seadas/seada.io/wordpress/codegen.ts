/* eslint-disable no-restricted-imports */

import { CodegenConfig } from '@graphql-codegen/cli';

const codegenConfig: CodegenConfig = {
    schema: {
        ['http://localhost:8080/graphql']: {},
    },
    generates: {
        './generated/gql/': {
            preset: 'client',
            plugins: [],
            config: {
                useImplementingTypes: true,
            },
        },
    },
    ignoreNoDocuments: true,
};

export default codegenConfig;
