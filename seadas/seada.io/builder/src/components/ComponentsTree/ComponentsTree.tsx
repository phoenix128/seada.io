import ComponentNode from '@seada.io/builder/components/ComponentsTree/ComponentNode';
import React, { useCallback, useContext } from 'react';
import BuilderContext from '@seada.io/builder/contexts/BuilderContext';
import { SortableTree } from '@seada.io/sortable-tree/SortableTree';
import useComponentsToTreeItems from '@seada.io/builder/hooks/use-components-to-tree-items';
import treeItemsToComponents from '@seada.io/builder/libs/tree-items-to-components';

interface IComponentsTreeProps {
    className?: string;
}

const ComponentsTree: React.FC<IComponentsTreeProps> = ({ className }) => {
    const { pageData, setPageData, setPageToBeSaved } = useContext(BuilderContext);

    const pageTemplate = pageData?.pageTemplate;
    const treeItems = useComponentsToTreeItems(pageTemplate?.components || []);

    const handleItemsChanged = useCallback(
        (newItems: any[]) => {
            if (JSON.stringify(newItems) === JSON.stringify(treeItems)) return;

            setPageData({
                ...pageData,
                pageTemplate: {
                    ...pageTemplate,
                    components: treeItemsToComponents(newItems),
                },
            });
            setPageToBeSaved(true);
        },
        [pageData, pageTemplate, setPageData, setPageToBeSaved, treeItems]
    );

    return (
        <div className={className}>
            <SortableTree
                pageType={'@page'}
                items={treeItems}
                TreeItemComponent={ComponentNode}
                onItemsChanged={handleItemsChanged}
            />
        </div>
    );
};

export default ComponentsTree;
