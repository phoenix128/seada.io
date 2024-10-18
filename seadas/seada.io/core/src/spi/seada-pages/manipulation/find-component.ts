import { IPageComponentDefinition } from '@seada.io/core/spi/seada-pages/interface';
import { IPageData } from '@seada.io/core/spi/components/interface';

/**
 * Recursively find component by id
 * @param components
 * @param componentId
 */
const findComponentRec = (
    components: IPageComponentDefinition[],
    componentId: string
): IPageComponentDefinition | null => {
    if (!components || !componentId) return null;

    const res = components.find((s) => s?.id === componentId);
    if (res) return res;

    for (const s of components) {
        if (!s?.children) continue;
        const r = findComponentRec(s.children, componentId);
        if (r) return r;
    }

    return null;
};

/**
 * Recursively find component by id
 * @param page
 * @param componentId
 */
const findComponent = (page: IPageData, componentId: string): IPageComponentDefinition | null => {
    if (page?.pageLayout?.components) {
        const layoutComponent = findComponentRec(page.pageLayout.components, componentId);
        if (layoutComponent) return layoutComponent;
    }

    if (page?.pageTemplate?.components) {
        return findComponentRec(page.pageTemplate.components, componentId);
    }

    return null;
};

export default findComponent;
