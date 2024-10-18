import useAsyncAction from '@seada.io/core/hooks/use-async-action';
import searchProducts from '@seada.io/bigcommerce/server-actions/search-products';
import { IUseSearchProductsAdapter } from '@seada.io/catalog/ports/catalog/hooks/use-schema-search-products-port';
import { IPageData } from '@seada.io/core/spi/components/interface';
import { IBigCommerceQueryContext } from '@seada.io/bigcommerce/spi/bigcommerce-query-context';
import { useMemo } from 'react';
import catalogPortClass from '@seada.io/catalog/spi/catalog-port-class';

const useSchemaSearchProducts: IUseSearchProductsAdapter = () => {
    const fn = useMemo(
        () => (pageData: IPageData, search: string) => {
            const queryContext: IBigCommerceQueryContext = {
                sourceId: pageData.sourceIds[catalogPortClass],
                userToken: undefined,
            };
            return searchProducts(queryContext, search);
        },
        []
    );

    return useAsyncAction(fn);
};

export default useSchemaSearchProducts;
