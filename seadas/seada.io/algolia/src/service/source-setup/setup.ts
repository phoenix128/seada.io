import { ISourceSetup } from '@seada.io/core/interface/source-setup';
import inquirer from 'inquirer';
import getSourceConfigValue from '@seada.io/core/libs/get-source-config-value';
import toUpperSnakeCase from '@seada.io/core/libs/to-upper-snake-case';
import getCatalogSearchResultTransformers from '@seada.io/catalog-search/spi/get-catalog-search-result-transformers';

const validateAppId = (value: string) => {
    if (!value) {
        return 'App id is required';
    }

    if (!value.match(/^[A-Z0-9]+$/)) {
        return 'App id must be uppercase alphanumeric';
    }

    return true;
};

const validateApiKey = (value: string) => {
    if (!value) {
        return 'Api key is required';
    }

    if (!value.match(/^[a-z0-9]+$/)) {
        return 'Api key must be lowercase alphanumeric';
    }

    return true;
};

const validateIndex = (value: string) => {
    if (!value) {
        return 'Index is required';
    }

    return true;
};

const setup: ISourceSetup = async (sourceId: string): Promise<Record<string, string>> => {
    const transformers = Object.keys(getCatalogSearchResultTransformers());

    const setupQuestions: any[] = [
        {
            type: 'input',
            name: 'appId',
            message: 'What is the app id?',
            validate: validateAppId,
            default: getSourceConfigValue(sourceId, 'appId'),
        },
        {
            type: 'input',
            name: 'apiKey',
            message: 'What is the api key?',
            validate: validateApiKey,
            default: getSourceConfigValue(sourceId, 'apiKey'),
        },
        {
            type: 'input',
            name: 'index',
            message: 'What is the index?',
            validate: validateIndex,
            default: getSourceConfigValue(sourceId, 'index'),
        },
        {
            type: 'list',
            name: 'transformer',
            message: 'Select the transformer for the source:',
            choices: transformers,
            default: getSourceConfigValue(sourceId, 'transformer'),
        },
    ];

    const setupRes = await inquirer.prompt(setupQuestions);

    const upperSourceId = toUpperSnakeCase(sourceId);
    return {
        [`SOURCE__${upperSourceId}__ADAPTER`]: 'algolia',
        [`SOURCE__${upperSourceId}__CONFIG__APP_ID`]: setupRes['appId'],
        [`SOURCE__${upperSourceId}__CONFIG__API_KEY`]: setupRes['apiKey'],
        [`SOURCE__${upperSourceId}__CONFIG__INDEX`]: setupRes['index'],
        [`SOURCE__${upperSourceId}__CONFIG__TRANSFORMER`]: setupRes['transformer'],
    };
};

export default setup;
