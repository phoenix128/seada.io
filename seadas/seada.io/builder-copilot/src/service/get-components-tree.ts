import { IPageComponentDefinition } from '@seada.io/core/spi/seada-pages/interface';

/**
 * Get the components tree without any property. Just the tree structure
 * @param components
 */
const getComponentsTree = (components: IPageComponentDefinition[]): IPageComponentDefinition[] => {
    return components.map((component) => {
        if (component.children) {
            return {
                id: component.id,
                label: component.label,
                type: component.type,
                children: getComponentsTree(component.children),
            };
        }

        return {
            id: component.id,
            label: component.label,
            type: component.type,
        };
    });
};

export default getComponentsTree;
