import { OperationVariables, QueryOptions } from '@apollo/client';
import { ICorePageRouterAreaDefinition } from '@seada.io/core/spi/page-router/interface';
import getBigcommerceGraphqlClient from '@seada.io/bigcommerce/spi/graphql/get-bigcommerce-graphql-client';
import { Query } from '@seada.io/bigcommerce/gql/schema/graphql';
import getBigcommerceQueryContext from '@seada.io/bigcommerce/spi/get-bigcommerce-query-context';
import catalogPortClass from '@seada.io/catalog/spi/catalog-port-class';
import getSourceIdByPortClass from '@seada.io/core/spi/get-source-id-by-port-class';

/**
 * Write graphql cache entry
 * @param pageData
 * @param result
 * @param options
 */
const writeSourceGraphqlCache = async <TVariables extends OperationVariables = OperationVariables>(
    pageData: ICorePageRouterAreaDefinition,
    options: QueryOptions<TVariables, Query>,
    result: any
): Promise<void> => {
    const sourceId = getSourceIdByPortClass(catalogPortClass, pageData);
    const bigcommerceQueryContext = getBigcommerceQueryContext(sourceId, pageData);
    const client = getBigcommerceGraphqlClient(bigcommerceQueryContext);
    client.cache.writeQuery({
        ...options,
        ...result,
    });
};

export default writeSourceGraphqlCache;
