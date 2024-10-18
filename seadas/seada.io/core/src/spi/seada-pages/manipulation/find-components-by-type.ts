import { IPageComponentDefinition } from '@seada.io/core/spi/seada-pages/interface';
import { IPageData } from '@seada.io/core/spi/components/interface';

/**
 * Recursively find component by id
 * @param components
 * @param componentType
 */
const findComponentRec = (
    components: IPageComponentDefinition[],
    componentType: string
): IPageComponentDefinition[] => {
    if (!components || !componentType) return [];

    let res = components.filter((s) => s?.type === componentType);
    for (const s of components) {
        if (!s?.children) continue;
        res = [...res, ...findComponentRec(s.children, componentType)];
    }

    return res;
};

/**
 * Recursively find component by id
 * @param page
 * @param componentType
 */
const findComponentsByType = (page: IPageData, componentType: string): IPageComponentDefinition[] => {
    let layoutComponents: IPageComponentDefinition[] = [];
    if (page?.pageLayout?.components) {
        layoutComponents = [...layoutComponents, ...findComponentRec(page.pageLayout.components, componentType)];
    }

    if (page?.pageTemplate?.components) {
        layoutComponents = [...layoutComponents, ...findComponentRec(page.pageTemplate.components, componentType)];
    }

    return layoutComponents;
};

export default findComponentsByType;
