import useAsyncAction from '@seada.io/core/hooks/use-async-action';
import { IUseGetProductsListAdapter } from '@seada.io/catalog/ports/catalog/hooks/use-schema-get-products-list-port';
import getProductsList from '@seada.io/bigcommerce/server-actions/get-products-list';
import { IPageData } from '@seada.io/core/spi/components/interface';
import { IBigCommerceQueryContext } from '@seada.io/bigcommerce/spi/bigcommerce-query-context';
import { useMemo } from 'react';
import catalogPortClass from '@seada.io/catalog/spi/catalog-port-class';

const useSchemaGetProductsList: IUseGetProductsListAdapter = () => {
    const fn = useMemo(
        () => (pageData: IPageData, productIds: string[]) => {
            const queryContext: IBigCommerceQueryContext = {
                sourceId: pageData.sourceIds[catalogPortClass],
                userToken: undefined,
            };
            return getProductsList(queryContext, productIds);
        },
        []
    );

    return useAsyncAction(fn);
};

export default useSchemaGetProductsList;
