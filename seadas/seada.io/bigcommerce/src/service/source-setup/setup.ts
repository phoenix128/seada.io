import { ISourceSetup } from '@seada.io/core/interface/source-setup';
import inquirer from 'inquirer';
import getSourceConfigValue from '@seada.io/core/libs/get-source-config-value';
import {
    issueImpersonationToken,
    issueStorefrontToken,
} from '@seada.io/bigcommerce/service/source-setup/issue-storefront-tokens';
import toUpperSnakeCase from '@seada.io/core/libs/to-upper-snake-case';

const validateStoreHash = (value: string) => {
    if (!value) {
        return 'Please enter a store hash.';
    }

    if (!value.match(/^[a-z0-9]+$/)) {
        return 'Store hash must contain only lowercase letters and numbers.';
    }

    return true;
};

const validateClientId = (value: string) => {
    if (!value) {
        return 'Please enter a client id.';
    }

    if (!value.match(/^[a-z0-9]+$/)) {
        return 'Client ID must contain only lowercase letters and numbers.';
    }

    return true;
};

const validateClientSecret = (value: string) => {
    if (!value) {
        return 'Please enter a client secret.';
    }

    if (!value.match(/^[a-z0-9]+$/)) {
        return 'Store hash must contain only lowercase letters and numbers.';
    }

    return true;
};

const validateAccessToken = (value: string) => {
    if (!value) {
        return 'Please enter an access token.';
    }

    if (!value.match(/^[a-z0-9]+$/)) {
        return 'Access token must contain only lowercase letters and numbers.';
    }

    return true;
};

const validateChannelId = (value: string) => {
    if (!value) {
        return 'Please enter a channel id.';
    }

    if (!value.match(/^[0-9]+$/)) {
        return 'Channel id must contain only numbers.';
    }

    return true;
};

const validateGraphQlEndpoint = (value: string) => {
    if (!value) {
        return 'Please enter a GraphQL endpoint.';
    }

    if (!value.match(/^https:\/\/[a-z0-9.-]+\/graphql$/)) {
        return 'GraphQL endpoint must be a valid https URL ending with "/graphql".';
    }

    return true;
};

const setup: ISourceSetup = async (sourceId: string): Promise<Record<string, string>> => {
    const setupQuestions: any[] = [
        {
            type: 'input',
            name: 'storeHash',
            message: 'What is the store hash?',
            validate: validateStoreHash,
            default: getSourceConfigValue(sourceId, 'storeHash'),
        },
        {
            type: 'input',
            name: 'clientId',
            message: 'What is the client id?',
            validate: validateClientId,
            default: getSourceConfigValue(sourceId, 'clientId'),
        },
        {
            type: 'input',
            name: 'clientSecret',
            message: 'What is the client secret?',
            validate: validateClientSecret,
            default: getSourceConfigValue(sourceId, 'clientSecret'),
        },
        {
            type: 'input',
            name: 'accessToken',
            message: 'What is the access token?',
            validate: validateAccessToken,
            default: getSourceConfigValue(sourceId, 'accessToken'),
        },
        {
            type: 'input',
            name: 'channelId',
            message: 'What is the channel id?',
            validate: validateChannelId,
            default: getSourceConfigValue(sourceId, 'channelId'),
        },
        {
            type: 'input',
            name: 'graphqlEndpoint',
            message: 'What is the GraphQL endpoint?',
            validate: validateGraphQlEndpoint,
            default: getSourceConfigValue(sourceId, 'graphqlEndpoint'),
        },
    ];

    const setupRes = await inquirer.prompt(setupQuestions);

    const storefrontToken = await issueStorefrontToken(
        setupRes['storeHash'],
        setupRes['accessToken'],
        setupRes['clientId'],
        setupRes['channelId']
    );

    if (!storefrontToken) {
        throw new Error('Failed to issue storefront token.');
    }

    const impersonationToken = await issueImpersonationToken(
        setupRes['storeHash'],
        setupRes['accessToken'],
        setupRes['clientId'],
        setupRes['channelId']
    );

    if (!impersonationToken) {
        throw new Error('Failed to issue impersonation token.');
    }

    const storeUrl = `https://store-${setupRes['storeHash']}.mybigcommerce.com`;

    const upperSourceId = toUpperSnakeCase(sourceId);
    return {
        [`SOURCE__${upperSourceId}__ADAPTER`]: 'bigcommerce',
        [`SOURCE__${upperSourceId}__CONFIG__STORE_HASH`]: setupRes['storeHash'],
        [`SOURCE__${upperSourceId}__CONFIG__STORE_URL`]: storeUrl,
        [`SOURCE__${upperSourceId}__CONFIG__CLIENT_ID`]: setupRes['clientId'],
        [`SOURCE__${upperSourceId}__CONFIG__CLIENT_SECRET`]: setupRes['clientSecret'],
        [`SOURCE__${upperSourceId}__CONFIG__ACCESS_TOKEN`]: setupRes['accessToken'],
        [`SOURCE__${upperSourceId}__CONFIG__CHANNEL_ID`]: setupRes['channelId'],
        [`SOURCE__${upperSourceId}__CONFIG__GRAPHQL_ENDPOINT`]: setupRes['graphqlEndpoint'],
        [`SOURCE__${upperSourceId}__CONFIG__STOREFRONT_TOKEN`]: storefrontToken,
        [`SOURCE__${upperSourceId}__CONFIG__CUSTOMER_IMPERSONATION_TOKEN`]: impersonationToken,
    };
};

export default setup;
