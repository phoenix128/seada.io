import { IPageData } from '@seada.io/core/spi/components/interface';
import { IPageComponentDefinition } from '@seada.io/core/spi/seada-pages/interface';
import removePageDynamicData from '@seada.io/core/spi/seada-pages/manipulation/remove-page-dynamic-data';

/**
 * Get component ids
 * @param components
 */
const mapComponentsByIds = (components: IPageComponentDefinition[]): Record<string, IPageComponentDefinition> => {
    const componentIds: Record<string, IPageComponentDefinition> = {};
    for (const component of components) {
        componentIds[component.id] = component;
        if (component.children) {
            Object.assign(componentIds, mapComponentsByIds(component.children));
        }
    }

    return componentIds;
};

/**
 * Recursively find component ids
 * @param prevComponents
 * @param newComponents
 * @param checkFn
 */
const recursivelyFindComponentsToBeProvided = (
    prevComponents: IPageComponentDefinition[],
    newComponents: IPageComponentDefinition[],
    checkFn: (prev?: IPageComponentDefinition, next?: IPageComponentDefinition) => boolean
): Record<string, IPageComponentDefinition> => {
    const newComponentByIds = mapComponentsByIds(newComponents);
    const prevComponentByIds = mapComponentsByIds(prevComponents);

    const modifiedIds = Object.keys(newComponentByIds).filter((id) =>
        checkFn(prevComponentByIds[id], newComponentByIds[id])
    );
    const newIds = Object.keys(newComponentByIds).filter((id) => !prevComponentByIds.hasOwnProperty(id));

    const modifiedComponentsByIds = modifiedIds.reduce<Record<string, IPageComponentDefinition>>((acc, id) => {
        acc[id] = newComponentByIds[id];
        return acc;
    }, {});

    const addedComponentByIds = newIds.reduce<Record<string, IPageComponentDefinition>>((acc, id) => {
        acc[id] = newComponentByIds[id];
        return acc;
    }, {});

    return {
        ...modifiedComponentsByIds,
        ...addedComponentByIds,
    };
};

/**
 * Returns a subselection of properties to be compared
 * The properties to be compared are the ones that may change the providers data result
 * @param component
 */
const getPropsToBeCompared = (component: IPageComponentDefinition) => {
    if (!component?.props) return {};

    return Object.keys(component.props).reduce((acc, propName) => {
        if (component.providersPropsDependencies?.includes(propName)) {
            acc[propName] = component.props[propName];
        }
        return acc;
    }, {});
};

/**
 * Find modified component ids
 * @param pagePrev
 * @param pageNew
 */
const findComponentsToBeProvided = (pagePrev: IPageData, pageNew: IPageData): string[] => {
    if (JSON.stringify(removePageDynamicData(pagePrev)) === JSON.stringify(removePageDynamicData(pageNew))) {
        return [];
    }

    const reloadAll =
        pagePrev.pageTemplate.pageVariant !== pageNew.pageTemplate.pageVariant ||
        pagePrev.pageLayout.templateName !== pageNew.pageLayout.templateName;

    const checkFn = reloadAll
        ? () => true
        : (prevComponent?: IPageComponentDefinition, newComponent?: IPageComponentDefinition) => {
              if (!newComponent?.hasOwnProperty('providersData')) return true;

              const prevProps = getPropsToBeCompared(prevComponent);
              const newProps = getPropsToBeCompared(newComponent);

              return JSON.stringify(prevProps) !== JSON.stringify(newProps);
          };

    const { components: prevPageComponents } = pagePrev.pageTemplate;
    const { components: prevLayoutComponents } = pagePrev.pageLayout;
    const { components: newPageComponents } = pageNew.pageTemplate;
    const { components: newLayoutComponents } = pageNew.pageLayout;

    const modifiedLayoutComponents = recursivelyFindComponentsToBeProvided(
        prevLayoutComponents,
        newLayoutComponents,
        checkFn
    );
    const modifiedPageComponents = recursivelyFindComponentsToBeProvided(
        prevPageComponents,
        newPageComponents,
        checkFn
    );

    const allComponents = {
        ...modifiedLayoutComponents,
        ...modifiedPageComponents,
    };

    const sideEffectedComponents: Record<string, IPageComponentDefinition> = {};
    for (const componentId in allComponents) {
        const component = allComponents[componentId];
        if (component.type.endsWith('DataContext')) {
            const modifiedChildren = mapComponentsByIds(component.children || []);
            Object.assign(sideEffectedComponents, modifiedChildren);
        }
    }

    return Object.keys(allComponents).concat(Object.keys(sideEffectedComponents));
};

export default findComponentsToBeProvided;
