import { IPageComponentDefinition } from '@seada.io/core/spi/seada-pages/interface';

export interface IFindComponentIndexResult {
    index: number;
    parent: IPageComponentDefinition | null;
}

/**
 * Find the index of a component in a list of components
 * @param components
 * @param componentId
 * @param parent
 */
const findComponentIndex = (
    components: IPageComponentDefinition[],
    componentId: string,
    parent: IPageComponentDefinition | null = null
): IFindComponentIndexResult => {
    for (let i = 0; i < components.length; i++) {
        if (components[i].id === componentId) {
            return { index: i, parent };
        }
        if (components[i].children) {
            const found = findComponentIndex(components[i].children!, componentId, components[i]);
            if (found) {
                return found;
            }
        }
    }
    return null;
};

export default findComponentIndex;
