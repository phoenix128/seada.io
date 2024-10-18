import useAsyncAction from '@seada.io/core/hooks/use-async-action';
import { IPageData } from '@seada.io/core/spi/components/interface';
import { useMemo } from 'react';
import getCategoriesList from '@seada.io/bigcommerce/server-actions/get-categories-list';
import { IBigCommerceQueryContext } from '@seada.io/bigcommerce/spi/bigcommerce-query-context';
import catalogPortClass from '@seada.io/catalog/spi/catalog-port-class';
import { IUseGetCategoriesListAdapter } from '@seada.io/catalog/ports/catalog/hooks/use-schema-get-categories-list-port';

const useSchemaGetCategoriesList: IUseGetCategoriesListAdapter = () => {
    const fn = useMemo(
        () => (pageData: IPageData) => {
            const queryContext: IBigCommerceQueryContext = {
                sourceId: pageData.sourceIds[catalogPortClass],
                userToken: undefined,
            };
            return getCategoriesList(queryContext);
        },
        []
    );

    return useAsyncAction(fn);
};

export default useSchemaGetCategoriesList;
