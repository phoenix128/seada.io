import { IUseAdapterProxyHook, useContextUnawareAdapterHook } from '@seada.io/core/hooks/use-adapter-hook';
import { IAsyncActionCall } from '@seada.io/core/hooks/use-async-action';
import { IProductData } from '@seada.io/catalog/interface/product';
import useAsyncActionCallStaticResponse from '@seada.io/core/hooks/use-async-action-call-static-response';
import { IPageData } from '@seada.io/core/spi/components/interface';
import catalogPortClass from '@seada.io/catalog/spi/catalog-port-class';

export interface IUseGetProductsListAdapter {
    (): IAsyncActionCall<(pageData: IPageData, productIds: string[]) => Promise<IProductData[]>>;
}

const useSchemaGetProductsListPort: IUseAdapterProxyHook<IUseGetProductsListAdapter> = (sourceAdapterCode: string) => {
    const fallbackHook = useAsyncActionCallStaticResponse<IProductData[]>([]);
    return useContextUnawareAdapterHook<IUseGetProductsListAdapter>(
        sourceAdapterCode,
        catalogPortClass,
        'use-schema-get-products-list',
        fallbackHook
    );
};

export default useSchemaGetProductsListPort;
