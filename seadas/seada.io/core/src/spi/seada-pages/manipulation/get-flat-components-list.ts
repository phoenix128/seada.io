import { IPageComponentDefinition } from '@seada.io/core/spi/seada-pages/interface';
import { IPageData } from '@seada.io/core/spi/components/interface';
import removePageDynamicData from '@seada.io/core/spi/seada-pages/manipulation/remove-page-dynamic-data';

/**
 * Get a flat list of all components in the page data
 * @param pageDataIn
 */
const getFlatComponentsList = (pageDataIn: IPageData): IPageComponentDefinition[] => {
    const pageData = removePageDynamicData(pageDataIn);

    const flatComponentsList: IPageComponentDefinition[] = [];
    const traverse = (component: IPageComponentDefinition) => {
        flatComponentsList.push(component);
        if (component.children) {
            component.children.forEach(traverse);
            delete component.children;
        }
    };

    pageData.pageTemplate.components.forEach(traverse);
    pageData.pageLayout.components.forEach(traverse);

    return flatComponentsList;
};

export default getFlatComponentsList;
