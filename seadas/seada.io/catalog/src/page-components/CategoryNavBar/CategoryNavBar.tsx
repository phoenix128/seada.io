import React from 'react';
import SimpleNav from '@seada.io/basic-ui/components/SimpleNav';
import { IINavBarDataProviderResult } from '@seada.io/catalog/ports/catalog/data-providers/category-nav-bar';
import { ICategoryNavBarSchema } from '@seada.io/catalog/page-components/CategoryNavBar/schema';
import { IPageComponentSchemaPropsWithDataProvider } from '@seada.io/core-schema/spi/components/interface';

const NavBar: React.FC<IPageComponentSchemaPropsWithDataProvider<ICategoryNavBarSchema, IINavBarDataProviderResult>> = (
    props
) => {
    const { providersData } = props;
    const nodesTree = providersData?.navBar?.nodesTree;
    if (!nodesTree) return null;

    return <SimpleNav {...props} nodes={nodesTree} />;
};

export default NavBar;
