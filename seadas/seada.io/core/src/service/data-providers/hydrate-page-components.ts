import { IPageData } from '@seada.io/core/spi/components/interface';
import { IProvidersDataCollection } from '@seada.io/core/service/data-providers/get-providers-data';
import { IPageComponentDefinition } from '@seada.io/core/spi/seada-pages/interface';

/**
 * Recursively hydrate components with provided data
 * @param components
 * @param providedData
 */
const recursivelyHydrateComponents = (
    components: IPageComponentDefinition[],
    providedData: IProvidersDataCollection
): void => {
    if (!components) {
        return;
    }

    for (const component of components) {
        const { children } = component as IPageComponentDefinition;

        const { id } = component;
        // Please note: if providedData is undefined, it means
        // that the component is not initialized yet.
        // It is important to set the providersData to an empty object in this case.
        if (providedData?.[id] !== undefined) {
            component.providersData = providedData[id].payload;
            component.providersPropsDependencies = providedData[id].propsDependencies;
        } else if (component.providersData === undefined) {
            component.providersData = {};
            component.providersPropsDependencies = [];
        }

        if (children) {
            recursivelyHydrateComponents(children, providedData);
        }
    }
};

/**
 * Hydrate page components with provided data
 * @param pageData
 * @param providedData
 */
const hydratePageComponents = (pageData: IPageData, providedData: IProvidersDataCollection): IPageData => {
    const newPageData = JSON.parse(JSON.stringify(pageData));

    const { components: pageComponents } = newPageData.pageTemplate;
    const { components: layoutComponents } = newPageData.pageLayout;

    recursivelyHydrateComponents(pageComponents, providedData);
    recursivelyHydrateComponents(layoutComponents, providedData);

    return newPageData;
};

export default hydratePageComponents;
