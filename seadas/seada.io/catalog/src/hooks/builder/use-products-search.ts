import { IProductData } from '@seada.io/catalog/interface/product';
import { useDeferredValue, useEffect, useRef } from 'react';
import { IPageData } from '@seada.io/core/spi/components/interface';
import useSchemaSearchProductsPort from '@seada.io/catalog/ports/catalog/hooks/use-schema-search-products-port';
import catalogPortClass from '@seada.io/catalog/spi/catalog-port-class';
import useContextUnawareSourceAdapterCodeByPortClass from '@seada.io/core/hooks/use-context-unaware-source-adapter-code-by-port-class';

export interface IProductsListResult {
    products: IProductData[];
    loading: boolean;
    error: Error;
}

const useProductsSearch = (areaDefinition: IPageData, search: string): IProductsListResult => {
    const sourceAdapterCode = useContextUnawareSourceAdapterCodeByPortClass(catalogPortClass, areaDefinition);
    const { action, data, loading, error } = useSchemaSearchProductsPort(sourceAdapterCode);
    const deferredSearch = useDeferredValue(search);

    // Avoiding to pass the areaDefinition to the useEffect dependencies
    // to avoid page reload when any other property changes
    const areaDefinitionRef = useRef(areaDefinition);

    useEffect(() => {
        action && action(areaDefinitionRef.current, deferredSearch);
    }, [action, deferredSearch]);

    return {
        products: data || [],
        loading,
        error,
    };
};

export default useProductsSearch;
