import { TypePolicies } from '@apollo/client';
import cacheMerge from '@seada.io/bigcommerce/service/graphql/cache-merge';

/**
 * Type policies for Apollo Client
 */
const cacheTypePolicies: TypePolicies = {
    Query: {
        fields: {
            site: {
                merge: cacheMerge,
            },
        },
    },
    Product: {
        keyFields: ['entityId', 'sku'],
    },
    Category: {
        keyFields: ['entityId', 'path'],
    },
    Cart: {
        merge: false,
    },
    Customer: {
        merge: false,
    },
    CustomerAddress: {
        merge: false,
    },
};

export default cacheTypePolicies;
