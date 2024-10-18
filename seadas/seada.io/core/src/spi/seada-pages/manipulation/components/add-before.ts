import { IPageComponentDefinition } from '@seada.io/core/spi/seada-pages/interface';
import findComponentIndex from '@seada.io/core/spi/seada-pages/manipulation/components/find-component-index';
import { IPageComponentManipulationAction } from '@seada.io/core/spi/seada-pages/manipulation/components/interface';

const addBefore = (
    components: IPageComponentDefinition[],
    action: IPageComponentManipulationAction
): IPageComponentDefinition[] => {
    const { refComponentId, component } = action;
    if (!component) return components;

    if (!refComponentId) {
        components.unshift(component);
        return components;
    }

    const refComponentData = findComponentIndex(components, refComponentId);
    if (!refComponentData) {
        components.unshift(component);
    } else if (refComponentData.parent) {
        refComponentData.parent.children!.splice(refComponentData.index, 0, component);
    } else {
        components.splice(refComponentData.index, 0, component);
    }
    return components;
};

export default addBefore;
