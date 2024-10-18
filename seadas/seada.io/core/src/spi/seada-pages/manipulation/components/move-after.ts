import { IPageComponentDefinition } from '@seada.io/core/spi/seada-pages/interface';
import { IPageComponentManipulationAction } from '@seada.io/core/spi/seada-pages/manipulation/components/interface';
import findComponentIndex from '@seada.io/core/spi/seada-pages/manipulation/components/find-component-index';

const moveAfter = (
    components: IPageComponentDefinition[],
    action: IPageComponentManipulationAction
): IPageComponentDefinition[] => {
    const { componentId, refComponentId } = action;
    if (!componentId || !refComponentId) return components;

    const componentData = findComponentIndex(components, componentId);
    const refComponentData = findComponentIndex(components, refComponentId);

    if (!componentData || !refComponentData || componentData.parent !== refComponentData.parent) return components;

    const componentArray = componentData.parent ? componentData.parent.children! : components;
    const [component] = componentArray.splice(componentData.index, 1);
    componentArray.splice(refComponentData.index, 0, component);

    return components;
};

export default moveAfter;
