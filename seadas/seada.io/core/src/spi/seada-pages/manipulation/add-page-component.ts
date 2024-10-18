import findComponent from '@seada.io/core/spi/seada-pages/manipulation/find-component';
import { IPageData } from '@seada.io/core/spi/components/interface';
import { IPageComponentDefinition } from '@seada.io/core/spi/seada-pages/interface';

export type IAddPageComponentParent = '@page' | '@layout' | string;

/**
 * Add a new component to the page
 * @param page
 * @param newComponent
 * @param parentId
 */
const addPageComponent = (
    page: IPageData,
    newComponent: IPageComponentDefinition,
    parentId: IAddPageComponentParent
): IPageData => {
    const newPage = JSON.parse(JSON.stringify(page)) as IPageData;
    if (!newPage.pageTemplate.components || !Array.isArray(newPage.pageTemplate.components)) {
        newPage.pageTemplate.components = [];
    }

    if (!newPage.pageLayout.components || !Array.isArray(newPage.pageLayout.components)) {
        newPage.pageLayout.components = [];
    }

    if (parentId === '@page') {
        newPage.pageTemplate.components.push(newComponent);
        return newPage;
    }

    if (parentId === '@layout') {
        newPage.pageLayout.components.push(newComponent);
        return newPage;
    }

    const parentComponent = findComponent(newPage, parentId);
    if (!parentComponent) {
        throw new Error(`Parent component with id ${parentId} not found`);
    }

    if (parentComponent) {
        if (parentComponent.children) {
            parentComponent.children.push(newComponent);
        } else {
            parentComponent.children = [newComponent];
        }
    }

    return newPage;
};

export default addPageComponent;
