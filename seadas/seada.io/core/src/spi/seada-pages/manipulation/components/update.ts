import { IPageComponentDefinition } from '@seada.io/core/spi/seada-pages/interface';
import { IPageComponentManipulationAction } from '@seada.io/core/spi/seada-pages/manipulation/components/interface';
import findComponentIndex from '@seada.io/core/spi/seada-pages/manipulation/components/find-component-index';

const update = (
    components: IPageComponentDefinition[],
    action: IPageComponentManipulationAction
): IPageComponentDefinition[] => {
    const { componentId, component } = action;

    if (!componentId || !component) return components;

    const componentData = findComponentIndex(components, componentId);
    if (!componentData) return components;

    if (componentData.parent) {
        componentData.parent.children![componentData.index] = {
            ...componentData.parent.children![componentData.index],
            props: {
                ...componentData.parent.children![componentData.index].props,
                ...component.props,
            },
        };
    } else {
        components[componentData.index] = {
            ...components[componentData.index],
            props: {
                ...components[componentData.index].props,
                ...component.props,
            },
        };
    }
    return components;
};

export default update;
