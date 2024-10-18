import { TreeItem, TreeItems } from '@seada.io/sortable-tree/types';
import { useMemo } from 'react';
import { INodeTreeData } from '@seada.io/builder/components/interface';
import { CgSquare } from 'react-icons/cg';
import { useTranslation } from 'react-i18next';
import getPageComponentSchema from '@seada.io/core-schema/spi/components/get-page-component-schema';
import { IPageComponentDefinition } from '@seada.io/core/spi/seada-pages/interface';

const componentsToTreeItems = (
    components: IPageComponentDefinition[],
    t: (key: string) => string
): TreeItems<INodeTreeData> => {
    return components.map((component) => {
        const { children, ...other } = component;

        const schema = getPageComponentSchema(component.type);
        const base: TreeItem<INodeTreeData> = {
            id: other.id,
            component: other,
            label: component.label || t(schema.title) || component.type,
            icon: schema.icon || CgSquare,
            children: children ? componentsToTreeItems(children, t) : [],
        };

        return {
            ...base,
            canHaveChildren: schema.maxChildren > 0,
        };
    });
};

const useComponentsToTreeItems = (components: IPageComponentDefinition[]): TreeItems<INodeTreeData> => {
    const { t } = useTranslation();

    return useMemo(() => componentsToTreeItems(components, t), [components, t]);
};

export default useComponentsToTreeItems;
