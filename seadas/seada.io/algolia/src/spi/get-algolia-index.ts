import { IAlgoliaQueryContext } from '@seada.io/algolia/spi/algolia-query-context';
import getSourceConfigValue from '@seada.io/core/libs/get-source-config-value';
import algoliasearch, { SearchIndex } from 'algoliasearch';

const clients: Record<string, any> = {};

/**
 * Get the Algolia index.
 * @param context
 */
const getAlgoliaIndex = (context: IAlgoliaQueryContext): SearchIndex => {
    const index = getSourceConfigValue(context.sourceId, 'index');
    const key = `${context.sourceId}.${index}`;

    if (!clients.hasOwnProperty(key)) {
        const appId = getSourceConfigValue(context.sourceId, 'appId');
        const apiKey = getSourceConfigValue(context.sourceId, 'apiKey');
        const algolia = algoliasearch(appId, apiKey);
        clients[key] = algolia.initIndex(index);
    }

    return clients[key];
};

export default getAlgoliaIndex;
