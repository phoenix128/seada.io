import { IPageComponentDefinition } from '@seada.io/core/spi/seada-pages/interface';
import { TreeItems } from '@seada.io/sortable-tree/types';
import { INodeTreeData } from '@seada.io/builder/components/interface';

const treeItemsToComponents = (items: TreeItems<INodeTreeData>): IPageComponentDefinition[] => {
    return items.map((item) => {
        const { children, component } = item;
        return {
            ...component,
            children: children ? treeItemsToComponents(children) : [],
        };
    });
};

export default treeItemsToComponents;
