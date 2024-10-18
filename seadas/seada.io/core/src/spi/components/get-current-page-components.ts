import { IPageData } from '@seada.io/core/spi/components/interface';
import { IPageComponentsCollection } from '@seada.io/core/spi/components/interface';
import { IPageComponentDefinition } from '@seada.io/core/spi/seada-pages/interface';
import getPageComponent from '@seada.io/core/spi/components/get-page-component';

const recursivelyFetchComponents = (components: IPageComponentDefinition[]): IPageComponentsCollection => {
    const res: IPageComponentsCollection = {};

    for (const component of components) {
        res[component.type] = getPageComponent(component.type);

        if (component.children) {
            const childrenComponents = recursivelyFetchComponents(component.children);
            Object.assign(res, childrenComponents);
        }
    }

    return res;
};

const getCurrentPageComponents = (pageData: IPageData): IPageComponentsCollection => {
    const pageComponents = recursivelyFetchComponents(pageData.pageLayout.components);
    const layoutComponents = recursivelyFetchComponents(pageData.pageLayout.components);

    return {
        ...pageComponents,
        ...layoutComponents,
    };
};

export default getCurrentPageComponents;
