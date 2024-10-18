import { IDataProviderConfig, IPageData, IVariables } from '@seada.io/core/spi/components/interface';
import getDataProviders from '@seada.io/core/spi/data-providers/get-data-providers';
import { IPageComponentDefinition } from '@seada.io/core/spi/seada-pages/interface';
import convertVariables from '@seada.io/core/spi/convert-variables';
import localizeProps from '@seada.io/core/spi/locale/localize-props';

export interface IProvidersComponentData {
    propsDependencies: string[];
    payload: Record<string, any>;
}

export interface IProvidersDataCollection {
    /** [componentId]: provider data */
    [key: string]: IProvidersComponentData;
}

interface IDataProviderResults {
    operationIdByComponent: Record<string, string>;
    byOperationId: Record<string, IProvidersComponentData>;
}

const getProvidersConfigRec = async (
    components: IPageComponentDefinition[],
    pageData: IPageData,
    variables: IVariables,
    componentIds: string[] | undefined,
    inDataProviderResults: IDataProviderResults
): Promise<IDataProviderResults> => {
    let dataProviderResults: IDataProviderResults = inDataProviderResults;
    const providersByOperationId: Record<string, IDataProviderConfig> = {};

    if (!components) return dataProviderResults;

    for (const component of components) {
        const { type: componentType } = component;
        const componentCopy = { ...component };

        // Mutate the component props with the resolved variables, so the data providers can use them
        componentCopy.props = localizeProps(componentCopy.props, pageData.locale, pageData.allLocales);
        componentCopy.props = convertVariables(componentCopy.props, variables);

        if (componentIds === undefined || componentIds.includes(component.id)) {
            const dataProviders = getDataProviders(componentType);

            if (dataProviders) {
                for (const dataProvider of dataProviders) {
                    try {
                        const dp = dataProvider({ ...componentCopy }, { ...pageData }, { ...variables });
                        if (!dp) continue;

                        const operationId = dp.operationId;
                        if (!dataProviderResults.byOperationId.hasOwnProperty(operationId)) {
                            providersByOperationId[operationId] = dp;
                        }

                        dataProviderResults.operationIdByComponent[component.id] = operationId;
                    } catch (e) {
                        throw new Error(
                            `Error while loading data provider ${dataProvider.name} for component ${componentType}: ${e.message}`
                        );
                    }
                }
            }
        }
    }

    // Resolve this component's level
    const promises = Object.values(providersByOperationId).map((dp) => dp.loader());
    const promiseResults = await Promise.all(promises);
    const resultsByOperationId = Object.keys(providersByOperationId).reduce<Record<string, IProvidersComponentData>>(
        (acc, operationId, index) => {
            acc[operationId] = {
                propsDependencies: providersByOperationId[operationId].propsDependencies,
                payload: promiseResults[index],
            };
            return acc;
        },
        {}
    );

    dataProviderResults = {
        operationIdByComponent: dataProviderResults.operationIdByComponent,
        byOperationId: {
            ...dataProviderResults.byOperationId,
            ...resultsByOperationId,
        },
    };

    for (const component of components) {
        if (!component.children || component.children.length === 0) continue;

        const operationId = dataProviderResults.operationIdByComponent[component.id];
        const downstreamVariables = component.type.endsWith('DataContext')
            ? {
                  ...variables,
                  ...resultsByOperationId[operationId]?.payload,
              }
            : variables;

        const res = await getProvidersConfigRec(
            component.children,
            pageData,
            downstreamVariables,
            componentIds,
            dataProviderResults
        );

        dataProviderResults = {
            operationIdByComponent: {
                ...dataProviderResults.operationIdByComponent,
                ...res.operationIdByComponent,
            },
            byOperationId: {
                ...dataProviderResults.byOperationId,
                ...res.byOperationId,
            },
        };
    }

    return dataProviderResults;
};

/**
 * Get data from providers for the given page
 * @param pageData
 * @param componentIds
 */
const getProvidersData = async (
    pageData: IPageData,
    componentIds: string[] = undefined
): Promise<IProvidersDataCollection> => {
    const { variables } = pageData;

    const { components: pageComponents } = pageData.pageTemplate;
    const { components: layoutComponents } = pageData.pageLayout;

    const dataProvidersConfigs: IDataProviderResults = {
        operationIdByComponent: {},
        byOperationId: {},
    };

    const [pageDataProvidersResults, layoutDataProvidersResults] = await Promise.all([
        getProvidersConfigRec(pageComponents, pageData, variables, componentIds, dataProvidersConfigs),
        getProvidersConfigRec(layoutComponents, pageData, variables, componentIds, dataProvidersConfigs),
    ]);

    const allResultsByOperationId = {
        ...pageDataProvidersResults.byOperationId,
        ...layoutDataProvidersResults.byOperationId,
    };

    const allComponents = {
        ...pageDataProvidersResults.operationIdByComponent,
        ...layoutDataProvidersResults.operationIdByComponent,
    };

    return Object.entries(allComponents).reduce<IProvidersDataCollection>((acc, [componentId, operationId]) => {
        if (allResultsByOperationId.hasOwnProperty(operationId)) {
            acc[componentId] = allResultsByOperationId[operationId];
        }
        return acc;
    }, {});
};

export default getProvidersData;
