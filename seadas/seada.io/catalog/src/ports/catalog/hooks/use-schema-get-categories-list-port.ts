import { IUseAdapterProxyHook, useContextUnawareAdapterHook } from '@seada.io/core/hooks/use-adapter-hook';
import { IAsyncActionCall } from '@seada.io/core/hooks/use-async-action';
import useAsyncActionCallStaticResponse from '@seada.io/core/hooks/use-async-action-call-static-response';
import { IPageData } from '@seada.io/core/spi/components/interface';
import { ICategoryData } from '@seada.io/catalog/interface/category';
import catalogPortClass from '@seada.io/catalog/spi/catalog-port-class';

export interface IUseGetCategoriesListAdapter {
    (): IAsyncActionCall<(pageData: IPageData) => Promise<ICategoryData[]>>;
}

const useSchemaGetCategoriesListPort: IUseAdapterProxyHook<IUseGetCategoriesListAdapter> = (
    sourceAdapterCode: string
) => {
    const fallbackHook = useAsyncActionCallStaticResponse<ICategoryData[]>([]);
    return useContextUnawareAdapterHook<IUseGetCategoriesListAdapter>(
        sourceAdapterCode,
        catalogPortClass,
        'use-schema-get-categories-list',
        fallbackHook
    );
};

export default useSchemaGetCategoriesListPort;
