import { useEffect, useRef } from 'react';
import { IPageData } from '@seada.io/core/spi/components/interface';
import catalogPortClass from '@seada.io/catalog/spi/catalog-port-class';
import useContextUnawareSourceAdapterCodeByPortClass from '@seada.io/core/hooks/use-context-unaware-source-adapter-code-by-port-class';
import { ICategoryData } from '@seada.io/catalog/interface/category';
import useSchemaGetCategoriesListPort from '@seada.io/catalog/ports/catalog/hooks/use-schema-get-categories-list-port';

export interface ICategoriesListResult {
    categories: ICategoryData[];
    loading: boolean;
    error: Error;
}

const useCategoriesList = (areaDefinition: IPageData): ICategoriesListResult => {
    const sourceAdapterCode = useContextUnawareSourceAdapterCodeByPortClass(catalogPortClass, areaDefinition);

    const res = useSchemaGetCategoriesListPort(sourceAdapterCode);
    const { action, data, loading, error } = res || {};

    // Avoiding to pass the areaDefinition to the useEffect dependencies
    // to avoid page reload when any other property changes
    const areaDefinitionRef = useRef(areaDefinition);

    useEffect(() => {
        action && action(areaDefinitionRef.current);
    }, [action]);

    return {
        categories: data || [],
        loading,
        error,
    };
};

export default useCategoriesList;
