import { IPageData } from '@seada.io/core/spi/components/interface';
import { IPageComponentDefinition } from '@seada.io/core/spi/seada-pages/interface';
import hydratePageComponents from '@seada.io/core/service/data-providers/hydrate-page-components';

/**
 * Recursively extract providers data from components
 * @param components
 */
const extractProvidersData = (components: IPageComponentDefinition[]): Record<string, any> => {
    const providersData: Record<string, any> = {};
    for (const component of components) {
        if (component.providersData) {
            providersData[component.id] = {
                payload: component.providersData,
                propsDependencies: component.providersPropsDependencies,
            };
        }
        if (component.children) {
            Object.assign(providersData, extractProvidersData(component.children));
        }
    }

    return providersData;
};

/**
 * Copy providers data from old page to new page to corresponding components
 * @param newPage
 * @param oldPage
 */
const copyProvidersData = (newPage: IPageData, oldPage: IPageData): IPageData => {
    // Recursively extract providers data from old page
    const oldProvidersData = extractProvidersData(oldPage.pageTemplate.components);
    return hydratePageComponents(newPage, oldProvidersData);
};

export default copyProvidersData;
