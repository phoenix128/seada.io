import { IFacetsSidebarSchema } from '@seada.io/catalog/page-components/FacetsSidebar/schema';
import { IProductsListDataProviderResult } from '@seada.io/catalog/ports/catalog/data-providers/products-list';
import { useCallback, useEffect, useMemo, useState } from 'react';
import useUpdateFacetsQsPort from '@seada.io/catalog/ports/catalog/hooks/use-update-facets-qs-port';
import { IFacet } from '@seada.io/catalog/interface/facet';
import { IPageComponentSchemaPropsWithDataProvider } from '@seada.io/core-schema/spi/components/interface';
import useTwResponsiveValue from '@seada.io/core/hooks/tw/use-tw-responsive-value';

const useFacetsSidebarModel = (
    props: IPageComponentSchemaPropsWithDataProvider<IFacetsSidebarSchema, IProductsListDataProviderResult>
) => {
    const facets = useMemo(
        () => props.providersData?.productsList?.facets || [],
        [props.providersData?.productsList?.facets]
    );
    const [loading, setLoading] = useState(false);

    const updateFacetsQs = useUpdateFacetsQsPort();

    // Update loading state when facets change
    useEffect(() => {
        setLoading(false);
    }, [facets]);

    const handleChange = useCallback(
        (facet: IFacet) => {
            if (loading) return;

            setLoading(true);

            const newFacets = facets.map((f: IFacet) => {
                if (f.code === facet.code) {
                    return facet;
                }

                return f;
            });

            updateFacetsQs(newFacets);
        },
        [facets, loading, updateFacetsQs]
    );

    const mobileMode = useTwResponsiveValue<boolean>(props.mobileMode);

    return {
        data: {
            facets,
            loading,
            mobileMode,
        },
        handlers: {
            handleChange,
        },
    };
};

export default useFacetsSidebarModel;
