import { IPageComponentDefinition } from '@seada.io/core/spi/seada-pages/interface';
import { IPageComponentManipulationAction } from '@seada.io/core/spi/seada-pages/manipulation/components/interface';
import findComponentIndex from '@seada.io/core/spi/seada-pages/manipulation/components/find-component-index';

const addAfter = (
    components: IPageComponentDefinition[],
    action: IPageComponentManipulationAction
): IPageComponentDefinition[] => {
    const { refComponentId, component } = action;
    if (!component) return components;

    if (!refComponentId) {
        components.push(component);
        return components;
    }

    const refComponentData = findComponentIndex(components, refComponentId);
    if (!refComponentData) {
        components.push(component);
    } else if (refComponentData.parent) {
        refComponentData.parent.children!.splice(refComponentData.index + 1, 0, component);
    } else {
        components.splice(refComponentData.index + 1, 0, component);
    }
    return components;
};

export default addAfter;
