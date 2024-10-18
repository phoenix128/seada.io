import { IPageComponentDefinition } from '@seada.io/core/spi/seada-pages/interface';
import { IPageComponentManipulationAction } from '@seada.io/core/spi/seada-pages/manipulation/components/interface';
import findComponentIndex from '@seada.io/core/spi/seada-pages/manipulation/components/find-component-index';

const remove = (
    components: IPageComponentDefinition[],
    action: IPageComponentManipulationAction
): IPageComponentDefinition[] => {
    const { componentId } = action;
    if (!componentId) return components;

    const componentData = findComponentIndex(components, componentId);
    if (!componentData) return components;

    if (componentData.parent) {
        componentData.parent.children!.splice(componentData.index, 1);
    } else {
        components.splice(componentData.index, 1);
    }
    return components;
};

export default remove;
