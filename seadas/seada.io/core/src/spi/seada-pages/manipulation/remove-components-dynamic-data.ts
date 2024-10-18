import { IPageComponentDefinition } from '@seada.io/core/spi/seada-pages/interface';

/**
 * Remove dynamic page data from the components
 * @param components
 */
const removeComponentsDynamicData = (components: IPageComponentDefinition[]): IPageComponentDefinition[] => {
    if (!components) return [];

    const newComponents = JSON.parse(JSON.stringify(components));

    for (const component of newComponents) {
        delete component.providersData;
        delete component.providedProps;
        delete component.providersPropsDependencies;

        if (component.children && component.children.length) {
            component.children = removeComponentsDynamicData(component.children);
        }
    }

    return newComponents;
};

export default removeComponentsDynamicData;
