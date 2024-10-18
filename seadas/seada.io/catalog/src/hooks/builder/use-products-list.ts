import { IProductData } from '@seada.io/catalog/interface/product';
import { useEffect, useRef } from 'react';
import { IPageData } from '@seada.io/core/spi/components/interface';
import useSchemaGetProductsListPort from '@seada.io/catalog/ports/catalog/hooks/use-schema-get-products-list-port';
import catalogPortClass from '@seada.io/catalog/spi/catalog-port-class';
import useContextUnawareSourceAdapterCodeByPortClass from '@seada.io/core/hooks/use-context-unaware-source-adapter-code-by-port-class';

export interface IProductsListResult {
    products: IProductData[];
    loading: boolean;
    error: Error;
}

const useProductsList = (areaDefinition: IPageData, productIds: string | string[]): IProductsListResult => {
    if (!Array.isArray(productIds) && productIds) {
        productIds = [productIds.toString()];
    }

    const sourceAdapterCode = useContextUnawareSourceAdapterCodeByPortClass(catalogPortClass, areaDefinition);

    const res = useSchemaGetProductsListPort(sourceAdapterCode);
    const { action, data, loading, error } = res || {};

    // Avoiding to pass the areaDefinition to the useEffect dependencies
    // to avoid page reload when any other property changes
    const areaDefinitionRef = useRef(areaDefinition);

    const productIdsJson = JSON.stringify(productIds);
    useEffect(() => {
        const productIds = productIdsJson ? JSON.parse(productIdsJson) : [];
        action && action(areaDefinitionRef.current, productIds);
    }, [action, productIdsJson]);

    return {
        products: data || [],
        loading,
        error,
    };
};

export default useProductsList;
