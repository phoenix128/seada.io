import { ICorePageRouterAreaDefinition } from '@seada.io/core/spi/page-router/interface';
import { IAlgoliaQueryContext } from '@seada.io/algolia/spi/algolia-query-context';

/**
 * Get the BigCommerce query context.
 * @param sourceId
 * @param pageData
 */
const getAlgoliaQueryContext = (sourceId: string, pageData: ICorePageRouterAreaDefinition): IAlgoliaQueryContext => {
    return {
        sourceId,
    };
};

export default getAlgoliaQueryContext;
