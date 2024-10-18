import { OperationVariables, QueryOptions } from '@apollo/client';
import { ICorePageRouterAreaDefinition } from '@seada.io/core/spi/page-router/interface';
import { RootQuery } from '@seada.io/wordpress/gql/schema/graphql';
import getWordpressQueryContext from '@seada.io/wordpress/spi/get-wordpress-query-context';
import contentPortClass from '@seada.io/content/spi/content-port-class';
import getWordpressGraphqlClient from '@seada.io/wordpress/spi/graphql/get-wordpress-graphql-client';
import getSourceIdByPortClass from '@seada.io/core/spi/get-source-id-by-port-class';

/**
 * Write graphql cache entry
 * @param pageData
 * @param result
 * @param options
 */
const writeSourceGraphqlCache = async <TVariables extends OperationVariables = OperationVariables>(
    pageData: ICorePageRouterAreaDefinition,
    options: QueryOptions<TVariables, RootQuery>,
    result: any
): Promise<void> => {
    const sourceId = getSourceIdByPortClass(contentPortClass, pageData);
    const wordpressQueryContext = getWordpressQueryContext(sourceId, pageData);
    const client = getWordpressGraphqlClient(wordpressQueryContext);
    client.cache.writeQuery({
        ...options,
        ...result,
    });
};

export default writeSourceGraphqlCache;
