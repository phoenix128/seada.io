import { ISourceSetup } from '@seada.io/core/interface/source-setup';
import inquirer from 'inquirer';
import getSourceConfigValue from '@seada.io/core/libs/get-source-config-value';
import toUpperSnakeCase from '@seada.io/core/libs/to-upper-snake-case';

const validateGraphqlEndpoint = (value: string) => {
    if (!value) {
        return 'Graphql endpoint is required';
    }

    if (!value.match(/^https?:\/\/[a-zA-Z0-9.-]+(:[0-9]{1,5})?(\/graphql)?\/?$/)) {
        return 'The graphql endpoint must be a valid URL ending with /graphql';
    }

    return true;
};

const setup: ISourceSetup = async (sourceId: string): Promise<Record<string, string>> => {
    const setupQuestions: any[] = [
        {
            type: 'input',
            name: 'graphqlEndpoint',
            message: 'What is the GraphQL endpoint?',
            validate: validateGraphqlEndpoint,
            default: getSourceConfigValue(sourceId, 'graphqlEndpoint'),
        },
    ];

    const setupRes = await inquirer.prompt(setupQuestions);

    const upperSourceId = toUpperSnakeCase(sourceId);
    return {
        [`SOURCE__${upperSourceId}__ADAPTER`]: 'wordpress',
        [`SOURCE__${upperSourceId}__CONFIG__GRAPHQL_ENDPOINT`]: setupRes['graphqlEndpoint'],
    };
};

export default setup;
