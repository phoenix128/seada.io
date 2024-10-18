import React from 'react';
import { IProductsListDataProviderResult } from '@seada.io/catalog/ports/catalog/data-providers/products-list';
import { IFacetsSidebarSchema } from '@seada.io/catalog/page-components/FacetsSidebar/schema';
import useFacetsSidebarModel from '@seada.io/catalog/page-components/FacetsSidebar/FacetsSidebar.model';
import { IPageComponentSchemaPropsWithDataProvider } from '@seada.io/core-schema/spi/components/interface';
import FacetsSidebarDesktop from '@seada.io/catalog/page-components/FacetsSidebar/FacetsSidebarDesktop';
import FacetsSidebarMobile from '@seada.io/catalog/page-components/FacetsSidebar/FacetsSidebarMobile';

const FacetsSidebar: React.FC<
    IPageComponentSchemaPropsWithDataProvider<IFacetsSidebarSchema, IProductsListDataProviderResult>
> = (props) => {
    const {
        data: { mobileMode },
    } = useFacetsSidebarModel(props);

    return mobileMode ? <FacetsSidebarMobile {...props} /> : <FacetsSidebarDesktop {...props} />;
};

export default FacetsSidebar;
