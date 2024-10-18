import getExcludedComponents from '@seada.io/builder-copilot/service/get-excluded-components';
import getPageComponentsSchemaCollection from '@seada.io/core-schema/spi/components/get-page-components-schema-collection';
import i18next from 'i18next';
import i18nextBackend from 'i18next-fs-backend';
import getI18n from '@seada.io/core/service/get-i18n';

export interface IComponentsData {
    type: string;
    description: string;
    maxChildren: string;
}

/**
 * Get a list of components with their properties
 */
const getComponentsList = async (): Promise<IComponentsData[]> => {
    const getTranslationFn = async () => {
        await i18next.use(i18nextBackend).init({
            resources: getI18n(),
            lng: 'en',
            fallbackLng: 'en',
            interpolation: {
                escapeValue: false,
            },
        });

        return i18next.t.bind(i18next);
    };

    const t = await getTranslationFn();

    const pageComponents = getPageComponentsSchemaCollection();

    const excludedComponents = getExcludedComponents();
    return Object.entries(pageComponents).reduce((acc, [componentName, componentSchema]) => {
        if (excludedComponents.includes(componentName)) {
            return acc;
        }

        const childrenAmount =
            componentSchema.maxChildren === Infinity
                ? 'unlimited'
                : componentSchema.maxChildren === 0
                ? 'none'
                : componentSchema.maxChildren;

        acc.push({
            type: componentName,
            description: t(componentSchema.description),
            maxChildren: childrenAmount,
        });

        return acc;
    }, []);
};

export default getComponentsList;
