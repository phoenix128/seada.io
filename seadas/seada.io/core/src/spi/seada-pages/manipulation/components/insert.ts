import { IPageComponentDefinition } from '@seada.io/core/spi/seada-pages/interface';
import { IPageComponentManipulationAction } from '@seada.io/core/spi/seada-pages/manipulation/components/interface';
import findComponentIndex from '@seada.io/core/spi/seada-pages/manipulation/components/find-component-index';

const insert = (
    components: IPageComponentDefinition[],
    action: IPageComponentManipulationAction
): IPageComponentDefinition[] => {
    const { refComponentId, component } = action;
    if (!component || !refComponentId) return components;

    const refComponentData = findComponentIndex(components, refComponentId);
    if (!refComponentData) return components;

    if (!refComponentData.parent) {
        // Reference component is at root level
        const refComponent = components[refComponentData.index];
        refComponent.children = refComponent.children || [];
        refComponent.children.push(component);
    } else {
        // Reference component is a child of another component
        const refComponent = refComponentData.parent.children![refComponentData.index];
        refComponent.children = refComponent.children || [];
        refComponent.children.push(component);
    }

    return components;
};

export default insert;
